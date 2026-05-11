<?php

namespace App\Services;

use App\Models\DetailTransaksi;
use App\Models\Jurnal;
use App\Models\Pengeluaran;
use App\Models\Produk;
use App\Models\Transaksi;
use Illuminate\Support\Facades\DB;

class LaporanService
{
    public function trendPerHari(string $dari, string $sampai, ?int $outletId = null): array
    {
        $query = Transaksi::where('status', 'selesai')
            ->whereDate('transaction_datetime', '>=', $dari)
            ->whereDate('transaction_datetime', '<=', $sampai);

        if ($outletId) {
            $query->where('outlet_id', $outletId);
        }

        return $query->select(
            DB::raw('DATE(transaction_datetime) as tanggal'),
            DB::raw('COUNT(*) as jumlah_transaksi'),
            DB::raw('SUM(total) as omzet')
        )
            ->groupBy('tanggal')
            ->orderBy('tanggal')
            ->get()
            ->toArray();
    }

    public function laporanPenjualan(string $dari, string $sampai, ?int $outletId = null, ?int $metodePembayaranId = null): array
    {
        $query = Transaksi::with(['detailTransaksi', 'metodePembayaran', 'pengguna', 'outlet'])
            ->where('status', 'selesai')
            ->whereDate('transaction_datetime', '>=', $dari)
            ->whereDate('transaction_datetime', '<=', $sampai);

        if ($outletId) {
            $query->where('outlet_id', $outletId);
        }
        if ($metodePembayaranId) {
            $query->where('metode_pembayaran_id', $metodePembayaranId);
        }

        $transaksi = $query->orderByDesc('transaction_datetime')->get();

        return [
            'total_omzet' => $transaksi->sum('total'),
            'jumlah_transaksi' => $transaksi->count(),
            'rata_rata' => $transaksi->count() > 0 ? $transaksi->sum('total') / $transaksi->count() : 0,
            'transaksi' => $transaksi,
        ];
    }

    public function labaRugi(string $dari, string $sampai, ?int $outletId = null): array
    {
        $penjualan = Transaksi::where('status', 'selesai')
            ->whereDate('transaction_datetime', '>=', $dari)
            ->whereDate('transaction_datetime', '<=', $sampai);

        if ($outletId) {
            $penjualan->where('outlet_id', $outletId);
        }
        $transaksiIds = $penjualan->pluck('id');

        $totalOmzet = (float) $penjualan->sum('total');
        $totalHpp = (float) DetailTransaksi::whereIn('transaksi_id', $transaksiIds)
            ->select(DB::raw('SUM(harga_modal * qty) as total'))
            ->value('total') ?? 0;

        $pengeluaran = Pengeluaran::whereDate('tanggal', '>=', $dari)
            ->whereDate('tanggal', '<=', $sampai);

        if ($outletId) {
            $pengeluaran->where('outlet_id', $outletId);
        }
        $totalPengeluaran = (float) $pengeluaran->sum('jumlah');

        return [
            'periode' => ['dari' => $dari, 'sampai' => $sampai],
            'total_omzet' => $totalOmzet,
            'total_hpp' => $totalHpp,
            'laba_kotor' => $totalOmzet - $totalHpp,
            'total_pengeluaran' => $totalPengeluaran,
            'laba_bersih' => $totalOmzet - $totalHpp - $totalPengeluaran,
        ];
    }

    public function laporanPerProduk(string $dari, string $sampai, ?int $outletId = null): array
    {
        $query = DetailTransaksi::select(
            'produk_id',
            DB::raw('SUM(qty) as total_terjual'),
            DB::raw('SUM(subtotal) as total_revenue'),
            DB::raw('SUM(harga_modal * qty) as total_modal')
        )
            ->whereHas('transaksi', fn($q) => $q->where('status', 'selesai')
                ->whereDate('transaction_datetime', '>=', $dari)
                ->whereDate('transaction_datetime', '<=', $sampai))
            ->groupBy('produk_id')
            ->orderByDesc('total_terjual');

        if ($outletId) {
            $query->whereHas('transaksi', fn($q) => $q->where('outlet_id', $outletId));
        }

        return $query->get()->map(fn($item) => [
            'produk' => $item->produk?->nama ?? 'Unknown',
            'kategori' => $item->produk?->kategori?->nama ?? '-',
            'total_terjual' => (int) $item->total_terjual,
            'total_revenue' => (float) $item->total_revenue,
            'total_modal' => (float) $item->total_modal,
            'laba' => (float) ($item->total_revenue - $item->total_modal),
        ])->toArray();
    }

    public function trendPerBulan(int $tahun, ?int $outletId = null): array
    {
        $query = Transaksi::select(
            DB::raw('MONTH(transaction_datetime) as bulan'),
            DB::raw('COUNT(*) as jumlah_transaksi'),
            DB::raw('SUM(total) as omzet')
        )
            ->whereYear('transaction_datetime', $tahun)
            ->where('status', 'selesai')
            ->groupBy(DB::raw('MONTH(transaction_datetime)'))
            ->orderBy('bulan');

        if ($outletId) {
            $query->where('outlet_id', $outletId);
        }

        return $query->get()->toArray();
    }

    public function bukuBesar(string $dari, string $sampai, ?int $outletId = null): array
    {
        // Collect all transactions (completed)
        $transaksiQuery = Transaksi::where('status', 'selesai')
            ->whereDate('transaction_datetime', '>=', $dari)
            ->whereDate('transaction_datetime', '<=', $sampai);
        if ($outletId) {
            $transaksiQuery->where('outlet_id', $outletId);
        }
        $transaksi = $transaksiQuery->get();

        // Collect all expenses
        $pengeluaranQuery = Pengeluaran::whereDate('tanggal', '>=', $dari)
            ->whereDate('tanggal', '<=', $sampai);
        if ($outletId) {
            $pengeluaranQuery->where('outlet_id', $outletId);
        }
        $pengeluaran = $pengeluaranQuery->get();

        // Collect all journal entries
        $jurnalQuery = Jurnal::whereDate('tanggal', '>=', $dari)
            ->whereDate('tanggal', '<=', $sampai);
        if ($outletId) {
            $jurnalQuery->where('outlet_id', $outletId);
        }
        $jurnal = $jurnalQuery->get();

        $entries = [];

        foreach ($transaksi as $t) {
            $entries[] = [
                'tanggal' => $t->transaction_datetime->format('Y-m-d'),
                'waktu' => $t->transaction_datetime->format('H:i'),
                'tipe' => 'Penjualan',
                'nomor' => $t->kode_transaksi,
                'deskripsi' => "Penjualan {$t->kode_transaksi}" . ($t->pelanggan ? " - {$t->pelanggan->nama}" : ''),
                'debet' => (float) $t->total,
                'kredit' => 0,
                'saldo' => 0,
            ];
        }

        foreach ($pengeluaran as $p) {
            $entries[] = [
                'tanggal' => $p->tanggal->format('Y-m-d'),
                'waktu' => '',
                'tipe' => 'Pengeluaran',
                'nomor' => '',
                'deskripsi' => "{$p->kategori}: {$p->keterangan}",
                'debet' => 0,
                'kredit' => (float) $p->jumlah,
                'saldo' => 0,
            ];
        }

        foreach ($jurnal as $j) {
            $entries[] = [
                'tanggal' => $j->tanggal->format('Y-m-d'),
                'waktu' => '',
                'tipe' => 'Jurnal',
                'nomor' => $j->nomor_jurnal,
                'deskripsi' => $j->deskripsi,
                'debet' => (float) $j->debet,
                'kredit' => (float) $j->kredit,
                'saldo' => 0,
            ];
        }

        // Sort by date
        usort($entries, fn($a, $b) => $a['tanggal'] <=> $b['tanggal'] ?: $a['waktu'] <=> $b['waktu']);

        // Calculate running balance
        $saldo = 0;
        foreach ($entries as &$e) {
            $saldo += $e['debet'] - $e['kredit'];
            $e['saldo'] = $saldo;
        }

        return [
            'entries' => $entries,
            'total_debet' => array_sum(array_column($entries, 'debet')),
            'total_kredit' => array_sum(array_column($entries, 'kredit')),
            'saldo_akhir' => $saldo,
        ];
    }

    public function neraca(?int $outletId = null): array
    {
        // Assets: Kas
        $totalPenjualan = Transaksi::where('status', 'selesai');
        if ($outletId) {
            $totalPenjualan->where('outlet_id', $outletId);
        }
        $totalKas = (float) $totalPenjualan->sum('bayar') - (float) $totalPenjualan->sum('kembalian');

        // Assets: Persediaan
        $produkQuery = Produk::select(DB::raw('SUM(stok * harga_modal) as total'));
        if ($outletId) {
            $produkQuery->where('outlet_id', $outletId);
        }
        $totalPersediaan = (float) $produkQuery->value('total') ?? 0;

        // Liabilities: Pengeluaran yang belum dibayar (none tracked, set to 0)
        $totalHutang = 0;

        // Calculate equity
        $totalPengeluaran = Pengeluaran::select(DB::raw('COALESCE(SUM(jumlah), 0) as total'));
        if ($outletId) {
            $totalPengeluaran->where('outlet_id', $outletId);
        }
        $totalBiaya = (float) $totalPengeluaran->value('total');

        $totalAset = $totalKas + $totalPersediaan;
        $totalEquity = $totalAset - $totalHutang;

        return [
            'aset' => [
                'items' => [
                    ['nama' => 'Kas', 'jumlah' => $totalKas],
                    ['nama' => 'Persediaan Barang', 'jumlah' => $totalPersediaan],
                ],
                'total' => $totalAset,
            ],
            'liabilitas' => [
                'items' => [
                    ['nama' => 'Hutang Usaha', 'jumlah' => $totalHutang],
                ],
                'total' => $totalHutang,
            ],
            'ekuitas' => [
                'items' => [
                    ['nama' => 'Modal & Laba Ditahan', 'jumlah' => $totalEquity],
                ],
                'total' => $totalEquity,
            ],
        ];
    }
}

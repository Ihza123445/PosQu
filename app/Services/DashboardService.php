<?php

namespace App\Services;

use App\Models\DetailTransaksi;
use App\Models\Notifikasi;
use App\Models\Pelanggan;
use App\Models\Produk;
use App\Models\Transaksi;
use Illuminate\Support\Facades\DB;

class DashboardService
{
    public function ringkasanHariIni(?int $outletId = null): array
    {
        $today = now()->toDateString();

        $query = Transaksi::whereDate('transaction_datetime', $today)
            ->where('status', 'selesai');

        if ($outletId) {
            $query->where('outlet_id', $outletId);
        }

        $omzet = (float) $query->sum('total');
        $jumlahTransaksi = $query->count();
        $rataTransaksi = $jumlahTransaksi > 0 ? $omzet / $jumlahTransaksi : 0;

        return [
            'omzet' => $omzet,
            'jumlah_transaksi' => $jumlahTransaksi,
            'rata_rata_transaksi' => round($rataTransaksi, 2),
            'produk_terjual' => (int) DetailTransaksi::whereIn('transaksi_id', $query->pluck('id'))->sum('qty'),
        ];
    }

    public function produkTerlaris(int $limit = 10, ?int $outletId = null): array
    {
        $query = DetailTransaksi::select('produk_id', DB::raw('SUM(qty) as total_terjual'), DB::raw('SUM(subtotal) as total_revenue'))
            ->groupBy('produk_id')
            ->orderByDesc('total_terjual')
            ->limit($limit);

        if ($outletId) {
            $query->whereHas('transaksi', fn($q) => $q->where('outlet_id', $outletId)->where('status', 'selesai'));
        }

        return $query->get()->map(fn($item) => [
            'produk' => $item->produk?->nama ?? 'Unknown',
            'total_terjual' => (int) $item->total_terjual,
            'total_revenue' => (float) $item->total_revenue,
        ])->toArray();
    }

    public function stokMenipis(?int $outletId = null): array
    {
        $query = Produk::whereColumn('stok', '<=', 'min_stok')
            ->where('status', '!=', 'nonaktif');

        if ($outletId) {
            $query->where('outlet_id', $outletId);
        }

        return $query->orderBy('stok')->limit(10)->get()->toArray();
    }

    public function notifikasiBelumDibaca(int $penggunaId): array
    {
        return Notifikasi::where('pengguna_id', $penggunaId)
            ->where('status_baca', false)
            ->orderByDesc('created_at')
            ->limit(10)
            ->get()
            ->toArray();
    }

    public function trendPenjualan(int $hari = 30, ?int $outletId = null): array
    {
        $query = Transaksi::where('status', 'selesai')
            ->whereDate('transaction_datetime', '>=', now()->subDays($hari));

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

    public function pelangganTeratas(int $limit = 10): array
    {
        return Pelanggan::orderByDesc('total_pembelian')
            ->limit($limit)
            ->get()
            ->toArray();
    }
}

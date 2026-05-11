<?php

namespace App\Services;

use App\Models\DetailTransaksi;
use App\Models\Pelanggan;
use App\Models\Produk;
use App\Models\Transaksi;
use Illuminate\Support\Facades\DB;

class TransaksiService
{
    public function __construct(
        private StokService $stokService,
    ) {}

    public function checkout(array $data, array $items, int $penggunaId): Transaksi
    {
        return DB::transaction(function () use ($data, $items, $penggunaId) {
            $outletId = $data['outlet_id'];
            $dateId = $this->getDateId(now()->toDateString());

            $today = now()->format('Ymd');
            $lastSeq = Transaksi::whereDate('created_at', today())
                ->where('outlet_id', $outletId)
                ->count();
            $seq = $lastSeq + 1;
            $kodeTransaksi = "TRX-{$today}-" . str_pad($seq, 3, '0', STR_PAD_LEFT);
            $invoice_number = "INV-{$today}-" . str_pad($seq, 4, '0', STR_PAD_LEFT);

            $subtotal = 0;
            $totalModal = 0;
            $detailItems = [];

            foreach ($items as $item) {
                $produk = Produk::findOrFail($item['produk_id']);
                $harga = $produk->harga_jual;
                $qty = $item['qty'];
                $subtotalItem = $harga * $qty;
                $subtotal += $subtotalItem;
                $totalModal += $produk->harga_modal * $qty;

                $detailItems[] = [
                    'produk_id' => $produk->id,
                    'nama_produk' => $produk->nama,
                    'harga_satuan' => $harga,
                    'harga_modal' => $produk->harga_modal,
                    'qty' => $qty,
                    'diskon_item' => $item['diskon_item'] ?? 0,
                    'subtotal' => $subtotalItem,
                ];
            }

            $diskon = $data['diskon'] ?? 0;
            $pajak = $data['pajak'] ?? 0;
            $total = $subtotal - $diskon + $pajak;

            $transaksi = Transaksi::create([
                'outlet_id' => $outletId,
                'pengguna_id' => $penggunaId,
                'pelanggan_id' => $data['pelanggan_id'] ?? null,
                'metode_pembayaran_id' => $data['metode_pembayaran_id'],
                'promo_id' => $data['promo_id'] ?? null,
                'date_id' => $dateId,
                'kode_transaksi' => $kodeTransaksi,
                'invoice_number' => $invoice_number,
                'subtotal' => $subtotal,
                'diskon' => $diskon,
                'pajak' => $pajak,
                'total' => $total,
                'bayar' => $data['bayar'],
                'kembalian' => $data['bayar'] - $total,
                'catatan' => $data['catatan'] ?? null,
                'status' => 'selesai',
                'transaction_datetime' => now(),
            ]);

            foreach ($detailItems as $detail) {
                $detail['transaksi_id'] = $transaksi->id;
                DetailTransaksi::create($detail);

                $produk = Produk::find($detail['produk_id']);
                $this->stokService->mutasiStok(
                    $produk,
                    'keluar',
                    $detail['qty'],
                    $penggunaId,
                    $transaksi->id,
                    "Penjualan {$kodeTransaksi}"
                );
            }

            // Update promo usage
            if (!empty($data['promo_id'])) {
                $transaksi->promo()->increment('terpakai');
            }

            // Update customer stats
            if (!empty($data['pelanggan_id'])) {
                $pelanggan = Pelanggan::find($data['pelanggan_id']);
                if ($pelanggan) {
                    $pelanggan->increment('total_transaksi');
                    $pelanggan->increment('total_pembelian', $total);
                    $pelanggan->increment('loyalty_points', (int) ($total / 1000));
                }
            }

            return $transaksi->fresh(['detailTransaksi', 'pelanggan', 'metodePembayaran']);
        });
    }

    public function batalkanTransaksi(Transaksi $transaksi, int $dibatalkanOleh, string $alasan): Transaksi
    {
        return DB::transaction(function () use ($transaksi, $dibatalkanOleh, $alasan) {
            $transaksi->update([
                'status' => 'batal',
                'dibatalkan_oleh' => $dibatalkanOleh,
                'alasan_batal' => $alasan,
            ]);

            foreach ($transaksi->detailTransaksi as $detail) {
                $produk = Produk::find($detail->produk_id);
                $this->stokService->mutasiStok(
                    $produk,
                    'masuk',
                    $detail->qty,
                    $dibatalkanOleh,
                    $transaksi->id,
                    "Pembatalan {$transaksi->kode_transaksi}"
                );
            }

            // Rollback customer stats
            if ($transaksi->pelanggan_id) {
                $pelanggan = Pelanggan::find($transaksi->pelanggan_id);
                if ($pelanggan) {
                    $pelanggan->decrement('total_transaksi');
                    $pelanggan->decrement('total_pembelian', $transaksi->total);
                }
            }

            return $transaksi->fresh();
        });
    }

    private function getDateId(string $tanggal): int
    {
        return \App\Models\DateDimension::where('tanggal', $tanggal)->value('id')
            ?? throw new \RuntimeException("Date not found in date_dimension: {$tanggal}");
    }
}

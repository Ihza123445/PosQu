<?php

namespace App\Services;

use App\Models\Notifikasi;
use App\Models\Produk;
use App\Models\StokLog;
use Illuminate\Support\Facades\DB;

class StokService
{
    public function mutasiStok(
        Produk $produk,
        string $jenis,
        int $qty,
        int $penggunaId,
        ?int $transaksiId = null,
        ?string $keterangan = null
    ): StokLog {
        $qtyChange = in_array($jenis, ['masuk', 'retur']) ? abs($qty) : -abs($qty);

        return DB::transaction(function () use ($produk, $jenis, $qty, $qtyChange, $penggunaId, $transaksiId, $keterangan) {
            $stokSebelum = $produk->stok;
            $stokSesudah = max(0, $stokSebelum + $qtyChange);

            $log = StokLog::create([
                'produk_id' => $produk->id,
                'pengguna_id' => $penggunaId,
                'transaksi_id' => $transaksiId,
                'jenis' => $jenis,
                'qty' => $qtyChange,
                'stok_sebelum' => $stokSebelum,
                'stok_sesudah' => $stokSesudah,
                'keterangan' => $keterangan,
            ]);

            $produk->update(['stok' => $stokSesudah]);

            if ($stokSesudah <= $produk->min_stok) {
                $this->buatNotifikasiStok($produk);
            }

            if ($stokSesudah <= 0) {
                $produk->update(['status' => 'habis']);
            } elseif ($produk->status === 'habis' && $stokSesudah > 0) {
                $produk->update(['status' => 'aktif']);
            }

            return $log;
        });
    }

    public function adjustmentStok(Produk $produk, int $stokBaru, int $penggunaId, ?string $alasan = null): StokLog
    {
        $selisih = $stokBaru - $produk->stok;
        $jenis = $selisih >= 0 ? 'masuk' : 'keluar';

        return $this->mutasiStok(
            $produk,
            'adjustment',
            abs($selisih),
            $penggunaId,
            null,
            $alasan ?? "Adjustment stok: {$produk->stok} -> {$stokBaru}"
        );
    }

    private function buatNotifikasiStok(Produk $produk): void
    {
        $adminIds = \App\Models\User::whereHas('role', fn($q) => $q->where('nama', 'admin'))->pluck('id');

        foreach ($adminIds as $adminId) {
            Notifikasi::create([
                'pengguna_id' => $adminId,
                'outlet_id' => $produk->outlet_id,
                'tipe' => 'stok',
                'judul' => 'Stok Menipis',
                'pesan' => "Stok {$produk->nama} tersisa {$produk->stok} (min: {$produk->min_stok})",
                'url' => "/produk/{$produk->id}",
                'status_baca' => false,
            ]);
        }
    }
}

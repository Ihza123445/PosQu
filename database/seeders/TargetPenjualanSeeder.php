<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TargetPenjualanSeeder extends Seeder
{
    public function run(): void
    {
        $targets = [];
        $outlets = [1, 2];
        $now = now();

        foreach ($outlets as $outletId) {
            for ($i = 0; $i < 6; $i++) {
                $bulan = $now->copy()->subMonths($i)->month;
                $tahun = $now->copy()->subMonths($i)->year;

                // Different targets per outlet
                if ($outletId === 1) {
                    $targetOmzet = 15000000 + rand(0, 5) * 1000000;
                    $targetTrans = 300 + rand(0, 5) * 20;
                    $targetProduk = 450 + rand(0, 5) * 30;
                } else {
                    $targetOmzet = 10000000 + rand(0, 5) * 1000000;
                    $targetTrans = 200 + rand(0, 5) * 20;
                    $targetProduk = 300 + rand(0, 5) * 30;
                }

                // Realization: 70-110% of target
                $realPct = rand(70, 110) / 100;
                $realOmzet = $targetOmzet * $realPct;
                $realTrans = $targetTrans * $realPct;
                $realProduk = $targetProduk * $realPct;

                $targets[] = [
                    'outlet_id' => $outletId,
                    'bulan' => $bulan,
                    'tahun' => $tahun,
                    'target_omzet' => (int) $targetOmzet,
                    'target_qty_transaksi' => (int) $targetTrans,
                    'target_qty_produk' => (int) $targetProduk,
                    'realisasi_omzet' => (int) $realOmzet,
                    'realisasi_qty_transaksi' => (int) $realTrans,
                    'realisasi_qty_produk' => (int) $realProduk,
                ];
            }
        }

        DB::table('target_penjualan')->insert($targets);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StokLogSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('stok_log')->insert([
            // Outlet 1 — Stock IN (initial stock)
            ['produk_id' => 1, 'pengguna_id' => 2, 'transaksi_id' => null, 'jenis' => 'masuk', 'qty' => 50, 'stok_sebelum' => 0, 'stok_sesudah' => 50, 'keterangan' => 'Stok awal Nasi Goreng Spesial'],
            ['produk_id' => 2, 'pengguna_id' => 2, 'transaksi_id' => null, 'jenis' => 'masuk', 'qty' => 40, 'stok_sebelum' => 0, 'stok_sesudah' => 40, 'keterangan' => 'Stok awal Mie Goreng'],
            ['produk_id' => 3, 'pengguna_id' => 2, 'transaksi_id' => null, 'jenis' => 'masuk', 'qty' => 30, 'stok_sebelum' => 0, 'stok_sesudah' => 30, 'keterangan' => 'Stok awal Ayam Goreng Kremes'],
            ['produk_id' => 4, 'pengguna_id' => 2, 'transaksi_id' => null, 'jenis' => 'masuk', 'qty' => 60, 'stok_sebelum' => 0, 'stok_sesudah' => 60, 'keterangan' => 'Stok awal Sate Ayam'],
            ['produk_id' => 5, 'pengguna_id' => 2, 'transaksi_id' => null, 'jenis' => 'masuk', 'qty' => 100, 'stok_sebelum' => 0, 'stok_sesudah' => 100, 'keterangan' => 'Stok awal Es Teh Manis'],
            ['produk_id' => 6, 'pengguna_id' => 2, 'transaksi_id' => null, 'jenis' => 'masuk', 'qty' => 80, 'stok_sebelum' => 0, 'stok_sesudah' => 80, 'keterangan' => 'Stok awal Es Jeruk'],
            ['produk_id' => 7, 'pengguna_id' => 2, 'transaksi_id' => null, 'jenis' => 'masuk', 'qty' => 60, 'stok_sebelum' => 0, 'stok_sesudah' => 60, 'keterangan' => 'Stok awal Kopi Susu'],
            ['produk_id' => 8, 'pengguna_id' => 2, 'transaksi_id' => null, 'jenis' => 'masuk', 'qty' => 40, 'stok_sebelum' => 0, 'stok_sesudah' => 40, 'keterangan' => 'Stok awal Jus Alpukat'],
            ['produk_id' => 9, 'pengguna_id' => 2, 'transaksi_id' => null, 'jenis' => 'masuk', 'qty' => 50, 'stok_sebelum' => 0, 'stok_sesudah' => 50, 'keterangan' => 'Stok awal Pisang Goreng'],
            ['produk_id' => 10, 'pengguna_id' => 2, 'transaksi_id' => null, 'jenis' => 'masuk', 'qty' => 45, 'stok_sebelum' => 0, 'stok_sesudah' => 45, 'keterangan' => 'Stok awal Kentang Goreng'],

            // Outlet 1 — Stock adjustments
            ['produk_id' => 1, 'pengguna_id' => 2, 'transaksi_id' => null, 'jenis' => 'adjustment', 'qty' => 5, 'stok_sebelum' => 50, 'stok_sesudah' => 45, 'keterangan' => 'Adjustment stok (penyusutan masak)'],
            ['produk_id' => 5, 'pengguna_id' => 3, 'transaksi_id' => null, 'jenis' => 'adjustment', 'qty' => -3, 'stok_sebelum' => 100, 'stok_sesudah' => 103, 'keterangan' => 'Adjustment stok (lebih saat stock opname)'],

            // Outlet 1 — Stock IN (restock)
            ['produk_id' => 1, 'pengguna_id' => 2, 'transaksi_id' => null, 'jenis' => 'masuk', 'qty' => 25, 'stok_sebelum' => 45, 'stok_sesudah' => 70, 'keterangan' => 'Restock Nasi Goreng Spesial'],
            ['produk_id' => 5, 'pengguna_id' => 2, 'transaksi_id' => null, 'jenis' => 'masuk', 'qty' => 50, 'stok_sebelum' => 103, 'stok_sesudah' => 153, 'keterangan' => 'Restock Es Teh Manis mingguan'],
            ['produk_id' => 7, 'pengguna_id' => 2, 'transaksi_id' => null, 'jenis' => 'masuk', 'qty' => 30, 'stok_sebelum' => 60, 'stok_sesudah' => 90, 'keterangan' => 'Restock Kopi Susu'],

            // Outlet 2 — Stock IN (initial)
            ['produk_id' => 13, 'pengguna_id' => 4, 'transaksi_id' => null, 'jenis' => 'masuk', 'qty' => 40, 'stok_sebelum' => 0, 'stok_sesudah' => 40, 'keterangan' => 'Stok awal Nasi Goreng Spesial'],
            ['produk_id' => 14, 'pengguna_id' => 4, 'transaksi_id' => null, 'jenis' => 'masuk', 'qty' => 35, 'stok_sebelum' => 0, 'stok_sesudah' => 35, 'keterangan' => 'Stok awal Mie Goreng'],
            ['produk_id' => 15, 'pengguna_id' => 4, 'transaksi_id' => null, 'jenis' => 'masuk', 'qty' => 40, 'stok_sebelum' => 0, 'stok_sesudah' => 40, 'keterangan' => 'Stok awal Bakso Malang'],
            ['produk_id' => 16, 'pengguna_id' => 4, 'transaksi_id' => null, 'jenis' => 'masuk', 'qty' => 80, 'stok_sebelum' => 0, 'stok_sesudah' => 80, 'keterangan' => 'Stok awal Es Teh Manis'],
            ['produk_id' => 17, 'pengguna_id' => 4, 'transaksi_id' => null, 'jenis' => 'masuk', 'qty' => 60, 'stok_sebelum' => 0, 'stok_sesudah' => 60, 'keterangan' => 'Stok awal Kopi Hitam'],

            // Outlet 2 — adjustment
            ['produk_id' => 15, 'pengguna_id' => 4, 'transaksi_id' => null, 'jenis' => 'adjustment', 'qty' => -2, 'stok_sebelum' => 40, 'stok_sesudah' => 42, 'keterangan' => 'Stock opname — kelebihan 2 porsi'],
            ['produk_id' => 16, 'pengguna_id' => 4, 'transaksi_id' => null, 'jenis' => 'masuk', 'qty' => 40, 'stok_sebelum' => 80, 'stok_sesudah' => 120, 'keterangan' => 'Restock Es Teh Manis'],
        ]);
    }
}

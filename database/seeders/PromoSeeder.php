<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PromoSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('promo')->insert([
            [
                'outlet_id' => 1,
                'nama' => 'Diskon Akhir Pekan',
                'kode' => 'WEEKEND25',
                'tipe' => 'persen',
                'nilai' => 25,
                'max_diskon' => 25000,
                'min_transaksi' => 50000,
                'kuota' => 100,
                'terpakai' => 45,
                'tgl_mulai' => '2026-05-01',
                'tgl_selesai' => '2026-06-30',
                'status' => 'aktif',
            ],
            [
                'outlet_id' => 1,
                'nama' => 'Promo Nasi Goreng Spesial',
                'kode' => 'NASGOR35',
                'tipe' => 'persen',
                'nilai' => 35,
                'max_diskon' => 15000,
                'min_transaksi' => 30000,
                'kuota' => 50,
                'terpakai' => 22,
                'tgl_mulai' => '2026-05-15',
                'tgl_selesai' => '2026-06-15',
                'status' => 'aktif',
            ],
            [
                'outlet_id' => 1,
                'nama' => 'Paket Hemat 50rb+',
                'kode' => 'HEMAT50',
                'tipe' => 'nominal',
                'nilai' => 10000,
                'max_diskon' => null,
                'min_transaksi' => 50000,
                'kuota' => 200,
                'terpakai' => 88,
                'tgl_mulai' => '2026-04-01',
                'tgl_selesai' => '2026-07-31',
                'status' => 'aktif',
            ],
            [
                'outlet_id' => 2,
                'nama' => 'Diskon Kopi Sore',
                'kode' => 'KOPISORE',
                'tipe' => 'persen',
                'nilai' => 20,
                'max_diskon' => 8000,
                'min_transaksi' => 15000,
                'kuota' => 150,
                'terpakai' => 67,
                'tgl_mulai' => '2026-05-01',
                'tgl_selesai' => '2026-08-31',
                'status' => 'aktif',
            ],
            [
                'outlet_id' => 2,
                'nama' => 'Beli 2 Gratis 1',
                'kode' => 'B2G1',
                'tipe' => 'nominal',
                'nilai' => 15000,
                'max_diskon' => null,
                'min_transaksi' => 45000,
                'kuota' => 80,
                'terpakai' => 12,
                'tgl_mulai' => '2026-06-01',
                'tgl_selesai' => '2026-07-15',
                'status' => 'aktif',
            ],
            [
                'outlet_id' => null,
                'nama' => 'Promo Pelanggan Baru',
                'kode' => 'NEW50',
                'tipe' => 'nominal',
                'nilai' => 5000,
                'max_diskon' => null,
                'min_transaksi' => 20000,
                'kuota' => 300,
                'terpakai' => 134,
                'tgl_mulai' => '2026-01-01',
                'tgl_selesai' => '2026-12-31',
                'status' => 'aktif',
            ],
            [
                'outlet_id' => 1,
                'nama' => 'Diskon Spesial HUT RI',
                'kode' => 'DIRGA77',
                'tipe' => 'persen',
                'nilai' => 77,
                'max_diskon' => 50000,
                'min_transaksi' => 100000,
                'kuota' => 30,
                'terpakai' => 0,
                'tgl_mulai' => '2026-08-15',
                'tgl_selesai' => '2026-08-20',
                'status' => 'aktif',
            ],
        ]);
    }
}

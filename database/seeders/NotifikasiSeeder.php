<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NotifikasiSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('notifikasi')->insert([
            [
                'pengguna_id' => 2,
                'outlet_id' => 1,
                'tipe' => 'stok',
                'judul' => 'Stok Menipis',
                'pesan' => 'Stok Ayam Goreng Kremes tersisa 3 porsi. Segera lakukan restock!',
                'url' => '/produk/3/edit',
                'status_baca' => false,
            ],
            [
                'pengguna_id' => 2,
                'outlet_id' => 1,
                'tipe' => 'stok',
                'judul' => 'Stok Menipis',
                'pesan' => 'Stok Jus Alpukat tersisa 5 gelas. Segera lakukan restock!',
                'url' => '/produk/8/edit',
                'status_baca' => false,
            ],
            [
                'pengguna_id' => 2,
                'outlet_id' => 1,
                'tipe' => 'stok',
                'judul' => 'Stok Habis',
                'pesan' => 'Stok Kentang Goreng sudah habis (0). Update status produk jika perlu.',
                'url' => '/produk/10/edit',
                'status_baca' => false,
            ],
            [
                'pengguna_id' => 4,
                'outlet_id' => 2,
                'tipe' => 'stok',
                'judul' => 'Stok Menipis',
                'pesan' => 'Stok Mie Goreng tersisa 8 porsi. Segera restock!',
                'url' => '/produk/14/edit',
                'status_baca' => true,
            ],
            [
                'pengguna_id' => 2,
                'outlet_id' => 1,
                'tipe' => 'promo',
                'judul' => 'Promo Akan Berakhir',
                'pesan' => 'Promo "Nasgor35" akan berakhir dalam 3 hari. Perpanjang jika perlu.',
                'url' => '/promo/2/edit',
                'status_baca' => false,
            ],
            [
                'pengguna_id' => 1,
                'outlet_id' => null,
                'tipe' => 'sistem',
                'judul' => 'Update Sistem Tersedia',
                'pesan' => 'Versi baru Kelola UMKM v2.1.0 tersedia. Fitur baru: laporan laba rugi otomatis.',
                'url' => null,
                'status_baca' => false,
            ],
            [
                'pengguna_id' => 2,
                'outlet_id' => 1,
                'tipe' => 'target',
                'judul' => 'Capaian Target Bulan Ini',
                'pesan' => 'Target omzet bulan Mei sudah mencapai 78%. Semangat! Tingkatkan penjualan.',
                'url' => '/target',
                'status_baca' => false,
            ],
            [
                'pengguna_id' => 3,
                'outlet_id' => 1,
                'tipe' => 'sistem',
                'judul' => 'Jadwal Shift',
                'pesan' => 'Ingat! Shift kamu hari Sabtu ini mulai jam 10:00 - 18:00 WIB.',
                'url' => null,
                'status_baca' => true,
            ],
            [
                'pengguna_id' => 4,
                'outlet_id' => 2,
                'tipe' => 'stok',
                'judul' => 'Stok Menipis',
                'pesan' => 'Stok Kopi Hitam tersisa 6 porsi. Segera restock!',
                'url' => '/produk/17/edit',
                'status_baca' => false,
            ],
            [
                'pengguna_id' => 2,
                'outlet_id' => 1,
                'tipe' => 'target',
                'judul' => 'Selamat! Target Tercapai',
                'pesan' => 'Outlet Cabang Pusat berhasil mencapai 110% target penjualan bulan April!',
                'url' => '/target',
                'status_baca' => true,
            ],
        ]);
    }
}

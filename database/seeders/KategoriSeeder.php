<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KategoriSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('kategori')->insert([
            [
                'nama' => 'Makanan', 'deskripsi' => 'Menu makanan utama',
                'gambar' => 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=200&fit=crop',
                'icon' => 'tools-kitchen-2', 'warna' => '#FF6B6B', 'urutan' => 1, 'status' => 'aktif',
            ],
            [
                'nama' => 'Minuman', 'deskripsi' => 'Minuman segar & hangat',
                'gambar' => 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=200&fit=crop',
                'icon' => 'glass', 'warna' => '#4ECDC4', 'urutan' => 2, 'status' => 'aktif',
            ],
            [
                'nama' => 'Snack', 'deskripsi' => 'Camilan ringan',
                'gambar' => 'https://images.unsplash.com/photo-1598373182133-52452f1f9874?w=400&h=200&fit=crop',
                'icon' => 'cookie', 'warna' => '#FFE66D', 'urutan' => 3, 'status' => 'aktif',
            ],
            [
                'nama' => 'Paket', 'deskripsi' => 'Paket hemat & promo',
                'gambar' => 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=200&fit=crop',
                'icon' => 'gift', 'warna' => '#A78BFA', 'urutan' => 4, 'status' => 'aktif',
            ],
            [
                'nama' => 'Lainnya', 'deskripsi' => 'Produk non-makanan',
                'gambar' => 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=200&fit=crop',
                'icon' => 'dots', 'warna' => '#94A3B8', 'urutan' => 5, 'status' => 'aktif',
            ],
        ]);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProdukSeeder extends Seeder
{
    public function run(): void
    {
        $produk = [
            // Outlet 1 - Makanan
            ['kategori_id' => 1, 'outlet_id' => 1, 'nama' => 'Nasi Goreng Spesial', 'harga_jual' => 25000, 'harga_modal' => 12000, 'stok' => 50, 'min_stok' => 10, 'satuan' => 'porsi', 'is_favorit' => true, 'gambar' => 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=400&fit=crop'],
            ['kategori_id' => 1, 'outlet_id' => 1, 'nama' => 'Mie Goreng', 'harga_jual' => 20000, 'harga_modal' => 9000, 'stok' => 40, 'min_stok' => 10, 'satuan' => 'porsi', 'is_favorit' => false, 'gambar' => 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop'],
            ['kategori_id' => 1, 'outlet_id' => 1, 'nama' => 'Ayam Goreng Kremes', 'harga_jual' => 30000, 'harga_modal' => 15000, 'stok' => 30, 'min_stok' => 5, 'satuan' => 'porsi', 'is_favorit' => true, 'gambar' => 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=400&fit=crop'],
            ['kategori_id' => 1, 'outlet_id' => 1, 'nama' => 'Sate Ayam (10 tusuk)', 'harga_jual' => 35000, 'harga_modal' => 18000, 'stok' => 20, 'min_stok' => 5, 'satuan' => 'porsi', 'is_favorit' => false, 'gambar' => 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=400&fit=crop'],
            // Outlet 1 - Minuman
            ['kategori_id' => 2, 'outlet_id' => 1, 'nama' => 'Es Teh Manis', 'harga_jual' => 5000, 'harga_modal' => 1500, 'stok' => 100, 'min_stok' => 20, 'satuan' => 'gelas', 'is_favorit' => false, 'gambar' => 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop'],
            ['kategori_id' => 2, 'outlet_id' => 1, 'nama' => 'Es Jeruk', 'harga_jual' => 7000, 'harga_modal' => 2000, 'stok' => 80, 'min_stok' => 20, 'satuan' => 'gelas', 'is_favorit' => false, 'gambar' => 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=400&fit=crop'],
            ['kategori_id' => 2, 'outlet_id' => 1, 'nama' => 'Kopi Susu', 'harga_jual' => 15000, 'harga_modal' => 5000, 'stok' => 60, 'min_stok' => 15, 'satuan' => 'cangkir', 'is_favorit' => true, 'gambar' => 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop'],
            ['kategori_id' => 2, 'outlet_id' => 1, 'nama' => 'Jus Alpukat', 'harga_jual' => 12000, 'harga_modal' => 4000, 'stok' => 40, 'min_stok' => 10, 'satuan' => 'gelas', 'is_favorit' => false, 'gambar' => 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&h=400&fit=crop'],
            // Outlet 1 - Snack
            ['kategori_id' => 3, 'outlet_id' => 1, 'nama' => 'Pisang Goreng (10 pcs)', 'harga_jual' => 15000, 'harga_modal' => 6000, 'stok' => 30, 'min_stok' => 10, 'satuan' => 'porsi', 'is_favorit' => false, 'gambar' => 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=400&fit=crop'],
            ['kategori_id' => 3, 'outlet_id' => 1, 'nama' => 'Kentang Goreng', 'harga_jual' => 12000, 'harga_modal' => 5000, 'stok' => 25, 'min_stok' => 10, 'satuan' => 'porsi', 'is_favorit' => false, 'gambar' => 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=400&fit=crop'],
            // Outlet 1 - Paket
            ['kategori_id' => 4, 'outlet_id' => 1, 'nama' => 'Paket Nasi Goreng + Es Teh', 'harga_jual' => 28000, 'harga_modal' => 13000, 'stok' => 20, 'min_stok' => 5, 'satuan' => 'paket', 'is_favorit' => true, 'gambar' => 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=400&fit=crop'],
            ['kategori_id' => 4, 'outlet_id' => 1, 'nama' => 'Paket Ayam + Nasi + Es Teh', 'harga_jual' => 35000, 'harga_modal' => 16000, 'stok' => 15, 'min_stok' => 5, 'satuan' => 'paket', 'is_favorit' => true, 'gambar' => 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=400&fit=crop'],
            // Outlet 2 - Makanan
            ['kategori_id' => 1, 'outlet_id' => 2, 'nama' => 'Nasi Goreng Spesial', 'harga_jual' => 27000, 'harga_modal' => 12000, 'stok' => 30, 'min_stok' => 10, 'satuan' => 'porsi', 'is_favorit' => true, 'gambar' => 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=400&fit=crop'],
            ['kategori_id' => 1, 'outlet_id' => 2, 'nama' => 'Mie Goreng', 'harga_jual' => 22000, 'harga_modal' => 9000, 'stok' => 25, 'min_stok' => 10, 'satuan' => 'porsi', 'is_favorit' => false, 'gambar' => 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop'],
            ['kategori_id' => 1, 'outlet_id' => 2, 'nama' => 'Bakso Malang', 'harga_jual' => 25000, 'harga_modal' => 11000, 'stok' => 20, 'min_stok' => 5, 'satuan' => 'porsi', 'is_favorit' => false, 'gambar' => 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&h=400&fit=crop'],
            // Outlet 2 - Minuman
            ['kategori_id' => 2, 'outlet_id' => 2, 'nama' => 'Es Teh Manis', 'harga_jual' => 5000, 'harga_modal' => 1500, 'stok' => 80, 'min_stok' => 20, 'satuan' => 'gelas', 'is_favorit' => false, 'gambar' => 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop'],
            ['kategori_id' => 2, 'outlet_id' => 2, 'nama' => 'Kopi Hitam', 'harga_jual' => 10000, 'harga_modal' => 3000, 'stok' => 50, 'min_stok' => 15, 'satuan' => 'cangkir', 'is_favorit' => false, 'gambar' => 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop'],
        ];

        foreach ($produk as &$p) {
            $p['created_at'] = now();
            $p['updated_at'] = now();
            $p['deskripsi'] = $p['nama'] . ' berkualitas tinggi';
            $p['status'] = 'aktif';
        }

        DB::table('produk')->insert($produk);
    }
}

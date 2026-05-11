<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PengeluaranSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('pengeluaran')->insert([
            [
                'outlet_id' => 1,
                'pengguna_id' => 2,
                'kategori' => 'Bahan Baku',
                'jumlah' => 750000,
                'keterangan' => 'Pembelian beras 50 kg, minyak goreng 10 liter, bumbu dapur',
                'bukti' => null,
                'tanggal' => '2026-05-02',
            ],
            [
                'outlet_id' => 1,
                'pengguna_id' => 2,
                'kategori' => 'Bahan Baku',
                'jumlah' => 450000,
                'keterangan' => 'Ayam potong 20 kg, telur 5 kg, sayuran segar',
                'bukti' => null,
                'tanggal' => '2026-05-04',
            ],
            [
                'outlet_id' => 1,
                'pengguna_id' => 3,
                'kategori' => 'Kebersihan',
                'jumlah' => 85000,
                'keterangan' => 'Sabun cuci piring, lap, pembersih lantai, tisu dapur',
                'bukti' => null,
                'tanggal' => '2026-05-05',
            ],
            [
                'outlet_id' => 1,
                'pengguna_id' => 2,
                'kategori' => 'Listrik & Air',
                'jumlah' => 525000,
                'keterangan' => 'Pembayaran tagihan listrik bulan April',
                'bukti' => null,
                'tanggal' => '2026-05-07',
            ],
            [
                'outlet_id' => 1,
                'pengguna_id' => 2,
                'kategori' => 'Sewa',
                'jumlah' => 3000000,
                'keterangan' => 'Sewa tempat usaha bulan Mei 2026',
                'bukti' => null,
                'tanggal' => '2026-05-01',
            ],
            [
                'outlet_id' => 2,
                'pengguna_id' => 4,
                'kategori' => 'Bahan Baku',
                'jumlah' => 600000,
                'keterangan' => 'Kopi bubuk 5 kg, gula pasir 10 kg, susu UHT 12 liter',
                'bukti' => null,
                'tanggal' => '2026-05-03',
            ],
            [
                'outlet_id' => 2,
                'pengguna_id' => 4,
                'kategori' => 'Bahan Baku',
                'jumlah' => 350000,
                'keterangan' => 'Mie telur 20 kg, bakso 10 kg, pangsit, seledri',
                'bukti' => null,
                'tanggal' => '2026-05-06',
            ],
            [
                'outlet_id' => 2,
                'pengguna_id' => 4,
                'kategori' => 'Listrik & Air',
                'jumlah' => 380000,
                'keterangan' => 'Tagihan listrik dan air bulan April',
                'bukti' => null,
                'tanggal' => '2026-05-08',
            ],
            [
                'outlet_id' => 1,
                'pengguna_id' => 2,
                'kategori' => 'Gaji Karyawan',
                'jumlah' => 4500000,
                'keterangan' => 'Gaji 3 karyawan bulan Mei (Rp1.500.000/orang)',
                'bukti' => null,
                'tanggal' => '2026-05-10',
            ],
            [
                'outlet_id' => 2,
                'pengguna_id' => 4,
                'kategori' => 'Gaji Karyawan',
                'jumlah' => 3000000,
                'keterangan' => 'Gaji 2 karyawan bulan Mei (Rp1.500.000/orang)',
                'bukti' => null,
                'tanggal' => '2026-05-10',
            ],
            [
                'outlet_id' => 1,
                'pengguna_id' => 3,
                'kategori' => 'Transportasi',
                'jumlah' => 150000,
                'keterangan' => 'Ongkos kirim bahan baku dari Pasar Induk',
                'bukti' => null,
                'tanggal' => '2026-05-05',
            ],
            [
                'outlet_id' => 1,
                'pengguna_id' => 2,
                'kategori' => 'Perbaikan',
                'jumlah' => 200000,
                'keterangan' => 'Service kompor gas dan ganti regulator',
                'bukti' => null,
                'tanggal' => '2026-05-09',
            ],
            [
                'outlet_id' => 2,
                'pengguna_id' => 4,
                'kategori' => 'Promosi',
                'jumlah' => 50000,
                'keterangan' => 'Cetak banner menu dan sticker',
                'bukti' => null,
                'tanggal' => '2026-05-02',
            ],
            [
                'outlet_id' => 1,
                'pengguna_id' => 2,
                'kategori' => 'Kemasan',
                'jumlah' => 120000,
                'keterangan' => 'Beli kotak makanan 50 pcs, gelas plastik 100 pcs, sedotan',
                'bukti' => null,
                'tanggal' => '2026-05-06',
            ],
            [
                'outlet_id' => 2,
                'pengguna_id' => 4,
                'kategori' => 'Kemasan',
                'jumlah' => 75000,
                'keterangan' => 'Beli cup + tutup kopi 50 set',
                'bukti' => null,
                'tanggal' => '2026-05-04',
            ],
        ]);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MetodePembayaranSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('metode_pembayaran')->insert([
            ['nama' => 'Tunai', 'kode' => 'CASH', 'icon' => 'cash', 'status' => 'aktif'],
            ['nama' => 'QRIS', 'kode' => 'QRIS', 'icon' => 'qr-code', 'status' => 'aktif'],
            ['nama' => 'Transfer Bank', 'kode' => 'TRF', 'icon' => 'transfer', 'status' => 'aktif'],
            ['nama' => 'Kartu Debit', 'kode' => 'DEBIT', 'icon' => 'credit-card', 'status' => 'aktif'],
            ['nama' => 'Kartu Kredit', 'kode' => 'KREDIT', 'icon' => 'credit-card', 'status' => 'aktif'],
        ]);
    }
}

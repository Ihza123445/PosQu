<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('role')->insert([
            ['nama' => 'admin', 'deskripsi' => 'Pemilik usaha / manajer, akses penuh ke semua fitur'],
            ['nama' => 'user', 'deskripsi' => 'Kasir / staf, akses terbatas ke transaksi harian'],
        ]);
    }
}

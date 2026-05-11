<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OutletSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('outlet')->insert([
            [
                'nama' => 'Cabang Pusat',
                'alamat' => 'Jl. Merdeka No. 1',
                'kota' => 'Jakarta',
                'provinsi' => 'DKI Jakarta',
                'telepon' => '021-12345678',
                'jam_buka' => '08:00',
                'jam_tutup' => '22:00',
                'status' => 'aktif',
            ],
            [
                'nama' => 'Cabang Sudirman',
                'alamat' => 'Jl. Sudirman No. 45',
                'kota' => 'Jakarta',
                'provinsi' => 'DKI Jakarta',
                'telepon' => '021-87654321',
                'jam_buka' => '09:00',
                'jam_tutup' => '21:00',
                'status' => 'aktif',
            ],
        ]);
    }
}

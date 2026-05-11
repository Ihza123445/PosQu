<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            OutletSeeder::class,
            UserSeeder::class,
            KategoriSeeder::class,
            MetodePembayaranSeeder::class,
            ProdukSeeder::class,
            PelangganSeeder::class,
            StokLogSeeder::class,
            PromoSeeder::class,
            PengeluaranSeeder::class,
            TargetPenjualanSeeder::class,
            NotifikasiSeeder::class,
            JurnalSeeder::class,
            DateDimensionSeeder::class,
        ]);
    }
}

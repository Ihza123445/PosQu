<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JurnalSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('jurnal')->insert([
            [
                'outlet_id' => 1,
                'pengguna_id' => 2,
                'tipe' => 'jurnal_umum',
                'nomor_jurnal' => 'JR-20260501-001',
                'tanggal' => '2026-05-01',
                'deskripsi' => 'Penyesuaian persediaan awal bulan',
                'debet' => 5000000,
                'kredit' => 5000000,
                'keterangan' => 'Penyesuaian stok awal untuk semua produk',
                'created_at' => '2026-05-01 08:00:00',
                'updated_at' => '2026-05-01 08:00:00',
            ],
            [
                'outlet_id' => 2,
                'pengguna_id' => 4,
                'tipe' => 'jurnal_umum',
                'nomor_jurnal' => 'JR-20260501-002',
                'tanggal' => '2026-05-01',
                'deskripsi' => 'Modal awal outlet Cabang Sudirman',
                'debet' => 3000000,
                'kredit' => 3000000,
                'keterangan' => 'Setoran modal awal untuk operasional',
                'created_at' => '2026-05-01 08:30:00',
                'updated_at' => '2026-05-01 08:30:00',
            ],
            [
                'outlet_id' => 1,
                'pengguna_id' => 2,
                'tipe' => 'penyesuaian',
                'nomor_jurnal' => 'JR-20260510-001',
                'tanggal' => '2026-05-10',
                'deskripsi' => 'Penyesuaian penyusutan peralatan dapur',
                'debet' => 200000,
                'kredit' => 200000,
                'keterangan' => 'Penyusutan kompor, wajan, dan peralatan dapur lainnya',
                'created_at' => '2026-05-10 10:00:00',
                'updated_at' => '2026-05-10 10:00:00',
            ],
            [
                'outlet_id' => null,
                'pengguna_id' => 1,
                'tipe' => 'jurnal_umum',
                'nomor_jurnal' => 'JR-20260511-001',
                'tanggal' => '2026-05-11',
                'deskripsi' => 'Transfer antar outlet untuk stok',
                'debet' => 1500000,
                'kredit' => 1500000,
                'keterangan' => 'Transfer barang dari Pusat ke Cabang Sudirman',
                'created_at' => '2026-05-11 07:00:00',
                'updated_at' => '2026-05-11 07:00:00',
            ],
        ]);
    }
}

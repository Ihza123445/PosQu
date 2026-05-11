<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DateDimensionSeeder extends Seeder
{
    public function run(): void
    {
        $dates = [];
        $start = new \DateTime('2020-01-01');
        $end = new \DateTime('2030-12-31');
        $interval = new \DateInterval('P1D');
        $period = new \DatePeriod($start, $interval, $end);

        $bulan = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        $hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

        $libur = $this->getHariLibur();

        foreach ($period as $date) {
            $tgl = $date->format('Y-m-d');
            $dayOfWeek = (int) $date->format('w');
            $month = (int) $date->format('n');
            $year = (int) $date->format('Y');

            $dates[] = [
                'tanggal' => $tgl,
                'hari' => (int) $date->format('j'),
                'bulan' => $month,
                'tahun' => $year,
                'kuartal' => (int) ceil($month / 3),
                'nama_hari' => $hari[$dayOfWeek],
                'nama_bulan' => $bulan[$month],
                'minggu_ke' => (int) $date->format('W'),
                'is_weekend' => ($dayOfWeek === 0 || $dayOfWeek === 6) ? 1 : 0,
                'is_holiday' => isset($libur[$tgl]) ? 1 : 0,
                'keterangan_libur' => $libur[$tgl] ?? null,
            ];

            // Insert in batches of 500 to avoid memory issues
            if (count($dates) >= 500) {
                DB::table('date_dimension')->insert($dates);
                $dates = [];
            }
        }

        if (!empty($dates)) {
            DB::table('date_dimension')->insert($dates);
        }
    }

    private function getHariLibur(): array
    {
        // Format: 'YYYY-MM-DD' => 'Nama Hari Libur'
        return [
            '2026-01-01' => 'Tahun Baru Masehi',
            '2026-03-29' => 'Hari Raya Nyepi',
            '2026-03-31' => 'Hari Raya Idul Fitri',
            '2026-04-01' => 'Hari Raya Idul Fitri',
            '2026-04-10' => 'Wafat Isa Almasih',
            '2026-05-01' => 'Hari Buruh Internasional',
            '2026-05-21' => 'Kenaikan Isa Almasih',
            '2026-06-01' => 'Hari Lahir Pancasila',
            '2026-08-17' => 'Hari Kemerdekaan RI',
            '2026-12-25' => 'Hari Raya Natal',
        ];
    }
}

<?php

namespace App\Http\Controllers;

use App\Services\LaporanService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LaporanController extends Controller
{
    public function __construct(private LaporanService $laporanService) {}

    public function penjualan(Request $request)
    {
        $dari = $request->dari ?? Carbon::now()->startOfMonth()->toDateString();
        $sampai = $request->sampai ?? Carbon::now()->toDateString();

        $user = auth()->user();
        $outletId = $user->outlet_id;

        $data = $this->laporanService->laporanPenjualan($dari, $sampai, $outletId);
        $trend = $this->laporanService->trendPerHari($dari, $sampai, $outletId);

        return Inertia::render('Laporan/Penjualan', [
            'data' => $data,
            'trendHarian' => $trend,
            'dari' => $dari,
            'sampai' => $sampai,
        ]);
    }

    public function labaRugi(Request $request)
    {
        $dari = $request->dari ?? Carbon::now()->startOfMonth()->toDateString();
        $sampai = $request->sampai ?? Carbon::now()->toDateString();

        $user = auth()->user();
        $outletId = $user->outlet_id;

        $data = $this->laporanService->labaRugi($dari, $sampai, $outletId);

        return Inertia::render('Laporan/LabaRugi', [
            'data' => $data,
            'dari' => $dari,
            'sampai' => $sampai,
        ]);
    }

    public function produk(Request $request)
    {
        $dari = $request->dari ?? Carbon::now()->startOfMonth()->toDateString();
        $sampai = $request->sampai ?? Carbon::now()->toDateString();

        $user = auth()->user();
        $outletId = $user->outlet_id;

        $data = $this->laporanService->laporanPerProduk($dari, $sampai, $outletId);

        return Inertia::render('Laporan/Produk', [
            'data' => $data,
            'dari' => $dari,
            'sampai' => $sampai,
        ]);
    }

    public function trend(Request $request)
    {
        $tahun = $request->tahun ?? Carbon::now()->year;

        $user = auth()->user();
        $outletId = $user->outlet_id;

        $data = $this->laporanService->trendPerBulan($tahun, $outletId);

        return Inertia::render('Laporan/Trend', [
            'data' => $data,
            'tahun' => $tahun,
        ]);
    }

    public function bukuBesar(Request $request)
    {
        $dari = $request->dari ?? Carbon::now()->startOfMonth()->toDateString();
        $sampai = $request->sampai ?? Carbon::now()->toDateString();

        $user = auth()->user();
        $outletId = $user->outlet_id;

        $data = $this->laporanService->bukuBesar($dari, $sampai, $outletId);

        return Inertia::render('Laporan/BukuBesar', [
            'data' => $data,
            'dari' => $dari,
            'sampai' => $sampai,
        ]);
    }

    public function neraca(Request $request)
    {
        $user = auth()->user();
        $outletId = $user->outlet_id;

        $data = $this->laporanService->neraca($outletId);

        return Inertia::render('Laporan/Neraca', [
            'data' => $data,
        ]);
    }
}

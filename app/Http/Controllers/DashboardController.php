<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(private DashboardService $dashboardService) {}

    public function index()
    {
        $user = auth()->user();
        $outletId = $user->outlet_id;
        $isSuperAdmin = $user->role_id === 1 && !$outletId;

        return Inertia::render('Dashboard', [
            'ringkasan' => $this->dashboardService->ringkasanHariIni($isSuperAdmin ? null : $outletId),
            'produk_terlaris' => $this->dashboardService->produkTerlaris(5, $isSuperAdmin ? null : $outletId),
            'stok_menipis' => $this->dashboardService->stokMenipis($isSuperAdmin ? null : $outletId),
            'notifikasi' => $this->dashboardService->notifikasiBelumDibaca($user->id),
            'trend' => $this->dashboardService->trendPenjualan(7, $isSuperAdmin ? null : $outletId),
        ]);
    }
}

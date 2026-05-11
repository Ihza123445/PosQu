<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use App\Models\StokLog;
use App\Services\LogAktivitasService;
use App\Services\StokService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StokController extends Controller
{
    public function __construct(
        private StokService $stokService,
        private LogAktivitasService $logAktivitas,
    ) {}

    public function index(Request $request)
    {
        $query = StokLog::with(['produk', 'pengguna']);

        if ($request->produk_id) {
            $query->where('produk_id', $request->produk_id);
        }
        if ($request->jenis) {
            $query->where('jenis', $request->jenis);
        }

        $user = auth()->user();
        if ($user->outlet_id) {
            $query->whereHas('produk', fn($q) => $q->where('outlet_id', $user->outlet_id));
        }

        return Inertia::render('Stok/Log', [
            'stokLog' => $query->orderByDesc('created_at')->paginate(15)->withQueryString(),
            'filters' => $request->only(['produk_id', 'jenis']),
        ]);
    }

    public function adjustment()
    {
        $user = auth()->user();
        $outletId = $user->outlet_id ?? 1;

        return Inertia::render('Stok/Adjustment', [
            'produk' => Produk::where('outlet_id', $outletId)
                ->whereIn('status', ['aktif', 'habis'])
                ->orderBy('nama')
                ->get(),
        ]);
    }

    public function storeAdjustment(Request $request)
    {
        $validated = $request->validate([
            'produk_id' => 'required|exists:produk,id',
            'stok_baru' => 'required|integer|min:0',
            'alasan' => 'nullable|string|max:255',
        ]);

        $produk = Produk::findOrFail($validated['produk_id']);
        $user = auth()->user();

        $this->stokService->adjustmentStok(
            $produk,
            $validated['stok_baru'],
            $user->id,
            $validated['alasan'] ?? null
        );

        $this->logAktivitas->catat($user->id, 'ADJUSTMENT_STOK', 'produk', $produk->id, [
            'stok_lama' => $produk->stok,
            'stok_baru' => $validated['stok_baru'],
        ], $user->outlet_id);

        return redirect()->route('stok.log')->with('success', 'Stok berhasil disesuaikan.');
    }
}

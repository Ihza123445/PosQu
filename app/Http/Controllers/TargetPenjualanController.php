<?php

namespace App\Http\Controllers;

use App\Models\TargetPenjualan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TargetPenjualanController extends Controller
{
    public function index(Request $request)
    {
        $tahun = $request->tahun ?? now()->year;

        $query = TargetPenjualan::with('outlet');

        $user = auth()->user();
        if ($user->outlet_id) {
            $query->where('outlet_id', $user->outlet_id);
        }

        return Inertia::render('Target/Index', [
            'target' => $query->where('tahun', $tahun)->orderBy('bulan')->get(),
            'tahun' => $tahun,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'outlet_id' => 'required|exists:outlet,id',
            'bulan' => 'required|integer|min:1|max:12',
            'tahun' => 'required|integer|min:2020|max:2030',
            'target_omzet' => 'required|numeric|min:0',
            'target_qty_transaksi' => 'nullable|integer|min:0',
            'target_qty_produk' => 'nullable|integer|min:0',
        ]);

        TargetPenjualan::updateOrCreate(
            ['outlet_id' => $validated['outlet_id'], 'bulan' => $validated['bulan'], 'tahun' => $validated['tahun']],
            $validated
        );

        return redirect()->route('target.index')->with('success', 'Target penjualan berhasil disimpan.');
    }
}

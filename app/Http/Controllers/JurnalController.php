<?php

namespace App\Http\Controllers;

use App\Models\Jurnal;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JurnalController extends Controller
{
    public function index(Request $request)
    {
        $query = Jurnal::with('pengguna:id,nama', 'outlet:id,nama');

        if ($request->dari) {
            $query->whereDate('tanggal', '>=', $request->dari);
        }
        if ($request->sampai) {
            $query->whereDate('tanggal', '<=', $request->sampai);
        }

        $user = auth()->user();
        if ($user->outlet_id) {
            $query->where('outlet_id', $user->outlet_id);
        }

        return Inertia::render('Jurnal/Index', [
            'jurnal' => $query->orderByDesc('tanggal')->orderByDesc('id')->paginate(20)->withQueryString(),
            'filters' => $request->only(['dari', 'sampai']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Jurnal/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tanggal' => 'required|date',
            'deskripsi' => 'required|string|max:255',
            'debet' => 'required|numeric|min:0',
            'kredit' => 'required|numeric|min:0',
            'keterangan' => 'nullable|string',
        ]);

        $user = auth()->user();

        $lastJurnal = Jurnal::whereDate('created_at', today())->count();
        $validated['nomor_jurnal'] = 'JR-' . now()->format('Ymd') . '-' . str_pad($lastJurnal + 1, 3, '0', STR_PAD_LEFT);
        $validated['pengguna_id'] = $user->id;
        $validated['outlet_id'] = $user->outlet_id;

        Jurnal::create($validated);

        return redirect()->route('jurnal.index')->with('success', 'Jurnal berhasil ditambahkan.');
    }
}

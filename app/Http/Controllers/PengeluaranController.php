<?php

namespace App\Http\Controllers;

use App\Models\Pengeluaran;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PengeluaranController extends Controller
{
    public function index(Request $request)
    {
        $query = Pengeluaran::with(['pengguna', 'outlet']);

        $user = auth()->user();
        if ($user->outlet_id) {
            $query->where('outlet_id', $user->outlet_id);
        }

        if ($request->kategori) {
            $query->where('kategori', $request->kategori);
        }
        if ($request->dari) {
            $query->whereDate('tanggal', '>=', $request->dari);
        }
        if ($request->sampai) {
            $query->whereDate('tanggal', '<=', $request->sampai);
        }

        return Inertia::render('Pengeluaran/Index', [
            'pengeluaran' => $query->orderByDesc('tanggal')->paginate(10)->withQueryString(),
            'filters' => $request->only(['kategori', 'dari', 'sampai']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Pengeluaran/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kategori' => 'required|string|max:100',
            'jumlah' => 'required|numeric|min:0',
            'keterangan' => 'nullable|string',
            'bukti' => 'nullable|string|max:255',
            'tanggal' => 'required|date',
        ]);

        $user = auth()->user();
        $validated['outlet_id'] = $user->outlet_id ?? 1;
        $validated['pengguna_id'] = $user->id;

        Pengeluaran::create($validated);

        return redirect()->route('pengeluaran.index')->with('success', 'Pengeluaran berhasil dicatat.');
    }

    public function edit(Pengeluaran $pengeluaran)
    {
        return Inertia::render('Pengeluaran/Edit', [
            'pengeluaran' => $pengeluaran,
        ]);
    }

    public function update(Request $request, Pengeluaran $pengeluaran)
    {
        $validated = $request->validate([
            'kategori' => 'required|string|max:100',
            'jumlah' => 'required|numeric|min:0',
            'keterangan' => 'nullable|string',
            'bukti' => 'nullable|string|max:255',
            'tanggal' => 'required|date',
        ]);

        $pengeluaran->update($validated);

        return redirect()->route('pengeluaran.index')->with('success', 'Pengeluaran berhasil diperbarui.');
    }

    public function destroy(Pengeluaran $pengeluaran)
    {
        $pengeluaran->delete();
        return redirect()->route('pengeluaran.index')->with('success', 'Pengeluaran berhasil dihapus.');
    }
}

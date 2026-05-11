<?php

namespace App\Http\Controllers;

use App\Models\Outlet;
use App\Models\Promo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PromoController extends Controller
{
    public function index(Request $request)
    {
        $query = Promo::with('outlet');

        $user = auth()->user();
        if ($user->outlet_id) {
            $query->where(function ($q) use ($user) {
                $q->whereNull('outlet_id')->orWhere('outlet_id', $user->outlet_id);
            });
        }

        if ($request->status) {
            $query->where('status', $request->status);
        }

        return Inertia::render('Promo/Index', [
            'promo' => $query->orderByDesc('created_at')->paginate(10)->withQueryString(),
            'filters' => $request->only(['status']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Promo/Create', [
            'outlet' => Outlet::where('status', 'aktif')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'outlet_id' => 'nullable|exists:outlet,id',
            'nama' => 'required|string|max:100',
            'kode' => 'nullable|string|max:30|unique:promo,kode',
            'tipe' => 'required|in:persen,nominal',
            'nilai' => 'required|numeric|min:0',
            'max_diskon' => 'nullable|numeric|min:0',
            'min_transaksi' => 'nullable|numeric|min:0',
            'kuota' => 'nullable|integer|min:0',
            'tgl_mulai' => 'required|date',
            'tgl_selesai' => 'required|date|after_or_equal:tgl_mulai',
        ]);

        Promo::create($validated);

        return redirect()->route('promo.index')->with('success', 'Promo berhasil ditambahkan.');
    }

    public function edit(Promo $promo)
    {
        return Inertia::render('Promo/Edit', [
            'promo' => $promo,
            'outlet' => Outlet::where('status', 'aktif')->get(),
        ]);
    }

    public function update(Request $request, Promo $promo)
    {
        $validated = $request->validate([
            'outlet_id' => 'nullable|exists:outlet,id',
            'nama' => 'required|string|max:100',
            'kode' => "nullable|string|max:30|unique:promo,kode,{$promo->id}",
            'tipe' => 'required|in:persen,nominal',
            'nilai' => 'required|numeric|min:0',
            'max_diskon' => 'nullable|numeric|min:0',
            'min_transaksi' => 'nullable|numeric|min:0',
            'kuota' => 'nullable|integer|min:0',
            'tgl_mulai' => 'required|date',
            'tgl_selesai' => 'required|date|after_or_equal:tgl_mulai',
            'status' => 'required|in:aktif,nonaktif',
        ]);

        $promo->update($validated);

        return redirect()->route('promo.index')->with('success', 'Promo berhasil diperbarui.');
    }

    public function destroy(Promo $promo)
    {
        $promo->update(['status' => 'nonaktif']);
        return redirect()->route('promo.index')->with('success', 'Promo berhasil dinonaktifkan.');
    }
}

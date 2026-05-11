<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use App\Models\Produk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProdukController extends Controller
{
    public function index(Request $request)
    {
        $query = Produk::with(['kategori', 'outlet']);

        if ($request->search) {
            $query->where('nama', 'like', "%{$request->search}%");
        }
        if ($request->kategori_id) {
            $query->where('kategori_id', $request->kategori_id);
        }
        if ($request->status) {
            $query->where('status', $request->status);
        }

        $user = auth()->user();
        if ($user->outlet_id) {
            $query->where('outlet_id', $user->outlet_id);
        }

        return Inertia::render('Produk/Index', [
            'produk' => $query->orderBy('nama')->paginate(10)->withQueryString(),
            'kategori' => Kategori::where('status', 'aktif')->get(),
            'filters' => $request->only(['search', 'kategori_id', 'status']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Produk/Create', [
            'kategori' => Kategori::where('status', 'aktif')->get(),
            'outlets' => \App\Models\Outlet::where('status', 'aktif')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kategori_id' => 'required|exists:kategori,id',
            'nama' => 'required|string|max:200',
            'deskripsi' => 'nullable|string',
            'harga_jual' => 'required|numeric|min:0',
            'harga_modal' => 'required|numeric|min:0',
            'stok' => 'required|integer|min:0',
            'min_stok' => 'required|integer|min:0',
            'satuan' => 'required|string|max:30',
            'outlet_id' => 'nullable|exists:outlet,id',
            'gambar' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'is_favorit' => 'nullable|boolean',
        ]);

        $user = auth()->user();
        if ($user->outlet_id) {
            $validated['outlet_id'] = $user->outlet_id;
        }

        if ($request->hasFile('gambar')) {
            $validated['gambar'] = $request->file('gambar')->store('produk', 'public');
        }

        Produk::create($validated);

        return redirect()->route('produk.index')->with('success', 'Produk berhasil ditambahkan.');
    }

    public function show(Produk $produk)
    {
        return Inertia::render('Produk/Show', [
            'produk' => $produk->load(['kategori', 'outlet', 'stokLog' => fn($q) => $q->latest()->limit(20)]),
        ]);
    }

    public function edit(Produk $produk)
    {
        return Inertia::render('Produk/Edit', [
            'produk' => $produk,
            'kategori' => Kategori::where('status', 'aktif')->get(),
        ]);
    }

    public function update(Request $request, Produk $produk)
    {
        $validated = $request->validate([
            'kategori_id' => 'required|exists:kategori,id',
            'nama' => 'required|string|max:200',
            'deskripsi' => 'nullable|string',
            'harga_jual' => 'required|numeric|min:0',
            'harga_modal' => 'required|numeric|min:0',
            'min_stok' => 'required|integer|min:0',
            'satuan' => 'required|string|max:30',
            'gambar' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'is_favorit' => 'nullable|boolean',
            'status' => 'required|in:aktif,habis,nonaktif',
        ]);

        if ($request->hasFile('gambar')) {
            $oldGambar = $produk->getRawOriginal('gambar');
            if ($oldGambar && !str_starts_with($oldGambar, 'http') && !str_starts_with($oldGambar, 'images/')) {
                Storage::disk('public')->delete($oldGambar);
            }
            $validated['gambar'] = $request->file('gambar')->store('produk', 'public');
        }

        $produk->update($validated);

        return redirect()->route('produk.index')->with('success', 'Produk berhasil diperbarui.');
    }

    public function destroy(Produk $produk)
    {
        $produk->update(['status' => 'nonaktif']);

        return redirect()->route('produk.index')->with('success', 'Produk berhasil dinonaktifkan.');
    }
}

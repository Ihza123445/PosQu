<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class KategoriController extends Controller
{
    public function index()
    {
        return Inertia::render('Kategori/Index', [
            'kategori' => Kategori::orderBy('urutan')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Kategori/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:100|unique:kategori,nama',
            'deskripsi' => 'nullable|string|max:255',
            'gambar' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'icon' => 'nullable|string|max:50',
            'warna' => 'nullable|string|max:10',
            'urutan' => 'nullable|integer|min:0',
        ]);

        if ($request->hasFile('gambar')) {
            $validated['gambar'] = $request->file('gambar')->store('kategori', 'public');
        }

        Kategori::create($validated);

        return redirect()->route('kategori.index')->with('success', 'Kategori berhasil ditambahkan.');
    }

    public function edit(Kategori $kategori)
    {
        return Inertia::render('Kategori/Edit', [
            'kategori' => $kategori,
        ]);
    }

    public function update(Request $request, Kategori $kategori)
    {
        $validated = $request->validate([
            'nama' => "required|string|max:100|unique:kategori,nama,{$kategori->id}",
            'deskripsi' => 'nullable|string|max:255',
            'gambar' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'icon' => 'nullable|string|max:50',
            'warna' => 'nullable|string|max:10',
            'urutan' => 'nullable|integer|min:0',
            'status' => 'required|in:aktif,nonaktif',
        ]);

        if ($request->hasFile('gambar')) {
            $oldGambar = $kategori->getRawOriginal('gambar');
            if ($oldGambar && !str_starts_with($oldGambar, 'http')) {
                Storage::disk('public')->delete($oldGambar);
            }
            $validated['gambar'] = $request->file('gambar')->store('kategori', 'public');
        }

        $kategori->update($validated);

        return redirect()->route('kategori.index')->with('success', 'Kategori berhasil diperbarui.');
    }

    public function destroy(Kategori $kategori)
    {
        if ($kategori->produk()->exists()) {
            return back()->with('error', 'Kategori tidak bisa dihapus karena masih memiliki produk.');
        }

        $kategori->update(['status' => 'nonaktif']);

        return redirect()->route('kategori.index')->with('success', 'Kategori berhasil dinonaktifkan.');
    }
}

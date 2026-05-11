<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Kategori extends Model
{
    protected $table = 'kategori';
    public $timestamps = false;

    protected $fillable = [
        'nama', 'deskripsi', 'gambar', 'icon', 'warna', 'urutan', 'status',
    ];

    // Accessor for gambar — converts storage path to URL
    public function getGambarAttribute($value): ?string
    {
        if (!$value) return null;
        if (str_starts_with($value, 'http') || str_starts_with($value, '/storage/')) return $value;
        return Storage::url($value);
    }

    public function produk()
    {
        return $this->hasMany(Produk::class);
    }
}

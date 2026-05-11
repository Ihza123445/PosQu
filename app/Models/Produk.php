<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Produk extends Model
{
    protected $table = 'produk';

    protected $fillable = [
        'kategori_id', 'outlet_id', 'nama', 'deskripsi',
        'harga_jual', 'harga_modal', 'stok', 'min_stok',
        'satuan', 'gambar', 'is_favorit', 'status',
    ];

    protected function casts(): array
    {
        return [
            'is_favorit' => 'boolean',
        ];
    }

    // Accessor for gambar — converts storage path to URL
    public function getGambarAttribute($value): ?string
    {
        if (!$value) return null;
        if (str_starts_with($value, 'http') || str_starts_with($value, '/storage/')) return $value;
        if (str_starts_with($value, 'images/')) return $value;
        return Storage::url($value);
    }

    public function kategori()
    {
        return $this->belongsTo(Kategori::class);
    }

    public function outlet()
    {
        return $this->belongsTo(Outlet::class);
    }

    public function detailTransaksi()
    {
        return $this->hasMany(DetailTransaksi::class);
    }

    public function stokLog()
    {
        return $this->hasMany(StokLog::class);
    }
}

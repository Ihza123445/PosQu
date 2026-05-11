<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Promo extends Model
{
    protected $table = 'promo';

    protected $fillable = [
        'outlet_id', 'nama', 'kode', 'tipe', 'nilai',
        'max_diskon', 'min_transaksi', 'kuota', 'terpakai',
        'tgl_mulai', 'tgl_selesai', 'status',
    ];

    protected function casts(): array
    {
        return [
            'tgl_mulai' => 'date',
            'tgl_selesai' => 'date',
        ];
    }

    public function outlet()
    {
        return $this->belongsTo(Outlet::class);
    }

    public function transaksi()
    {
        return $this->hasMany(Transaksi::class);
    }
}

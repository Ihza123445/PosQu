<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notifikasi extends Model
{
    protected $table = 'notifikasi';
    public $timestamps = false;

    protected $fillable = [
        'pengguna_id', 'outlet_id', 'tipe',
        'judul', 'pesan', 'url', 'status_baca',
    ];

    protected function casts(): array
    {
        return [
            'status_baca' => 'boolean',
        ];
    }

    public function pengguna()
    {
        return $this->belongsTo(User::class, 'pengguna_id');
    }

    public function outlet()
    {
        return $this->belongsTo(Outlet::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LogAktivitas extends Model
{
    protected $table = 'log_aktivitas';
    public $timestamps = false;

    protected $fillable = [
        'pengguna_id', 'outlet_id', 'aksi',
        'entitas', 'entitas_id', 'detail',
        'ip_address', 'user_agent',
    ];

    protected function casts(): array
    {
        return [
            'detail' => 'array',
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

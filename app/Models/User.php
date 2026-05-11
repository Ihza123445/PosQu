<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasRoles, Notifiable;

    protected $fillable = [
        'role_id',
        'outlet_id',
        'name',
        'nama',
        'email',
        'password',
        'telepon',
        'foto',
        'status',
        'last_login',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'last_login' => 'datetime',
        ];
    }

    // Accessor for Breeze compatibility
    public function getNameAttribute(): string
    {
        return $this->nama;
    }

    // Mutator for Breeze compatibility
    public function setNameAttribute($value): void
    {
        $this->attributes['nama'] = $value;
    }

    // Accessor for foto — converts storage path to URL
    public function getFotoAttribute($value): ?string
    {
        if (!$value) return null;
        if (str_starts_with($value, 'http') || str_starts_with($value, '/storage/')) return $value;
        return Storage::url($value);
    }

    public function role(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    public function outlet(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Outlet::class);
    }

    public function transaksi(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Transaksi::class, 'pengguna_id');
    }

    public function stokLog(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(StokLog::class, 'pengguna_id');
    }

    public function notifikasi(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Notifikasi::class, 'pengguna_id');
    }

    public function logAktivitas(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(LogAktivitas::class, 'pengguna_id');
    }
}

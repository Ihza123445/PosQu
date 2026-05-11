<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Outlet extends Model
{
    protected $table = 'outlet';

    protected $fillable = [
        'nama', 'alamat', 'kota', 'provinsi', 'telepon',
        'jam_buka', 'jam_tutup', 'status',
    ];

    protected function casts(): array
    {
        return [
            'jam_buka' => 'datetime:H:i',
            'jam_tutup' => 'datetime:H:i',
        ];
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function produk()
    {
        return $this->hasMany(Produk::class);
    }

    public function transaksi()
    {
        return $this->hasMany(Transaksi::class);
    }

    public function promo()
    {
        return $this->hasMany(Promo::class);
    }

    public function targetPenjualan()
    {
        return $this->hasMany(TargetPenjualan::class);
    }

    public function pengeluaran()
    {
        return $this->hasMany(Pengeluaran::class);
    }
}

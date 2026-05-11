<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pelanggan extends Model
{
    protected $table = 'pelanggan';

    protected $fillable = [
        'nama', 'telepon', 'email', 'alamat',
        'jenis_kelamin', 'tanggal_lahir',
        'loyalty_points', 'total_pembelian', 'total_transaksi',
    ];

    public function transaksi()
    {
        return $this->hasMany(Transaksi::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MetodePembayaran extends Model
{
    protected $table = 'metode_pembayaran';
    public $timestamps = false;

    protected $fillable = ['nama', 'kode', 'icon', 'status'];

    public function transaksi()
    {
        return $this->hasMany(Transaksi::class);
    }
}

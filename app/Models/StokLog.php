<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StokLog extends Model
{
    protected $table = 'stok_log';
    public $timestamps = false;

    protected $fillable = [
        'produk_id', 'pengguna_id', 'transaksi_id', 'jenis',
        'qty', 'stok_sebelum', 'stok_sesudah', 'keterangan',
    ];

    public function produk()
    {
        return $this->belongsTo(Produk::class);
    }

    public function pengguna()
    {
        return $this->belongsTo(User::class, 'pengguna_id');
    }

    public function transaksi()
    {
        return $this->belongsTo(Transaksi::class);
    }
}

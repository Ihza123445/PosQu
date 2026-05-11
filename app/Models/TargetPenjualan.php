<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TargetPenjualan extends Model
{
    protected $table = 'target_penjualan';

    protected $fillable = [
        'outlet_id', 'bulan', 'tahun',
        'target_omzet', 'target_qty_transaksi', 'target_qty_produk',
        'realisasi_omzet', 'realisasi_qty_transaksi', 'realisasi_qty_produk',
    ];

    public function outlet()
    {
        return $this->belongsTo(Outlet::class);
    }
}

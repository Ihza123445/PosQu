<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    protected $table = 'transaksi';

    protected $fillable = [
        'outlet_id', 'pengguna_id', 'pelanggan_id',
        'metode_pembayaran_id', 'promo_id', 'date_id',
        'kode_transaksi', 'invoice_number', 'subtotal',
        'diskon', 'pajak', 'total', 'bayar', 'kembalian',
        'catatan', 'status', 'dibatalkan_oleh', 'alasan_batal',
        'transaction_datetime',
    ];

    protected function casts(): array
    {
        return [
            'transaction_datetime' => 'datetime',
        ];
    }

    public function outlet()
    {
        return $this->belongsTo(Outlet::class);
    }

    public function pengguna()
    {
        return $this->belongsTo(User::class, 'pengguna_id');
    }

    public function pelanggan()
    {
        return $this->belongsTo(Pelanggan::class);
    }

    public function metodePembayaran()
    {
        return $this->belongsTo(MetodePembayaran::class);
    }

    public function promo()
    {
        return $this->belongsTo(Promo::class);
    }

    public function detailTransaksi()
    {
        return $this->hasMany(DetailTransaksi::class);
    }

    public function dibatalkanOleh()
    {
        return $this->belongsTo(User::class, 'dibatalkan_oleh');
    }

    public function stokLog()
    {
        return $this->hasMany(StokLog::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DateDimension extends Model
{
    protected $table = 'date_dimension';
    public $timestamps = false;

    public function transaksi()
    {
        return $this->hasMany(Transaksi::class, 'date_id');
    }
}

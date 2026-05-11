<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('target_penjualan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('outlet_id')->constrained('outlet');
            $table->tinyInteger('bulan');
            $table->year('tahun');
            $table->decimal('target_omzet', 16, 2);
            $table->integer('target_qty_transaksi')->nullable();
            $table->integer('target_qty_produk')->nullable();
            $table->decimal('realisasi_omzet', 16, 2)->default(0);
            $table->integer('realisasi_qty_transaksi')->default(0);
            $table->integer('realisasi_qty_produk')->default(0);
            $table->timestamps();

            $table->unique(['outlet_id', 'bulan', 'tahun']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('target_penjualan');
    }
};

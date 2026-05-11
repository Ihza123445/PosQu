<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pengeluaran', function (Blueprint $table) {
            $table->id();
            $table->foreignId('outlet_id')->constrained('outlet');
            $table->foreignId('pengguna_id')->constrained('users');
            $table->string('kategori', 100);
            $table->decimal('jumlah', 14, 2);
            $table->text('keterangan')->nullable();
            $table->string('bukti', 255)->nullable();
            $table->date('tanggal');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pengeluaran');
    }
};

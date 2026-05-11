<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('jurnal', function (Blueprint $table) {
            $table->id();
            $table->foreignId('outlet_id')->nullable()->constrained('outlet');
            $table->foreignId('pengguna_id')->constrained('users');
            $table->string('tipe', 30)->default('jurnal_umum'); // jurnal_umum, penyesuaian, penutup
            $table->string('nomor_jurnal', 30)->unique();
            $table->date('tanggal');
            $table->string('deskripsi', 255);
            $table->decimal('debet', 15, 2)->default(0);
            $table->decimal('kredit', 15, 2)->default(0);
            $table->text('keterangan')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jurnal');
    }
};

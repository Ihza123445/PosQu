<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('promo', function (Blueprint $table) {
            $table->id();
            $table->foreignId('outlet_id')->nullable()->constrained('outlet');
            $table->string('nama', 100);
            $table->string('kode', 30)->nullable()->unique();
            $table->enum('tipe', ['persen', 'nominal']);
            $table->decimal('nilai', 10, 2);
            $table->decimal('max_diskon', 12, 2)->nullable();
            $table->decimal('min_transaksi', 12, 2)->default(0);
            $table->integer('kuota')->nullable();
            $table->integer('terpakai')->default(0);
            $table->date('tgl_mulai');
            $table->date('tgl_selesai');
            $table->enum('status', ['aktif', 'nonaktif'])->default('aktif');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('promo');
    }
};

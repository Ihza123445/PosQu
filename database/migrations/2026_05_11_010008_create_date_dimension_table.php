<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('date_dimension', function (Blueprint $table) {
            $table->id();
            $table->date('tanggal')->unique();
            $table->tinyInteger('hari');
            $table->tinyInteger('bulan');
            $table->year('tahun');
            $table->tinyInteger('kuartal');
            $table->string('nama_hari', 10);
            $table->string('nama_bulan', 15);
            $table->tinyInteger('minggu_ke');
            $table->boolean('is_weekend')->default(false);
            $table->boolean('is_holiday')->default(false);
            $table->string('keterangan_libur', 100)->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('date_dimension');
    }
};

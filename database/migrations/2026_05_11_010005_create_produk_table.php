<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('produk', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kategori_id')->constrained('kategori');
            $table->foreignId('outlet_id')->constrained('outlet');
            $table->string('nama', 200);
            $table->text('deskripsi')->nullable();
            $table->decimal('harga_jual', 12, 2);
            $table->decimal('harga_modal', 12, 2)->default(0);
            $table->integer('stok')->default(0);
            $table->integer('min_stok')->default(0);
            $table->string('satuan', 30);
            $table->string('gambar', 255)->nullable();
            $table->boolean('is_favorit')->default(false);
            $table->enum('status', ['aktif', 'habis', 'nonaktif'])->default('aktif');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('produk');
    }
};

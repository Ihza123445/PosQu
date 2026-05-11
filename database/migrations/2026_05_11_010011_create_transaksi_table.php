<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transaksi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('outlet_id')->constrained('outlet');
            $table->foreignId('pengguna_id')->constrained('users');
            $table->foreignId('pelanggan_id')->nullable()->constrained('pelanggan');
            $table->foreignId('metode_pembayaran_id')->constrained('metode_pembayaran');
            $table->foreignId('promo_id')->nullable()->constrained('promo');
            $table->foreignId('date_id')->constrained('date_dimension');
            $table->string('kode_transaksi', 50)->unique();
            $table->string('invoice_number', 50)->nullable()->unique();
            $table->decimal('subtotal', 14, 2);
            $table->decimal('diskon', 12, 2)->default(0);
            $table->decimal('pajak', 12, 2)->default(0);
            $table->decimal('total', 14, 2);
            $table->decimal('bayar', 14, 2);
            $table->decimal('kembalian', 12, 2)->default(0);
            $table->text('catatan')->nullable();
            $table->enum('status', ['selesai', 'batal', 'pending'])->default('selesai');
            $table->foreignId('dibatalkan_oleh')->nullable()->constrained('users');
            $table->text('alasan_batal')->nullable();
            $table->dateTime('transaction_datetime')->useCurrent();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transaksi');
    }
};

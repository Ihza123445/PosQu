<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\NotifikasiController;
use App\Http\Controllers\PelangganController;
use App\Http\Controllers\PengeluaranController;
use App\Http\Controllers\ProdukController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PromoController;
use App\Http\Controllers\StokController;
use App\Http\Controllers\TargetPenjualanController;
use App\Http\Controllers\JurnalController;
use App\Http\Controllers\TransaksiController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Master Data
    Route::resource('kategori', KategoriController::class);
    Route::resource('produk', ProdukController::class);
    Route::resource('pelanggan', PelangganController::class);
    Route::resource('promo', PromoController::class)->except(['show']);
    Route::resource('pengeluaran', PengeluaranController::class);

    // Transaksi / POS
    Route::get('/transaksi/pos', [TransaksiController::class, 'pos'])->name('transaksi.pos');
    Route::post('/transaksi/checkout', [TransaksiController::class, 'checkout'])->name('transaksi.checkout');
    Route::post('/transaksi/{transaksi}/batal', [TransaksiController::class, 'batal'])->name('transaksi.batal');
    Route::get('/transaksi/{transaksi}/invoice', [TransaksiController::class, 'invoice'])->name('transaksi.invoice');
    Route::resource('transaksi', TransaksiController::class)->except(['create', 'edit']);

    // Stok
    Route::get('/stok/log', [StokController::class, 'index'])->name('stok.log');
    Route::get('/stok/adjustment', [StokController::class, 'adjustment'])->name('stok.adjustment');
    Route::post('/stok/adjustment', [StokController::class, 'storeAdjustment'])->name('stok.adjustment.store');

    // Target Penjualan
    Route::get('/target', [TargetPenjualanController::class, 'index'])->name('target.index');
    Route::post('/target', [TargetPenjualanController::class, 'store'])->name('target.store');

    // Jurnal Umum
    Route::resource('jurnal', JurnalController::class)->only(['index', 'create', 'store']);

    // Laporan
    Route::get('/laporan/penjualan', [LaporanController::class, 'penjualan'])->name('laporan.penjualan');
    Route::get('/laporan/laba-rugi', [LaporanController::class, 'labaRugi'])->name('laporan.laba-rugi');
    Route::get('/laporan/produk', [LaporanController::class, 'produk'])->name('laporan.produk');
    Route::get('/laporan/trend', [LaporanController::class, 'trend'])->name('laporan.trend');
    Route::get('/laporan/buku-besar', [LaporanController::class, 'bukuBesar'])->name('laporan.buku-besar');
    Route::get('/laporan/neraca', [LaporanController::class, 'neraca'])->name('laporan.neraca');

    // Notifikasi
    Route::get('/notifikasi', [NotifikasiController::class, 'index'])->name('notifikasi.index');
    Route::post('/notifikasi/{id}/baca', [NotifikasiController::class, 'baca'])->name('notifikasi.baca');
    Route::post('/notifikasi/baca-semua', [NotifikasiController::class, 'bacaSemua'])->name('notifikasi.baca-semua');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

<?php

namespace App\Http\Controllers;

use App\Models\MetodePembayaran;
use App\Models\Pelanggan;
use App\Models\Produk;
use App\Models\Promo;
use App\Models\Transaksi;
use App\Services\LogAktivitasService;
use App\Services\TransaksiService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransaksiController extends Controller
{
    public function __construct(
        private TransaksiService $transaksiService,
        private LogAktivitasService $logAktivitas,
    ) {}

    public function index(Request $request)
    {
        $query = Transaksi::with(['pelanggan', 'metodePembayaran', 'pengguna', 'outlet']);

        if ($request->search) {
            $query->where('kode_transaksi', 'like', "%{$request->search}%");
        }
        if ($request->status) {
            $query->where('status', $request->status);
        }
        if ($request->dari) {
            $query->whereDate('transaction_datetime', '>=', $request->dari);
        }
        if ($request->sampai) {
            $query->whereDate('transaction_datetime', '<=', $request->sampai);
        }

        $user = auth()->user();
        if ($user->outlet_id) {
            $query->where('outlet_id', $user->outlet_id);
        }

        return Inertia::render('Transaksi/Index', [
            'transaksi' => $query->orderByDesc('transaction_datetime')->paginate(10)->withQueryString(),
            'filters' => $request->only(['search', 'status', 'dari', 'sampai']),
        ]);
    }

    public function pos()
    {
        $user = auth()->user();
        $outletId = $user->outlet_id;

        $produkQuery = Produk::with('kategori')
            ->whereIn('status', ['aktif', 'habis'])
            ->orderBy('nama');

        $promoQuery = Promo::where('status', 'aktif')
            ->where('tgl_mulai', '<=', now())
            ->where('tgl_selesai', '>=', now());

        if ($outletId) {
            $produkQuery->where('outlet_id', $outletId);
            $promoQuery->where(function ($q) use ($outletId) {
                $q->whereNull('outlet_id')->orWhere('outlet_id', $outletId);
            });
        }

        return Inertia::render('Transaksi/POS', [
            'produk' => $produkQuery->get(),
            'kategori' => \App\Models\Kategori::where('status', 'aktif')->orderBy('urutan')->get(),
            'pelanggan' => Pelanggan::orderByDesc('total_pembelian')->limit(20)->get(),
            'metode_pembayaran' => MetodePembayaran::where('status', 'aktif')->get(),
            'promo' => $promoQuery->get(),
        ]);
    }

    public function checkout(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.produk_id' => 'required|exists:produk,id',
            'items.*.qty' => 'required|integer|min:1',
            'items.*.diskon_item' => 'nullable|numeric|min:0',
            'metode_pembayaran_id' => 'required|exists:metode_pembayaran,id',
            'pelanggan_id' => 'nullable|exists:pelanggan,id',
            'promo_id' => 'nullable|exists:promo,id',
            'diskon' => 'nullable|numeric|min:0',
            'pajak' => 'nullable|numeric|min:0',
            'bayar' => 'required|numeric|min:0',
            'catatan' => 'nullable|string',
        ]);

        $user = auth()->user();
        $validated['outlet_id'] = $user->outlet_id ?? 1;

        $transaksi = $this->transaksiService->checkout($validated, $validated['items'], $user->id);

        $this->logAktivitas->catat($user->id, 'BUAT_TRANSAKSI', 'transaksi', $transaksi->id, [
            'kode' => $transaksi->kode_transaksi,
            'total' => $transaksi->total,
        ], $user->outlet_id);

        return redirect()->route('transaksi.show', $transaksi->id)
            ->with('success', "Transaksi {$transaksi->kode_transaksi} berhasil!");
    }

    public function show(Transaksi $transaksi)
    {
        return Inertia::render('Transaksi/Show', [
            'transaksi' => $transaksi->load([
                'outlet', 'pelanggan', 'metodePembayaran', 'promo',
                'pengguna', 'detailTransaksi.produk', 'dibatalkanOleh',
            ]),
        ]);
    }

    public function invoice(Transaksi $transaksi)
    {
        return Inertia::render('Transaksi/Invoice', [
            'transaksi' => $transaksi->load([
                'outlet', 'pelanggan', 'metodePembayaran',
                'detailTransaksi', 'pengguna',
            ]),
        ]);
    }

    public function batal(Request $request, Transaksi $transaksi)
    {
        $validated = $request->validate([
            'alasan_batal' => 'required|string|min:10',
        ]);

        $user = auth()->user();
        $this->transaksiService->batalkanTransaksi($transaksi, $user->id, $validated['alasan_batal']);

        $this->logAktivitas->catat($user->id, 'BATAL_TRANSAKSI', 'transaksi', $transaksi->id, [
            'kode' => $transaksi->kode_transaksi,
            'alasan' => $validated['alasan_batal'],
        ], $user->outlet_id);

        return redirect()->route('transaksi.show', $transaksi->id)
            ->with('success', 'Transaksi berhasil dibatalkan.');
    }
}

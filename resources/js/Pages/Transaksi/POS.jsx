import { Head, router } from '@inertiajs/react';
import { formatRupiah } from '@/lib/format';
import { useState } from 'react';

export default function POS({ produk, kategori, pelanggan, metode_pembayaran: metodePembayaran = [], promo }) {
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedKategori, setSelectedKategori] = useState('');
    const [metodeId, setMetodeId] = useState(metodePembayaran[0]?.id || '');
    const [pelangganId, setPelangganId] = useState('');
    const [promoId, setPromoId] = useState('');
    const [bayar, setBayar] = useState('');
    const [catatan, setCatatan] = useState('');
    const [showBayar, setShowBayar] = useState(false);
    const [loading, setLoading] = useState(false);

    const filteredProduk = produk.filter(p => {
        const matchSearch = !search || p.nama.toLowerCase().includes(search.toLowerCase());
        const matchKategori = !selectedKategori || p.kategori_id == selectedKategori;
        return matchSearch && matchKategori;
    });

    const addToCart = (p) => {
        setCart(prev => {
            const existing = prev.find(c => c.produk_id === p.id);
            if (existing) {
                return prev.map(c => c.produk_id === p.id ? { ...c, qty: c.qty + 1 } : c);
            }
            return [...prev, { produk_id: p.id, nama: p.nama, harga: p.harga_jual, qty: 1 }];
        });
    };

    const updateQty = (produkId, delta) => {
        setCart(prev => prev.map(c => {
            if (c.produk_id !== produkId) return c;
            const newQty = c.qty + delta;
            return newQty <= 0 ? null : { ...c, qty: newQty };
        }).filter(Boolean));
    };

    const removeFromCart = (produkId) => {
        setCart(prev => prev.filter(c => c.produk_id !== produkId));
    };

    const subtotal = cart.reduce((sum, c) => sum + c.harga * c.qty, 0);
    const total = subtotal;
    const kembalian = parseFloat(bayar || 0) - total;

    const checkout = () => {
        if (cart.length === 0) return;
        setLoading(true);
        router.post(route('transaksi.checkout'), {
            items: cart.map(c => ({ produk_id: c.produk_id, qty: c.qty })),
            metode_pembayaran_id: metodeId,
            pelanggan_id: pelangganId || null,
            promo_id: promoId || null,
            bayar: bayar || total,
            catatan: catatan,
        }, {
            onFinish: () => setLoading(false),
            onError: (errors) => {
                alert(Object.values(errors).join('\n'));
                setLoading(false);
            },
        });
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-[#fbfbf5]">
            <Head title="POS - Kasir" />

            {/* Left: Produk Grid */}
            <div className="flex-1 flex flex-col overflow-hidden min-h-0">
                {/* Top bar */}
                <div className="bg-white px-6 py-4 shadow-card">
                    <div className="flex items-center gap-4">
                        <a href="/dashboard" className="text-[#52525b] hover:text-[#000000]">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        </a>
                        <h1 className="text-heading-md text-[#000000]">POS - Kasir</h1>
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Cari produk..."
                            className="input-shopify flex-1"
                        />
                    </div>
                    {/* Kategori filter */}
                    <div className="flex gap-2 mt-3 overflow-x-auto">
                        <button
                            onClick={() => setSelectedKategori('')}
                            className={`whitespace-nowrap rounded-pill px-4 py-1.5 text-eyebrow font-[500] transition-all ${
                                !selectedKategori ? 'bg-[#000000] text-white' : 'bg-[#f4f4f5] text-[#52525b] hover:bg-[#e4e4e7]'
                            }`}
                        >
                            Semua
                        </button>
                        {kategori.map(k => (
                            <button
                                key={k.id}
                                onClick={() => setSelectedKategori(k.id.toString())}
                                className={`whitespace-nowrap rounded-pill px-4 py-1.5 text-eyebrow font-[500] transition-all ${
                                    selectedKategori === k.id.toString() ? 'bg-[#000000] text-white' : 'bg-[#f4f4f5] text-[#52525b] hover:bg-[#e4e4e7]'
                                }`}
                            >
                                {k.nama}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product grid */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {filteredProduk.map(p => (
                            <button
                                key={p.id}
                                onClick={() => addToCart(p)}
                                disabled={p.status === 'habis' && p.stok <= 0}
                                className="card-hover text-left disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <div className="mb-3 h-24 w-full overflow-hidden rounded-lg bg-[#f4f4f5]">
                                    <img
                                        src={p.gambar || 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=400&fit=crop'}
                                        alt={p.nama}
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                        onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<div class=\"flex h-full w-full items-center justify-center text-3xl\">🍽️</div>'; }}
                                    />
                                </div>
                                <p className="text-body-md font-[500] text-[#000000] line-clamp-2 mb-1">{p.nama}</p>
                                <p className="text-body-strong text-[#000000]">{formatRupiah(p.harga_jual)}</p>
                                <p className="text-micro text-[#a1a1aa]">Stok: {p.stok} {p.satuan}</p>
                            </button>
                        ))}
                        {filteredProduk.length === 0 && (
                            <p className="col-span-full text-center text-body-md text-[#a1a1aa] py-8">Produk tidak ditemukan.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Right: Cart */}
            <div className="w-full lg:w-96 bg-white shadow-card flex flex-col border-t lg:border-t-0 lg:border-l border-[#e4e4e7] max-h-[50vh] lg:max-h-none">
                <div className="px-6 py-4 border-b border-[#e4e4e7]">
                    <h2 className="text-heading-sm text-[#000000]">Keranjang ({cart.length})</h2>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
                    {cart.length === 0 && <p className="text-center text-body-md text-[#a1a1aa] py-8">Belum ada item</p>}
                    {cart.map((c) => (
                        <div key={c.produk_id} className="flex items-center gap-3 rounded-lg border border-[#e4e4e7] p-3">
                            <div className="flex-1 min-w-0">
                                <p className="text-body-md font-[500] text-[#000000] truncate">{c.nama}</p>
                                <p className="text-micro text-[#a1a1aa]">{formatRupiah(c.harga)}</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => updateQty(c.produk_id, -1)}
                                    className="flex h-7 w-7 items-center justify-center rounded bg-[#f4f4f5] text-body-md text-[#52525b] hover:bg-[#e4e4e7]"
                                >
                                    -
                                </button>
                                <span className="w-7 text-center text-body-md font-[500] text-[#000000]">{c.qty}</span>
                                <button
                                    onClick={() => updateQty(c.produk_id, 1)}
                                    className="flex h-7 w-7 items-center justify-center rounded bg-[#f4f4f5] text-body-md text-[#52525b] hover:bg-[#e4e4e7]"
                                >
                                    +
                                </button>
                            </div>
                            <p className="w-20 text-right text-body-md font-[500] text-[#000000]">{formatRupiah(c.harga * c.qty)}</p>
                            <button
                                onClick={() => removeFromCart(c.produk_id)}
                                className="text-[#a1a1aa] hover:text-[#000000]"
                            >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                        </div>
                    ))}
                </div>

                {/* Checkout section */}
                <div className="border-t border-[#e4e4e7] px-6 py-4 space-y-3">
                    {!showBayar ? (
                        <>
                            <div className="flex justify-between items-center">
                                <span className="text-heading-sm text-[#000000]">Total</span>
                                <span className="text-heading-lg font-[550] text-[#000000]">{formatRupiah(total)}</span>
                            </div>
                            <div className="space-y-2">
                                <select
                                    value={metodeId}
                                    onChange={e => setMetodeId(e.target.value)}
                                    className="input-shopify w-full"
                                >
                                    {metodePembayaran.map(m => <option key={m.id} value={m.id}>{m.nama}</option>)}
                                </select>
                                <select
                                    value={pelangganId}
                                    onChange={e => setPelangganId(e.target.value)}
                                    className="input-shopify w-full"
                                >
                                    <option value="">Tanpa Pelanggan</option>
                                    {pelanggan.map(p => <option key={p.id} value={p.id}>{p.nama}</option>)}
                                </select>
                            </div>
                            {cart.length > 0 && (
                                <button
                                    onClick={() => setShowBayar(true)}
                                    className="btn-aloe w-full text-center"
                                >
                                    Bayar {formatRupiah(total)}
                                </button>
                            )}
                        </>
                    ) : (
                        <>
                            <div className="flex justify-between items-center">
                                <span className="text-body-md text-[#a1a1aa]">Total</span>
                                <span className="text-heading-md text-[#000000]">{formatRupiah(total)}</span>
                            </div>
                            <div>
                                <label className="block text-micro text-[#a1a1aa] mb-1">Jumlah Dibayar</label>
                                <input
                                    type="number"
                                    value={bayar}
                                    onChange={e => setBayar(e.target.value)}
                                    className="input-shopify w-full text-heading-md font-[500]"
                                    placeholder="0"
                                    autoFocus
                                />
                            </div>
                            {bayar && parseFloat(bayar) >= total && (
                                <div className="flex justify-between items-center">
                                    <span className="text-body-md font-[500] text-[#000000]">Kembalian</span>
                                    <span className="text-heading-md font-[500] text-[#000000]">{formatRupiah(kembalian)}</span>
                                </div>
                            )}
                            {catatan && (
                                <div>
                                    <label className="block text-micro text-[#a1a1aa] mb-1">Catatan</label>
                                    <textarea
                                        value={catatan}
                                        onChange={e => setCatatan(e.target.value)}
                                        className="input-shopify w-full"
                                        rows={2}
                                        placeholder="Catatan (opsional)"
                                    />
                                </div>
                            )}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowBayar(false)}
                                    className="btn-outline flex-1 text-center"
                                >
                                    Kembali
                                </button>
                                <button
                                    onClick={checkout}
                                    disabled={loading || !bayar || parseFloat(bayar) < total}
                                    className="btn-primary flex-1 text-center"
                                >
                                    {loading ? 'Memproses...' : 'Konfirmasi'}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

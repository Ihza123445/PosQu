import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { formatRupiah } from '@/lib/format';
import { useState } from 'react';

const NAMA_BULAN = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

export default function TargetIndex({ target, tahun }) {
    const [th, setTh] = useState(tahun);
    const [showForm, setShowForm] = useState(false);
    const { data, setData, post, processing, reset } = useForm({ outlet_id: '', bulan: '', tahun: th, target_omzet: '', target_qty_transaksi: '', target_qty_produk: '' });

    const filter = () => router.get('/target', { tahun: th }, { preserveState: true });

    const submit = (e) => {
        e.preventDefault();
        post(route('target.store'), { onSuccess: () => { reset(); setShowForm(false); } });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Target Penjualan" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div><h1 className="text-2xl font-bold text-[#000000]">Target Penjualan</h1><p className="text-sm text-[#a1a1aa]">Target omzet & transaksi per bulan</p></div>
                <button onClick={() => setShowForm(!showForm)} className="btn-primary">{showForm ? 'Batal' : '+ Target Baru'}</button>
            </div>

            {showForm && (
                <div className="mb-6 card">
                    <h2 className="text-lg font-semibold text-[#000000] mb-4">Tambah Target</h2>
                    <form onSubmit={submit} className="space-y-4 max-w-lg">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div><label className="mb-1 block text-sm font-medium text-[#52525b]">Bulan *</label>
                                <select value={data.bulan} onChange={e => setData('bulan', e.target.value)} className="w-full input-shopify" required>
                                    <option value="">Pilih</option>
                                    {NAMA_BULAN.filter((_, i) => i > 0).map((nama, i) => <option key={i + 1} value={i + 1}>{nama}</option>)}
                                </select>
                            </div>
                            <div><label className="mb-1 block text-sm font-medium text-[#52525b]">Tahun</label><input type="number" value={data.tahun} onChange={e => setData('tahun', e.target.value)} className="w-full input-shopify" /></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div><label className="mb-1 block text-sm font-medium text-[#52525b]">Target Omzet *</label><input type="number" value={data.target_omzet} onChange={e => setData('target_omzet', e.target.value)} className="w-full input-shopify" required /></div>
                            <div><label className="mb-1 block text-sm font-medium text-[#52525b]">Target Transaksi</label><input type="number" value={data.target_qty_transaksi} onChange={e => setData('target_qty_transaksi', e.target.value)} className="w-full input-shopify" /></div>
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <button type="button" onClick={() => setShowForm(false)} className="btn-outline">Batal</button>
                            <button type="submit" disabled={processing} className="btn-primary">{processing ? '...' : 'Simpan'}</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="mb-6 card">
                <div className="flex flex-col sm:flex-row gap-3 items-end">
                    <div className="w-full sm:w-auto"><label className="block text-xs text-[#a1a1aa] mb-1">Tahun</label>
                        <select value={th} onChange={e => setTh(e.target.value)} className="w-full sm:w-auto input-shopify">
                            {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                    <button onClick={filter} className="btn-primary">Tampilkan</button>
                </div>
            </div>

            <div className="space-y-4">
                {target.length === 0 && <p className="text-center text-[#a1a1aa] py-8">Belum ada target untuk tahun {th}.</p>}
                {target.map(t => {
                    const pctOmzet = t.target_omzet > 0 ? Math.min((Number(t.realisasi_omzet) / Number(t.target_omzet)) * 100, 100) : 0;
                    const pctTrx = t.target_qty_transaksi > 0 ? Math.min((Number(t.realisasi_qty_transaksi) / Number(t.target_qty_transaksi)) * 100, 100) : 0;

                    return (
                        <div key={t.id} className="card">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-lg font-semibold text-[#000000]">{NAMA_BULAN[t.bulan]} {t.tahun}</h3>
                                <span className={pctOmzet >= 100 ? 'badge-success' : 'badge-neutral'}>
                                    {pctOmzet >= 100 ? 'Tercapai' : `${Math.round(pctOmzet)}%`}
                                </span>
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div>
                                    <div className="flex justify-between text-sm mb-1"><span className="text-[#a1a1aa]">Omzet</span><span className="font-medium text-[#000000]">{formatRupiah(Number(t.realisasi_omzet))} / {formatRupiah(Number(t.target_omzet))}</span></div>
                                    <div className="h-2 w-full rounded-full bg-[#f4f4f5]">
                                        <div className="h-full rounded-full bg-[#000000] transition-all" style={{ width: `${pctOmzet}%` }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1"><span className="text-[#a1a1aa]">Transaksi</span><span className="font-medium text-[#000000]">{Number(t.realisasi_qty_transaksi)} / {Number(t.target_qty_transaksi)}</span></div>
                                    <div className="h-2 w-full rounded-full bg-[#f4f4f5]">
                                        <div className="h-full rounded-full bg-[#000000] transition-all" style={{ width: `${pctTrx}%` }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1"><span className="text-[#a1a1aa]">Produk Terjual</span><span className="font-medium text-[#000000]">{Number(t.realisasi_qty_produk)}{t.target_qty_produk ? ` / ${Number(t.target_qty_produk)}` : ''}</span></div>
                                    {t.target_qty_produk && (
                                        <div className="h-2 w-full rounded-full bg-[#f4f4f5]">
                                            <div className="h-full rounded-full bg-[#3f3f46] transition-all" style={{ width: `${Math.min((Number(t.realisasi_qty_produk) / Number(t.target_qty_produk)) * 100, 100)}%` }} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </AuthenticatedLayout>
    );
}

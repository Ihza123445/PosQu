import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { formatRupiah } from '@/lib/format';
import { useState } from 'react';

export default function StokAdjustment({ produk }) {
    const [produkId, setProdukId] = useState('');
    const [stokBaru, setStokBaru] = useState('');
    const [alasan, setAlasan] = useState('');
    const selected = produk.find(p => p.id == produkId);

    const submit = (e) => {
        e.preventDefault();
        router.post(route('stok.adjustment.store'), { produk_id: produkId, stok_baru: stokBaru, alasan });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Adjustment Stok" />
            <div className="mb-6">
                <Link href={route('stok.log')} className="text-sm text-[#000000] hover:text-[#3f3f46]">← Kembali</Link>
                <h1 className="text-2xl font-bold text-[#000000] mt-1">Adjustment Stok</h1>
            </div>
            <div className="mx-auto max-w-lg card">
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-[#52525b]">Produk *</label>
                        <select value={produkId} onChange={e => setProdukId(e.target.value)} className="w-full input-shopify" required>
                            <option value="">Pilih Produk</option>
                            {produk.map(p => <option key={p.id} value={p.id}>{p.nama} (stok: {p.stok})</option>)}
                        </select>
                    </div>
                    {selected && <p className="text-sm text-[#a1a1aa]">Stok saat ini: <strong>{selected.stok}</strong> {selected.satuan}</p>}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-[#52525b]">Stok Baru *</label>
                        <input type="number" value={stokBaru} onChange={e => setStokBaru(e.target.value)} className="w-full input-shopify" required min="0" />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-[#52525b]">Alasan</label>
                        <textarea value={alasan} onChange={e => setAlasan(e.target.value)} rows={2} className="w-full input-shopify" />
                    </div>
                    <button type="submit" className="btn-primary w-full">Simpan Adjustment</button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

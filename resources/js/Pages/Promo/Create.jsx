import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function PromoCreate({ outlet }) {
    const { data, setData, post, processing, errors } = useForm({ outlet_id: '', nama: '', kode: '', tipe: 'persen', nilai: '', max_diskon: '', min_transaksi: '0', kuota: '', tgl_mulai: '', tgl_selesai: '' });
    const submit = (e) => { e.preventDefault(); post(route('promo.store')); };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Promo" />
            <div className="mb-6">
                <Link href={route('promo.index')} className="text-sm text-[#000000] hover:text-[#000000]/80">&larr; Kembali</Link>
                <h1 className="text-2xl font-bold text-[#000000] mt-1">Tambah Promo</h1>
            </div>
            <div className="mx-auto max-w-lg card">
                <form onSubmit={submit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div><label className="mb-1 block text-sm font-medium text-[#52525b]">Nama *</label><input type="text" value={data.nama} onChange={e => setData('nama', e.target.value)} className="input-shopify w-full" /></div>
                        <div><label className="mb-1 block text-sm font-medium text-[#52525b]">Kode</label><input type="text" value={data.kode} onChange={e => setData('kode', e.target.value)} className="input-shopify w-full" /></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div><label className="mb-1 block text-sm font-medium text-[#52525b]">Tipe</label>
                            <select value={data.tipe} onChange={e => setData('tipe', e.target.value)} className="input-shopify w-full">
                                <option value="persen">Persen (%)</option><option value="nominal">Nominal (Rp)</option>
                            </select>
                        </div>
                        <div><label className="mb-1 block text-sm font-medium text-[#52525b]">Nilai *</label><input type="number" value={data.nilai} onChange={e => setData('nilai', e.target.value)} className="input-shopify w-full" /></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div><label className="mb-1 block text-sm font-medium text-[#52525b]">Min Transaksi</label><input type="number" value={data.min_transaksi} onChange={e => setData('min_transaksi', e.target.value)} className="input-shopify w-full" /></div>
                        <div><label className="mb-1 block text-sm font-medium text-[#52525b]">Kuota</label><input type="number" value={data.kuota} onChange={e => setData('kuota', e.target.value)} className="input-shopify w-full" /></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div><label className="mb-1 block text-sm font-medium text-[#52525b]">Tgl Mulai *</label><input type="date" value={data.tgl_mulai} onChange={e => setData('tgl_mulai', e.target.value)} className="input-shopify w-full" /></div>
                        <div><label className="mb-1 block text-sm font-medium text-[#52525b]">Tgl Selesai *</label><input type="date" value={data.tgl_selesai} onChange={e => setData('tgl_selesai', e.target.value)} className="input-shopify w-full" /></div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <Link href={route('promo.index')} className="btn-outline">Batal</Link>
                        <button type="submit" disabled={processing} className="btn-primary">{processing ? '...' : 'Simpan'}</button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

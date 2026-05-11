import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function PromoEdit({ promo, outlet }) {
    const { data, setData, put, processing, errors } = useForm({
        outlet_id: promo.outlet_id ?? '',
        nama: promo.nama,
        kode: promo.kode ?? '',
        tipe: promo.tipe,
        nilai: promo.nilai,
        max_diskon: promo.max_diskon ?? '',
        min_transaksi: promo.min_transaksi ?? '0',
        kuota: promo.kuota ?? '',
        tgl_mulai: promo.tgl_mulai,
        tgl_selesai: promo.tgl_selesai,
        status: promo.status,
    });
    const submit = (e) => { e.preventDefault(); put(route('promo.update', promo.id)); };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Promo" />
            <div className="mb-6">
                <Link href={route('promo.index')} className="text-sm text-[#000000] hover:text-[#000000]/80">&larr; Kembali</Link>
                <h1 className="text-2xl font-bold text-[#000000] mt-1">Edit Promo</h1>
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
                    <div><label className="mb-1 block text-sm font-medium text-[#52525b]">Status</label>
                        <select value={data.status} onChange={e => setData('status', e.target.value)} className="input-shopify w-full">
                            <option value="aktif">Aktif</option><option value="nonaktif">Nonaktif</option>
                        </select>
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

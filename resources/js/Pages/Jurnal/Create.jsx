import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function JurnalCreate() {
    const { data, setData, post, processing, errors } = useForm({
        tanggal: new Date().toISOString().split('T')[0],
        deskripsi: '',
        debet: '0',
        kredit: '0',
        keterangan: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('jurnal.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Jurnal" />
            <div className="mb-6">
                <Link href={route('jurnal.index')} className="text-sm text-[#000000] hover:text-[#3f3f46]">← Kembali</Link>
                <h1 className="text-2xl font-bold text-[#000000] mt-1">Tambah Jurnal</h1>
            </div>
            <div className="mx-auto max-w-lg card">
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-[#52525b]">Tanggal *</label>
                        <input type="date" value={data.tanggal} onChange={e => setData('tanggal', e.target.value)}
                            className="w-full input-shopify" />
                        {errors.tanggal && <p className="mt-1 text-xs text-red-500">{errors.tanggal}</p>}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-[#52525b]">Deskripsi *</label>
                        <input type="text" value={data.deskripsi} onChange={e => setData('deskripsi', e.target.value)}
                            placeholder="Misal: Penyesuaian stok akhir bulan"
                            className="w-full input-shopify" />
                        {errors.deskripsi && <p className="mt-1 text-xs text-red-500">{errors.deskripsi}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-[#52525b]">Debet (Rp) *</label>
                            <input type="number" value={data.debet} onChange={e => setData('debet', e.target.value)}
                                min="0" className="w-full input-shopify" />
                            {errors.debet && <p className="mt-1 text-xs text-red-500">{errors.debet}</p>}
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-[#52525b]">Kredit (Rp) *</label>
                            <input type="number" value={data.kredit} onChange={e => setData('kredit', e.target.value)}
                                min="0" className="w-full input-shopify" />
                            {errors.kredit && <p className="mt-1 text-xs text-red-500">{errors.kredit}</p>}
                        </div>
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-[#52525b]">Keterangan</label>
                        <textarea value={data.keterangan} onChange={e => setData('keterangan', e.target.value)}
                            rows={3} placeholder="Penjelasan tambahan..."
                            className="w-full input-shopify" />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <Link href={route('jurnal.index')}
                            className="rounded-lg border border-[#e4e4e7] px-4 py-2 text-sm text-[#52525b] hover:bg-[#f4f4f5]">Batal</Link>
                        <button type="submit" disabled={processing}
                            className="btn-primary">{processing ? '...' : 'Simpan'}</button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

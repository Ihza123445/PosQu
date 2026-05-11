import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function PengeluaranEdit({ pengeluaran }) {
    const { data, setData, put, processing } = useForm({
        kategori: pengeluaran.kategori,
        jumlah: pengeluaran.jumlah,
        keterangan: pengeluaran.keterangan ?? '',
        tanggal: pengeluaran.tanggal,
    });
    const submit = (e) => { e.preventDefault(); put(route('pengeluaran.update', pengeluaran.id)); };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Pengeluaran" />
            <div className="mb-6">
                <Link href={route('pengeluaran.index')} className="text-sm text-[#000000] hover:text-[#000000]/80">&larr; Kembali</Link>
                <h1 className="text-2xl font-bold text-[#000000] mt-1">Edit Pengeluaran</h1>
            </div>
            <div className="mx-auto max-w-lg card">
                <form onSubmit={submit} className="space-y-4">
                    <div><label className="mb-1 block text-sm font-medium text-[#52525b]">Kategori *</label>
                        <select value={data.kategori} onChange={e => setData('kategori', e.target.value)} className="input-shopify w-full" required>
                            <option>Bahan Baku</option><option>Gaji</option><option>Sewa</option><option>Listrik</option><option>Transport</option><option>Lain-lain</option>
                        </select>
                    </div>
                    <div><label className="mb-1 block text-sm font-medium text-[#52525b]">Jumlah *</label><input type="number" value={data.jumlah} onChange={e => setData('jumlah', e.target.value)} className="input-shopify w-full" required /></div>
                    <div><label className="mb-1 block text-sm font-medium text-[#52525b]">Tanggal *</label><input type="date" value={data.tanggal} onChange={e => setData('tanggal', e.target.value)} className="input-shopify w-full" /></div>
                    <div><label className="mb-1 block text-sm font-medium text-[#52525b]">Keterangan</label><textarea value={data.keterangan} onChange={e => setData('keterangan', e.target.value)} rows={2} className="input-shopify w-full" /></div>
                    <div className="flex justify-end gap-3 pt-4">
                        <Link href={route('pengeluaran.index')} className="btn-outline">Batal</Link>
                        <button type="submit" disabled={processing} className="btn-primary">{processing ? '...' : 'Simpan'}</button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

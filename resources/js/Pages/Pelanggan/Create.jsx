import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function PelangganCreate() {
    const { data, setData, post, processing, errors } = useForm({ nama: '', telepon: '', email: '', alamat: '', jenis_kelamin: '', tanggal_lahir: '' });
    const submit = (e) => { e.preventDefault(); post(route('pelanggan.store')); };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Pelanggan" />
            <div className="mb-6">
                <Link href={route('pelanggan.index')} className="text-sm text-[#000000] hover:text-[#000000]/80">&larr; Kembali</Link>
                <h1 className="text-2xl font-bold text-[#000000] mt-1">Tambah Pelanggan</h1>
            </div>
            <div className="mx-auto max-w-lg card">
                <form onSubmit={submit} className="space-y-4">
                    <div><label className="mb-1 block text-sm font-medium text-[#52525b]">Nama *</label><input type="text" value={data.nama} onChange={e => setData('nama', e.target.value)} className="input-shopify w-full" />{errors.nama && <p className="mt-1 text-xs text-red-500">{errors.nama}</p>}</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div><label className="mb-1 block text-sm font-medium text-[#52525b]">Telepon</label><input type="text" value={data.telepon} onChange={e => setData('telepon', e.target.value)} className="input-shopify w-full" /></div>
                        <div><label className="mb-1 block text-sm font-medium text-[#52525b]">Email</label><input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="input-shopify w-full" /></div>
                    </div>
                    <div><label className="mb-1 block text-sm font-medium text-[#52525b]">Alamat</label><textarea value={data.alamat} onChange={e => setData('alamat', e.target.value)} rows={2} className="input-shopify w-full" /></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div><label className="mb-1 block text-sm font-medium text-[#52525b]">Jenis Kelamin</label>
                            <select value={data.jenis_kelamin} onChange={e => setData('jenis_kelamin', e.target.value)} className="input-shopify w-full">
                                <option value="">-</option><option value="L">Laki-laki</option><option value="P">Perempuan</option>
                            </select>
                        </div>
                        <div><label className="mb-1 block text-sm font-medium text-[#52525b]">Tanggal Lahir</label><input type="date" value={data.tanggal_lahir} onChange={e => setData('tanggal_lahir', e.target.value)} className="input-shopify w-full" /></div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <Link href={route('pelanggan.index')} className="btn-outline">Batal</Link>
                        <button type="submit" disabled={processing} className="btn-primary">{processing ? '...' : 'Simpan'}</button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

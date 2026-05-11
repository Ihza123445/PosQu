import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function KategoriEdit({ kategori }) {
    const { data, setData, put, processing, errors } = useForm({
        nama: kategori.nama, deskripsi: kategori.deskripsi || '',
        icon: kategori.icon || '', warna: kategori.warna || '#6366F1',
        urutan: kategori.urutan, status: kategori.status, gambar: null,
    });
    const [preview, setPreview] = useState(null);

    const submit = (e) => {
        e.preventDefault();
        put(route('kategori.update', kategori.id), { forceFormData: true });
    };

    const handleGambar = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('gambar', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const fotoUrl = preview || kategori.gambar || null;

    return (
        <AuthenticatedLayout>
            <Head title="Edit Kategori" />
            <div className="mb-6">
                <Link href={route('kategori.index')} className="text-sm text-[#000000] hover:text-[#3f3f46]">← Kembali</Link>
                <h1 className="text-2xl font-bold text-[#000000] mt-1">Edit Kategori</h1>
            </div>
            <div className="mx-auto max-w-lg card">
                <form onSubmit={submit} className="space-y-4">
                    {/* Gambar */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-[#52525b]">Gambar</label>
                        {fotoUrl && (
                            <div className="mb-2 h-32 overflow-hidden rounded-lg">
                                <img src={fotoUrl} alt={kategori.nama} className="h-full w-full object-cover" />
                            </div>
                        )}
                        <input type="file" accept="image/*" onChange={handleGambar}
                            className="w-full text-sm text-[#52525b] file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#000000] file:text-white hover:file:bg-[#3f3f46]" />
                        {errors.gambar && <p className="mt-1 text-xs text-red-500">{errors.gambar}</p>}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-[#52525b]">Nama *</label>
                        <input type="text" value={data.nama} onChange={e => setData('nama', e.target.value)}
                            className="w-full input-shopify" />
                        {errors.nama && <p className="mt-1 text-xs text-red-500">{errors.nama}</p>}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-[#52525b]">Deskripsi</label>
                        <textarea value={data.deskripsi} onChange={e => setData('deskripsi', e.target.value)} rows={2}
                            className="w-full input-shopify" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-[#52525b]">Status</label>
                            <select value={data.status} onChange={e => setData('status', e.target.value)}
                                className="w-full input-shopify">
                                <option value="aktif">Aktif</option>
                                <option value="nonaktif">Nonaktif</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-[#52525b]">Urutan</label>
                            <input type="number" value={data.urutan} onChange={e => setData('urutan', e.target.value)}
                                className="w-full input-shopify" />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <Link href={route('kategori.index')} className="rounded-lg border border-[#e4e4e7] px-4 py-2 text-sm text-[#52525b] hover:bg-[#f4f4f5]">Batal</Link>
                        <button type="submit" disabled={processing} className="btn-primary">{processing ? '...' : 'Simpan'}</button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ProdukEdit({ produk, kategori }) {
    const { data, setData, put, processing, errors } = useForm({
        kategori_id: produk.kategori_id,
        nama: produk.nama,
        deskripsi: produk.deskripsi || '',
        harga_jual: produk.harga_jual,
        harga_modal: produk.harga_modal,
        min_stok: produk.min_stok,
        satuan: produk.satuan,
        is_favorit: produk.is_favorit,
        status: produk.status,
    });

    const submit = (e) => { e.preventDefault(); put(route('produk.update', produk.id)); };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Produk" />
            <div className="mb-6">
                <Link href={route('produk.index')} className="text-sm text-[#000000] hover:text-[#3f3f46]">← Kembali</Link>
                <h1 className="text-2xl font-bold text-[#000000] mt-1">Edit Produk</h1>
            </div>
            <div className="mx-auto max-w-2xl card">
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-[#52525b]">Kategori *</label>
                        <select value={data.kategori_id} onChange={e => setData('kategori_id', e.target.value)}
                            className="w-full input-shopify">
                            {kategori.map(k => <option key={k.id} value={k.id}>{k.nama}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-[#52525b]">Nama *</label>
                        <input type="text" value={data.nama} onChange={e => setData('nama', e.target.value)}
                            className="w-full input-shopify" />
                        {errors.nama && <p className="mt-1 text-xs text-red-500">{errors.nama}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-[#52525b]">Harga Jual *</label>
                            <input type="number" value={data.harga_jual} onChange={e => setData('harga_jual', e.target.value)}
                                className="w-full input-shopify" />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-[#52525b]">Harga Modal *</label>
                            <input type="number" value={data.harga_modal} onChange={e => setData('harga_modal', e.target.value)}
                                className="w-full input-shopify" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-[#52525b]">Min Stok</label>
                            <input type="number" value={data.min_stok} onChange={e => setData('min_stok', e.target.value)}
                                className="w-full input-shopify" />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-[#52525b]">Satuan *</label>
                            <input type="text" value={data.satuan} onChange={e => setData('satuan', e.target.value)}
                                className="w-full input-shopify" />
                        </div>
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-[#52525b]">Status</label>
                        <select value={data.status} onChange={e => setData('status', e.target.value)}
                            className="w-full input-shopify">
                            <option value="aktif">Aktif</option>
                            <option value="habis">Habis</option>
                            <option value="nonaktif">Nonaktif</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" checked={data.is_favorit} onChange={e => setData('is_favorit', e.target.checked)}
                            className="rounded border-[#e4e4e7] text-[#000000]" />
                        <label className="text-sm font-medium text-[#52525b]">Produk Favorit</label>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <Link href={route('produk.index')} className="rounded-lg border border-[#e4e4e7] px-4 py-2 text-sm text-[#52525b] hover:bg-[#f4f4f5]">Batal</Link>
                        <button type="submit" disabled={processing} className="btn-primary">
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

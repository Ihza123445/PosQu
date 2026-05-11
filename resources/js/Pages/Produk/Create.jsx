import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { formatRupiah } from '@/lib/format';

export default function ProdukCreate({ kategori, outlets }) {
    const user = usePage().props.auth.user;
    const isSuperAdmin = !user.outlet_id;

    const { data, setData, post, processing, errors } = useForm({
        kategori_id: '',
        nama: '',
        deskripsi: '',
        harga_jual: '',
        harga_modal: '',
        stok: '0',
        min_stok: '5',
        satuan: 'pcs',
        outlet_id: '',
        is_favorit: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('produk.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Produk" />
            <div className="mb-6">
                <Link href={route('produk.index')} className="text-sm text-[#000000] hover:text-[#3f3f46]">← Kembali</Link>
                <h1 className="text-2xl font-bold text-[#000000] mt-1">Tambah Produk</h1>
            </div>

            <div className="mx-auto max-w-2xl card">
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-[#52525b]">Kategori *</label>
                        <select value={data.kategori_id} onChange={e => setData('kategori_id', e.target.value)}
                            className="w-full input-shopify">
                            <option value="">Pilih Kategori</option>
                            {kategori.map(k => <option key={k.id} value={k.id}>{k.nama}</option>)}
                        </select>
                        {errors.kategori_id && <p className="mt-1 text-xs text-red-500">{errors.kategori_id}</p>}
                    </div>

                    {isSuperAdmin && (
                        <div>
                            <label className="mb-1 block text-sm font-medium text-[#52525b]">Outlet *</label>
                            <select value={data.outlet_id} onChange={e => setData('outlet_id', e.target.value)}
                                className="w-full input-shopify">
                                <option value="">Pilih Outlet</option>
                                {outlets.map(o => <option key={o.id} value={o.id}>{o.nama}</option>)}
                            </select>
                            {errors.outlet_id && <p className="mt-1 text-xs text-red-500">{errors.outlet_id}</p>}
                        </div>
                    )}

                    <div>
                        <label className="mb-1 block text-sm font-medium text-[#52525b]">Nama Produk *</label>
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

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-[#52525b]">Stok *</label>
                            <input type="number" value={data.stok} onChange={e => setData('stok', e.target.value)}
                                className="w-full input-shopify" />
                        </div>
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
                        <label className="mb-1 block text-sm font-medium text-[#52525b]">Deskripsi</label>
                        <textarea value={data.deskripsi} onChange={e => setData('deskripsi', e.target.value)} rows={3}
                            className="w-full input-shopify" />
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

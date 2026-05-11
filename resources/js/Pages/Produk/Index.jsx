import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { formatRupiah, statusBadge } from '@/lib/format';
import { useState } from 'react';

export default function ProdukIndex({ produk, kategori, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [kategoriId, setKategoriId] = useState(filters.kategori_id || '');

    const searchHandler = (e) => {
        e.preventDefault();
        router.get('/produk', { search, kategori_id: kategoriId, status: filters.status }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Produk" />
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-[#000000]">Produk</h1>
                    <p className="text-sm text-[#a1a1aa]">Kelola menu & produk</p>
                </div>
                <Link href={route('produk.create')} className="btn-primary">
                    + Tambah Produk
                </Link>
            </div>

            <div className="card mb-6">
                <form onSubmit={searchHandler} className="flex flex-wrap gap-3">
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari produk..." className="input-shopify" />
                    <select value={kategoriId} onChange={e => setKategoriId(e.target.value)} className="input-shopify">
                        <option value="">Semua Kategori</option>
                        {kategori.map(k => <option key={k.id} value={k.id}>{k.nama}</option>)}
                    </select>
                    <button type="submit" className="btn-primary">Cari</button>
                </form>
            </div>

            <div className="overflow-hidden card">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-[#e4e4e7] bg-[#f4f4f5]">
                            <tr>
                                <th className="px-4 py-3 font-medium text-[#52525b] w-12"></th>
                                <th className="px-4 py-3 font-medium text-[#52525b]">Nama</th>
                                <th className="px-4 py-3 font-medium text-[#52525b]">Kategori</th>
                                <th className="px-4 py-3 font-medium text-[#52525b]">Harga Jual</th>
                                <th className="px-4 py-3 font-medium text-[#52525b]">Stok</th>
                                <th className="px-4 py-3 font-medium text-[#52525b]">Status</th>
                                <th className="px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#e4e4e7]">
                            {produk.data.map((p) => (
                                <tr key={p.id} className="hover:bg-[#f4f4f5]">
                                    <td className="px-4 py-3">
                                        <img
                                            src={p.gambar || 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=80&h=80&fit=crop'}
                                            alt={p.nama}
                                            className="h-10 w-10 rounded-md object-cover"
                                            loading="lazy"
                                            onError={(e) => { e.target.style.display = 'none'; }}
                                        />
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="font-medium text-[#000000]">{p.nama}</p>
                                        <p className="text-xs text-[#a1a1aa]">{p.satuan}</p>
                                    </td>
                                    <td className="px-4 py-3 text-[#52525b]">{p.kategori?.nama}</td>
                                    <td className="px-4 py-3 font-medium text-[#000000]">{formatRupiah(p.harga_jual)}</td>
                                    <td className="px-4 py-3">
                                        <span className={`font-medium ${p.stok <= p.min_stok ? 'text-[#000000]' : 'text-[#000000]'}`}>{p.stok}</span>
                                        <span className="text-xs text-[#a1a1aa]"> / min {p.min_stok}</span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={statusBadge(p.status)}>{p.status}</span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <Link href={route('produk.edit', p.id)} className="text-sm text-[#000000] hover:text-[#3f3f46]">Edit</Link>
                                        <Link href={route('produk.show', p.id)} className="ml-3 text-sm text-[#52525b] hover:text-[#000000]">Detail</Link>
                                    </td>
                                </tr>
                            ))}
                            {produk.data.length === 0 && (
                                <tr><td colSpan={7} className="px-4 py-8 text-center text-[#a1a1aa]">Belum ada produk.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {produk.links && (
                <div className="mt-4 flex justify-center gap-2">
                    {produk.links.map((link, i) => (
                        <button key={i} disabled={!link.url} onClick={() => router.get(link.url)} dangerouslySetInnerHTML={{ __html: link.label }}
                            className={`rounded px-3 py-1 text-sm ${link.active ? 'bg-[#000000] text-white' : link.url ? 'bg-white text-[#52525b] hover:bg-[#f4f4f5]' : 'bg-[#f4f4f5] text-[#a1a1aa]'}`} />
                    ))}
                </div>
            )}
        </AuthenticatedLayout>
    );
}

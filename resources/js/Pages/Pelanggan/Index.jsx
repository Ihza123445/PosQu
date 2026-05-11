import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { formatRupiah } from '@/lib/format';
import { useState } from 'react';

export default function PelangganIndex({ pelanggan, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const cari = (e) => { e.preventDefault(); router.get('/pelanggan', { search }, { preserveState: true }); };

    return (
        <AuthenticatedLayout>
            <Head title="Pelanggan" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
                <div><h1 className="text-2xl font-bold text-[#000000]">Pelanggan</h1><p className="text-sm text-[#a1a1aa]">Data pelanggan</p></div>
                <Link href={route('pelanggan.create')} className="btn-primary">+ Tambah</Link>
            </div>
            <div className="card mb-6">
                <form onSubmit={cari} className="flex flex-col sm:flex-row gap-3">
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari nama/telepon..." className="input-shopify flex-1" />
                    <button type="submit" className="btn-primary">Cari</button>
                </form>
            </div>
            <div className="card overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="border-b bg-[#f4f4f5]">
                        <tr>
                            <th className="px-4 py-3 font-medium text-[#52525b]">Nama</th>
                            <th className="px-4 py-3 font-medium text-[#52525b]">Telepon</th>
                            <th className="px-4 py-3 font-medium text-[#52525b]">Total Belanja</th>
                            <th className="px-4 py-3 font-medium text-[#52525b]">Transaksi</th>
                            <th className="px-4 py-3 font-medium text-[#52525b]">Poin</th>
                            <th className="px-4 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {pelanggan.data.map(p => (
                            <tr key={p.id} className="hover:bg-[#f4f4f5]">
                                <td className="px-4 py-3 font-medium text-[#000000]">{p.nama}</td>
                                <td className="px-4 py-3 text-[#52525b]">{p.telepon || '-'}</td>
                                <td className="px-4 py-3 font-medium">{formatRupiah(p.total_pembelian)}</td>
                                <td className="px-4 py-3 text-[#52525b]">{p.total_transaksi}</td>
                                <td className="px-4 py-3 text-[#52525b]">{p.loyalty_points}</td>
                                <td className="px-4 py-3 text-right"><Link href={route('pelanggan.edit', p.id)} className="text-sm text-[#000000] hover:text-[#000000]/80">Edit</Link></td>
                            </tr>
                        ))}
                        {pelanggan.data.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-[#a1a1aa]">Belum ada pelanggan.</td></tr>}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}

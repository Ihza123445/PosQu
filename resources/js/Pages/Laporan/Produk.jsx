import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { formatRupiah } from '@/lib/format';
import { useState } from 'react';

export default function LaporanProduk({ data, dari, sampai }) {
    const [d, setD] = useState(dari);
    const [s, setS] = useState(sampai);
    const filter = () => router.get('/laporan/produk', { dari: d, sampai: s }, { preserveState: true });

    return (
        <AuthenticatedLayout>
            <Head title="Laporan Produk" />
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#000000]">Penjualan per Produk</h1>
            </div>
            <div className="mb-6 card">
                <div className="flex flex-col sm:flex-row gap-3 items-end">
                    <div className="w-full sm:w-auto"><label className="block text-xs text-[#a1a1aa] mb-1">Dari</label><input type="date" value={d} onChange={e => setD(e.target.value)} className="w-full sm:w-auto input-shopify" /></div>
                    <div className="w-full sm:w-auto"><label className="block text-xs text-[#a1a1aa] mb-1">Sampai</label><input type="date" value={s} onChange={e => setS(e.target.value)} className="w-full sm:w-auto input-shopify" /></div>
                    <button onClick={filter} className="btn-primary">Tampilkan</button>
                </div>
            </div>
            <div className="card overflow-hidden !p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b bg-[#f4f4f5]">
                            <tr><th className="px-4 py-3 font-medium text-[#52525b]">Produk</th><th className="px-4 py-3 font-medium text-[#52525b]">Kategori</th><th className="px-4 py-3 font-medium text-[#52525b]">Terjual</th><th className="px-4 py-3 font-medium text-[#52525b] text-right">Revenue</th><th className="px-4 py-3 font-medium text-[#52525b] text-right">Modal</th><th className="px-4 py-3 font-medium text-[#52525b] text-right">Laba</th></tr>
                        </thead>
                        <tbody className="divide-y">
                            {data.map((item, i) => (
                                <tr key={i}>
                                    <td className="px-4 py-3 font-medium text-[#000000]">{item.produk}</td>
                                    <td className="px-4 py-3 text-[#a1a1aa]">{item.kategori}</td>
                                    <td className="px-4 py-3">{item.total_terjual}</td>
                                    <td className="px-4 py-3 text-right">{formatRupiah(item.total_revenue)}</td>
                                    <td className="px-4 py-3 text-right text-red-600">{formatRupiah(item.total_modal)}</td>
                                    <td className="px-4 py-3 text-right font-semibold text-green-600">{formatRupiah(item.laba)}</td>
                                </tr>
                            )) || <tr><td colSpan={6} className="px-4 py-8 text-center text-[#a1a1aa]">Belum ada data.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

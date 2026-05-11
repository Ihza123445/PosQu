import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { formatRupiah, formatTanggal } from '@/lib/format';
import { useState } from 'react';

export default function PengeluaranIndex({ pengeluaran, filters }) {
    const [dari, setDari] = useState(filters.dari || '');
    const [sampai, setSampai] = useState(filters.sampai || '');

    return (
        <AuthenticatedLayout>
            <Head title="Pengeluaran" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
                <div><h1 className="text-2xl font-bold text-[#000000]">Pengeluaran</h1><p className="text-sm text-[#a1a1aa]">Biaya operasional</p></div>
                <Link href={route('pengeluaran.create')} className="btn-primary">+ Catat</Link>
            </div>
            <div className="card overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="border-b bg-[#f4f4f5]">
                        <tr><th className="px-4 py-3 font-medium text-[#52525b]">Tanggal</th><th className="px-4 py-3 font-medium text-[#52525b]">Kategori</th><th className="px-4 py-3 font-medium text-[#52525b]">Jumlah</th><th className="px-4 py-3 font-medium text-[#52525b]">Keterangan</th><th className="px-4 py-3 font-medium text-[#52525b]">Dicatat oleh</th><th></th></tr>
                    </thead>
                    <tbody className="divide-y">
                        {pengeluaran.data?.map(p => (
                            <tr key={p.id} className="hover:bg-[#f4f4f5]">
                                <td className="px-4 py-3 text-[#52525b]">{formatTanggal(p.tanggal)}</td>
                                <td className="px-4 py-3 font-medium text-[#000000]">{p.kategori}</td>
                                <td className="px-4 py-3 font-semibold text-red-600">{formatRupiah(p.jumlah)}</td>
                                <td className="px-4 py-3 text-xs text-[#a1a1aa]">{p.keterangan || '-'}</td>
                                <td className="px-4 py-3 text-[#a1a1aa]">{p.pengguna?.nama}</td>
                                <td className="px-4 py-3 text-right"><Link href={route('pengeluaran.edit', p.id)} className="text-xs text-[#000000] hover:text-[#000000]/80">Edit</Link></td>
                            </tr>
                        )) || <tr><td colSpan={6} className="px-4 py-8 text-center text-[#a1a1aa]">Belum ada data.</td></tr>}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}

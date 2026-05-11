import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { formatRupiah } from '@/lib/format';
import { useState } from 'react';

export default function BukuBesar({ data, dari, sampai }) {
    const [d, setD] = useState(dari);
    const [s, setS] = useState(sampai);
    const filter = () => router.get('/laporan/buku-besar', { dari: d, sampai: s }, { preserveState: true });

    return (
        <AuthenticatedLayout>
            <Head title="Buku Besar" />
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#000000]">Buku Besar</h1>
                <p className="text-sm text-[#a1a1aa]">Semua transaksi keuangan dalam satu tampilan</p>
            </div>
            <div className="mb-6 card">
                <div className="flex flex-col sm:flex-row gap-3 items-end">
                    <div className="w-full sm:w-auto">
                        <label className="block text-xs text-[#a1a1aa] mb-1">Dari</label>
                        <input type="date" value={d} onChange={e => setD(e.target.value)} className="w-full sm:w-auto input-shopify" />
                    </div>
                    <div className="w-full sm:w-auto">
                        <label className="block text-xs text-[#a1a1aa] mb-1">Sampai</label>
                        <input type="date" value={s} onChange={e => setS(e.target.value)} className="w-full sm:w-auto input-shopify" />
                    </div>
                    <button onClick={filter} className="btn-primary">Tampilkan</button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="card">
                    <p className="text-sm text-[#a1a1aa]">Total Debet</p>
                    <p className="text-xl font-bold text-[#000000]">{formatRupiah(data.total_debet)}</p>
                </div>
                <div className="card">
                    <p className="text-sm text-[#a1a1aa]">Total Kredit</p>
                    <p className="text-xl font-bold text-red-600">{formatRupiah(data.total_kredit)}</p>
                </div>
                <div className="card">
                    <p className="text-sm text-[#a1a1aa]">Saldo Akhir</p>
                    <p className={`text-xl font-bold ${data.saldo_akhir >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatRupiah(data.saldo_akhir)}
                    </p>
                </div>
            </div>
            <div className="card overflow-hidden !p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b bg-[#f4f4f5]">
                            <tr>
                                <th className="px-4 py-3 font-medium text-[#52525b]">Tanggal</th>
                                <th className="px-4 py-3 font-medium text-[#52525b]">Tipe</th>
                                <th className="px-4 py-3 font-medium text-[#52525b]">Nomor</th>
                                <th className="px-4 py-3 font-medium text-[#52525b]">Deskripsi</th>
                                <th className="px-4 py-3 font-medium text-[#52525b] text-right">Debet</th>
                                <th className="px-4 py-3 font-medium text-[#52525b] text-right">Kredit</th>
                                <th className="px-4 py-3 font-medium text-[#52525b] text-right">Saldo</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {data.entries.length > 0 ? data.entries.map((e, i) => (
                                <tr key={i} className="hover:bg-[#f4f4f5]">
                                    <td className="px-4 py-3 text-xs text-[#52525b]">{e.tanggal}</td>
                                    <td className="px-4 py-3">
                                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                            e.tipe === 'Penjualan' ? 'bg-[#c1fbd4] text-green-800' :
                                            e.tipe === 'Pengeluaran' ? 'bg-[#fce4ec] text-red-800' :
                                            'bg-[#e0e0e0] text-[#52525b]'
                                        }`}>{e.tipe}</span>
                                    </td>
                                    <td className="px-4 py-3 text-xs font-mono text-[#52525b]">{e.nomor}</td>
                                    <td className="px-4 py-3 text-[#000000]">{e.deskripsi}</td>
                                    <td className="px-4 py-3 text-right font-mono text-green-600">{e.debet > 0 ? formatRupiah(e.debet) : '-'}</td>
                                    <td className="px-4 py-3 text-right font-mono text-red-600">{e.kredit > 0 ? formatRupiah(e.kredit) : '-'}</td>
                                    <td className="px-4 py-3 text-right font-mono font-medium">{formatRupiah(e.saldo)}</td>
                                </tr>
                            )) : (
                                <tr><td colSpan={7} className="px-4 py-8 text-center text-[#a1a1aa]">Belum ada data.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

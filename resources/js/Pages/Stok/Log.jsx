import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { formatDate } from '@/lib/format';

export default function StokLog({ stokLog, filters }) {
    return (
        <AuthenticatedLayout>
            <Head title="Stok Log" />
            <div className="flex items-center justify-between mb-6">
                <div><h1 className="text-2xl font-bold text-[#000000]">Riwayat Stok</h1><p className="text-sm text-[#a1a1aa]">Log perubahan stok</p></div>
                <Link href={route('stok.adjustment')} className="btn-primary">Adjustment Stok</Link>
            </div>
            <div className="overflow-hidden card">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-[#e4e4e7] bg-[#f4f4f5]">
                            <tr>
                                <th className="px-4 py-3 font-medium text-[#52525b]">Waktu</th>
                                <th className="px-4 py-3 font-medium text-[#52525b]">Produk</th>
                                <th className="px-4 py-3 font-medium text-[#52525b]">Jenis</th>
                                <th className="px-4 py-3 font-medium text-[#52525b]">Qty</th>
                                <th className="px-4 py-3 font-medium text-[#52525b]">Stok</th>
                                <th className="px-4 py-3 font-medium text-[#52525b]">Keterangan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#e4e4e7]">
                            {stokLog.data?.map(log => (
                                <tr key={log.id} className="hover:bg-[#f4f4f5]">
                                    <td className="px-4 py-3 text-xs text-[#a1a1aa]">{formatDate(log.created_at)}</td>
                                    <td className="px-4 py-3 font-medium text-[#000000]">{log.produk?.nama}</td>
                                    <td className="px-4 py-3"><span className={`${log.jenis === 'masuk' ? 'badge-success' : 'badge-neutral'}`}>{log.jenis}</span></td>
                                    <td className="px-4 py-3 font-mono font-medium">{log.qty > 0 ? `+${log.qty}` : log.qty}</td>
                                    <td className="px-4 py-3 text-[#52525b]">{log.stok_sebelum} → {log.stok_sesudah}</td>
                                    <td className="px-4 py-3 text-xs text-[#a1a1aa]">{log.keterangan}</td>
                                </tr>
                            )) || <tr><td colSpan={6} className="px-4 py-8 text-center text-[#a1a1aa]">Belum ada data.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

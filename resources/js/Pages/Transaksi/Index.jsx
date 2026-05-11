import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { formatRupiah, formatDate, statusBadge } from '@/lib/format';
import { useState } from 'react';

export default function TransaksiIndex({ transaksi, filters }) {
    const [dari, setDari] = useState(filters.dari || '');
    const [sampai, setSampai] = useState(filters.sampai || '');
    const [status, setStatus] = useState(filters.status || '');

    const filter = () => {
        router.get('/transaksi', { dari, sampai, status }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Transaksi" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-[#000000]">Transaksi</h1>
                    <p className="text-sm text-[#a1a1aa]">Riwayat transaksi penjualan</p>
                </div>
                <Link href={route('transaksi.pos')} className="btn-primary">+ POS Baru</Link>
            </div>

            <div className="card mb-6">
                <div className="flex flex-wrap gap-3 items-end">
                    <div><label className="block text-xs text-[#a1a1aa] mb-1">Dari</label><input type="date" value={dari} onChange={e => setDari(e.target.value)} className="input-shopify" /></div>
                    <div><label className="block text-xs text-[#a1a1aa] mb-1">Sampai</label><input type="date" value={sampai} onChange={e => setSampai(e.target.value)} className="input-shopify" /></div>
                    <div><label className="block text-xs text-[#a1a1aa] mb-1">Status</label>
                        <select value={status} onChange={e => setStatus(e.target.value)} className="input-shopify">
                            <option value="">Semua</option>
                            <option value="selesai">Selesai</option>
                            <option value="batal">Batal</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                    <button onClick={filter} className="btn-primary">Filter</button>
                </div>
            </div>

            <div className="card overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="border-b bg-[#f4f4f5]">
                        <tr>
                            <th className="px-4 py-3 font-medium text-[#52525b]">Kode</th>
                            <th className="px-4 py-3 font-medium text-[#52525b]">Waktu</th>
                            <th className="px-4 py-3 font-medium text-[#52525b]">Pembayaran</th>
                            <th className="px-4 py-3 font-medium text-[#52525b]">Total</th>
                            <th className="px-4 py-3 font-medium text-[#52525b]">Status</th>
                            <th className="px-4 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {transaksi.data.map((t) => (
                            <tr key={t.id} className="hover:bg-[#f4f4f5]">
                                <td className="px-4 py-3 font-mono text-xs font-medium text-[#000000]">{t.kode_transaksi}</td>
                                <td className="px-4 py-3 text-[#52525b]">{formatDate(t.transaction_datetime)}</td>
                                <td className="px-4 py-3 text-[#52525b]">{t.metode_pembayaran?.nama}</td>
                                <td className="px-4 py-3 font-semibold text-[#000000]">{formatRupiah(t.total)}</td>
                                <td className="px-4 py-3"><span className={statusBadge(t.status)}>{t.status}</span></td>
                                <td className="px-4 py-3 text-right"><Link href={route('transaksi.show', t.id)} className="text-sm text-[#000000] hover:text-[#000000]/80">Detail</Link></td>
                            </tr>
                        ))}
                        {transaksi.data.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-[#a1a1aa]">Belum ada transaksi.</td></tr>}
                    </tbody>
                </table>
            </div>
            {transaksi.links && (
                <div className="mt-4 flex justify-center gap-2 flex-wrap">
                    {transaksi.links.map((link, i) => (
                        <button key={i} disabled={!link.url} onClick={() => router.get(link.url)}
                            className={`rounded px-3 py-1 text-sm ${link.active ? 'btn-primary' : link.url ? 'btn-outline' : 'bg-[#f4f4f5] text-[#a1a1aa]'}`}
                            dangerouslySetInnerHTML={{ __html: link.label }} />
                    ))}
                </div>
            )}
        </AuthenticatedLayout>
    );
}

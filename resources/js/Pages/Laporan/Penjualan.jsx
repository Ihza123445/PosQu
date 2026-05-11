import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { formatRupiah, formatDate } from '@/lib/format';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

const GRADIENT_COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7'];

function CustomTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-xl border border-[#e4e4e7] bg-white px-4 py-3 shadow-xl">
            <p className="text-xs text-[#a1a1aa] mb-1">{label}</p>
            <p className="text-base font-bold text-[#000000]">{formatRupiah(payload[0].value)}</p>
            {payload[0]?.payload?.jumlah_transaksi > 0 && (
                <p className="text-xs text-[#71717a] mt-1">{payload[0].payload.jumlah_transaksi} transaksi</p>
            )}
        </div>
    );
}

export default function LaporanPenjualan({ data, trendHarian = [], dari, sampai }) {
    const [d, setD] = useState(dari);
    const [s, setS] = useState(sampai);

    const filter = () => router.get('/laporan/penjualan', { dari: d, sampai: s }, { preserveState: true });

    const chartData = trendHarian.map(t => ({
        ...t,
        tanggal: new Date(t.tanggal).getDate() + '/' + (new Date(t.tanggal).getMonth() + 1),
    }));

    return (
        <AuthenticatedLayout>
            <Head title="Laporan Penjualan" />
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#000000]">Laporan Penjualan</h1>
            </div>
            <div className="mb-6 card">
                <div className="flex flex-col sm:flex-row gap-3 items-end">
                    <div className="w-full sm:w-auto"><label className="block text-xs text-[#a1a1aa] mb-1">Dari</label><input type="date" value={d} onChange={e => setD(e.target.value)} className="w-full sm:w-auto input-shopify" /></div>
                    <div className="w-full sm:w-auto"><label className="block text-xs text-[#a1a1aa] mb-1">Sampai</label><input type="date" value={s} onChange={e => setS(e.target.value)} className="w-full sm:w-auto input-shopify" /></div>
                    <button onClick={filter} className="btn-primary">Tampilkan</button>
                </div>
            </div>

            {/* Summary cards with icons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="card overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -translate-y-8 translate-x-8" />
                    <p className="text-sm text-[#a1a1aa] relative">Total Omzet</p>
                    <p className="text-xl font-bold text-[#000000] mt-1 relative">{formatRupiah(data.total_omzet)}</p>
                </div>
                <div className="card overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-full -translate-y-8 translate-x-8" />
                    <p className="text-sm text-[#a1a1aa] relative">Jumlah Transaksi</p>
                    <p className="text-xl font-bold text-[#000000] mt-1 relative">{data.jumlah_transaksi}</p>
                </div>
                <div className="card overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full -translate-y-8 translate-x-8" />
                    <p className="text-sm text-[#a1a1aa] relative">Rata-rata</p>
                    <p className="text-xl font-bold text-[#000000] mt-1 relative">{formatRupiah(data.rata_rata)}</p>
                </div>
            </div>

            {/* Trend chart */}
            {chartData.length > 1 && (
                <div className="mb-6 card">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-[#000000]">Trend Harian</h2>
                        <span className="text-xs text-[#a1a1aa] bg-[#f4f4f5] px-2 py-1 rounded-full">
                            {chartData.length} hari
                        </span>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" vertical={false} />
                            <XAxis dataKey="tanggal" tick={{ fontSize: 12, fill: '#a1a1aa' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 12, fill: '#a1a1aa' }} axisLine={false} tickLine={false} tickFormatter={(v) => 'Rp' + (v / 1000).toFixed(0) + 'k'} />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f4f4f5' }} />
                            <Bar dataKey="omzet" radius={[6, 6, 0, 0]} maxBarSize={44}>
                                {chartData.map((_, i) => (
                                    <Cell key={i} fill={GRADIENT_COLORS[i % GRADIENT_COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

            {/* Transactions table */}
            <div className="overflow-hidden card !p-0">
                <div className="px-4 py-3 border-b border-[#e4e4e7]">
                    <h2 className="text-sm font-semibold text-[#000000]">Riwayat Transaksi</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#fafafa]">
                            <tr><th className="px-4 py-3 font-medium text-[#52525b] text-xs uppercase tracking-wider">Kode</th><th className="px-4 py-3 font-medium text-[#52525b] text-xs uppercase tracking-wider">Waktu</th><th className="px-4 py-3 font-medium text-[#52525b] text-xs uppercase tracking-wider">Metode</th><th className="px-4 py-3 font-medium text-[#52525b] text-xs uppercase tracking-wider">Kasir</th><th className="px-4 py-3 font-medium text-[#52525b] text-xs uppercase tracking-wider text-right">Total</th></tr>
                        </thead>
                        <tbody className="divide-y divide-[#f4f4f5]">
                            {data.transaksi?.map(t => (
                                <tr key={t.id} className="hover:bg-[#fafafa] transition-colors">
                                    <td className="px-4 py-3 font-mono text-xs text-[#000000]">{t.kode_transaksi}</td>
                                    <td className="px-4 py-3 text-[#52525b]">{formatDate(t.transaction_datetime)}</td>
                                    <td className="px-4 py-3 text-[#52525b]">{t.metode_pembayaran?.nama}</td>
                                    <td className="px-4 py-3 text-[#52525b]">{t.pengguna?.nama}</td>
                                    <td className="px-4 py-3 text-right font-semibold text-[#000000]">{formatRupiah(t.total)}</td>
                                </tr>
                            )) || <tr><td colSpan={5} className="px-4 py-8 text-center text-[#a1a1aa]">Belum ada data.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

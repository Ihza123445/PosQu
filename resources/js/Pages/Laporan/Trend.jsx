import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { formatRupiah } from '@/lib/format';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, Cell, Area } from 'recharts';

const NAMA_BULAN = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
const BAR_COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e', '#f97316', '#f59e0b', '#10b981', '#14b8a6', '#06b6d4'];

function OmzetTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-xl border border-[#e4e4e7] bg-white px-4 py-3 shadow-xl">
            <p className="text-xs text-[#a1a1aa] mb-1">{label}</p>
            <p className="text-base font-bold text-[#000000]">{formatRupiah(payload[0].value)}</p>
        </div>
    );
}

function TransaksiTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-xl border border-[#e4e4e7] bg-white px-4 py-3 shadow-xl">
            <p className="text-xs text-[#a1a1aa] mb-1">{label}</p>
            <p className="text-base font-bold text-[#000000]">{payload[0].value} transaksi</p>
        </div>
    );
}

export default function Trend({ data, tahun }) {
    const [th, setTh] = useState(tahun);
    const filter = () => router.get('/laporan/trend', { tahun: th }, { preserveState: true });

    const bulan = Array.from({ length: 12 }, (_, i) => {
        const d = data.find(d => d.bulan === i + 1);
        return { bulan: i + 1, nama: NAMA_BULAN[i + 1], omzet: d ? Number(d.omzet) : 0, transaksi: d ? Number(d.jumlah_transaksi) : 0 };
    });

    const totalOmzet = bulan.reduce((s, b) => s + b.omzet, 0);
    const totalTransaksi = bulan.reduce((s, b) => s + b.transaksi, 0);
    const bulanAktif = bulan.filter(b => b.omzet > 0).length;

    return (
        <AuthenticatedLayout>
            <Head title="Trend Penjualan" />
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#000000]">Trend Penjualan</h1>
                <p className="text-sm text-[#a1a1aa]">Tahun {tahun}</p>
            </div>
            <div className="mb-6 card">
                <div className="flex flex-col sm:flex-row gap-3 items-end">
                    <div className="w-full sm:w-auto">
                        <label className="block text-xs text-[#a1a1aa] mb-1">Tahun</label>
                        <select value={th} onChange={e => setTh(e.target.value)} className="w-full sm:w-auto input-shopify">
                            {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                    <button onClick={filter} className="btn-primary">Tampilkan</button>
                </div>
            </div>

            {/* Summary row */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
                <div className="card overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -translate-y-8 translate-x-8" />
                    <p className="text-sm text-[#a1a1aa] relative">Total Omzet</p>
                    <p className="text-xl font-bold text-[#000000] mt-1 relative">{formatRupiah(totalOmzet)}</p>
                </div>
                <div className="card overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-full -translate-y-8 translate-x-8" />
                    <p className="text-sm text-[#a1a1aa] relative">Total Transaksi</p>
                    <p className="text-xl font-bold text-[#000000] mt-1 relative">{totalTransaksi}</p>
                </div>
                <div className="card overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full -translate-y-8 translate-x-8" />
                    <p className="text-sm text-[#a1a1aa] relative">Rata-rata / Bulan</p>
                    <p className="text-xl font-bold text-[#000000] mt-1 relative">{formatRupiah(Math.round(totalOmzet / (bulanAktif || 1)))}</p>
                </div>
                <div className="card overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-full -translate-y-8 translate-x-8" />
                    <p className="text-sm text-[#a1a1aa] relative">Bulan Aktif</p>
                    <p className="text-xl font-bold text-[#000000] mt-1 relative">{bulanAktif} / 12</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Omzet Bar Chart */}
                <div className="card">
                    <h2 className="text-lg font-semibold text-[#000000] mb-4">Omzet per Bulan</h2>
                    {totalOmzet > 0 ? (
                        <ResponsiveContainer width="100%" height={320}>
                            <BarChart data={bulan} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" vertical={false} />
                                <XAxis dataKey="nama" tick={{ fontSize: 12, fill: '#a1a1aa' }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 12, fill: '#a1a1aa' }} axisLine={false} tickLine={false} tickFormatter={(v) => 'Rp' + (v / 1000).toFixed(0) + 'k'} />
                                <Tooltip content={<OmzetTooltip />} cursor={{ fill: '#f4f4f5' }} />
                                <Bar dataKey="omzet" radius={[6, 6, 0, 0]} maxBarSize={36}>
                                    {bulan.map((_, i) => (
                                        <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-[320px]">
                            <p className="text-[#a1a1aa]">Belum ada data penjualan di tahun {tahun}.</p>
                        </div>
                    )}
                </div>

                {/* Transaksi Line Chart */}
                <div className="card">
                    <h2 className="text-lg font-semibold text-[#000000] mb-4">Jumlah Transaksi per Bulan</h2>
                    {totalTransaksi > 0 ? (
                        <ResponsiveContainer width="100%" height={320}>
                            <LineChart data={bulan} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                                <defs>
                                    <linearGradient id="transaksiGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" vertical={false} />
                                <XAxis dataKey="nama" tick={{ fontSize: 12, fill: '#a1a1aa' }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 12, fill: '#a1a1aa' }} axisLine={false} tickLine={false} />
                                <Tooltip content={<TransaksiTooltip />} />
                                <Area type="monotone" dataKey="transaksi" stroke="none" fill="url(#transaksiGradient)" />
                                <Line type="monotone" dataKey="transaksi" stroke="#6366f1" strokeWidth={3} dot={{ fill: '#6366f1', stroke: '#fff', strokeWidth: 2, r: 5 }} activeDot={{ fill: '#6366f1', stroke: '#fff', strokeWidth: 2, r: 7 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-[320px]">
                            <p className="text-[#a1a1aa]">Belum ada data transaksi di tahun {tahun}.</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

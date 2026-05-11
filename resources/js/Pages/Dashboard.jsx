import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { formatRupiah } from '@/lib/format';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

const BAR_COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#10b981', '#14b8a6'];
const TREND_COLORS = ['#3b82f6', '#4f8af7', '#6366f1', '#7c6ff0', '#8b5cf6', '#a855f7', '#c084fc'];

function TrendTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-xl border border-[#e4e4e7] bg-white px-4 py-3 shadow-xl min-w-[160px]">
            <p className="text-xs font-medium text-[#52525b] mb-2">{label}</p>
            {payload.map((p, i) => (
                <div key={i} className="flex items-center justify-between gap-4 py-0.5">
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                        <span className="text-xs text-[#71717a]">{p.name}</span>
                    </div>
                    <span className="text-xs font-semibold text-[#000000]">
                        {p.dataKey === 'omzet' ? formatRupiah(p.value) : p.value + ' trx'}
                    </span>
                </div>
            ))}
            <div className="mt-2 pt-2 border-t border-[#e4e4e7] flex justify-between text-xs">
                <span className="text-[#a1a1aa]">Rata-rata</span>
                <span className="font-semibold text-[#000000]">
                    {formatRupiah(Math.round(payload.reduce((s, p) => s + (p.dataKey === 'omzet' ? p.value : 0), 0) / payload.length))}
                </span>
            </div>
        </div>
    );
}

function ProductTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-xl border border-[#e4e4e7] bg-white px-4 py-3 shadow-xl">
            <p className="text-xs text-[#a1a1aa] mb-1">{label}</p>
            <p className="text-sm font-bold text-[#000000]">{payload[0].value} terjual</p>
        </div>
    );
}

export default function Dashboard({ ringkasan, produk_terlaris: produkTerlaris = [], stok_menipis: stokMenipis = [], notifikasi, trend = [] }) {
    const trendData = trend.map(t => ({ ...t, tanggal: new Date(t.tanggal).getDate() + '/' + (new Date(t.tanggal).getMonth() + 1) }));
    const maxProduk = Math.max(...produkTerlaris.map(p => p.total_terjual), 1);

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="mb-6">
                <h1 className="text-heading-xl text-[#000000]">Dashboard</h1>
                <p className="text-body-md text-[#a1a1aa]">Ringkasan bisnis hari ini</p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                <div className="card overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-12 translate-x-12" />
                    <p className="text-body-md text-[#a1a1aa] relative">Omzet Hari Ini</p>
                    <p className="text-heading-xl text-[#000000] mt-1 relative">{formatRupiah(ringkasan.omzet)}</p>
                </div>
                <div className="card overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full -translate-y-12 translate-x-12" />
                    <p className="text-body-md text-[#a1a1aa] relative">Transaksi</p>
                    <p className="text-heading-xl text-[#000000] mt-1 relative">{ringkasan.jumlah_transaksi}</p>
                </div>
                <div className="card overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -translate-y-12 translate-x-12" />
                    <p className="text-body-md text-[#a1a1aa] relative">Rata-rata</p>
                    <p className="text-heading-xl text-[#000000] mt-1 relative">{formatRupiah(ringkasan.rata_rata_transaksi)}</p>
                </div>
                <div className="card overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full -translate-y-12 translate-x-12" />
                    <p className="text-body-md text-[#a1a1aa] relative">Produk Terjual</p>
                    <p className="text-heading-xl text-[#000000] mt-1 relative">{ringkasan.produk_terjual}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Trend Chart */}
                <div className="card lg:col-span-2 overflow-hidden">
                    <div className="flex items-center justify-between mb-1">
                        <h2 className="text-heading-md text-[#000000]">Trend Penjualan (7 Hari)</h2>
                        {trendData.length > 0 && (
                            <span className="text-xs text-[#a1a1aa] bg-[#f4f4f5] px-2 py-1 rounded-full">
                                {trendData.length} hari
                            </span>
                        )}
                    </div>
                    {trendData.length > 0 ? (
                        <>
                            <div className="grid grid-cols-7 gap-2 mb-4">
                                {trendData.map((t, i) => (
                                    <div key={i} className="text-center">
                                        <p className="text-[10px] text-[#a1a1aa]">{t.tanggal}</p>
                                        <p className="text-xs font-bold text-[#000000] mt-0.5">{formatRupiah(t.omzet)}</p>
                                        {t.jumlah_transaksi > 0 && (
                                            <p className="text-[9px] text-[#71717a]">{t.jumlah_transaksi} trx</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <ResponsiveContainer width="100%" height={220}>
                                <BarChart data={trendData} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
                                    <defs>
                                        {TREND_COLORS.map((color, i) => (
                                            <linearGradient key={i} id={`barGrad${i}`} x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor={color} stopOpacity={1} />
                                                <stop offset="100%" stopColor={color} stopOpacity={0.6} />
                                            </linearGradient>
                                        ))}
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" vertical={false} />
                                    <XAxis dataKey="tanggal" tick={{ fontSize: 12, fill: '#a1a1aa' }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 12, fill: '#a1a1aa' }} axisLine={false} tickLine={false} tickFormatter={(v) => 'Rp' + (v / 1000).toFixed(0) + 'k'} />
                                    <Tooltip content={<TrendTooltip />} cursor={{ fill: '#fafafa' }} />
                                    <Bar dataKey="omzet" radius={[6, 6, 0, 0]} maxBarSize={48}>
                                        {trendData.map((_, i) => (
                                            <Cell key={i} fill={`url(#barGrad${i % TREND_COLORS.length})`} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-[260px]">
                            <p className="text-body-md text-[#a1a1aa]">Belum ada data.</p>
                        </div>
                    )}
                </div>

                {/* Top Products — horizontal bar chart */}
                <div className="card">
                    <h2 className="mb-4 text-heading-md text-[#000000]">Produk Terlaris</h2>
                    {produkTerlaris.length > 0 ? (
                        <ResponsiveContainer width="100%" height={produkTerlaris.length * 56 + 20}>
                            <BarChart data={produkTerlaris.map((p, i) => ({ ...p, index: i }))} layout="vertical" margin={{ top: 0, right: 8, bottom: 0, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" horizontal={false} />
                                <XAxis type="number" hide domain={[0, maxProduk]} />
                                <YAxis type="category" dataKey="produk" tick={{ fontSize: 12, fill: '#52525b' }} axisLine={false} tickLine={false} width={120} />
                                <Tooltip content={<ProductTooltip />} cursor={{ fill: '#f4f4f5' }} />
                                <Bar dataKey="total_terjual" radius={[0, 4, 4, 0]} maxBarSize={24}>
                                    {produkTerlaris.map((_, i) => (
                                        <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-[200px]">
                            <p className="text-body-md text-[#a1a1aa]">Belum ada data penjualan.</p>
                        </div>
                    )}
                </div>

                {/* Low Stock */}
                <div className="card">
                    <h2 className="mb-4 text-heading-md text-[#000000]">Stok Menipis</h2>
                    <div className="space-y-3">
                        {stokMenipis.length === 0 && (
                            <div className="flex items-center justify-center h-[200px]">
                                <p className="text-body-md text-[#a1a1aa]">Semua stok aman.</p>
                            </div>
                        )}
                        {stokMenipis.map((item, i) => {
                            const warnLevel = item.stok <= 1 ? 'red' : item.stok <= item.min_stok ? 'amber' : 'emerald';
                            const colors = {
                                red: 'bg-red-50 border-red-200 text-red-700',
                                amber: 'bg-amber-50 border-amber-200 text-amber-700',
                                emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
                            };
                            return (
                                <div key={item.id} className={`flex items-center justify-between rounded-lg border px-4 py-3 ${colors[warnLevel]}`}>
                                    <div>
                                        <p className="text-sm font-medium">{item.nama}</p>
                                        <p className="text-xs opacity-70">{item.satuan} — Min: {item.min_stok}</p>
                                    </div>
                                    <span className={`text-lg font-bold ${warnLevel === 'red' ? 'text-red-600' : warnLevel === 'amber' ? 'text-amber-600' : 'text-emerald-600'}`}>
                                        {item.stok}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

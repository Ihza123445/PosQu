import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { formatRupiah } from '@/lib/format';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#6366f1', '#ec4899', '#14b8a6', '#8b5cf6', '#f43f5e'];

function PieTooltip({ active, payload }) {
    if (!active || !payload?.length) return null;
    const p = payload[0];
    return (
        <div className="rounded-xl border border-[#e4e4e7] bg-white px-4 py-3 shadow-xl">
            <p className="text-sm font-medium text-[#000000]">{p.name}</p>
            <p className="text-base font-bold text-[#000000] mt-1">{formatRupiah(p.value)}</p>
            <p className="text-xs text-[#71717a] mt-0.5">
                {p.payload?.total > 0 ? ((p.value / p.payload.total) * 100).toFixed(1) : 0}% dari total
            </p>
        </div>
    );
}

function buildPieData(items) {
    return items.filter(i => i.jumlah > 0).map(i => ({ name: i.nama, value: i.jumlah }));
}

function CenterLabel({ data, total }) {
    if (!data?.length) return null;
    return (
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
            <tspan x="50%" dy="-8" className="text-xs" fill="#a1a1aa" fontSize={12}>Total</tspan>
            <tspan x="50%" dy="20" className="text-lg" fill="#000000" fontSize={16} fontWeight="bold">
                {formatRupiah(total)}
            </tspan>
        </text>
    );
}

export default function Neraca({ data }) {
    const pieAset = buildPieData(data.aset.items);
    const pieAll = [
        ...data.aset.items.filter(i => i.jumlah > 0).map(i => ({ name: 'Aset: ' + i.nama, value: i.jumlah, total: data.aset.total + data.liabilitas.total + data.ekuitas.total })),
        ...data.liabilitas.items.filter(i => i.jumlah > 0).map(i => ({ name: 'Liabilitas: ' + i.nama, value: i.jumlah, total: data.aset.total + data.liabilitas.total + data.ekuitas.total })),
        ...data.ekuitas.items.filter(i => i.jumlah > 0).map(i => ({ name: 'Ekuitas: ' + i.nama, value: i.jumlah, total: data.aset.total + data.liabilitas.total + data.ekuitas.total })),
    ];

    const grandTotal = data.aset.total + data.liabilitas.total + data.ekuitas.total;

    return (
        <AuthenticatedLayout>
            <Head title="Neraca" />
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#000000]">Neraca</h1>
                <p className="text-sm text-[#a1a1aa]">Ringkasan aset, liabilitas, dan ekuitas</p>
            </div>

            {/* Pie Chart */}
            {pieAll.length > 0 && (
                <div className="card mb-6">
                    <h2 className="text-lg font-semibold text-[#000000] mb-4">Komposisi Keuangan</h2>
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                        <ResponsiveContainer width="100%" height={320}>
                            <PieChart>
                                <Pie data={pieAll} cx="50%" cy="50%" innerRadius={70} outerRadius={120} paddingAngle={3} dataKey="value">
                                    {pieAll.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                                </Pie>
                                <Tooltip content={<PieTooltip />} />
                                <CenterLabel data={pieAll} total={grandTotal} />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Custom legend */}
                        <div className="flex flex-col gap-2 min-w-[180px]">
                            {pieAll.map((item, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                                    <span className="text-sm text-[#52525b]">{item.name}</span>
                                    <span className="ml-auto text-sm font-semibold text-[#000000]">{formatRupiah(item.value)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Aset */}
                <div className="card border-t-4 border-t-blue-500">
                    <h2 className="text-lg font-semibold text-[#000000] mb-4">Aset</h2>
                    <div className="space-y-3">
                        {data.aset.items.map((item, i) => (
                            <div key={i} className="flex justify-between items-center py-2 border-b border-[#f4f4f5]">
                                <span className="text-sm text-[#52525b]">{item.nama}</span>
                                <span className="text-sm font-semibold text-[#000000]">{formatRupiah(item.jumlah)}</span>
                            </div>
                        ))}
                        <div className="flex justify-between items-center py-2 pt-3">
                            <span className="text-base font-bold text-[#000000]">Total Aset</span>
                            <span className="text-base font-bold text-blue-600">{formatRupiah(data.aset.total)}</span>
                        </div>
                    </div>
                </div>

                {/* Liabilitas */}
                <div className="card border-t-4 border-t-amber-400">
                    <h2 className="text-lg font-semibold text-[#000000] mb-4">Liabilitas</h2>
                    <div className="space-y-3">
                        {data.liabilitas.items.map((item, i) => (
                            <div key={i} className="flex justify-between items-center py-2 border-b border-[#f4f4f5]">
                                <span className="text-sm text-[#52525b]">{item.nama}</span>
                                <span className="text-sm font-semibold text-red-600">{formatRupiah(item.jumlah)}</span>
                            </div>
                        ))}
                        <div className="flex justify-between items-center py-2 pt-3">
                            <span className="text-base font-bold text-[#000000]">Total Liabilitas</span>
                            <span className="text-base font-bold text-amber-600">{formatRupiah(data.liabilitas.total)}</span>
                        </div>
                    </div>
                </div>

                {/* Ekuitas */}
                <div className="card border-t-4 border-t-emerald-500">
                    <h2 className="text-lg font-semibold text-[#000000] mb-4">Ekuitas</h2>
                    <div className="space-y-3">
                        {data.ekuitas.items.map((item, i) => (
                            <div key={i} className="flex justify-between items-center py-2 border-b border-[#f4f4f5]">
                                <span className="text-sm text-[#52525b]">{item.nama}</span>
                                <span className="text-sm font-semibold text-green-600">{formatRupiah(item.jumlah)}</span>
                            </div>
                        ))}
                        <div className="flex justify-between items-center py-2 pt-3">
                            <span className="text-base font-bold text-[#000000]">Total Ekuitas</span>
                            <span className="text-base font-bold text-emerald-600">{formatRupiah(data.ekuitas.total)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Equation */}
            <div className="mt-6 card bg-gradient-to-r from-[#c1fbd4] to-[#d4f9e0] border-0">
                <div className="grid grid-cols-3 gap-4 text-center py-2">
                    <div>
                        <p className="text-xs text-[#52525b]">Aset</p>
                        <p className="text-lg font-bold text-[#000000]">{formatRupiah(data.aset.total)}</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <span className="text-2xl text-[#52525b] font-bold">=</span>
                    </div>
                    <div>
                        <p className="text-xs text-[#52525b]">Liabilitas + Ekuitas</p>
                        <p className="text-lg font-bold text-[#000000]">{formatRupiah(data.liabilitas.total + data.ekuitas.total)}</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { formatRupiah } from '@/lib/format';
import { useState } from 'react';

export default function LabaRugi({ data, dari, sampai }) {
    const [d, setD] = useState(dari);
    const [s, setS] = useState(sampai);
    const filter = () => router.get('/laporan/laba-rugi', { dari: d, sampai: s }, { preserveState: true });

    return (
        <AuthenticatedLayout>
            <Head title="Laba Rugi" />
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#000000]">Laporan Laba Rugi</h1>
            </div>
            <div className="mb-6 card">
                <div className="flex flex-col sm:flex-row gap-3 items-end">
                    <div className="w-full sm:w-auto"><label className="block text-xs text-[#a1a1aa] mb-1">Dari</label><input type="date" value={d} onChange={e => setD(e.target.value)} className="w-full sm:w-auto input-shopify" /></div>
                    <div className="w-full sm:w-auto"><label className="block text-xs text-[#a1a1aa] mb-1">Sampai</label><input type="date" value={s} onChange={e => setS(e.target.value)} className="w-full sm:w-auto input-shopify" /></div>
                    <button onClick={filter} className="btn-primary">Tampilkan</button>
                </div>
            </div>
            <div className="card">
                <div className="space-y-4">
                    <div className="flex justify-between text-lg"><span>Total Omzet</span><span className="font-bold">{formatRupiah(data.total_omzet)}</span></div>
                    <div className="flex justify-between text-lg"><span>HPP (Harga Pokok Penjualan)</span><span className="font-bold text-red-600">-{formatRupiah(data.total_hpp)}</span></div>
                    <div className="flex justify-between text-lg border-t pt-4"><span>Laba Kotor</span><span className={`font-bold ${data.laba_kotor >= 0 ? 'text-green-600' : 'text-red-600'}`}>{formatRupiah(data.laba_kotor)}</span></div>
                    <div className="flex justify-between text-lg"><span>Pengeluaran</span><span className="font-bold text-red-600">-{formatRupiah(data.total_pengeluaran)}</span></div>
                    <div className="flex justify-between text-xl border-t-2 pt-4"><span className="font-bold">Laba Bersih</span><span className={`font-bold ${data.laba_bersih >= 0 ? 'text-green-600' : 'text-red-600'}`}>{formatRupiah(data.laba_bersih)}</span></div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

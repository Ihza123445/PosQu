import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { formatRupiah, formatDate, statusBadge } from '@/lib/format';
import { useState } from 'react';

export default function TransaksiShow({ transaksi }) {
    const [alasan, setAlasan] = useState('');
    const t = transaksi;

    const batalkan = () => {
        if (!confirm('Yakin ingin membatalkan transaksi ini?')) return;
        router.post(route('transaksi.batal', t.id), { alasan_batal: alasan });
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Transaksi ${t.kode_transaksi}`} />
            <div className="mb-6">
                <div className="flex items-center gap-3">
                    <Link href={route('transaksi.index')} className="text-sm text-[#000000] hover:text-[#000000]/80">&larr; Kembali</Link>
                    {t.status === 'selesai' && t.invoice_number && (
                        <Link href={route('transaksi.invoice', t.id)} className="text-sm text-[#000000] underline hover:text-[#3f3f46]">Cetak Invoice</Link>
                    )}
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-1 gap-3">
                    <div>
                        <h1 className="text-2xl font-bold text-[#000000]">{t.kode_transaksi}</h1>
                        <p className="text-sm text-[#a1a1aa]">{formatDate(t.transaction_datetime)}</p>
                    </div>
                    {t.status === 'selesai' && (
                        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center w-full sm:w-auto">
                            <input type="text" value={alasan} onChange={e => setAlasan(e.target.value)} placeholder="Alasan batal..." className="input-shopify" />
                            <button onClick={batalkan} disabled={!alasan || alasan.length < 10} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50">Batalkan</button>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 card overflow-x-auto">
                    <h2 className="mb-4 text-lg font-semibold text-[#000000]">Item Transaksi</h2>
                    <table className="w-full text-left text-sm">
                        <thead className="border-b">
                            <tr><th className="pb-2 font-medium text-[#a1a1aa]">Produk</th><th className="pb-2 font-medium text-[#a1a1aa]">Harga</th><th className="pb-2 font-medium text-[#a1a1aa]">Qty</th><th className="pb-2 font-medium text-[#a1a1aa] text-right">Subtotal</th></tr>
                        </thead>
                        <tbody className="divide-y">
                            {t.detail_transaksi?.map((d) => (
                                <tr key={d.id}>
                                    <td className="py-2 font-medium text-[#000000]">{d.nama_produk}</td>
                                    <td className="py-2 text-[#52525b]">{formatRupiah(d.harga_satuan)}</td>
                                    <td className="py-2 text-[#52525b]">{d.qty}</td>
                                    <td className="py-2 text-right font-medium text-[#000000]">{formatRupiah(d.subtotal)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="card">
                    <h2 className="mb-4 text-lg font-semibold text-[#000000]">Ringkasan</h2>
                    <dl className="space-y-3">
                        <div className="flex justify-between"><dt className="text-sm text-[#a1a1aa]">Subtotal</dt><dd className="text-sm font-medium text-[#000000]">{formatRupiah(t.subtotal)}</dd></div>
                        {t.diskon > 0 && <div className="flex justify-between"><dt className="text-sm text-[#a1a1aa]">Diskon</dt><dd className="text-sm font-medium text-red-600">-{formatRupiah(t.diskon)}</dd></div>}
                        {t.pajak > 0 && <div className="flex justify-between"><dt className="text-sm text-[#a1a1aa]">Pajak</dt><dd className="text-sm font-medium text-[#000000]">{formatRupiah(t.pajak)}</dd></div>}
                        <div className="border-t pt-2 flex justify-between"><dt className="font-semibold text-[#000000]">Total</dt><dd className="font-bold text-lg text-[#000000]">{formatRupiah(t.total)}</dd></div>
                        <div className="flex justify-between"><dt className="text-sm text-[#a1a1aa]">Bayar</dt><dd className="text-sm font-medium text-[#000000]">{formatRupiah(t.bayar)}</dd></div>
                        <div className="flex justify-between"><dt className="text-sm text-[#a1a1aa]">Kembalian</dt><dd className="text-sm font-medium text-green-600">{formatRupiah(t.kembalian)}</dd></div>
                        <div className="flex justify-between"><dt className="text-sm text-[#a1a1aa]">Metode</dt><dd className="text-sm font-medium text-[#000000]">{t.metode_pembayaran?.nama}</dd></div>
                        <div className="flex justify-between"><dt className="text-sm text-[#a1a1aa]">Kasir</dt><dd className="text-sm font-medium text-[#000000]">{t.pengguna?.nama}</dd></div>
                        {t.invoice_number && <div className="flex justify-between"><dt className="text-sm text-[#a1a1aa]">Invoice</dt><dd className="text-sm font-mono text-[#000000]">{t.invoice_number}</dd></div>}
                        <div className="flex justify-between"><dt className="text-sm text-[#a1a1aa]">Status</dt><dd><span className={statusBadge(t.status)}>{t.status}</span></dd></div>
                        {t.pelanggan && <div className="flex justify-between"><dt className="text-sm text-[#a1a1aa]">Pelanggan</dt><dd className="text-sm font-medium text-[#000000]">{t.pelanggan.nama}</dd></div>}
                    </dl>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

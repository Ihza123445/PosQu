import { Head, Link } from '@inertiajs/react';
import { formatRupiah } from '@/lib/format';

export default function Invoice({ transaksi: t }) {
    return (
        <div className="min-h-screen bg-[#fbfbf5] py-8">
            <Head title={`Invoice ${t.invoice_number}`} />

            {/* Print button */}
            <div className="mx-auto max-w-3xl px-4 mb-4 text-right print:hidden">
                <button onClick={() => window.print()} className="btn-primary">Cetak / Print</button>
                <Link href={route('transaksi.show', t.id)} className="ml-2 rounded-lg border border-[#e4e4e7] px-4 py-2 text-sm text-[#52525b] hover:bg-[#f4f4f5]">Kembali</Link>
            </div>

            {/* Invoice */}
            <div className="mx-auto max-w-3xl bg-white rounded-xl shadow-lg p-8 print:shadow-none print:rounded-none">
                {/* Header */}
                <div className="flex justify-between items-start border-b border-[#e4e4e7] pb-6 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-[#000000]">INVOICE</h1>
                        <p className="text-sm text-[#a1a1aa] mt-1">{t.outlet?.nama || 'Kelola UMKM'}</p>
                        {t.outlet?.alamat && <p className="text-xs text-[#a1a1aa]">{t.outlet.alamat}</p>}
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-bold text-[#000000]">{t.invoice_number}</p>
                        <p className="text-sm text-[#a1a1aa]">{new Date(t.transaction_datetime).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                </div>

                {/* Customer */}
                {t.pelanggan && (
                    <div className="mb-6">
                        <p className="text-xs text-[#a1a1aa] mb-1">Kepada:</p>
                        <p className="font-semibold text-[#000000]">{t.pelanggan.nama}</p>
                        {t.pelanggan.alamat && <p className="text-xs text-[#52525b]">{t.pelanggan.alamat}</p>}
                    </div>
                )}

                {/* Items */}
                <table className="w-full text-sm mb-6">
                    <thead>
                        <tr className="border-b border-[#e4e4e7]">
                            <th className="py-2 text-left font-medium text-[#52525b]">Produk</th>
                            <th className="py-2 text-right font-medium text-[#52525b]">Harga</th>
                            <th className="py-2 text-right font-medium text-[#52525b]">Qty</th>
                            <th className="py-2 text-right font-medium text-[#52525b]">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(t.detail_transaksi || []).map((d) => (
                            <tr key={d.id} className="border-b border-[#f4f4f5]">
                                <td className="py-3 text-[#000000]">{d.nama_produk}</td>
                                <td className="py-3 text-right text-[#52525b]">{formatRupiah(d.harga_satuan)}</td>
                                <td className="py-3 text-right text-[#52525b]">{d.qty}</td>
                                <td className="py-3 text-right font-medium text-[#000000]">{formatRupiah(d.subtotal)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Totals */}
                <div className="flex justify-end">
                    <div className="w-64 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-[#52525b]">Subtotal</span>
                            <span className="text-[#000000]">{formatRupiah(t.subtotal)}</span>
                        </div>
                        {t.diskon > 0 && (
                            <div className="flex justify-between text-sm">
                                <span className="text-[#52525b]">Diskon</span>
                                <span className="text-red-600">-{formatRupiah(t.diskon)}</span>
                            </div>
                        )}
                        {t.pajak > 0 && (
                            <div className="flex justify-between text-sm">
                                <span className="text-[#52525b]">Pajak</span>
                                <span className="text-[#000000]">{formatRupiah(t.pajak)}</span>
                            </div>
                        )}
                        <div className="flex justify-between border-t border-[#e4e4e7] pt-2">
                            <span className="font-bold text-[#000000]">Total</span>
                            <span className="font-bold text-lg text-[#000000]">{formatRupiah(t.total)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-[#52525b]">Bayar</span>
                            <span className="text-[#000000]">{formatRupiah(t.bayar)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-[#52525b]">Kembalian</span>
                            <span className="text-green-600">{formatRupiah(t.kembalian)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-[#52525b]">Metode</span>
                            <span className="text-[#000000]">{t.metode_pembayaran?.nama}</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-[#e4e4e7] text-center text-xs text-[#a1a1aa]">
                    <p>Terima kasih telah berbelanja!</p>
                    <p className="mt-1">Barang yang sudah dibeli tidak dapat dikembalikan.</p>
                </div>
            </div>
        </div>
    );
}

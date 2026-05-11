import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { formatRupiah, formatDate, statusBadge } from '@/lib/format';

export default function ProdukShow({ produk }) {
    return (
        <AuthenticatedLayout>
            <Head title={produk.nama} />
            <div className="mb-6">
                <Link href={route('produk.index')} className="text-sm text-[#000000] hover:text-[#3f3f46]">← Kembali</Link>
                <h1 className="text-2xl font-bold text-[#000000] mt-1">{produk.nama}</h1>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="card">
                    {produk.gambar && (
                        <div className="mb-4 -m-6 rounded-t-lg overflow-hidden h-48">
                            <img src={produk.gambar} alt={produk.nama} className="w-full h-full object-cover" />
                        </div>
                    )}
                    <h2 className="mb-4 text-lg font-semibold text-[#000000]">Info Produk</h2>
                    <dl className="space-y-3">
                        <div className="flex justify-between"><dt className="text-sm text-[#a1a1aa]">Kategori</dt><dd className="text-sm font-medium text-[#000000]">{produk.kategori?.nama}</dd></div>
                        <div className="flex justify-between"><dt className="text-sm text-[#a1a1aa]">Outlet</dt><dd className="text-sm font-medium text-[#000000]">{produk.outlet?.nama}</dd></div>
                        <div className="flex justify-between"><dt className="text-sm text-[#a1a1aa]">Harga Jual</dt><dd className="text-sm font-medium text-[#000000]">{formatRupiah(produk.harga_jual)}</dd></div>
                        <div className="flex justify-between"><dt className="text-sm text-[#a1a1aa]">Harga Modal</dt><dd className="text-sm font-medium text-[#000000]">{formatRupiah(produk.harga_modal)}</dd></div>
                        <div className="flex justify-between"><dt className="text-sm text-[#a1a1aa]">Laba Kotor</dt><dd className="text-sm font-medium text-green-600">{formatRupiah(produk.harga_jual - produk.harga_modal)}</dd></div>
                        <div className="flex justify-between"><dt className="text-sm text-[#a1a1aa]">Stok</dt><dd className={`text-sm font-bold ${produk.stok <= produk.min_stok ? 'text-[#000000]' : 'text-[#000000]'}`}>{produk.stok} {produk.satuan}</dd></div>
                        <div className="flex justify-between"><dt className="text-sm text-[#a1a1aa]">Min Stok</dt><dd className="text-sm font-medium text-[#000000]">{produk.min_stok}</dd></div>
                        <div className="flex justify-between"><dt className="text-sm text-[#a1a1aa]">Status</dt><dd><span className={statusBadge(produk.status)}>{produk.status}</span></dd></div>
                    </dl>
                </div>

                <div className="card">
                    <h2 className="mb-4 text-lg font-semibold text-[#000000]">Riwayat Stok</h2>
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                        {produk.stok_log?.length === 0 && <p className="text-sm text-[#a1a1aa]">Belum ada riwayat stok.</p>}
                        {produk.stok_log?.map((log) => (
                            <div key={log.id} className="flex items-center justify-between rounded-lg border border-[#e4e4e7] px-3 py-2 text-sm">
                                <div>
                                    <span className={`font-medium ${log.qty > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {log.qty > 0 ? `+${log.qty}` : log.qty}
                                    </span>
                                    <span className="ml-2 text-[#a1a1aa]">{log.jenis}</span>
                                    <p className="text-xs text-[#a1a1aa]">{log.keterangan}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-[#a1a1aa]">{log.stok_sebelum} → {log.stok_sesudah}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

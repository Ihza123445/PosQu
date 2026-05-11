import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { formatRupiah } from '@/lib/format';

export default function JurnalIndex({ jurnal, filters }) {
    return (
        <AuthenticatedLayout>
            <Head title="Jurnal Umum" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-[#000000]">Jurnal Umum</h1>
                    <p className="text-sm text-[#a1a1aa]">Catatan jurnal akuntansi manual</p>
                </div>
                <Link href={route('jurnal.create')} className="btn-primary">+ Jurnal Baru</Link>
            </div>
            <div className="card overflow-hidden !p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b bg-[#f4f4f5]">
                            <tr>
                                <th className="px-4 py-3 font-medium text-[#52525b]">No. Jurnal</th>
                                <th className="px-4 py-3 font-medium text-[#52525b]">Tanggal</th>
                                <th className="px-4 py-3 font-medium text-[#52525b]">Deskripsi</th>
                                <th className="px-4 py-3 font-medium text-[#52525b]">Outlet</th>
                                <th className="px-4 py-3 font-medium text-[#52525b]">Pembuat</th>
                                <th className="px-4 py-3 font-medium text-[#52525b] text-right">Debet</th>
                                <th className="px-4 py-3 font-medium text-[#52525b] text-right">Kredit</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {jurnal.data.length > 0 ? jurnal.data.map((j) => (
                                <tr key={j.id} className="hover:bg-[#f4f4f5]">
                                    <td className="px-4 py-3 font-mono text-xs text-[#000000]">{j.nomor_jurnal}</td>
                                    <td className="px-4 py-3 text-[#52525b]">{j.tanggal}</td>
                                    <td className="px-4 py-3 text-[#000000]">{j.deskripsi}</td>
                                    <td className="px-4 py-3 text-[#52525b]">{j.outlet?.nama || '-'}</td>
                                    <td className="px-4 py-3 text-[#52525b]">{j.pengguna?.nama}</td>
                                    <td className="px-4 py-3 text-right font-mono text-green-600">{j.debet > 0 ? formatRupiah(j.debet) : '-'}</td>
                                    <td className="px-4 py-3 text-right font-mono text-red-600">{j.kredit > 0 ? formatRupiah(j.kredit) : '-'}</td>
                                </tr>
                            )) : (
                                <tr><td colSpan={7} className="px-4 py-8 text-center text-[#a1a1aa]">Belum ada jurnal.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {jurnal.links && (
                <div className="mt-4 flex justify-center gap-1">
                    {jurnal.links.map((link, i) => (
                        <Link key={i} href={link.url || '#'} disabled={!link.url}
                            className={`px-3 py-1.5 text-xs rounded-lg ${link.active ? 'bg-[#000000] text-white' : link.url ? 'bg-[#f4f4f5] text-[#52525b] hover:bg-[#e4e4e7]' : 'text-[#a1a1aa] cursor-default'}`}
                            dangerouslySetInnerHTML={{ __html: link.label }} />
                    ))}
                </div>
            )}
        </AuthenticatedLayout>
    );
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { formatTanggal } from '@/lib/format';

export default function NotifikasiIndex({ notifikasi }) {
    const bacaSemua = () => router.post(route('notifikasi.baca-semua'), {}, { preserveState: true, preserveScroll: true });
    const baca = (id) => router.post(route('notifikasi.baca', id), {}, { preserveState: true });

    return (
        <AuthenticatedLayout>
            <Head title="Notifikasi" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div><h1 className="text-2xl font-bold text-[#000000]">Notifikasi</h1><p className="text-sm text-[#a1a1aa]">Pemberitahuan & peringatan sistem</p></div>
                <button onClick={bacaSemua} className="btn-outline">Tandai Semua Dibaca</button>
            </div>
            <div className="space-y-3">
                {notifikasi.data?.length === 0 && <p className="text-center text-[#a1a1aa] py-8">Belum ada notifikasi.</p>}
                {notifikasi.data?.map(n => (
                    <div key={n.id} className={`card ${n.status_baca ? '' : 'border-l-4 border-l-[#000000]'}`}>
                        <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    {!n.status_baca && <span className="h-2 w-2 rounded-full bg-[#000000] flex-shrink-0" />}
                                    <h3 className={`text-sm font-medium text-[#000000]`}>{n.judul}</h3>
                                </div>
                                <p className={`text-sm ${n.status_baca ? 'text-[#a1a1aa]' : 'text-[#52525b]'}`}>{n.pesan}</p>
                                <p className="mt-1 text-xs text-[#a1a1aa]">{formatTanggal(n.created_at)}</p>
                            </div>
                            <div className="flex flex-col items-end gap-2 flex-shrink-0">
                                {n.tipe && <span className="badge-neutral">{n.tipe}</span>}
                                {!n.status_baca && (
                                    <button onClick={() => baca(n.id)} className="text-xs text-[#000000] hover:text-[#52525b]">Tandai Dibaca</button>
                                )}
                            </div>
                        </div>
                        {n.url && (
                            <div className="mt-2 ml-4">
                                <a href={n.url} className="text-xs text-[#000000] hover:text-[#52525b]">Lihat Detail &rarr;</a>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {notifikasi.links && (
                <div className="mt-6 flex justify-center gap-2">
                    {notifikasi.links.filter(l => l.url).map((link, i) => (
                        <button key={i} onClick={() => router.get(link.url)} disabled={link.active || !link.url}
                            className={`rounded-lg px-3 py-1.5 text-sm ${link.active ? 'bg-[#000000] text-white' : 'bg-white text-[#52525b]'}`}
                            dangerouslySetInnerHTML={{ __html: link.label }} />
                    ))}
                </div>
            )}
        </AuthenticatedLayout>
    );
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const ICON_MAP = {
    'tools-kitchen-2': '🍳',
    'glass': '🥤',
    'cookie': '🍪',
    'gift': '🎁',
    'dots': '📦',
};

function renderIcon(icon) {
    return ICON_MAP[icon] || icon || '📁';
}

export default function KategoriIndex({ kategori }) {
    return (
        <AuthenticatedLayout>
            <Head title="Kategori" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-[#000000]">Kategori</h1>
                    <p className="text-sm text-[#a1a1aa]">Kelompok produk</p>
                </div>
                <Link href={route('kategori.create')} className="btn-primary">+ Tambah</Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {kategori.map((k) => (
                    <div key={k.id} className="card overflow-hidden">
                        {k.gambar && (
                            <div className="h-32 overflow-hidden">
                                <img src={k.gambar} alt={k.nama} className="h-full w-full object-cover" />
                            </div>
                        )}
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl text-xl" style={{ backgroundColor: k.warna + '20' }}>
                                        <span>{renderIcon(k.icon)}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[#000000]">{k.nama}</h3>
                                        <p className="text-xs text-[#a1a1aa]">Urutan {k.urutan}</p>
                                    </div>
                                </div>
                                <span className={`${k.status === 'aktif' ? 'badge-success' : 'badge-neutral'}`}>{k.status}</span>
                            </div>
                            {k.deskripsi && <p className="mb-3 text-xs text-[#a1a1aa]">{k.deskripsi}</p>}
                            <div className="flex gap-2">
                                <Link href={route('kategori.edit', k.id)} className="text-xs text-[#000000] hover:text-[#3f3f46]">Edit</Link>
                            </div>
                        </div>
                    </div>
                ))}
                {kategori.length === 0 && <p className="col-span-full text-center text-[#a1a1aa] py-8">Belum ada kategori.</p>}
            </div>
        </AuthenticatedLayout>
    );
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function PromoIndex({ promo, filters }) {
    return (
        <AuthenticatedLayout>
            <Head title="Promo" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
                <div><h1 className="text-2xl font-bold text-[#000000]">Promo</h1><p className="text-sm text-[#a1a1aa]">Diskon &amp; promosi</p></div>
                <Link href={route('promo.create')} className="btn-primary">+ Tambah</Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {promo.data?.map(p => (
                    <div key={p.id} className="card">
                        <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-[#000000]">{p.nama}</h3>
                            <span className={p.status === 'aktif' ? 'badge-success' : 'badge-neutral'}>{p.status}</span>
                        </div>
                        {p.kode && <p className="font-mono text-xs text-[#000000] mb-2">Kode: {p.kode}</p>}
                        <p className="text-lg font-bold text-[#000000] mb-2">{p.tipe === 'persen' ? `${p.nilai}%` : `Rp ${Number(p.nilai).toLocaleString()}`}</p>
                        <div className="text-xs text-[#a1a1aa] space-y-1">
                            <p>Min: Rp {Number(p.min_transaksi).toLocaleString()}</p>
                            <p>{p.tgl_mulai} s/d {p.tgl_selesai}</p>
                            <p>Terpakai: {p.terpakai}{p.kuota ? `/ ${p.kuota}` : ''}</p>
                        </div>
                        <div className="mt-3"><Link href={route('promo.edit', p.id)} className="text-xs text-[#000000] hover:text-[#000000]/80">Edit</Link></div>
                    </div>
                )) || <p className="col-span-full text-center text-[#a1a1aa] py-8">Belum ada promo.</p>}
            </div>
        </AuthenticatedLayout>
    );
}

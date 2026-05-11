export function formatRupiah(amount) {
    if (!amount && amount !== 0) return '-';
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

export function formatDate(date) {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function formatTanggal(date) {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function statusBadge(status) {
    const map = {
        selesai: 'badge-success',
        batal: 'badge-neutral',
        pending: 'badge-neutral',
        aktif: 'badge-success',
        nonaktif: 'badge-neutral',
        habis: 'badge-neutral',
    };
    return map[status] || 'badge-neutral';
}

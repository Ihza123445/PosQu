<?php

namespace App\Http\Controllers;

use App\Models\Notifikasi;

class NotifikasiController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $notifikasi = Notifikasi::where('pengguna_id', $user->id)
            ->orderByDesc('created_at')
            ->paginate(20);

        return inertia('Notifikasi/Index', ['notifikasi' => $notifikasi]);
    }

    public function baca($id)
    {
        $notif = Notifikasi::findOrFail($id);
        $notif->update(['status_baca' => true]);

        if ($notif->url) {
            return redirect($notif->url);
        }

        return back();
    }

    public function bacaSemua()
    {
        Notifikasi::where('pengguna_id', auth()->id())
            ->where('status_baca', false)
            ->update(['status_baca' => true]);

        return back()->with('success', 'Semua notifikasi telah dibaca.');
    }
}

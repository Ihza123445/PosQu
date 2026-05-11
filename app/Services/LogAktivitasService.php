<?php

namespace App\Services;

use App\Models\LogAktivitas;

class LogAktivitasService
{
    public function catat(
        int $penggunaId,
        string $aksi,
        ?string $entitas = null,
        ?int $entitasId = null,
        ?array $detail = null,
        ?int $outletId = null
    ): LogAktivitas {
        return LogAktivitas::create([
            'pengguna_id' => $penggunaId,
            'outlet_id' => $outletId,
            'aksi' => $aksi,
            'entitas' => $entitas,
            'entitas_id' => $entitasId,
            'detail' => $detail,
            'ip_address' => request()->ip() ?? null,
            'user_agent' => request()->userAgent() ?? null,
        ]);
    }
}

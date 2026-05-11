<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'role_id' => 1, // admin
                'outlet_id' => null, // super admin
                'nama' => 'Admin Utama',
                'email' => 'admin@kelolaumkm.test',
                'password' => Hash::make('password'),
                'telepon' => '081234567890',
                'status' => 'aktif',
                'foto' => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
                'email_verified_at' => now(),
            ],
            [
                'role_id' => 1, // admin
                'outlet_id' => 1, // admin terikat cabang pusat
                'nama' => 'Admin Cabang Pusat',
                'email' => 'admin.pusat@kelolaumkm.test',
                'password' => Hash::make('password'),
                'telepon' => '081234567891',
                'status' => 'aktif',
                'foto' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
                'email_verified_at' => now(),
            ],
            [
                'role_id' => 2, // user/kasir
                'outlet_id' => 1,
                'nama' => 'Kasir Pusat',
                'email' => 'kasir.pusat@kelolaumkm.test',
                'password' => Hash::make('password'),
                'telepon' => '081234567892',
                'status' => 'aktif',
                'foto' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
                'email_verified_at' => now(),
            ],
            [
                'role_id' => 2, // user/kasir
                'outlet_id' => 2,
                'nama' => 'Kasir Sudirman',
                'email' => 'kasir.sudirman@kelolaumkm.test',
                'password' => Hash::make('password'),
                'telepon' => '081234567893',
                'status' => 'aktif',
                'foto' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
                'email_verified_at' => now(),
            ],
        ]);
    }
}

# PosQu — POS & Management System untuk UMKM

**PosQu** adalah aplikasi Point of Sale (POS) dan manajemen bisnis berbasis web yang dirancang khusus untuk Usaha Mikro, Kecil, dan Menengah (UMKM) kuliner di Indonesia. Dibangun menggunakan Laravel 11, Inertia.js, React, dan Tailwind CSS.

> Dibangun oleh **Ihza** — Sistem Informasi Akuntansi, 2026.

---

## Fitur Utama

### Point of Sale (POS)
- POS interaktif dengan grid produk, keranjang real-time, dan payment flow
- Multi-metode pembayaran (Tunai, QRIS, Transfer, Debit, Kredit)
- Dukungan promo/diskon otomatis
- Cetak invoice otomatis setelah transaksi

### Manajemen Produk & Stok
- CRUD produk dengan gambar, kategori, harga jual, dan harga modal
- Tracking stok otomatis — setiap transaksi mengurangi stok
- Notifikasi stok menipis (otomatis saat stok ≤ min_stok)
- Log mutasi stok (masuk/keluar/adjustment/retur)
- Stok adjustment untuk koreksi manual

### Multi-Outlet
- Data terisolasi per outlet (produk, transaksi, promo, pengeluaran)
- Dashboard spesifik per outlet
- Laporan bisa difilter per outlet

### Manajemen Pelanggan
- Data pelanggan dengan riwayat transaksi
- Loyalty points otomatis
- Total pembelian dan transaksi per pelanggan

### Promo & Diskon
- Multi-tipe promo (persen & nominal)
- Batasan kuota, minimal transaksi, maksimal diskon
- Periode promo dengan tanggal mulai & selesai

### Laporan & Akuntansi
- **Laporan Penjualan** — Omzet, transaksi, rata-rata dengan filter tanggal
- **Laba Rugi** — Omzet, HPP, pengeluaran, laba kotor & bersih
- **Laporan Per Produk** — Analisis penjualan per produk dengan laba
- **Trend Penjualan** — Grafik omzet & transaksi per bulan (tahunan)
- **Buku Besar** — General ledger dengan running balance
- **Neraca** — Balance sheet: aset, liabilitas, ekuitas
- **Jurnal Umum** — Journal entries dengan auto-generate nomor jurnal

### Target Penjualan
- Target omzet, qty transaksi, qty produk per bulan
- Progress bar realisasi otomatis
- Multi-outlet targets

### Manajemen Pengeluaran
- Catat pengeluaran operasional (bahan baku, gaji, listrik, sewa, dll)
- Kategori pengeluaran dengan bukti upload

### Notifikasi & Audit
- Notifikasi stok menipis, promo berakhir, target tercapai
- Log aktivitas untuk audit trail
- Dashboard notifikasi terpusat

---

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Backend | Laravel 11 (PHP 8.5) |
| Frontend | React 19 + Inertia.js |
| UI Framework | Tailwind CSS + Shopify Design System |
| Database | MySQL (MariaDB 10.4) |
| Charts | Recharts (AreaChart, BarChart, LineChart, PieChart) |
| Auth | Laravel Breeze + Spatie Laravel Permission |
| PDF | Barryvdh Laravel DomPDF |
| Build | Vite 5 |

---

## Struktur Project

```
Kelola UMKM/
|
+-- app/
|   +-- Http/
|   |   +-- Controllers/              # 15 Controllers
|   |   |   +-- Auth/                 # Auth controllers (Breeze)
|   |   |   +-- DashboardController.php
|   |   |   +-- ProdukController.php
|   |   |   +-- KategoriController.php
|   |   |   +-- TransaksiController.php
|   |   |   +-- PelangganController.php
|   |   |   +-- PromoController.php
|   |   |   +-- PengeluaranController.php
|   |   |   +-- StokController.php
|   |   |   +-- TargetPenjualanController.php
|   |   |   +-- LaporanController.php
|   |   |   +-- JurnalController.php
|   |   |   +-- NotifikasiController.php
|   |   |   +-- ProfileController.php
|   |   +-- Middleware/
|   |   +-- Requests/
|   +-- Models/                        # 16 Models
|   |   +-- User.php, Role.php, Outlet.php
|   |   +-- Kategori.php, Produk.php
|   |   +-- Pelanggan.php, Transaksi.php
|   |   +-- DetailTransaksi.php
|   |   +-- MetodePembayaran.php, Promo.php
|   |   +-- Pengeluaran.php, TargetPenjualan.php
|   |   +-- StokLog.php, DateDimension.php
|   |   +-- Jurnal.php, LogAktivitas.php
|   |   +-- Notifikasi.php
|   +-- Services/                       # 5 Service Classes
|   |   +-- TransaksiService.php       # Checkout, cancel, stock mutation
|   |   +-- StokService.php            # Stock in/out/adjustment
|   |   +-- DashboardService.php       # Stats aggregation
|   |   +-- LaporanService.php         # Reports & accounting
|   |   +-- LogAktivitasService.php
|   +-- Providers/
|
+-- database/
|   +-- migrations/                     # 16 Migration files
|   +-- seeders/                        # 12 Seeder files
|       +-- DatabaseSeeder.php
|       +-- RoleSeeder.php, OutletSeeder.php
|       +-- UserSeeder.php (4 users)
|       +-- KategoriSeeder.php (5 kategori)
|       +-- ProdukSeeder.php (17 produk)
|       +-- MetodePembayaranSeeder.php (5 metode)
|       +-- PelangganSeeder.php (12 pelanggan)
|       +-- PromoSeeder.php (7 promo)
|       +-- PengeluaranSeeder.php (15 pengeluaran)
|       +-- TargetPenjualanSeeder.php (12 target)
|       +-- StokLogSeeder.php (22 mutasi)
|       +-- NotifikasiSeeder.php (10 notifikasi)
|       +-- JurnalSeeder.php (4 jurnal)
|       +-- DateDimensionSeeder.php (4018 hari)
|
+-- resources/
|   +-- js/
|   |   +-- Components/                # Shared UI components
|   |   |   +-- SidebarLayout.jsx
|   |   +-- Layouts/
|   |   |   +-- AuthenticatedLayout.jsx
|   |   |   +-- GuestLayout.jsx
|   |   +-- Pages/                      # 30+ Inertia Pages
|   |   |   +-- Dashboard.jsx          # Interactive charts
|   |   |   +-- Transaksi/
|   |   |   |   +-- POS.jsx            # Full POS system
|   |   |   |   +-- Index.jsx, Show.jsx, Invoice.jsx
|   |   |   +-- Produk/                # CRUD + detail
|   |   |   |   +-- Index.jsx, Create.jsx, Edit.jsx, Show.jsx
|   |   |   +-- Kategori/              # CRUD with images
|   |   |   |   +-- Index.jsx, Create.jsx, Edit.jsx
|   |   |   +-- Pelanggan/             # CRUD
|   |   |   |   +-- Index.jsx, Create.jsx, Edit.jsx
|   |   |   +-- Promo/                 # CRUD
|   |   |   |   +-- Index.jsx, Create.jsx, Edit.jsx
|   |   |   +-- Pengeluaran/           # CRUD
|   |   |   |   +-- Index.jsx, Create.jsx, Edit.jsx
|   |   |   +-- Stok/
|   |   |   |   +-- Log.jsx, Adjustment.jsx
|   |   |   +-- Target/
|   |   |   |   +-- Index.jsx
|   |   |   +-- Notifikasi/
|   |   |   |   +-- Index.jsx
|   |   |   +-- Jurnal/
|   |   |   |   +-- Index.jsx, Create.jsx
|   |   |   +-- Laporan/               # 6 Laporan pages
|   |   |   |   +-- Penjualan.jsx      # BarChart trend harian
|   |   |   |   +-- LabaRugi.jsx
|   |   |   |   +-- Produk.jsx
|   |   |   |   +-- Trend.jsx          # BarChart + LineChart
|   |   |   |   +-- BukuBesar.jsx
|   |   |   |   +-- Neraca.jsx         # PieChart
|   |   |   +-- Auth/                  # Login, Register, dll
|   |   |   +-- Profile/               # Edit profil
|   |   +-- lib/
|   |       +-- format.js              # formatRupiah, formatDate, dll
|   +-- views/
|       +-- app.blade.php
|
+-- routes/
|   +-- web.php                        # All web routes
|   +-- auth.php, console.php
|
+-- public/
|   +-- build/                         # Vite production build
|   +-- storage/                       # Uploaded files (foto, gambar)
|
+-- config/                            # Laravel config files
+-- tests/                             # Feature & Unit tests
+-- vendor/                            # PHP dependencies
+-- node_modules/                      # JS dependencies
```

---

## Database Schema (15 Tabel)

### Master Data
| Tabel | Deskripsi | Relasi |
|-------|-----------|--------|
| `users` | Pengguna (merge dari ERD `pengguna`) | role_id, outlet_id |
| `role` | admin/user | — |
| `outlet` | Cabang/toko | — |
| `kategori` | Kategori produk | — |
| `metode_pembayaran` | Tunai, QRIS, Transfer, Debit, Kredit | — |
| `produk` | Produk dengan harga & stok | kategori_id, outlet_id |
| `pelanggan` | Pelanggan dengan loyalty points | — |
| `promo` | Diskon (persen/nominal) per-outlet | outlet_id |
| `date_dimension` | Tabel kalender 2020-2030 | — |

### Transaksi
| Tabel | Deskripsi | Relasi |
|-------|-----------|--------|
| `transaksi` | Transaksi penjualan | outlet_id, pengguna_id, pelanggan_id, metode_pembayaran_id, promo_id, date_id |
| `detail_transaksi` | Item transaksi (snapshot harga & modal) | transaksi_id, produk_id |

### Stok, Keuangan & Notifikasi
| Tabel | Deskripsi |
|-------|-----------|
| `stok_log` | Mutasi stok audit trail (masuk/keluar/adjustment/retur) |
| `target_penjualan` | Target omzet & qty per outlet per bulan |
| `pengeluaran` | Biaya operasional (bahan baku, gaji, listrik, sewa, dll) |
| `jurnal` | Jurnal akuntansi double-entry |
| `log_aktivitas` | Audit trail aktivitas pengguna |
| `notifikasi` | Notifikasi sistem (stok, target, promo, transaksi) |

Semua data bisnis terikat ke `outlet_id` — mendukung multi-outlet penuh.

---

## Business Rules

| Rule | Implementasi |
|------|-------------|
| Auto-generate kode transaksi | `TRX-YYYYMMDD-NNN` |
| Invoice number | `INV-YYYYMMDD-NNNN` |
| Nomor jurnal | `JR-YYYYMMDD-NNN` |
| Stock mutation | Setiap transaksi → stok_log, cancel → rollback stok |
| Auto-notifikasi | Stok ≤ min_stok → notifikasi |
| Loyalty points | Update saat transaksi selesai |
| Realisasi target | Kalkulasi otomatis dari transaksi |
| Foto produk | Disimpan di `storage/app/public`, accessor `Storage::url()` |
| Multi-outlet scope | Semua query diffilter `outlet_id` |

---

## Halaman & Routes

| Route | Halaman | Fitur |
|-------|---------|-------|
| `/dashboard` | Dashboard | Stat cards, trend chart (AreaChart), top products, low stock alerts |
| `/transaksi/pos` | POS System | Product grid, cart, promo, payment flow |
| `/transaksi` | Riwayat Transaksi | Filter tanggal, metode, status |
| `/transaksi/{id}` | Detail Transaksi | Items, payment info, print |
| `/transaksi/{id}/invoice` | Invoice | Printable invoice |
| `/produk` | Manajemen Produk | CRUD, search, gambar, kategori filter |
| `/kategori` | Manajemen Kategori | CRUD, icon/images |
| `/pelanggan` | Manajemen Pelanggan | CRUD, riwayat transaksi |
| `/stok/log` | Stok Log | Mutasi stok, filter produk |
| `/stok/adjustment` | Stok Adjustment | Koreksi stok manual |
| `/promo` | Manajemen Promo | CRUD, status toggle |
| `/pengeluaran` | Manajemen Pengeluaran | CRUD, kategori, tanggal |
| `/target` | Target Penjualan | Target bulanan, progress bars |
| `/laporan/penjualan` | Laporan Penjualan | BarChart + tabel transaksi |
| `/laporan/laba-rugi` | Laporan Laba Rugi | P&L statement |
| `/laporan/produk` | Laporan Per Produk | Analisis per-produk |
| `/laporan/trend` | Trend Tahunan | BarChart + LineChart |
| `/laporan/buku-besar` | Buku Besar | General ledger, running balance |
| `/laporan/neraca` | Neraca | Balance sheet, PieChart |
| `/jurnal` | Jurnal Umum | Journal entries |
| `/notifikasi` | Notifikasi | System notifications |

---

## Cara Install & Menjalankan

### Prasyarat
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL/MariaDB (XAMPP recommended)

### Langkah Instalasi

```bash
# 1. Clone repositori
git clone https://github.com/Ihza123445/PosQu.git
cd PosQu

# 2. Install PHP dependencies
composer install

# 3. Copy environment file & atur database
cp .env.example .env
# Edit .env: set DB_DATABASE, DB_USERNAME, DB_PASSWORD

# 4. Generate app key
php artisan key:generate

# 5. Install NPM dependencies
npm install

# 6. Build frontend
npm run build

# 7. Jalankan migrasi & seeder
php artisan migrate:fresh --seed

# 8. Buat storage symlink
php artisan storage:link

# 9. Jalankan server
php artisan serve
npm run dev
```

### Akun Login (Seeder)

| Email | Password | Role | Outlet |
|-------|----------|------|--------|
| admin@kelolaumkm.com | password | Admin Umum | Semua |
| kasir@kelolaumkm.com | password | Kasir | Outlet A |

---

## Desain UI

Mengacu pada **Shopify Design System**:
- **Warna Primer**: Hitam (#000000)
- **Aksen**: Aloe (#c1fbd4), Pistachio (#d4f9e0)
- **Background**: Canvas Cream (#fbfbf5)
- **Font**: Inter (sans-serif)
- **Komponen**: Pill buttons, card shadow ring, rounded corners

Visualisasi data menggunakan **Recharts** — AreaChart, BarChart, LineChart, dan PieChart interaktif dengan gradient styling modern.

---

## Lisensi

Hak Cipta &copy; 2026 Ihza — Dibangun untuk tugas Sistem Informasi Akuntansi.

---

*Dibangun dengan Laravel 11, Inertia.js, React, dan Tailwind CSS.*

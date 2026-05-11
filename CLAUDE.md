# Kelola UMKM — MSME Management Dashboard

**Stack:** Laravel 11 + Inertia.js + React + Tailwind CSS + MySQL (MariaDB via XAMPP)
**Server:** PHP 8.5.5, MariaDB 10.4.32
**Packages:** `spatie/laravel-permission`, `barryvdh/laravel-dompdf`

## Project Structure

```
Kelola UMKM/
├── app/
│   ├── Http/Controllers/    — 11 controllers (resource + service-oriented)
│   ├── Models/              — 16 models matching ERD
│   └── Services/            — TransaksiService, StokService, DashboardService, LaporanService
├── database/
│   └── migrations/          — 15 migration files (users table merged with pengguna)
├── resources/js/
│   ├── Components/          — SidebarLayout.jsx (main nav), shared Breeze components
│   ├── Pages/               — Inertia React pages organized by feature
│   └── lib/format.js        — formatRupiah, formatDate, formatTanggal, statusBadge
└── routes/web.php           — All web routes
```

## Database Architecture (15 tables)

1. **users** — ERD's `pengguna` merged into Laravel's `users` table. Uses `nama` column with accessor for Breeze compatibility. `role_id` FK, `outlet_id` FK (nullable).
2. **role** — id, nama (ENUM: admin/user)
3. **outlet** — Multi-outlet support: nama, alamat, kota, telepon, jam_buka/tutup, status
4. **kategori** — Product categories with icon, warna, urutan
5. **metode_pembayaran** — Tunai, QRIS, Transfer, Debit, Kredit
6. **produk** — Products tied to outlet + kategori, with harga_jual, harga_modal, stok, min_stok
7. **pelanggan** — Customers with loyalty_points tracking
8. **promo** — Discounts (persen/nominal), per-outlet, with kuota and date range
9. **date_dimension** — Pre-generated dates 2020-2030 for analytics
10. **target_penjualan** — Monthly sales targets per outlet
11. **pengeluaran** — Operational expenses per outlet
12. **transaksi** — Sales transactions with full payment tracking
13. **detail_transaksi** — Line items with product snapshots
14. **stok_log** — Stock mutation audit trail
15. **log_aktivitas** — User activity audit
16. **notifikasi** — System notifications (low stock, etc.)

## Key Business Rules

- **Stock mutation**: Every transaction creates a stok_log entry. Cancel = rollback stock.
- **Auto-notification**: When stock <= min_stok, system creates a notifikasi.
- **kode_transaksi**: Auto-generated as TRX-YYYYMMDD-NNN.
- **Multi-outlet**: All data (produk, transaksi, promo, pengeluaran) scoped by outlet_id.
- **Loyalty points**: Updated automatically on transaction completion.
- **Target realization**: Auto-calculated from transaction data.

## Data Model Note

ERD uses `pengguna_id` as FK column name in other tables (transaksi, stok_log, pengeluaran, notifikasi, log_aktivitas) but references the `users` table. This is intentional for ERD compatibility.

## Page List

| Route | Page | Description |
|-------|------|-------------|
| /dashboard | Dashboard | Stats cards, top products, low stock alerts, 7-day trend |
| /transaksi/pos | Transaksi/POS | Full POS with product grid, cart, payment flow |
| /transaksi | Transaksi/Index | Transaction history list |
| /transaksi/{id} | Transaksi/Show | Transaction detail with items |
| /produk | Produk/Index, Create, Edit, Show | Product CRUD with search |
| /kategori | Kategori/Index, Create, Edit | Category CRUD |
| /pelanggan | Pelanggan/Index, Create, Edit | Customer management |
| /stok/log | Stok/Log | Stock mutation history |
| /stok/adjustment | Stok/Adjustment | Stock adjustment form |
| /promo | Promo/Index, Create, Edit | Promo management |
| /pengeluaran | Pengeluaran/Index, Create, Edit | Expense management |
| /laporan/penjualan | Laporan/Penjualan | Sales report with summary cards |
| /laporan/laba-rugi | Laporan/LabaRugi | P&L with HPP calculation |
| /laporan/produk | Laporan/Produk | Per-product sales analysis |
| /laporan/trend | Laporan/Trend | Monthly bar chart + summary |
| /target | Target/Index | Monthly targets with progress bars |
| /notifikasi | Notifikasi/Index | Notifications list |

## Seeder Data

- 4 users (Admin Umum, Kasir Outlet A, Kasir Outlet B, Manajer)
- 2 outlets (Warung Makan Sedap, Kedai Kopi Kenangan)
- 5 categories, 17 products across 2 outlets
- 5 payment methods
- date_dimension 2020-2030 (4018 days)

## Dev Commands

```bash
php artisan serve           # Start Laravel dev server (port 8000)
npm run dev                 # Start Vite dev server
npm run build               # Production build
```

## DB Connection

XAMPP MariaDB — uses `mariadb` driver (not `mysql`) for PHP 8.5 compatibility.

import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, 'public', 'screenshots');
mkdirSync(dir, { recursive: true });

const BASE = 'http://127.0.0.1:8000';
const VIEWPORT = { width: 1440, height: 900 };

const pages = [
  { route: '/dashboard',          name: 'dashboard',             desc: 'Dashboard' },
  { route: '/transaksi/pos',      name: 'pos',                  desc: 'POS' },
  { route: '/transaksi',          name: 'transaksi-index',      desc: 'Riwayat Transaksi' },
  { route: '/produk',             name: 'produk',               desc: 'Produk' },
  { route: '/kategori',           name: 'kategori',             desc: 'Kategori' },
  { route: '/pelanggan',          name: 'pelanggan',            desc: 'Pelanggan' },
  { route: '/promo',              name: 'promo',                desc: 'Promo' },
  { route: '/pengeluaran',        name: 'pengeluaran',          desc: 'Pengeluaran' },
  { route: '/stok/log',           name: 'stok-log',             desc: 'Stok Log' },
  { route: '/stok/adjustment',    name: 'stok-adjustment',      desc: 'Adjustment Stok' },
  { route: '/target',             name: 'target',               desc: 'Target Penjualan' },
  { route: '/notifikasi',         name: 'notifikasi',           desc: 'Notifikasi' },
  { route: '/laporan/penjualan',  name: 'laporan-penjualan',    desc: 'Laporan Penjualan' },
  { route: '/laporan/laba-rugi',  name: 'laporan-laba-rugi',    desc: 'Laba Rugi' },
  { route: '/laporan/produk',     name: 'laporan-produk',       desc: 'Laporan Produk' },
  { route: '/laporan/trend',      name: 'laporan-trend',        desc: 'Trend Tahunan' },
  { route: '/laporan/buku-besar', name: 'buku-besar',           desc: 'Buku Besar' },
  { route: '/laporan/neraca',     name: 'neraca',               desc: 'Neraca' },
  { route: '/jurnal',             name: 'jurnal',               desc: 'Jurnal Umum' },
];

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: VIEWPORT });
const page = await ctx.newPage();

// Login flow using Inertia-compatible approach
console.log('🔑 Logging in...');

// 1. First get the login page to establish session + cookies
await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);

// 2. Type into React controlled inputs using keyboard (this correctly triggers React onChange)
const emailInput = page.locator('#email');
await emailInput.click();
await page.waitForTimeout(200);
await page.keyboard.type('admin.pusat@kelolaumkm.test', { delay: 20 });

const passInput = page.locator('#password');
await passInput.click();
await page.waitForTimeout(200);
await page.keyboard.type('password', { delay: 20 });

await page.waitForTimeout(500);

// 3. Click the "Log in" button using text content
await page.locator('button', { hasText: 'Log in' }).click();

// Wait for Inertia to process the request
await page.waitForTimeout(5000);

if (page.url().includes('dashboard')) {
  console.log('✅ Logged in!\n');
} else {
  console.log('❌ Login failed. URL: ' + page.url());
  await page.screenshot({ path: path.join(dir, 'debug-login.png'), fullPage: true });
  await browser.close();
  process.exit(1);
}

// Screenshot each page
for (const { route, name, desc } of pages) {
  console.log(`📸 ${desc}...`);
  try {
    await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle', timeout: 25000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(dir, `${name}.png`), fullPage: true });
    console.log(`   ✅ ${name}.png`);
  } catch (e) {
    console.log(`   ❌ ${name}.png — ${e.message}`);
  }
}

await browser.close();
console.log('\n🎉 All screenshots saved to public/screenshots/');

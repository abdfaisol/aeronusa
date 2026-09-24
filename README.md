# AERONUSA — Landing Page Sewa Drone (B2B)

Landing page penyewaan drone untuk klien korporat & instansi di Indonesia.
**Vite + React + Tailwind CSS v4 — frontend only** (tanpa backend, tanpa API server).

---

## Menjalankan proyek

```bash
npm install     # sekali saja
npm run dev     # http://localhost:5176
npm run build   # output produksi ke dist/
npm run preview # cek hasil build di http://localhost:5176
```

## Deploy dengan Docker (produksi)

Cukup satu service: Nginx menyajikan hasil `vite build` sebagai file statis.
Build multi-stage memakai Node hanya di tahap build, jadi image akhir tidak
membawa Node.js.

```bash
docker compose up -d --build   # bangun image & jalankan
docker compose logs -f         # pantau log
docker compose down            # hentikan
```

Buka **http://localhost:5176**.

Ingin ganti port tanpa menyentuh file? Jalankan dengan `APP_PORT`:

```bash
# PowerShell
$env:APP_PORT=8080; docker compose up -d
```

| Berkas               | Fungsi                                                    |
| -------------------- | --------------------------------------------------------- |
| `Dockerfile`         | Build multi-stage: `node:22-alpine` → `nginx:1.27-alpine` |
| `docker/nginx.conf`  | gzip, cache aset 1 tahun, fallback SPA, header keamanan   |
| `docker-compose.yml` | Satu service `web`, port `5176:80`, healthcheck           |
| `.dockerignore`      | Menjaga build context tetap kecil & cepat                 |

Catatan produksi:

- Nama aset Vite ber-hash, jadi `/assets/*` aman di-cache 1 tahun.
- `index.html` selalu `no-cache` supaya deploy baru langsung terpakai.
- `/healthz` dipakai untuk `HEALTHCHECK`; cek status: `docker compose ps`.
- Semua URL halaman dilayani `index.html` (fallback SPA), jadi deep link aman.

> Port dev (`5176`) sama dengan port container produksi. Sebelum `npm run dev`,
> hentikan container dulu (`docker compose down`) agar port tidak bentrok —
> atau jalankan container di port lain: `$env:APP_PORT=8080; docker compose up -d`.

## Struktur folder

```
├─ image.png                     # foto drone sumber (asli, jangan dihapus)
├─ index.html                    # shell HTML + Google Fonts
├─ public/
│  ├─ favicon.svg
│  └─ drone.png                  # aset drone versi bersih
├─ scripts/
│  └─ clean-drone-asset.ps1      # pembersih aset drone (lihat di bawah)
├─ docker/
│  └─ nginx.conf                 # konfigurasi server produksi
├─ Dockerfile                    # build multi-stage → image Nginx
├─ docker-compose.yml            # 1 service, port 5176
├─ .dockerignore
└─ src/
   ├─ main.jsx                   # entry point
   ├─ App.jsx                    # urutan section halaman
   ├─ index.css                  # design token, komponen, utility, animasi
   ├─ assets/drone.png           # aset drone yang dipakai komponen
   ├─ data/site.js               # SEMUA teks & konten halaman
   └─ components/
      ├─ Header.jsx              # navbar sticky + menu mobile + logo AERONUSA
      ├─ Hero.jsx                # hero langit + drone + strip statistik
      ├─ Intro.jsx               # statement + highlight lime
      ├─ WhyUs.jsx               # 3 kartu benefit
      ├─ Fleet.jsx               # section "Armada" — 5 kelas unit sewa + harga
      ├─ Services.jsx            # carousel 5 industri (scroll-snap)
      ├─ Process.jsx             # section lime + akordeon 4 langkah sewa
      ├─ Capabilities.jsx        # 4 kapabilitas + ilustrasi SVG
      ├─ Contact.jsx             # form permintaan sewa (validasi client-side)
      ├─ Footer.jsx
      └─ ui/                     # komponen dipakai bersama
         ├─ Icon.jsx             # icon set SVG inline (tanpa dependency)
         ├─ Media.jsx            # gambar + placeholder gradient + fade-in
         ├─ DronePlate.jsx       # render aset drone hero
         ├─ Reveal.jsx           # animasi muncul saat scroll
         └─ BackToTop.jsx
```

## Urutan section

`#beranda` → `#tentang` → `#keunggulan` → `#armada` → `#layanan` →
`#cara-sewa` → `#data` → `#kontak`

## Kustomisasi cepat

| Ingin mengubah                             | Edit di                                |
| ------------------------------------------ | -------------------------------------- |
| Semua teks, judul, daftar layanan, kontak  | `src/data/site.js`                     |
| Daftar armada sewa, spesifikasi, dan harga | array `fleet` di `src/data/site.js`    |
| Warna, font, tombol, animasi               | `src/index.css` blok `@theme`          |
| Urutan / menambah section                  | `src/App.jsx`                          |
| Foto section (Unsplash)                    | URL `photo(...)` di `src/data/site.js` |

## Section Armada (`#armada`)

Setiap unit di array `fleet` (`src/data/site.js`) punya properti `image` dan
`alt`. Ganti URL-nya dengan **foto unit Anda sendiri** — komponen tidak perlu
disentuh:

```js
{
  id: 's1',
  name: 'Aeronusa S1',
  category: 'Survei & Pemetaan',
  copy: '…',
  specs: ['Terbang 55 menit', 'Kamera 42 MP', '120 ha/hari'],
  price: 'Rp 4,5 jt',
  unit: '/hari',
  image: photo('photo-1473968512647-3e447244af8f', 900),
  alt: 'Drone quadcopter Aeronusa S1 terbang di atas hamparan hutan',
}
```

Lima unit: **S1** (survei), **H6** (angkat berat), **VTOL** (area luas),
**Agri 40** (pertanian), **TX** (inspeksi termal).

Foto memakai tinggi tetap (`h-[190px] sm:h-[210px]`) supaya framing semua
kartu konsisten meski lebar kartu berbeda antar baris. Foto di-zoom 4% saat
kartu di-hover dan diberi fade-in oleh `Media.jsx`.

> Foto saat ini diambil dari Unsplash sebagai placeholder. Untuk mengangkat
> kredibilitas B2B, ganti dengan foto asli armada Anda dan letakkan di
> `public/` (mis. `image: '/armada-s1.jpg'`).

## Sistem animasi

- Scroll reveal: hook `useInView` → kelas `.reveal` / `.is-visible`
  (naik 14px, durasi 0.55s, `--ease-out-soft`).
- `--ease-out-soft: cubic-bezier(0.16, 1, 0.3, 1)` dipakai konsisten untuk
  reveal, akordeon, hover gambar, dan indikator carousel.
- Float pelan: `.animate-float-slow` (naik-turun 5px, 10s).
- `prefers-reduced-motion: reduce` mematikan seluruh animasi di atas.

## Palet warna

Didefinisikan sebagai token Tailwind v4 di `src/index.css`:

- `ink` `#0A0A0A` — hitam utama (tombol, teks)
- `ink-2` `#1C1C1C` / `ink-soft` `#565B61` — permukaan gelap & teks sekunder
- `volt` `#D7F53C` — aksen lime (highlight, CTA, section proses)
- `mist` `#F1F2F4` / `mist-2` `#E5E7EA` — permukaan kartu & garis
- `sky-top` → `sky-low` — gradasi langit hero

Karena token ini terdaftar di `@theme`, otomatis tersedia sebagai utility:
`bg-volt`, `text-ink`, `border-mist-2`, `from-sky-top`, dan seterusnya.

## Aset drone

`image.png` di root adalah foto stok dengan latar transparan, tetapi masih
membawa **watermark dan kabut putih semi-transparan**. Script
`scripts/clean-drone-asset.ps1` (PowerShell + System.Drawing) melakukan:

1. Menghapus semua piksel semi-transparan yang terang (watermark + haze).
2. Memotong kanvas ke bounding box alpha drone, sehingga hasilnya
   `1110 × 515` tanpa padding dan siap dipakai `object-contain`.

> Sisa watermark samar masih bisa terlihat pada foto hero ini. Untuk hasil
> benar-benar bersih, ganti `src/assets/drone.png` dengan foto produksi Anda
> sendiri (PNG latar transparan).

Jalankan ulang kapan saja setelah mengganti `image.png`:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\clean-drone-asset.ps1
```

Untuk memakai foto drone sendiri: ganti `src/assets/drone.png` (dan
`public/drone.png`) dengan PNG latar transparan, lalu sesuaikan rasio default
pada `DronePlate.jsx` bila perlu.

## Catatan form permintaan sewa

Form di `Contact.jsx` sudah punya validasi client-side (nama, perusahaan,
email, panjang brief) dan tampilan sukses. **Belum ada pengiriman ke server** —
lihat komentar `// Frontend-only: no API call` dan ganti dengan `fetch()`
ke endpoint Anda (mis. CRM, email gateway, atau Google Sheet).

## Aksesibilitas & performa

- Skip-link ke konten utama, landmark `header`/`main`/`footer`.
- Semua kontrol interaktif punya label / `aria-*` (menu mobile, akordeon,
  carousel, progressbar).
- `prefers-reduced-motion` mematikan seluruh animasi.
- Gambar remote memakai `loading="lazy"` + `decoding="async"`, dengan
  placeholder gradient agar layout tetap rapi saat gambar gagal dimuat.
  #   a e r o n u s a 
   
   

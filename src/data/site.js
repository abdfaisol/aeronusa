/**
 * Seluruh konten halaman ada di file ini.
 * Ubah teks/daftar di sini saja — komponen tidak perlu disentuh.
 */

/** Buat URL Unsplash yang responsif. */
const photo = (id, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

export const company = {
  name: "AERONUSA",
  legal: "PT Aeronusa Dirgantara",
  tagline: "Penyewaan Drone Enterprise",
  email: "sewa@aeronusa.co.id",
  phone: "+62 811 900 4477",
  phoneHref: "+628119004477",
  address: "Hangar 4, Aerocity Bandara Soekarno–Hatta, Tangerang 15126",
  hours: "Senin–Sabtu · 07.00–20.00 WIB",
};

export const navLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Armada", href: "#armada" },
  { label: "Layanan", href: "#layanan" },
  { label: "Cara Sewa", href: "#cara-sewa" },
  { label: "Kontak", href: "#kontak" },
];

export const heroStats = [
  { value: "24 unit", label: "Armada siap operasi" },
  { value: "18.400+", label: "Jam terbang tercatat" },
  { value: "98,4%", label: "Misi tepat jadwal" },
  { value: "12 kota", label: "Jangkauan operasi" },
];

// Section "Kenapa menyewa di kami"
export const benefits = [
  {
    id: "hemat",
    highlight: "Hemat hingga 40%",
    copy: "dibanding membeli unit sendiri. Tanpa hangar, tanpa teknisi tetap, tanpa biaya perawatan.",
    image: photo("photo-1581092160562-40aa08e78837", 800),
    alt: "Teknisi menyiapkan drone di hangar",
  },
  {
    id: "cepat",
    highlight: "Siap 1×24 jam",
    copy: "Unit, pilot bersertifikat, dan perizinan terbang kami urus penuh sampai lokasi Anda.",
    image: photo("photo-1508444845599-5c89863b1c44", 800),
    alt: "Operator drone dengan ground station",
  },
  {
    id: "terawat",
    highlight: "Terawat & berasuransi",
    copy: "Tiap unit diservis setiap 50 jam terbang dan tercakup asuransi pihak ketiga.",
    image: photo("photo-1473968512647-3e447244af8f", 800),
    alt: "Drone quadcopter terbang di langit",
  },
];

// Section "Armada" — 5 tipe drone yang bisa disewa
// `image` memakai foto asli (Unsplash). Ganti dengan foto unit Anda sendiri
// kapan saja — cukup tukar URL-nya, komponen tidak perlu diubah.
export const fleet = [
  {
    id: "s1",
    name: "Aeronusa S1",
    category: "Survei & Pemetaan",
    copy: "Quadcopter ringkas untuk survei lahan, dokumentasi progres, dan inspeksi cepat.",
    specs: ["Terbang 55 menit", "Kamera 42 MP", "120 ha/hari"],
    price: "Rp 4,5 jt",
    unit: "/hari",
    image: photo("photo-1473968512647-3e447244af8f", 900),
    alt: "Drone quadcopter Aeronusa S1 terbang di atas hamparan hutan untuk pemetaan",
  },
  {
    id: "h6",
    name: "Aeronusa H6",
    category: "Angkat Berat & Inspeksi",
    copy: "Hexacopter berdaya angkat besar untuk membawa LiDAR, kamera termal, atau pod inspeksi.",
    specs: ["Payload 6 kg", "Tahan angin 12 m/s", "RTK sentimetrik"],
    price: "Rp 9,8 jt",
    unit: "/hari",
    image: photo("photo-1672904934287-f120e26c7057", 900),
    alt: "Drone angkat berat baling-baling banyak Aeronusa H6 siap lepas landas di landasan",
  },
  {
    id: "vtol",
    name: "Aeronusa VTOL",
    category: "Pemetaan Area Luas",
    copy: "Sayap tetap lepas-landas vertikal untuk koridor jalan, tambang, dan perkebunan luas.",
    specs: ["Terbang 180 menit", "1.200 ha/terbang", "Jarak 90 km"],
    price: "Rp 16 jt",
    unit: "/hari",
    image: photo("photo-1721969661090-22850761bb70", 900),
    alt: "Drone sayap tetap VTOL Aeronusa terbang untuk pemetaan area luas",
  },
  {
    id: "agri",
    name: "Aeronusa Agri 40",
    category: "Penyemprotan Pertanian",
    copy: "Drone semprot tangki 40 liter dengan radar terrain-follow untuk lahan berbukit.",
    specs: ["Tangki 40 L", "21 ha/jam", "Nozzle 8 titik"],
    price: "Rp 3,2 jt",
    unit: "/hari",
    image: photo("photo-1713952160156-bb59cac789a9", 900),
    alt: "Drone pertanian Aeronusa Agri 40 menyemprot sawah hijau dari udara",
  },
  {
    id: "tx",
    name: "Aeronusa TX",
    category: "Inspeksi Termal",
    copy: "Unit sensor presisi untuk memeriksa panel surya, gardu listrik, dan jaringan pipa panas.",
    specs: ["Termal 640×512", "Terbang 38 menit", "Aman terbang dekat"],
    price: "Rp 6,4 jt",
    unit: "/hari",
    image: photo("photo-1508614589041-895b88991e3e", 900),
    alt: "Drone inspeksi Aeronusa TX dengan gimbal kamera menghadap ke depan",
  },
];

export const fleetNote =
  "Semua harga sudah termasuk pilot bersertifikat, baterai cadangan, asuransi, dan pengolahan data dasar.";

// Section "Layanan" — carousel industri
export const industries = [
  {
    id: "infrastruktur",
    tag: "Infrastruktur",
    title: "Monitoring Infrastruktur",
    copy: "Pemantauan berkala jalan tol, jembatan, dan bendungan dengan data yang bisa dibandingkan antar periode.",
    image: photo("photo-1473968512647-3e447244af8f", 1000),
    alt: "Drone memantau kawasan infrastruktur",
  },
  {
    id: "konstruksi",
    tag: "Konstruksi",
    title: "Survei Lahan & Model 3D",
    copy: "Model 3D dan hitung volume galian-timbunan akurat untuk proyek konstruksi dan pertambangan.",
    image: photo("photo-1503387762-592deb58ef4e", 1000),
    alt: "Site konstruksi dengan tower crane",
  },
  {
    id: "logistik",
    tag: "Logistik",
    title: "Inspeksi Koridor & Jalur",
    copy: "Inspeksi jalur pipa, jaringan listrik, dan koridor transportasi tanpa menghentikan operasi.",
    image: photo("photo-1494412574643-ff11b0a5c1c3", 1000),
    alt: "Pelabuhan peti kemas dari udara",
  },
  {
    id: "pertanian",
    tag: "Pertanian",
    title: "Pertanian Presisi",
    copy: "Pemetaan kesehatan tanaman lalu penyemprotan tepat sasaran. Hemat pupuk hingga 30%.",
    image: photo("photo-1500595046743-cd271d694d30", 1000),
    alt: "Lahan pertanian presisi dari udara",
  },
  {
    id: "energi",
    tag: "Energi",
    title: "Inspeksi Aset & Termal",
    copy: "Deteksi titik panas pada panel surya, gardu induk, dan turbin sebelum jadi kegagalan besar.",
    image: photo("photo-1466611653911-95081537e5b7", 1000),
    alt: "Turbin angin dan inspeksi aset energi",
  },
];

// Section "Cara Sewa"
export const steps = [
  {
    id: "kirim",
    number: "01",
    title: "Kirim Kebutuhan Anda",
    copy: "Isi formulir singkat: lokasi, luas area, dan hasil yang Anda butuhkan. Cukup dua menit.",
  },
  {
    id: "penawaran",
    number: "02",
    title: "Terima Penawaran & Jadwal",
    copy: "Tim kami mengirim RAB tetap, ketersediaan unit, dan rencana terbang dalam 1×24 jam kerja.",
  },
  {
    id: "mobilisasi",
    number: "03",
    title: "Mobilisasi ke Lokasi",
    copy: "Pilot bersertifikat, unit, baterai cadangan, dan perizinan terbang tiba di lokasi Anda.",
  },
  {
    id: "data",
    number: "04",
    title: "Terima Hasil Data",
    copy: "Data mentah dan hasil olahan dikirim maksimal 72 jam setelah misi selesai, siap masuk GIS Anda.",
  },
];

// Section "Hasil Data"
export const capabilities = [
  {
    id: "pointcloud",
    icon: "cube",
    title: "Point Cloud",
    copy: "Point cloud rapat hingga 300 titik/m², siap diolah jadi model 3D dan hitungan volume.",
  },
  {
    id: "lidar",
    icon: "layers",
    title: "LiDAR & DSM",
    copy: "Data LiDAR dan model permukaan digital berakurasi sentimeter untuk analisis terrain.",
  },
  {
    id: "video",
    icon: "camera",
    title: "Video 4K & Foto 61 MP",
    copy: "Dokumentasi visual siap tayang untuk laporan, sosialisasi proyek, dan arsip aset.",
  },
  {
    id: "thermal",
    icon: "thermal",
    title: "Laporan Termal",
    copy: "Laporan titik panas radiometrik lengkap dengan suhu terkalibrasi per titik temuan.",
  },
];

export const serviceOptions = [
  "Survei & Pemetaan Lahan",
  "Inspeksi Infrastruktur",
  "Monitoring Konstruksi",
  "Pertanian Presisi (Penyemprotan)",
  "Inspeksi Termal & Energi",
  "Belum tahu, mohon rekomendasi",
];

export const certifications = [
  "Sertifikat Operator Kemenhub",
  "ISO 9001:2015 Terakreditasi",
  "Asuransi Pihak Ketiga",
  "Pilot BVLOS Tersertifikasi",
];

export const footerColumns = [
  {
    title: "Armada",
    links: [
      "S1 — Survei & Pemetaan",
      "H6 — Angkat Berat",
      "VTOL — Area Luas",
      "Agri 40 — Penyemprot",
      "TX — Inspeksi Termal",
    ],
    href: "#armada",
  },
  {
    title: "Layanan",
    links: [
      "Survei & Pemetaan",
      "Inspeksi Infrastruktur",
      "Pertanian Presisi",
      "Inspeksi Termal",
      "Sewa Harian & Bulanan",
    ],
    href: "#layanan",
  },
  {
    title: "Perusahaan",
    links: [
      "Tentang AERONUSA",
      "Cara Sewa",
      "Hasil Data",
      "Kontak",
      "Karier Pilot",
    ],
    href: "#kontak",
  },
];

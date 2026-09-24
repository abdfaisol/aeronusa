# =============================================================================
#  AERONUSA — landing page sewa drone
#  Build multi-stage: Node membangun aset statis, Nginx menyajikannya.
#  Hasil akhir: image kecil (~50 MB) tanpa Node.js di dalamnya.
# =============================================================================

# ------------------------------- Tahap 1: build ------------------------------
FROM node:22-alpine AS build

WORKDIR /app

# Salin manifest dulu supaya cache layer npm tidak batal saat kode berubah.
COPY package.json package-lock.json ./
RUN npm ci

# Baru salin sisa kode dan bangun aset produksi.
COPY . .
RUN npm run build

# ------------------------------ Tahap 2: runtime -----------------------------
FROM nginx:1.27-alpine AS runtime

# Konfigurasi server: fallback SPA, gzip, cache, header keamanan.
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Hasil build Vite.
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]

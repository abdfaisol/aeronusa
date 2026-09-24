# =============================================================================
#  AERONUSA — landing page sewa drone
#  Build multi-stage: Node membangun aset statis, lalu Node juga yang
#  menyajikannya lewat server.mjs — tanpa Nginx, tanpa dependency tambahan.
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
FROM node:22-alpine AS runtime

ENV NODE_ENV=production \
    PORT=5176 \
    STATIC_DIR=/app/dist

WORKDIR /app

# Hanya hasil build + server statis. node_modules tidak ikut dibawa.
COPY --from=build /app/dist ./dist
COPY server.mjs ./

EXPOSE 5176

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:5176/healthz || exit 1

# Tidak berjalan sebagai root.
USER node

CMD ["node", "server.mjs"]

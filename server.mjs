/**
 * Server statis untuk hasil `vite build`.
 *
 * Sengaja hanya memakai modul bawaan Node — tanpa Express, tanpa Nginx, tanpa
 * dependency tambahan sama sekali. Tugasnya sesederhana mungkin:
 *
 *   - menyajikan file dari folder `dist`
 *   - fallback SPA (semua rute tak dikenal → index.html)
 *   - gzip, cache header, dan header keamanan
 *
 * Jalankan:  node server.mjs
 * Env:       PORT (default 5176), HOST (default 0.0.0.0), STATIC_DIR (default ./dist)
 */

import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createGzip } from "node:zlib";
import { pipeline } from "node:stream/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(
  process.env.STATIC_DIR ||
    path.join(path.dirname(fileURLToPath(import.meta.url)), "dist"),
);
const PORT = Number(process.env.PORT || 5176);
const HOST = process.env.HOST || "0.0.0.0";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".webmanifest": "application/manifest+json",
};

/** Tipe yang layak dikompres (teks & vektor). */
const COMPRESSIBLE =
  /^(text\/|application\/(javascript|json|xml|manifest)|image\/svg)/;

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
};

/**
 * Aset Vite punya hash di namanya, jadi aman di-cache lama.
 * index.html justru harus selalu segar supaya deploy baru langsung terpakai.
 */
function cacheControl(pathname) {
  if (pathname.startsWith("/assets/"))
    return "public, max-age=31536000, immutable";
  if (/\.(png|jpe?g|webp|avif|gif|svg|ico|woff2?|ttf)$/i.test(pathname)) {
    return "public, max-age=2592000";
  }
  return "no-cache";
}

/**
 * Ubah URL menjadi file di dalam ROOT. Mengembalikan null bila tidak ada.
 * Path traversal (`..`) ditolak karena hasil resolve harus tetap di dalam ROOT.
 */
async function resolveFile(pathname) {
  let target = path.resolve(ROOT, "." + pathname);

  // Tolak apa pun yang keluar dari ROOT (mis. /../../etc/passwd).
  if (target !== ROOT && !target.startsWith(ROOT + path.sep)) return null;

  let info = await stat(target).catch(() => null);
  if (info?.isDirectory()) {
    target = path.join(target, "index.html");
    info = await stat(target).catch(() => null);
  }
  return info?.isFile()
    ? { file: target, size: info.size, mtime: info.mtime }
    : null;
}

/** Rute tanpa ekstensi = navigasi halaman → layani index.html (fallback SPA). */
async function notFoundFallback(pathname) {
  if (path.extname(pathname)) return null;
  const index = await resolveFile("/index.html");
  return index ? { ...index, isSpaFallback: true } : null;
}

function notFound(res) {
  res.writeHead(404, {
    "Content-Type": "text/plain; charset=utf-8",
    ...SECURITY_HEADERS,
  });
  res.end("404 Not Found");
}

const server = createServer(async (req, res) => {
  try {
    if (req.method !== "GET" && req.method !== "HEAD") {
      res.writeHead(405, { Allow: "GET, HEAD", ...SECURITY_HEADERS });
      return res.end("405 Method Not Allowed");
    }

    const pathname = decodeURIComponent(
      new URL(req.url, `http://${req.headers.host || "localhost"}`).pathname,
    );

    // Dipakai HEALTHCHECK Docker.
    if (pathname === "/healthz") {
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end("ok\n");
    }

    const hit =
      (await resolveFile(pathname)) || (await notFoundFallback(pathname));
    if (!hit) return notFound(res);

    const type =
      MIME[path.extname(hit.file).toLowerCase()] || "application/octet-stream";
    const etag = `W/"${hit.size}-${hit.mtime.getTime()}"`;

    const headers = {
      "Content-Type": type,
      "Cache-Control": cacheControl(pathname),
      ETag: etag,
      "Last-Modified": hit.mtime.toUTCString(),
      ...SECURITY_HEADERS,
    };

    // Balas 304 bila klien masih punya versi yang sama.
    if (req.headers["if-none-match"] === etag) {
      res.writeHead(304, headers);
      return res.end();
    }

    const gzip =
      COMPRESSIBLE.test(type) &&
      hit.size > 1024 &&
      (req.headers["accept-encoding"] || "").includes("gzip");

    if (gzip) {
      res.writeHead(200, {
        ...headers,
        "Content-Encoding": "gzip",
        Vary: "Accept-Encoding",
      });
    } else {
      headers["Content-Length"] = hit.size;
      res.writeHead(200, headers);
    }

    if (req.method === "HEAD") return res.end();

    const file = createReadStream(hit.file);
    if (gzip) {
      await pipeline(file, createGzip(), res);
    } else {
      await pipeline(file, res);
    }
  } catch (err) {
    if (err?.code === "ERR_STREAM_PREMATURE_CLOSE") return;
    console.error("[server]", err);
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    }
    res.end("500 Internal Server Error");
  }
});

server.listen(PORT, HOST, () => {
  console.log(`AERONUSA siap di http://${HOST}:${PORT}  (root: ${ROOT})`);
});

// Matikan dengan rapi supaya `docker stop` tidak menunggu timeout.
for (const signal of ["SIGTERM", "SIGINT"]) {
  process.on(signal, () => server.close(() => process.exit(0)));
}

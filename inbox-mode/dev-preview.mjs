#!/usr/bin/env node
/**
 * Local Node server simulating Vercel Routing Middleware + static file serving
 * so Secret Inbox Mode can be previewed locally with INBOX_MODE=true / false.
 */
import http from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import proxy from './proxy.js';

const root = resolve(new URL('../', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
const port = Number(process.env.PORT || 4173);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.pdf': 'application/pdf',
  '.mp4': 'video/mp4',
};

const server = http.createServer(async (req, res) => {
  const fullUrl = new URL(req.url || '/', `http://127.0.0.1:${port}`);
  const webReq = new Request(fullUrl.toString(), {
    method: req.method,
    headers: req.headers,
  });

  const mwRes = await proxy(webReq);
  if (mwRes && mwRes.headers.get('x-middleware-next') !== '1') {
    res.writeHead(mwRes.status, Object.fromEntries(mwRes.headers.entries()));
    if (req.method === 'HEAD') return res.end();
    const buf = Buffer.from(await mwRes.arrayBuffer());
    return res.end(buf);
  }

  let relPath = decodeURIComponent(fullUrl.pathname);
  if (relPath === '/index.html') {
    res.writeHead(308, { Location: '/' });
    return res.end();
  }
  if (relPath === '/partner.html') {
    res.writeHead(308, { Location: '/organisations.html' });
    return res.end();
  }

  let filePath = resolve(root, '.' + (relPath === '/' ? '/index.html' : relPath));
  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }
  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = join(filePath, 'index.html');
  }
  if (!existsSync(filePath)) {
    const notFound = resolve(root, '404.html');
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(existsSync(notFound) ? readFileSync(notFound) : 'Not found');
  }

  res.writeHead(200, {
    'Content-Type': MIME[extname(filePath).toLowerCase()] || 'application/octet-stream',
  });
  if (req.method === 'HEAD') return res.end();
  res.end(readFileSync(filePath));
});

server.listen(port, '127.0.0.1', () => {
  const active = process.env.INBOX_MODE?.trim().toLowerCase() === 'true'
    || (!process.env.INBOX_MODE?.trim() && process.env.VITE_INBOX_MODE?.trim().toLowerCase() === 'true');
  console.log(`Reliv preview running on http://127.0.0.1:${port} (Inbox Mode: ${active ? 'ENABLED' : 'DISABLED'})`);
});


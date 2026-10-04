(() => {
  'use strict';
  const config = JSON.parse(document.getElementById('lab-config').textContent);
  const form = document.getElementById('unlock-form');
  const field = document.getElementById('password');
  const button = document.getElementById('unlock');
  const status = document.getElementById('access-status');
  const toggle = document.getElementById('password-toggle');
  const base = new URL('./', location.href);
  const sessionKey = config.mode === 'server' ? 'video-lab:access:v1' : `minigrowlab:access:${config.id}:v1`;
  const ttl = 12 * 60 * 60 * 1000;
  let busy = false;
  const decode = value => Uint8Array.from(atob(value), char => char.charCodeAt(0));
  const encode = bytes => btoa(String.fromCharCode(...new Uint8Array(bytes)));
  const message = (text, error = false) => { status.textContent = text; status.classList.toggle('error', error); };
  const clearSession = () => { try { sessionStorage.removeItem(sessionKey); } catch {} };
  const saveSession = value => { try { sessionStorage.setItem(sessionKey, JSON.stringify(value)); } catch {} };
  function savedSession() {
    try {
      const value = JSON.parse(sessionStorage.getItem(sessionKey) || 'null');
      if (!value || value.expiresAt <= Date.now()) return null;
      if (config.mode === 'server') return typeof value.token === 'string' ? value : null;
      return value.version === config.bundle.url && typeof value.key === 'string' ? value : null;
    } catch { return null; }
  }
  async function request(url, options = {}) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 30000);
    try { return await fetch(url, { ...options, credentials: 'omit', cache: 'no-store', signal: controller.signal }); }
    finally { clearTimeout(timer); }
  }
  async function deriveKey(password) {
    if (!crypto.subtle) throw new Error('请使用新版浏览器打开此页面。');
    const material = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
    return crypto.subtle.deriveKey({ name: 'PBKDF2', salt: decode(config.salt), iterations: config.iterations, hash: 'SHA-256' }, material, { name: 'AES-GCM', length: 256 }, true, ['decrypt']);
  }
  async function verifyKey(key) {
    try {
      const data = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: decode(config.check.iv) }, key, decode(config.check.data));
      return new TextDecoder().decode(data) === `MiniGrowLab:${config.id}:access:v1`;
    } catch { return false; }
  }
  async function decryptFile(key, descriptor) {
    const response = await request(new URL(descriptor.url, base));
    if (!response.ok) throw new Error('内容加载失败，请稍后重试。');
    const bytes = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: decode(descriptor.iv) }, key, await response.arrayBuffer());
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
    return new Response(stream).arrayBuffer();
  }
  function openHTML(html) {
    if (typeof html !== 'string' || !/^<!doctype html>/i.test(html) || html.length > 2000000) throw new Error('内容加载失败，请重试。');
    field.value = '';
    document.open(); document.write(html); document.close();
    const exit = document.createElement('button');
    exit.id = 'lab-lock'; exit.type = 'button'; exit.textContent = '🔒 退出 / Lock';
    exit.style.cssText = 'position:fixed;right:14px;bottom:14px;z-index:40;border:1px solid #cad6d1;border-radius:999px;padding:10px 16px;background:#fff;color:#233238;font:600 13px system-ui;box-shadow:0 6px 24px #23323818;cursor:pointer';
    exit.addEventListener('click', () => { clearSession(); location.reload(); });
    document.body.append(exit);
  }
  async function openEncrypted(key) {
    message('正在打开…');
    const bundle = JSON.parse(new TextDecoder().decode(await decryptFile(key, config.bundle)));
    const urls = new Map();
    window.LabProtectedAssets = {
      fileUrl(path) {
        if (!bundle.assets[path]) return Promise.reject(new Error('Unknown protected asset'));
        if (!urls.has(path)) {
          urls.set(path, decryptFile(key, bundle.assets[path]).then(bytes => URL.createObjectURL(new Blob([bytes], { type: bundle.assets[path].type }))).catch(error => { urls.delete(path); throw error; }));
        }
        return urls.get(path);
      }
    };
    openHTML(bundle.html);
  }
  async function unlockServer(password) {
    const response = await request(config.api + '/api/videolab/unlock', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
    const data = await response.json();
    if (!response.ok) throw new Error(response.status === 401 ? '密码不正确，请重试。' : response.status === 429 ? '尝试次数较多，请稍后再试。' : '暂时无法连接，请重试。');
    if (typeof data.token !== 'string' || !Number.isFinite(data.expiresAt)) throw new Error('验证失败，请重试。');
    saveSession({ token: data.token, expiresAt: data.expiresAt });
    openHTML(data.html);
  }
  async function unlock(password) {
    if (config.mode === 'server') return unlockServer(password);
    const key = await deriveKey(password);
    if (!await verifyKey(key)) throw new Error('密码不正确，请重试。');
    await openEncrypted(key);
    saveSession({ key: encode(await crypto.subtle.exportKey('raw', key)), expiresAt: Date.now() + ttl, version: config.bundle.url });
  }
  function failure(error) {
    clearSession(); field.value = ''; field.focus();
    message(error.name === 'AbortError' ? '连接超时，请重试。' : error.message === 'Failed to fetch' ? '无法连接，请检查网络后重试。' : error.message, true);
  }
  toggle.addEventListener('click', () => {
    const visible = field.type === 'password';
    field.type = visible ? 'text' : 'password';
    toggle.setAttribute('aria-pressed', String(visible));
    toggle.setAttribute('aria-label', visible ? '隐藏密码' : '显示密码');
    field.focus();
  });
  form.addEventListener('submit', async event => {
    event.preventDefault(); if (busy) return;
    busy = true; button.disabled = true; message('正在验证…');
    try { await unlock(field.value); } catch (error) { failure(error); }
    finally { busy = false; button.disabled = false; }
  });
  const session = savedSession();
  if (session) {
    busy = true; button.disabled = true; message('正在打开…');
    (async () => {
      if (config.mode === 'server') {
        const response = await request(config.api + '/api/videolab/content', { headers: { Authorization: 'Bearer ' + session.token } });
        if (!response.ok) throw new Error('访问已过期，请重新输入密码。');
        openHTML(await response.text());
      } else {
        const key = await crypto.subtle.importKey('raw', decode(session.key), 'AES-GCM', false, ['decrypt']);
        if (!await verifyKey(key)) throw new Error('访问已过期，请重新输入密码。');
        await openEncrypted(key);
      }
    })().catch(failure).finally(() => { busy = false; button.disabled = false; });
  } else clearSession();
})();

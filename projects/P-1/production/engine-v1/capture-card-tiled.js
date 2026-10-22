// Tiled card capture for the browser built into the Claude app (mcp__Claude_Browser__*). Use it when the Chrome
// extension cannot screenshot: Windows stops painting Chrome while its window is fully covered, so captures hang.
// The built-in browser is always painted, but its screenshot frame is at most 800 px wide.
//
// Setup (once per session):
//   1. The user logs in to Threads in the built-in browser themselves. Never type credentials.
//   2. resize_window width 800, height 780. The frame is then 1:1 with CSS pixels.
// Per page (the page's CSP blocks eval, so paste this whole file with javascript_tool after every navigate):
//   await __cap2('unique phrase')   -> {realH}  1080 px overlay (zoom 3, same look as capture-card.js)
//   computer zoom [0,0,800,780] scale 1        -> tile x0-y0
//   __tile(280, 0); zoom again                 -> tile x280-y0
//   if realH > 780: __tile(0, 780) / __tile(280, 780) and zoom -> tiles x0-y780, x280-y780
// Save each zoom result (tool-results/mcp-Claude_Browser-blob-<id>.png) as <card>-x<X>-y<Y>.png, then run
// stitch-tiles.py to get 1080-wide card images that assemble-cards.py can read.
// Permalink headers include the sort bar and reply box: trim at the separator under the stats (assemble height).
document.documentElement.style.scrollbarWidth = 'none';
window.__cap2 = async (txt) => {
  txt = txt.normalize('NFC');
  document.getElementById('__ov')?.remove();
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 300));
  let el = null;
  for (let i = 0; i < 80 && !el; i++) {
    el = [...document.querySelectorAll('div[data-pressable-container="true"]')].find((e) => e.innerText.normalize('NFC').includes(txt));
    if (!el) { window.scrollBy(0, 500); await new Promise((r) => setTimeout(r, 450)); }
  }
  if (!el) return 'notfound';
  const ov = document.createElement('div');
  ov.id = '__ov';
  ov.style.cssText = 'position:fixed;left:0;top:0;z-index:2147483647;background:rgb(16,16,16);width:1080px;';
  const inner = document.createElement('div');
  inner.style.cssText = 'width:360px;zoom:3;padding:6px 0 4px;background:rgb(16,16,16)';
  const c = el.cloneNode(true);
  c.querySelectorAll('img').forEach((i) => {
    if ((i.alt || '').match(/ảnh đại diện|profile picture|avatar/i) || (i.width <= 48 && i.height <= 48)) {
      const w = i.parentElement; w.style.overflow = 'hidden'; w.style.borderRadius = '50%';
      i.style.filter = 'blur(6px)'; i.style.transform = 'scale(1.25)';
    }
  });
  const bad = /(?<![\p{L}\p{N}])(dcm|dkm|đcm|đkm|vl|vcl|vđ|dm|đm|cc|bcvl|clm|đéo|địt)(?![\p{L}\p{N}])/giu;
  const tw = document.createTreeWalker(c, NodeFilter.SHOW_TEXT); const nodes = [];
  while (tw.nextNode()) nodes.push(tw.currentNode);
  nodes.forEach((n) => {
    const v = n.nodeValue.normalize('NFC'); bad.lastIndex = 0; if (!bad.test(v)) return; bad.lastIndex = 0;
    const span = document.createElement('span');
    span.innerHTML = v.replace(/[&<>]/g, (s) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;'}[s])).replace(bad, (m) => '<span style="filter:blur(5px)">' + m + '</span>');
    n.replaceWith(span);
  });
  inner.appendChild(c); ov.appendChild(inner); document.body.appendChild(ov);
  await new Promise((r) => setTimeout(r, 300));
  // Long posts keep later lines in an opacity-0 wrapper; the English UI adds "Translate" links. Fix both.
  ov.querySelectorAll('*').forEach((e) => { if (getComputedStyle(e).opacity === '0' && (e.innerText || '').trim()) e.style.opacity = '1'; });
  [...ov.querySelectorAll('span,div,a,button')].forEach((e) => { const t = (e.textContent || '').trim(); if (/^(Translate|See translation|Dịch|Xem bản dịch)$/.test(t)) e.remove(); });
  await new Promise((r) => setTimeout(r, 1500));
  return {realH: Math.ceil(ov.getBoundingClientRect().height)};
};
window.__tile = (x, y) => { const ov = document.getElementById('__ov'); ov.style.left = (-x) + 'px'; ov.style.top = (-y) + 'px'; return [x, y]; };
'tiled capture ready';

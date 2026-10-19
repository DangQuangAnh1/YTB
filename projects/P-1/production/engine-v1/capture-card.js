// Threads card capture for engine-v1. Paste this whole file into Claude-in-Chrome `javascript_exec` on an open
// Threads post page (logged in, read-only), then call:
//
//   await window.__cap('a unique phrase from the post or comment', {hide: ['private text'], noPhotos: false})
//     -> {realH}: the overlay height in px. The overlay is a 1080px-wide clone (360px x zoom 3) pinned at the
//        top-left of the viewport.
//   computer zoom, region [0, 0, 1080, 845], scale 1, save_to_disk: true
//     -> one 1080x845 slice; the saved blob id goes into the assemble-cards.py spec.
//   window.__shift(px) moves the overlay up by px for a second slice of a card taller than 845px
//     (spec: "slices": [a, b], "shift": px).
//
// The clone blurs avatars and profanity before capture. `hide` blurs extra text such as phone numbers or
// addresses. Names that are part of the joke stay visible (tasks/user-decision-publish-release08-v1.md).
// `noPhotos` hides attached photos (other people's images) inside the clone. `hidePhotos: [i, ...]` hides only
// carousel photos by index (0-based, avatars excluded), e.g. a photo showing a face, so the others slide together.
// Photos are swapped to their largest srcset candidate so chat screenshots stay sharp at 1080px.
// Pixelate any remaining faces afterwards with assemble-cards.py `pixelate`.
// Viewport note: the zoom region is in the screenshot's coordinate frame. With a 1568px-wide frame on a 1920px
// window use [0, 0, 882, 690]; with a 1:1 frame use [0, 0, 1080, 845]. At scale 1 both save a 1080x845 slice.
// Take a screenshot first to read the frame size.
window.__cap = async (txt, opt = {}) => {
  txt = txt.normalize('NFC');
  document.getElementById('__ov')?.remove();
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 300));
  // Threads virtualises long comment lists: scroll in steps until the element appears.
  let el = null;
  for (let i = 0; i < 60 && !el; i++) {
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
  const photos = [];
  c.querySelectorAll('img').forEach((i) => {
    if ((i.alt || '').match(/ảnh đại diện|profile picture|avatar/i) || (i.width <= 48 && i.height <= 48)) {
      const w = i.parentElement;
      w.style.overflow = 'hidden'; w.style.borderRadius = '50%';
      i.style.filter = 'blur(6px)'; i.style.transform = 'scale(1.25)';
    } else if (opt.noPhotos && /Photo by|Ảnh của|Có thể là/.test(i.alt || '')) {
      let p = i;
      for (let k = 0; k < 6 && p.parentElement && p.parentElement !== c; k++) { p = p.parentElement; if (p.getBoundingClientRect().width > 250) break; }
      p.style.display = 'none';
    } else {
      photos.push(i);
      if (i.srcset) {
        const best = i.srcset.split(',').map((x) => x.trim().split(/\s+/)).sort((a, b) => parseInt(b[1]) - parseInt(a[1]))[0];
        if (best) { i.removeAttribute('srcset'); i.removeAttribute('sizes'); i.src = best[0]; }
      }
    }
  });
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const bad = /\b(dcm|dkm|đcm|đkm|vl|vcl|vđ|dm|đm|cc|bcvl|clm|đéo|địt)\b/gi;
  const hide = opt.hide?.length ? new RegExp('(' + opt.hide.map((h) => esc(h.normalize('NFC'))).join('|') + ')', 'g') : null;
  const tw = document.createTreeWalker(c, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (tw.nextNode()) nodes.push(tw.currentNode);
  nodes.forEach((n) => {
    const v = n.nodeValue.normalize('NFC');
    bad.lastIndex = 0;
    const hit = bad.test(v) || (hide && (hide.lastIndex = 0, hide.test(v)));
    bad.lastIndex = 0; if (hide) hide.lastIndex = 0;
    if (!hit) return;
    let html = v.replace(/[&<>]/g, (s) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;'}[s])).replace(bad, (m) => '<span style="filter:blur(5px)">' + m + '</span>');
    if (hide) html = html.replace(hide, (m) => '<span style="filter:blur(4.5px)">' + m + '</span>');
    const span = document.createElement('span');
    span.innerHTML = html;
    n.replaceWith(span);
  });
  inner.appendChild(c);
  ov.appendChild(inner);
  document.body.appendChild(ov);
  await new Promise((r) => setTimeout(r, 300));
  // Hide carousel items after layout, walking up to the item wrapper (narrower than the 1080px overlay).
  for (const k of opt.hidePhotos ?? []) {
    let p = photos[k];
    while (p && p.parentElement && p.parentElement.getBoundingClientRect().width < 780) p = p.parentElement;
    if (p) p.style.display = 'none';
  }
  await new Promise((r) => setTimeout(r, 2200));
  return {realH: Math.ceil(ov.getBoundingClientRect().height)};
};
window.__shift = (px) => { document.getElementById('__ov').style.top = (-px) + 'px'; return px; };
'capture helpers ready';

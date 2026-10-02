/* Testimonial SaaS embed widget — vanilla JS, no dependencies.
 * Usage: <script src="https://APP/embed.js" async></script>
 *        <div data-testimonial-widget="PUBLIC_KEY"></div>
 * Exposes only published testimonials (PRD §14-15). */
(function () {
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function stars(n) {
    if (!n) return '';
    var s = '';
    for (var i = 0; i < 5; i++) s += i < n ? '★' : '☆';
    return '<div class="ts-stars">' + s + '</div>';
  }
  function card(t, anim) {
    return (
      '<div class="ts-card ts-anim-' + anim + '">' +
      (t.profile_photo ? '<img class="ts-avatar" src="' + esc(t.profile_photo) + '" alt="" loading="lazy"/>' : '') +
      stars(t.rating) +
      '<p class="ts-text">' + esc(t.content) + '</p>' +
      '<div class="ts-who"><strong>' + esc(t.name) + '</strong>' +
      (t.job_title ? '<span> · ' + esc(t.job_title) + '</span>' : '') +
      (t.company_name ? '<span> @ ' + esc(t.company_name) + '</span>' : '') +
      '</div></div>'
    );
  }
  function css(cfg) {
    var dark = cfg.appearance === 'dark';
    var auto = cfg.appearance === 'auto';
    var bg = cfg.background === 'custom' ? cfg.bg_color || '#ffffff' : 'transparent';
    return (
      '.ts-wrap{font-family:system-ui,sans-serif;background:' + bg + ';' +
      'color:' + (dark ? '#f4f4f5' : '#18181b') + ';padding:12px;border-radius:12px}' +
      (auto ? '@media(prefers-color-scheme:dark){.ts-wrap{background:' + bg + ';color:#f4f4f5}.ts-card{background:#18181b!important;color:#f4f4f5}}' : '') +
      '.ts-grid{display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(240px,1fr))}' +
      '.ts-masonry{columns:3 240px;column-gap:12px}.ts-masonry .ts-card{break-inside:avoid;margin-bottom:12px}' +
      '.ts-carousel{display:flex;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:8px}' +
      '.ts-carousel .ts-card{min-width:min(320px,85%);scroll-snap-align:start}' +
      '.ts-card{background:' + (dark ? '#27272a' : '#ffffff') + ';border:1px solid rgba(0,0,0,.08);' +
      'border-radius:10px;padding:14px;box-shadow:0 1px 3px rgba(0,0,0,.06)}' +
      '.ts-stars{color:#f59e0b;letter-spacing:2px}' +
      '.ts-text{margin:8px 0;font-size:14px;line-height:1.5}' +
      '.ts-who{font-size:13px;opacity:.8}.ts-avatar{width:36px;height:36px;border-radius:50%;object-fit:cover}' +
      '.ts-anim-fade{animation:tsfade .5s ease}' +
      '.ts-anim-slide{animation:tsslide .5s ease}' +
      '@keyframes tsfade{from{opacity:0}to{opacity:1}}' +
      '@keyframes tsslide{from{opacity:0;transform:translateX(24px)}to{opacity:1;transform:none}}' +
      '.ts-empty{opacity:.6;font-size:14px;text-align:center;padding:16px}'
    );
  }
  // Shared renderer — also used by the Astro builder preview via window.TSWidget.render
  function render(el, payload) {
    var cfg = payload.embed || payload;
    var list = payload.testimonials || payload.preview || [];
    var shadow = el.attachShadow ? el.attachShadow({ mode: 'open' }) : null;
    var host = shadow || el;
    var inner;
    if (!list.length) {
      inner = '<div class="ts-empty">No testimonials yet.</div>';
    } else if (cfg.layout === 'carousel') {
      inner = '<div class="ts-carousel">' + list.map(function (t) { return card(t, cfg.animation || 'none'); }).join('') + '</div>';
    } else {
      inner = '<div class="ts-grid">' + list.map(function (t) { return card(t, cfg.animation || 'none'); }).join('') + '</div>';
    }
    host.innerHTML = '<style>' + css(cfg) + '</style><div class="ts-wrap">' + inner + '</div>';
  }
  window.TSWidget = { render: render };
  function boot() {
    var base = document.currentScript && document.currentScript.src
      ? document.currentScript.src.replace(/\/embed\.js.*$/, '')
      : '';
    document.querySelectorAll('div[data-testimonial-widget]').forEach(function (el) {
      var key = el.getAttribute('data-testimonial-widget');
      if (!key || el.dataset.tsLoaded) return;
      el.dataset.tsLoaded = '1';
      fetch(base + '/api/public/embeds/' + encodeURIComponent(key))
        .then(function (r) { return r.json(); })
        .then(function (j) {
          if (j.data && j.data.embed) render(el, j.data);
          else el.innerHTML = '<p style="opacity:.6">Testimonials unavailable.</p>';
        })
        .catch(function () { el.innerHTML = '<p style="opacity:.6">Testimonials unavailable.</p>'; });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();

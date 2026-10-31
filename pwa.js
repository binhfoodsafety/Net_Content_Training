// Đăng ký service worker và nhắc cách cài trên iPhone, iPad
(function () {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
  }

  var ua = navigator.userAgent;
  var ios = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var installed = navigator.standalone === true || (window.matchMedia && matchMedia('(display-mode: standalone)').matches);
  var hidden = false;
  try { hidden = localStorage.getItem('nc_install_hint') === '1'; } catch (e) {}
  if (!ios || installed || hidden) return;

  var box = document.createElement('div');
  box.style.cssText = 'position:fixed;left:12px;right:12px;bottom:12px;z-index:50;display:flex;gap:10px;align-items:center;max-width:520px;margin:0 auto;padding:10px 12px;background:#1e1b4b;color:#fff;border-radius:14px;font-size:14px;line-height:1.4;box-shadow:0 8px 24px rgba(0,0,0,.3)';
  var img = document.createElement('img');
  img.src = 'icons/icon-192.png'; img.alt = ''; img.width = 40; img.height = 40;
  img.style.borderRadius = '9px';
  var text = document.createElement('span');
  text.style.flex = '1';
  text.textContent = 'Cài lên màn hình chính: trong Safari, bấm nút Chia sẻ rồi chọn "Thêm vào MH chính".';
  var close = document.createElement('button');
  close.type = 'button'; close.textContent = '✕'; close.setAttribute('aria-label', 'Đóng hướng dẫn cài');
  close.style.cssText = 'flex:none;width:36px;height:36px;border:0;border-radius:9px;background:rgba(255,255,255,.14);color:#fff;font-size:16px;cursor:pointer';
  close.addEventListener('click', function () {
    box.remove();
    try { localStorage.setItem('nc_install_hint', '1'); } catch (e) {}
  });
  box.appendChild(img); box.appendChild(text); box.appendChild(close);
  document.body.appendChild(box);
})();

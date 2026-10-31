// Lưu sẵn khoá học để dùng khi không có mạng. Có mạng thì luôn lấy bản mới nhất.
var CACHE = 'nc-v4';
var FILES = [
  './',
  './cong-cu.html',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png',
  './icons/favicon-48.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './index.html',
  './manifest.webmanifest',
  './on-tap.html',
  './pwa.js',
  './slides/01-tong-quan.html',
  './slides/02-phap-luat.html',
  './slides/03-khoi-luong-muc-tieu.html',
  './slides/04-thiet-bi-can.html',
  './slides/05-quan-ly-bi.html',
  './slides/06-giam-sat-chiet-rot.html',
  './slides/07-xuat-xuong.html',
  './slides/08-he-thong-cai-tien.html',
  './slides/art/bell.svg',
  './slides/art/book.svg',
  './slides/art/box.svg',
  './slides/art/calc.svg',
  './slides/art/chart.svg',
  './slides/art/clipboard.svg',
  './slides/art/coins.svg',
  './slides/art/conveyor.svg',
  './slides/art/factory.svg',
  './slides/art/filler.svg',
  './slides/art/gear.svg',
  './slides/art/globe.svg',
  './slides/art/jar.svg',
  './slides/art/law.svg',
  './slides/art/magnifier.svg',
  './slides/art/scale.svg',
  './slides/art/stamp.svg',
  './slides/art/target.svg',
  './slides/art/team.svg',
  './slides/art/warning.svg',
  './slides/art/weights.svg',
  './slides/deck.css',
  './slides/deck.js',
  './study/data.js',
  './study/say.js',
  './study/study.css',
  './study/study.js',
  './study/tools.css',
  './study/tools.js'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES.map(function (f) { return new Request(f, { cache: 'no-cache' }); })); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  // Mọi khoá học trên binhfoodsafety.github.io dùng chung Cache, nên chỉ xoá bản cũ của khoá này
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k.indexOf('nc-') === 0 && k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

// Chỉ xử lý file của khoá học; font và giọng đọc đi thẳng ra mạng.
// no-cache: hỏi lại máy chủ thay vì dùng bản trình duyệt còn giữ 10 phút.
self.addEventListener('fetch', function (e) {
  var url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith(fetch(e.request.url, { cache: 'no-cache' }).then(function (res) {
    if (res.ok) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(url.origin + url.pathname, copy); });
    }
    return res;
  }).catch(function () {
    return caches.match(e.request, { ignoreSearch: true }).then(function (hit) {
      return hit || (e.request.mode === 'navigate' ? caches.match('./index.html') : Response.error());
    });
  }));
});

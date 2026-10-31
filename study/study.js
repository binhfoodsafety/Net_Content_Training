// Flashcard và quiz tự luyện cho từng module
(function () {
  var MODS = [
    { file: 'slides/01-tong-quan.html', title: 'Tổng quan & 5 điểm kiểm soát', color: '#4f46e5' },
    { file: 'slides/02-phap-luat.html', title: 'Yêu cầu pháp luật & lấy mẫu', color: '#be123c' },
    { file: 'slides/03-khoi-luong-muc-tieu.html', title: 'Thiết lập khối lượng mục tiêu', color: '#0f766e' },
    { file: 'slides/04-thiet-bi-can.html', title: 'Thiết bị cân', color: '#c2410c' },
    { file: 'slides/05-quan-ly-bi.html', title: 'Quản lý bì', color: '#7c3aed' },
    { file: 'slides/06-giam-sat-chiet-rot.html', title: 'Giám sát chiết rót & SPC', color: '#0369a1' },
    { file: 'slides/07-xuat-xuong.html', title: 'Xuất xưởng lô', color: '#15803d' },
    { file: 'slides/08-he-thong-cai-tien.html', title: 'Hệ thống, vai trò & cải tiến', color: '#a21caf' }
  ];
  var STORE = 'nc_study';
  var $ = function (id) { return document.getElementById(id); };

  function load() {
    try { return JSON.parse(localStorage.getItem(STORE)) || {}; } catch (e) { return {}; }
  }
  var saved = load();
  var known = saved.known || {};
  var best = saved.best || {};
  function save() {
    try { localStorage.setItem(STORE, JSON.stringify({ known: known, best: best })); } catch (e) {}
  }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  var toastTimer;
  function toast(msg) {
    var t = $('toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.classList.remove('show'); }, 1800);
  }

  // Thuyết minh: cùng endpoint và dự phòng tw-ob → gtx như slide
  var audio = new Audio();
  var ttsRun = 0;
  function ttsStop() { ttsRun++; audio.pause(); audio.onended = audio.onerror = null; }
  function ttsChunks(text) {
    var out = [];
    (normalize(text).match(/[^.!?;:]+[.!?;:]?/g) || []).forEach(function (s) {
      var line = '';
      s.trim().split(/\s+/).forEach(function (w) {
        if ((line + ' ' + w).trim().length > 170) { if (line) out.push(line); line = ''; }
        line = (line + ' ' + w).trim();
      });
      if (line) out.push(line);
    });
    return out;
  }
  function ttsUrl(text, client) {
    return 'https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&total=1&idx=0&client=' + client + '&q=' + encodeURIComponent(text) + '&textlen=' + text.length;
  }
  function speak(text) {
    ttsStop();
    var run = ttsRun, parts = ttsChunks(text), i = 0;
    function play(client) {
      if (run !== ttsRun || i >= parts.length) return;
      audio.onended = function () { i++; play('tw-ob'); };
      audio.onerror = function () { if (client === 'tw-ob') play('gtx'); else toast('Không phát được âm thanh, cần Internet'); };
      audio.src = ttsUrl(parts[i], client);
      var p = audio.play();
      if (p && p.catch) p.catch(function (e) { if (e.name === 'NotAllowedError') toast('Trình duyệt chặn âm thanh'); });
    }
    play('tw-ob');
  }

  // Module đang chọn: 0 là tất cả, 1 đến 8 là từng module
  var cur = 1;
  var cards = [], questions = [];
  function collect() {
    cards = []; questions = [];
    STUDY.forEach(function (m, i) {
      if (cur && cur !== i + 1) return;
      m.cards.forEach(function (c, k) { cards.push({ id: (i + 1) + '.' + k, q: c.q, a: c.a, mod: i }); });
      m.quiz.forEach(function (q) { questions.push({ q: q.q, c: q.c, w: q.w, why: q.why, s: q.s, mod: i }); });
    });
  }
  function bestKey() { return cur ? 'm' + cur : 'all'; }
  function updateStats() {
    var n = cards.filter(function (c) { return known[c.id]; }).length;
    $('statKnown').textContent = n + '/' + cards.length;
    var b = best[bestKey()];
    $('statBest').textContent = b === undefined ? '–' : b + '%';
  }

  // Flashcard
  var fcOrder = [], fcIndex = 0, fcFlipped = false, fcOnlyNew = false;
  function fcBuild(mix) {
    var pool = fcOnlyNew ? cards.filter(function (c) { return !known[c.id]; }) : cards;
    fcOrder = mix ? shuffle(pool) : pool.slice();
    fcIndex = 0;
    fcRender();
  }
  function fcSetFlip(on) {
    fcFlipped = on;
    $('card3d').classList.toggle('flipped', on);
  }
  function fcRender() {
    ttsStop();
    fcSetFlip(false);
    var empty = !fcOrder.length;
    var c = fcOrder[fcIndex];
    $('fcFront').textContent = empty ? 'Bạn đã nhớ hết thẻ' : c.q;
    $('fcBack').textContent = empty ? 'Bỏ chọn "Chỉ thẻ chưa nhớ" để ôn lại toàn bộ.' : c.a;
    $('fcStatus').textContent = empty ? '' : (known[c.id] ? '✓ Đã nhớ' : '') + (cur ? '' : ' Module ' + (c.mod + 1));
    $('fcCounter').textContent = (empty ? 0 : fcIndex + 1) + ' / ' + fcOrder.length;
    $('fcBar').max = fcOrder.length || 1;
    $('fcBar').value = empty ? 0 : fcIndex + 1;
    if (!empty && !cur) document.documentElement.style.setProperty('--c', MODS[c.mod].color);
    ['fcKnown', 'fcUnknown', 'fcPrev', 'fcNext', 'fcRead'].forEach(function (id) { $(id).disabled = empty; });
  }
  function fcNav(d) {
    if (!fcOrder.length) return;
    fcIndex = (fcIndex + d + fcOrder.length) % fcOrder.length;
    fcRender();
  }
  function fcMark(ok) {
    var c = fcOrder[fcIndex];
    if (!c) return;
    if (ok) known[c.id] = 1; else delete known[c.id];
    save(); updateStats();
    toast(ok ? '✓ Nhớ rồi' : '✗ Ôn thêm nhé');
    if (fcOnlyNew && ok) {
      fcOrder.splice(fcIndex, 1);
      if (fcIndex >= fcOrder.length) fcIndex = 0;
      fcRender();
    } else fcNav(1);
  }
  function fcRead() {
    var c = fcOrder[fcIndex];
    if (c) speak(fcFlipped ? c.a : c.q);
  }

  // Quiz
  var qList = [], qIndex = 0, qAnswered = false, qScore = 0, qCorrect = 0, qMissed = [], qOpts = [];
  function quizStart(list) {
    qList = shuffle(list); qIndex = 0; qScore = 0; qCorrect = 0; qMissed = [];
    $('quizRun').hidden = false; $('quizResult').hidden = true;
    quizRender();
  }
  function quizRender() {
    ttsStop();
    var q = qList[qIndex];
    qAnswered = false;
    qOpts = shuffle([q.c].concat(q.w));
    if (!cur) document.documentElement.style.setProperty('--c', MODS[q.mod].color);
    $('quizCounter').textContent = 'Câu ' + (qIndex + 1) + ' / ' + qList.length + (cur ? '' : ' · Module ' + (q.mod + 1));
    $('quizScore').textContent = qScore + ' điểm';
    $('quizProgress').style.width = Math.round(100 * qIndex / qList.length) + '%';
    $('quizQuestion').textContent = q.q;
    $('quizFeedback').textContent = ''; $('quizFeedback').className = 'quiz-feedback';
    $('quizNext').hidden = true; $('quizSlide').hidden = true;
    var box = $('quizOptions');
    box.textContent = '';
    qOpts.forEach(function (opt, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'quiz-opt';
      var k = document.createElement('span'); k.className = 'quiz-key'; k.textContent = i + 1;
      var t = document.createElement('span'); t.textContent = opt;
      b.appendChild(k); b.appendChild(t);
      b.addEventListener('click', function () { quizAnswer(i); });
      box.appendChild(b);
    });
  }
  function quizAnswer(i) {
    if (qAnswered || i >= qOpts.length) return;
    qAnswered = true;
    var q = qList[qIndex], ok = qOpts[i] === q.c;
    var btns = $('quizOptions').children;
    Array.prototype.forEach.call(btns, function (b, k) {
      b.disabled = true;
      if (qOpts[k] === q.c) b.classList.add('correct');
    });
    if (ok) { qScore += 10; qCorrect++; $('quizScore').textContent = qScore + ' điểm'; }
    else { btns[i].classList.add('wrong'); qMissed.push(q); }
    var fb = $('quizFeedback');
    fb.textContent = '';
    fb.className = 'quiz-feedback ' + (ok ? 'ok' : 'no');
    var head = document.createElement('b');
    head.textContent = ok ? '✅ Đúng rồi! +10 điểm' : '❌ Chưa đúng. Đáp án: ' + q.c;
    fb.appendChild(head);
    fb.appendChild(document.createTextNode(q.why));
    $('quizSlide').href = MODS[q.mod].file + '#' + q.s;
    $('quizSlide').hidden = false;
    $('quizNext').hidden = false;
    $('quizNext').focus({ preventScroll: true });
  }
  function quizNext() {
    qIndex++;
    if (qIndex >= qList.length) quizFinish(); else quizRender();
  }
  function quizSkip() {
    if (qAnswered) { quizNext(); return; }
    qMissed.push(qList[qIndex]);
    toast('⏭ Đã bỏ qua');
    quizNext();
  }
  function quizFinish() {
    ttsStop();
    var pct = Math.round(100 * qCorrect / qList.length);
    // Chỉ lần làm đủ cả bộ câu hỏi mới tính vào kết quả tốt nhất
    if (qList.length === questions.length && (best[bestKey()] === undefined || pct > best[bestKey()])) {
      best[bestKey()] = pct; save(); updateStats();
    }
    $('quizRun').hidden = true; $('quizResult').hidden = false;
    $('resultNum').textContent = pct + '%';
    $('resultText').textContent = 'Đúng ' + qCorrect + ' / ' + qList.length + ' câu · ' + qScore + ' điểm';
    $('quizWrong').hidden = !qMissed.length;
    if (!cur) document.documentElement.style.setProperty('--c', '#17627a');
  }

  // Chuyển tab và module
  var tab = 'fc';
  function setTab(t) {
    tab = t;
    ttsStop();
    $('panelFc').hidden = t !== 'fc'; $('panelQuiz').hidden = t !== 'quiz';
    $('tabFc').setAttribute('aria-selected', String(t === 'fc'));
    $('tabQuiz').setAttribute('aria-selected', String(t === 'quiz'));
    syncHash();
  }
  function syncHash() {
    if (history.replaceState) history.replaceState(null, '', '#' + bestKey() + (tab === 'quiz' ? '-quiz' : ''));
  }
  function setModule(n) {
    cur = n;
    $('moduleSelect').value = n;
    document.documentElement.style.setProperty('--c', n ? MODS[n - 1].color : '#17627a');
    collect(); updateStats();
    fcOnlyNew = false; $('fcOnlyNew').setAttribute('aria-pressed', 'false');
    fcBuild(!n);
    quizStart(questions);
    syncHash();
  }

  MODS.forEach(function (m, i) {
    var o = document.createElement('option');
    o.value = i + 1;
    o.textContent = 'Module ' + (i + 1) + ' · ' + m.title + ' (' + STUDY[i].cards.length + ' thẻ, ' + STUDY[i].quiz.length + ' câu)';
    $('moduleSelect').appendChild(o);
  });
  var all = document.createElement('option');
  all.value = 0; all.textContent = 'Tất cả module (trộn ngẫu nhiên)';
  $('moduleSelect').appendChild(all);

  $('moduleSelect').addEventListener('change', function () { setModule(Number(this.value)); });
  $('tabFc').addEventListener('click', function () { setTab('fc'); });
  $('tabQuiz').addEventListener('click', function () { setTab('quiz'); });
  $('scene').addEventListener('click', function () { fcSetFlip(!fcFlipped); });
  $('fcFlip').addEventListener('click', function () { fcSetFlip(!fcFlipped); });
  $('fcPrev').addEventListener('click', function () { fcNav(-1); });
  $('fcNext').addEventListener('click', function () { fcNav(1); });
  $('fcRead').addEventListener('click', fcRead);
  $('fcKnown').addEventListener('click', function () { fcMark(true); });
  $('fcUnknown').addEventListener('click', function () { fcMark(false); });
  $('fcShuffle').addEventListener('click', function () { fcBuild(true); toast('🔀 Đã xáo thẻ'); });
  $('fcOnlyNew').addEventListener('click', function () {
    fcOnlyNew = !fcOnlyNew;
    this.setAttribute('aria-pressed', String(fcOnlyNew));
    fcBuild(false);
  });
  $('quizNext').addEventListener('click', quizNext);
  $('quizSkip').addEventListener('click', quizSkip);
  $('quizAgain').addEventListener('click', function () { quizStart(questions); });
  $('quizWrong').addEventListener('click', function () { quizStart(qMissed); });

  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey || /SELECT|INPUT/.test(e.target.tagName)) return;
    var k = e.key.toLowerCase();
    if (tab === 'fc') {
      if (k === ' ' || k === 'enter') {
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;
        e.preventDefault(); fcSetFlip(!fcFlipped);
      }
      else if (k === 'arrowleft') fcNav(-1);
      else if (k === 'arrowright') fcNav(1);
      else if (k === 'r') fcRead();
    } else if (!$('quizRun').hidden) {
      if (k >= '1' && k <= '4') quizAnswer(Number(k) - 1);
      else if ((k === 'enter' || k === 'n') && qAnswered) { e.preventDefault(); quizNext(); }
      else if (k === 's') quizSkip();
      else if (k === 'r') speak(qList[qIndex].q);
    }
  });

  var m = /^#(?:m([1-8])|(all))(-quiz)?$/.exec(location.hash);
  setTab(m && m[3] ? 'quiz' : 'fc');
  setModule(m ? (m[2] ? 0 : Number(m[1])) : 1);
})();

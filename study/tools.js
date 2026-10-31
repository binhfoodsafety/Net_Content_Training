// Mô phỏng chiết rót và máy tính khối lượng mục tiêu M
(function () {
  var $ = function (id) { return document.getElementById(id); };
  function fmt(x, d) { return x.toFixed(d === undefined ? 2 : d).replace('.', ','); }
  function money(x) { return Math.round(x).toLocaleString('vi-VN') + ' đ'; }

  // Cùng bảng dung sai và hệ số minh hoạ với module 2, 3
  function tne(E) {
    if (E <= 50) return E * 0.09;
    if (E <= 100) return 4.5;
    if (E <= 200) return E * 0.045;
    if (E <= 300) return 9;
    if (E <= 500) return E * 0.03;
    if (E <= 1000) return 15;
    if (E <= 10000) return E * 0.015;
    if (E <= 15000) return 150;
    return E * 0.01;
  }
  var U_TU1 = 1.934, U_TU2 = 3.66, K80 = 0.223;

  // Phân vị chuẩn tắc, tương đương NORM.S.INV (xấp xỉ Acklam)
  function normInv(p) {
    var a = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.3577518672690, -30.66479806614716, 2.506628277459239];
    var b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572];
    var c = [-0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
    var d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416];
    var q, r;
    if (p < 0.02425) {
      q = Math.sqrt(-2 * Math.log(p));
      return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
    }
    if (p > 1 - 0.02425) return -normInv(1 - p);
    q = p - 0.5; r = q * q;
    return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  }

  // Trả về các yêu cầu { name, m } của một luật tại độ lệch chuẩn S
  function requirements(law, S) {
    var E = law.E, T = tne(E), out = [];
    if (law.type === 'eu') {
      out.push({ name: law.allow ? 'Trung bình, có hiệu chỉnh mẫu' : 'Trung bình, không hiệu chỉnh (n = 80)', m: law.allow ? E : E + K80 * S });
      out.push({ name: 'Tỷ lệ dưới TU1', m: E - T + U_TU1 * S });
      out.push({ name: 'Không dưới TU2', m: E - 2 * T + U_TU2 * S });
    } else if (law.type === 'strict') {
      out.push({ name: 'Trung bình', m: E });
      out.push({ name: 'Không đơn vị dưới TU1', m: E - T + U_TU2 * S });
    } else {
      out.push({ name: 'Tối đa ' + fmt(law.p, 1) + '% dưới L', m: law.L + normInv(1 - law.p / 100) * S });
      out.push({ name: 'Tối thiểu ' + fmt(law.pe, 0) + '% trên E', m: E + normInv(law.pe / 100) * S });
    }
    return out;
  }
  function targetM(law, S) {
    return Math.max.apply(null, requirements(law, S).map(function (r) { return r.m; }));
  }
  // Hai mức xuất xưởng của module 7
  function release(law, sref, M0, Sp) {
    // So ở 2 chữ số thập phân, đúng như số hiển thị và cách ghi trong khoá học
    var r2 = function (x) { return Math.round(x * 100) / 100; };
    var M = r2(targetM(law, sref)), onLine = r2(targetM(law, Sp));
    M0 = r2(M0); Sp = r2(Sp);
    if (M0 >= M && Sp <= sref) return { ok: true, level: 1, M: M, onLine: onLine };
    return { ok: M0 >= onLine, level: 2, M: M, onLine: onLine };
  }

  // ── Mô phỏng ──
  var LAW = { type: 'eu', allow: true, E: 100 };
  var S = { M: 100.1, Sm: 1.7, Sref: 2.38, n: 4, steps: 32, CL: 2.55, WL: 1.7, UCL: 7.99 };
  var UNITS = 1500, COST_G = 100; // giả định: đơn vị mỗi lần lấy mẫu, đồng/g
  var SCEN = [
    { key: 'stable', name: 'Máy ổn định, không có sự cố nào', lesson: 'Máy ổn định thì việc đúng là để yên. Mỗi lần chỉnh khi không có tín hiệu là phản ứng với nhiễu và làm biến thiên tăng (hiệu ứng Deming).' },
    { key: 'shift', name: 'Trung bình dịch chuyển đột ngột', lesson: 'Dịch chuyển đột ngột thường lộ ra bằng một điểm ngoài CL hoặc hai điểm cảnh báo cùng phía. Chỉnh đúng hướng, đúng mức rồi để yên.' },
    { key: 'drift', name: 'Trung bình trôi dần', lesson: 'Trôi dần lộ ra qua 7 điểm tăng hoặc giảm liên tiếp. Chỉnh sớm thì lượng nhỏ là đủ; hãy tìm nguyên nhân như tỷ trọng sản phẩm hoặc nhiệt độ.' },
    { key: 'head', name: 'Một đầu chiết bị lệch, biến thiên tăng', lesson: 'Biến thiên tăng thì chỉnh trung bình không giải quyết được. Dấu hiệu là biểu đồ R vượt UCL hoặc hai điểm cảnh báo ở hai phía; việc đúng là thử đầu chiết.' }
  ];
  var rng = Math.random;
  var seed = /[?&]seed=(\d+)/.exec(location.search);
  if (seed) {
    var st = Number(seed[1]);
    // Cùng seed cho cùng một ca, dùng khi kiểm thử
    rng = function () { st = (st + 0x6D2B79F5) | 0; var t = Math.imul(st ^ (st >>> 15), 1 | st); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  function gauss() { return Math.sqrt(-2 * Math.log(1 - rng())) * Math.cos(2 * Math.PI * rng()); }
  function randInt(a, b) { return a + Math.floor(rng() * (b - a + 1)); }

  var run;
  function simStart() {
    var sc = SCEN[randInt(0, SCEN.length - 1)];
    var force = /[?&]scen=(\w+)/.exec(location.search);
    if (force) sc = SCEN.filter(function (s) { return s.key === force[1]; })[0] || sc;
    run = {
      sc: sc, at: randInt(7, 18), sign: rng() < 0.5 ? -1 : 1, mu: S.M, sd: S.Sm, drift: 0,
      xs: [], rs: [], mus: [], sds: [], reset: 0, good: 0, needless: 0, missed: 0, adjusts: 0
    };
    $('simIntro').hidden = true; $('simEnd').hidden = true; $('simRun').hidden = false;
    $('simFeedback').textContent = 'Xem điểm đầu tiên rồi quyết định.'; $('simFeedback').className = 'sim-feedback';
    simSample();
  }
  function simSample() {
    var r = run, i = r.xs.length + 1;
    if (i === r.at) {
      if (r.sc.key === 'shift') r.mu += r.sign * 3;
      // Chỉ trôi lên: trôi xuống thì lô hụt trước khi kịp phát hiện, người làm đúng cũng không cứu được
      if (r.sc.key === 'drift') r.drift = 0.45;
      if (r.sc.key === 'head') r.sd = S.Sm * 2.2;
    }
    r.mu += r.drift;
    var vals = [];
    for (var k = 0; k < S.n; k++) vals.push(r.mu + r.sd * gauss());
    var mean = vals.reduce(function (a, b) { return a + b; }, 0) / S.n;
    r.xs.push(mean);
    r.rs.push(Math.max.apply(null, vals) - Math.min.apply(null, vals));
    r.mus.push(r.mu);
    r.sds.push(r.sd);
    $('simCounter').textContent = 'Lần lấy mẫu ' + r.xs.length + ' / ' + S.steps;
    $('simMean').textContent = 'X̄ = ' + fmt(mean) + ' g · R = ' + fmt(r.rs[r.rs.length - 1]) + ' g';
    drawX($('chartX'), r);
    drawR($('chartR'), r);
  }
  // Tìm tín hiệu tại điểm mới nhất, chỉ xét các điểm sau lần can thiệp gần nhất
  function signal(r) {
    var i = r.xs.length - 1, xs = r.xs.slice(r.reset).map(function (x) { return x - S.M; }), d = xs[xs.length - 1];
    var warn = function (v) { return Math.abs(v) > S.WL && Math.abs(v) <= S.CL; };
    var dir = d > 0 ? 1 : -1, p = xs[xs.length - 2];
    if (r.rs[i] > S.UCL) return { type: 'var', text: 'R vượt UCL: biến thiên tăng' };
    if (Math.abs(d) > S.CL) return { type: 'any', dir: dir, text: 'quy tắc 1: một điểm ngoài CL' };
    if (xs.length >= 2 && warn(d) && warn(p)) {
      if (d * p > 0) return { type: 'mean', dir: dir, text: 'quy tắc 2: hai điểm cảnh báo cùng phía' };
      return { type: 'var', text: 'quy tắc 3: hai điểm cảnh báo ở hai phía' };
    }
    if (xs.length >= 10 && xs.slice(-10).every(function (v) { return v * d > 0; })) return { type: 'mean', dir: dir, text: 'quy tắc 4: 10 điểm cùng phía' };
    if (xs.length >= 7) {
      var t = xs.slice(-7), up = true, down = true;
      for (var k = 1; k < 7; k++) { if (t[k] <= t[k - 1]) up = false; if (t[k] >= t[k - 1]) down = false; }
      if (up || down) return { type: 'mean', dir: up ? 1 : -1, text: 'quy tắc 5: 7 điểm cùng xu hướng' };
    }
    return null;
  }
  function simAct(adj, test) {
    var r = run, sg = signal(r), msg, ok;
    var acted = adj !== 0 || test;
    if (!sg) {
      ok = !acted;
      if (acted) r.needless++;
      msg = ok ? 'Đúng: chưa có tín hiệu nên để yên.' : 'Chưa có tín hiệu nào: lần can thiệp này không cần thiết.';
    } else {
      var right = (sg.type !== 'var' && adj * sg.dir < 0) || (sg.type !== 'mean' && test);
      ok = right;
      if (right) r.good++; else if (!acted) r.missed++;
      msg = (right ? 'Đúng. Có tín hiệu, ' : acted ? 'Chưa đúng cách xử lý. Tín hiệu là ' : 'Bỏ lỡ tín hiệu, ') + sg.text + '.';
    }
    if (test) {
      r.adjusts++;
      if (r.sc.key === 'head' && r.xs.length >= r.at) { r.sd = S.Sm; msg += ' Đã tìm ra và sửa đầu chiết lệch.'; }
      else msg += ' Các đầu chiết đều đạt.';
      r.reset = r.xs.length;
    }
    if (adj) { r.mu += adj; r.adjusts++; r.reset = r.xs.length; }
    $('simFeedback').textContent = msg;
    $('simFeedback').className = 'sim-feedback ' + (ok ? 'ok' : 'no');
    if (r.xs.length >= S.steps) simFinish(); else simSample();
  }
  function simFinish() {
    // Tính trên toàn lô từ trạng thái thật của máy: 128 đơn vị mẫu quá ít, nhiễu sẽ lấn át quyết định của người chơi
    var r = run, n = S.steps;
    var M0 = r.mus.reduce(function (a, b) { return a + b; }, 0) / n;
    var within = r.sds.reduce(function (a, b) { return a + b * b; }, 0) / n;
    var between = r.mus.reduce(function (a, b) { return a + (b - M0) * (b - M0); }, 0) / n;
    var Sp = Math.sqrt(within + between);
    var v = release(LAW, S.Sref, M0, Sp);
    var over = (M0 - LAW.E) * UNITS * S.steps * COST_G;
    $('simRun').hidden = true; $('simEnd').hidden = false;
    $('simVerdict').textContent = v.ok ? '✓ Xuất xưởng ở Mức ' + v.level : '✗ Giữ lô: dưới đường yêu cầu';
    $('simVerdict').className = 'verdict ' + (v.ok ? 'ok' : 'no');
    $('simKpis').innerHTML =
      '<div><b>' + fmt(M0) + ' g</b>M0 (yêu cầu ' + fmt(v.level === 1 ? v.M : v.onLine) + ')</div>' +
      '<div><b>' + fmt(Sp) + ' g</b>Sp (Sref ' + fmt(S.Sref) + ')</div>' +
      '<div><b>' + Math.round(Math.max(over, 0)).toLocaleString('vi-VN') + '</b>Đồng rót dư trong ca</div>' +
      '<div><b>' + r.good + '</b>Xử lý đúng tín hiệu</div>' +
      '<div><b>' + r.missed + '</b>Tín hiệu bỏ lỡ</div>' +
      '<div><b>' + r.needless + '</b>Can thiệp thừa</div>';
    drawX($('chartEnd'), r, true);
    var what = r.sc.key === 'stable' ? r.sc.name : r.sc.name + ' từ lần lấy mẫu ' + r.at;
    $('simLesson').textContent = 'Chuyện đã xảy ra: ' + what + '. ' + r.sc.lesson;
    window.__lastSim = { M0: M0, Sp: Sp, verdict: v, good: r.good, missed: r.missed, needless: r.needless, scen: r.sc.key };
  }
  // Vẽ theo bề rộng thật để chữ trên biểu đồ không bị thu nhỏ trên điện thoại
  function chartWidth(box) { return Math.max(300, Math.min(640, box.clientWidth || 640)); }
  function drawX(box, r, reveal) {
    var W = chartWidth(box), H = 210, L = 44, R = 10, T = 8, B = 20, lo = S.M - 5, hi = S.M + 5;
    var x = function (i) { return L + (W - L - R) * i / (S.steps - 1); };
    var y = function (v) { return T + (H - T - B) * (hi - Math.max(lo, Math.min(hi, v))) / (hi - lo); };
    var band = function (a, b, c) { return '<rect class="' + c + '" x="' + L + '" width="' + (W - L - R) + '" y="' + y(b) + '" height="' + (y(a) - y(b)) + '"/>'; };
    var line = function (v, c) { return '<line class="' + c + '" x1="' + L + '" x2="' + (W - R) + '" y1="' + y(v) + '" y2="' + y(v) + '"/>'; };
    var lab = function (v, t) { return '<text x="' + (L - 4) + '" y="' + (y(v) + 4) + '" text-anchor="end">' + t + '</text>'; };
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Biểu đồ X-bar">';
    s += band(S.M + S.WL, S.M + S.CL, 'zone-warn') + band(S.M - S.CL, S.M - S.WL, 'zone-warn');
    s += line(S.M, 'mid') + line(S.M + S.CL, 'lim') + line(S.M - S.CL, 'lim') + line(S.M + S.WL, 'warnline') + line(S.M - S.WL, 'warnline');
    s += lab(S.M, fmt(S.M, 1)) + lab(S.M + S.CL, fmt(S.M + S.CL, 1)) + lab(S.M - S.CL, fmt(S.M - S.CL, 1));
    s += '<polyline class="line" points="' + r.xs.map(function (v, i) { return x(i) + ',' + y(v); }).join(' ') + '"/>';
    if (reveal) s += '<polyline class="truth" points="' + r.mus.map(function (v, i) { return x(i) + ',' + y(v); }).join(' ') + '"/><text class="tag" x="' + (W - R) + '" y="16" text-anchor="end">Nét đứt: trung bình thật của máy</text>';
    s += r.xs.map(function (v, i) { return '<circle class="pt' + (Math.abs(v - S.M) > S.CL ? ' sig' : '') + '" cx="' + x(i) + '" cy="' + y(v) + '" r="3.5"/>'; }).join('');
    box.innerHTML = s + '<text x="' + L + '" y="' + (H - 5) + '">Biểu đồ X-bar (g)</text></svg>';
  }
  function drawR(box, r) {
    var W = chartWidth(box), H = 90, L = 44, Rt = 10, T = 6, B = 18, hi = 14;
    var x = function (i) { return L + (W - L - Rt) * i / (S.steps - 1); };
    var y = function (v) { return T + (H - T - B) * (hi - Math.min(hi, v)) / hi; };
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Biểu đồ R">';
    s += '<line class="lim" x1="' + L + '" x2="' + (W - Rt) + '" y1="' + y(S.UCL) + '" y2="' + y(S.UCL) + '"/><text x="' + (L - 4) + '" y="' + (y(S.UCL) + 4) + '" text-anchor="end">' + fmt(S.UCL, 1) + '</text>';
    s += '<line class="axis" x1="' + L + '" x2="' + (W - Rt) + '" y1="' + y(0) + '" y2="' + y(0) + '"/>';
    s += '<polyline class="line" points="' + r.rs.map(function (v, i) { return x(i) + ',' + y(v); }).join(' ') + '"/>';
    s += r.rs.map(function (v, i) { return '<circle class="pt' + (v > S.UCL ? ' sig' : '') + '" cx="' + x(i) + '" cy="' + y(v) + '" r="3"/>'; }).join('');
    box.innerHTML = s + '<text x="' + L + '" y="' + (H - 4) + '">Biểu đồ R (g)</text></svg>';
  }

  // ── Máy tính ──
  function num(id) { var v = parseFloat($(id).value); return isNaN(v) ? null : v; }
  function readLaw() {
    return { type: $('cLaw').value, allow: $('cAllow').checked, E: num('cE'), L: num('cL'), p: num('cP'), pe: num('cPE') };
  }
  function calc() {
    var law = readLaw(), sref = num('cS');
    var custom = law.type === 'custom';
    Array.prototype.forEach.call(document.querySelectorAll('.law-custom'), function (e) { e.hidden = !custom; });
    $('cAllowBox').hidden = law.type !== 'eu';
    var bad = law.E === null || law.E < 5 || sref === null || sref < 0 ||
      (custom && (law.L === null || !(law.p > 0 && law.p < 50) || !(law.pe > 0 && law.pe < 100)));
    if (bad) {
      var msg = custom ? 'Nhập E từ 5 g, Sref, L, tỷ lệ dưới L từ trên 0 đến dưới 50% và tỷ lệ trên E từ trên 0 đến dưới 100%.' : 'Nhập E từ 5 g trở lên và Sref không âm.';
      $('cResult').textContent = msg;
      $('chartM').textContent = ''; $('cLot').textContent = ''; $('cCost').textContent = '';
      return;
    }
    var T = tne(law.E), reqs = requirements(law, sref), M = targetM(law, sref);
    var rows = reqs.map(function (q) {
      return '<tr' + (q.m === M ? ' class="decide"' : '') + '><td>' + q.name + '</td><td>' + fmt(q.m) + ' g</td></tr>';
    }).join('');
    var slim = findSlim(law);
    $('cResult').innerHTML = '<span class="big">M = ' + fmt(M) + ' g</span>' +
      'TNE ' + fmt(T) + ' g · TU1 ' + fmt(law.E - T) + ' g · TU2 ' + fmt(law.E - 2 * T) + ' g' +
      (slim === null ? '' : ' · Slim ' + fmt(slim) + ' g') +
      '<table><tr><th>Yêu cầu</th><th>M</th></tr>' + rows + '</table>' +
      (M > law.E ? 'Rót dư có kế hoạch: ' + fmt(M - law.E) + ' g mỗi đơn vị.' : 'Không cần rót dư có kế hoạch.');

    var M0 = num('cM0'), Sp = num('cSp'), lot = null;
    if (M0 !== null && Sp !== null && Sp >= 0) {
      lot = release(law, sref, M0, Sp);
      $('cLot').innerHTML = lot.level === 1
        ? '<span class="ok">Đạt Mức 1: xuất xưởng.</span> M0 ≥ M và Sp ≤ Sref.'
        : 'Không đạt Mức 1. Mức 2: M(' + fmt(Sp) + ') = ' + fmt(lot.onLine) + ' g, M0 = ' + fmt(M0) + ' g. ' +
          (lot.ok ? '<span class="ok">Trên đường yêu cầu: xuất xưởng.</span>' : '<span class="no">Dưới đường yêu cầu: giữ lô.</span>');
    } else $('cLot').textContent = 'Nhập M0 và Sp của lô.';

    var units = num('cUnits'), price = num('cPrice'), avg = num('cAvg');
    if (units !== null && price !== null && avg !== null) {
      var perG = price / 1000 * units;
      var total = Math.max(avg - law.E, 0) * perG, planned = Math.max(M - law.E, 0) * perG, extra = Math.max(avg - Math.max(M, law.E), 0) * perG;
      $('cCost').innerHTML = '<span class="big">' + money(total) + '/năm</span>Tổng rót dư so với E. Có kế hoạch ' + money(Math.min(planned, total)) + ', ngoài kế hoạch ' + money(extra) + '.';
    } else $('cCost').textContent = 'Nhập đủ sản lượng, giá và trung bình thực tế.';
    drawM(law, sref, M, lot ? { M0: M0, Sp: Sp } : null, slim);
  }
  // Mức S lớn nhất mà M vẫn bằng M(0), tìm bằng chia đôi vì mọi yêu cầu đều tăng theo S
  function findSlim(law) {
    var base = targetM(law, 0), lo = 0, hi = law.E;
    if (targetM(law, 1e-6) > base + 1e-9) return null;
    for (var i = 0; i < 60; i++) { var mid = (lo + hi) / 2; if (targetM(law, mid) > base + 1e-9) hi = mid; else lo = mid; }
    return lo;
  }
  function drawM(law, sref, M, lot, slim) {
    var W = chartWidth($('chartM')), H = 260, L = 52, R = 12, T = 12, B = 34;
    var maxS = Math.max(sref, slim || 0, lot ? lot.Sp : 0) * 1.5 || 1;
    var pts = [], i, ys = [];
    for (i = 0; i <= 60; i++) { var s = maxS * i / 60; var m = targetM(law, s); pts.push([s, m]); ys.push(m); }
    if (lot) ys.push(lot.M0);
    var lo = Math.min.apply(null, ys.concat([law.E])), hi = Math.max.apply(null, ys);
    var pad = Math.max((hi - lo) * 0.15, law.E * 0.003);
    lo -= pad; hi += pad;
    var x = function (v) { return L + (W - L - R) * v / maxS; };
    var y = function (v) { return T + (H - T - B) * (hi - v) / (hi - lo); };
    var svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Đồ thị M theo S">';
    var path = pts.map(function (p) { return x(p[0]) + ',' + y(p[1]); }).join(' ');
    svg += '<polygon class="zone-good" points="' + L + ',' + T + ' ' + (W - R) + ',' + T + ' ' + x(maxS) + ',' + y(pts[60][1]) + ' ' + path + '"/>';
    svg += '<polygon class="zone-out" points="' + path + ' ' + x(maxS) + ',' + (H - B) + ' ' + L + ',' + (H - B) + '"/>';
    svg += '<line class="mid" x1="' + L + '" x2="' + (W - R) + '" y1="' + y(law.E) + '" y2="' + y(law.E) + '"/>';
    svg += '<text x="' + (L - 4) + '" y="' + (y(law.E) + 4) + '" text-anchor="end">E</text>';
    svg += '<polyline class="req" points="' + path + '"/>';
    for (i = 0; i <= 5; i++) {
      var t = maxS * i / 5;
      svg += '<text x="' + x(t) + '" y="' + (H - B + 15) + '" text-anchor="middle">' + fmt(t, 1) + '</text>';
    }
    svg += '<text x="' + ((L + W - R) / 2) + '" y="' + (H - 4) + '" text-anchor="middle">Độ lệch chuẩn S (g)</text>';
    svg += '<text x="' + (L - 4) + '" y="' + (T + 8) + '" text-anchor="end">' + fmt(hi, 1) + '</text>';
    svg += '<text x="' + (L - 4) + '" y="' + (H - B) + '" text-anchor="end">' + fmt(lo, 1) + '</text>';
    svg += '<line class="warnline" x1="' + x(sref) + '" x2="' + x(sref) + '" y1="' + T + '" y2="' + (H - B) + '"/>';
    svg += '<text class="tag" x="' + (x(sref) + 4) + '" y="' + (T + 12) + '">Sref</text>';
    svg += '<circle class="pt" cx="' + x(sref) + '" cy="' + y(M) + '" r="5"/>';
    if (lot) svg += '<circle class="pt lot" cx="' + x(lot.Sp) + '" cy="' + y(lot.M0) + '" r="6"/><text class="tag" x="' + (x(lot.Sp) + 9) + '" y="' + (y(lot.M0) - 7) + '">Lô</text>';
    $('chartM').innerHTML = svg + '</svg>';
  }

  // ── Điều khiển ──
  function setTab(t) {
    $('panelSim').hidden = t !== 'sim'; $('panelCalc').hidden = t !== 'calc';
    $('tabSim').setAttribute('aria-selected', String(t === 'sim'));
    $('tabCalc').setAttribute('aria-selected', String(t === 'calc'));
    if (history.replaceState) history.replaceState(null, '', location.search + '#' + t);
    if (t === 'calc') calc();
  }
  $('tabSim').addEventListener('click', function () { setTab('sim'); });
  $('tabCalc').addEventListener('click', function () { setTab('calc'); });
  $('simStart').addEventListener('click', simStart);
  $('simAgain').addEventListener('click', simStart);
  $('simTest').addEventListener('click', function () { simAct(0, true); });
  Array.prototype.forEach.call(document.querySelectorAll('[data-adj]'), function (b) {
    b.addEventListener('click', function () { simAct(Number(b.getAttribute('data-adj')), false); });
  });
  Array.prototype.forEach.call(document.querySelectorAll('#panelCalc input, #panelCalc select'), function (e) {
    e.addEventListener('input', calc);
  });
  setTab(location.hash === '#calc' ? 'calc' : 'sim');

  // Dùng khi kiểm thử
  window.__tools = { tne: tne, normInv: normInv, targetM: targetM, release: release, findSlim: findSlim };
})();

/*
 * 棒人間のイラストを SVG で描くための小さなライブラリ。
 *
 * ポーズは「各部位が向いている角度（度）」で指定します。
 *   0 = 上、90 = 右、180 = 下、270 = 左（時計回り）
 *
 *   t  : 腰 → 首（胴体）
 *   h  : 頭の向き（胴体からの追加角度。省略時 0）
 *   a1, f1 : 手前の腕（上腕・前腕）
 *   a2, f2 : 奥の腕
 *   l1, s1 : 手前の脚（太もも・すね）
 *   l2, s2 : 奥の脚
 *
 * 各コマは自動的に一番低い点がマットの上に乗るよう配置されます。
 */
(function (global) {
  "use strict";

  var LEN = { torso: 40, neck: 5, head: 10, ua: 20, fa: 19, th: 25, sh: 23 };
  var GROUND_Y = 168;
  var STROKE = 7;

  function dir(a) {
    var r = (a * Math.PI) / 180;
    return [Math.sin(r), -Math.cos(r)];
  }
  function step(p, a, len) {
    var d = dir(a);
    return [p[0] + d[0] * len, p[1] + d[1] * len];
  }

  function joints(p) {
    var hip = [0, 0];
    var neck = step(hip, p.t, LEN.torso);
    var head = step(neck, p.t + (p.h || 0), LEN.neck + LEN.head);
    var e1 = step(neck, p.a1, LEN.ua);
    var w1 = step(e1, p.f1, LEN.fa);
    var e2 = step(neck, p.a2, LEN.ua);
    var w2 = step(e2, p.f2, LEN.fa);
    var k1 = step(hip, p.l1, LEN.th);
    var ft1 = step(k1, p.s1, LEN.sh);
    var k2 = step(hip, p.l2, LEN.th);
    var ft2 = step(k2, p.s2, LEN.sh);
    var j = {
      hip: hip, neck: neck, head: head,
      e1: e1, w1: w1, e2: e2, w2: w2,
      k1: k1, ft1: ft1, k2: k2, ft2: ft2
    };
    if (p.m) {
      Object.keys(j).forEach(function (k) { j[k] = [-j[k][0], j[k][1]]; });
    }
    return j;
  }

  function lowest(j) {
    var max = -Infinity;
    Object.keys(j).forEach(function (k) {
      var y = j[k][1] + (k === "head" ? LEN.head : STROKE / 2);
      if (y > max) max = y;
    });
    return max;
  }

  function line(a, b, cls) {
    return '<line class="' + cls + '" x1="' + a[0].toFixed(1) + '" y1="' + a[1].toFixed(1) +
      '" x2="' + b[0].toFixed(1) + '" y2="' + b[1].toFixed(1) + '"/>';
  }
  function poly(pts, cls) {
    return '<polyline class="' + cls + '" points="' +
      pts.map(function (q) { return q[0].toFixed(1) + "," + q[1].toFixed(1); }).join(" ") + '"/>';
  }

  /** 1 コマ分の棒人間を描く */
  function drawFigure(pose, x, opacity) {
    var j = joints(pose);
    var dy = GROUND_Y - lowest(j) - (pose.lift || 0);
    var dx = x;
    Object.keys(j).forEach(function (k) { j[k] = [j[k][0] + dx, j[k][1] + dy]; });
    var s = '<g class="fig" opacity="' + opacity + '">';
    // 奥の手足（うすい色）
    s += poly([j.neck, j.e2, j.w2], "limb far");
    s += poly([j.hip, j.k2, j.ft2], "limb far");
    // 胴体
    s += line(j.hip, j.neck, "limb body");
    // 手前の手足
    s += poly([j.hip, j.k1, j.ft1], "limb near");
    s += poly([j.neck, j.e1, j.w1], "limb near");
    // 頭
    s += '<circle class="head" cx="' + j.head[0].toFixed(1) + '" cy="' + j.head[1].toFixed(1) +
      '" r="' + LEN.head + '"/>';
    s += "</g>";
    return s;
  }

  /** 技のイラスト（複数コマ）を SVG 文字列で返す */
  function drawSkill(skill) {
    var frames = skill.frames;
    var n = frames.length;
    var w = 400;
    var out = '<svg viewBox="0 0 ' + w + ' 186" role="img" aria-label="' + skill.name +
      'のイラスト" xmlns="http://www.w3.org/2000/svg">';
    // マット
    out += '<rect class="mat" x="8" y="' + GROUND_Y + '" width="' + (w - 16) + '" height="12" rx="4"/>';
    // かべ
    if (skill.wall) {
      out += '<rect class="wall" x="' + skill.wall + '" y="10" width="14" height="' + (GROUND_Y - 10) + '"/>';
      for (var yy = 22; yy < GROUND_Y; yy += 18) {
        out += '<line class="wall-line" x1="' + skill.wall + '" y1="' + yy + '" x2="' + (skill.wall + 14) + '" y2="' + yy + '"/>';
      }
    }
    // 進む向きの矢印
    if (skill.arrow !== false) {
      out += '<path class="arrow" d="M50 14 H350 M350 14 l-10 -7 M350 14 l-10 7"/>';
    }
    frames.forEach(function (f, i) {
      var x = f.x != null ? f.x : 50 + (i * (w - 100)) / Math.max(1, n - 1);
      var op = n === 1 ? 1 : 0.35 + (0.65 * i) / (n - 1);
      out += drawFigure(f, x, op.toFixed(2));
    });
    out += "</svg>";
    return out;
  }

  global.StickFigure = { drawSkill: drawSkill, drawFigure: drawFigure };
})(window);

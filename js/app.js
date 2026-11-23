(function () {
  "use strict";

  var skills = window.MAT_SKILLS;
  var groupsEl = document.getElementById("groups");
  var dialog = document.getElementById("player");
  var videoBox = document.getElementById("video-box");

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function watchUrl(id) {
    return "https://www.youtube.com/watch?v=" + encodeURIComponent(id);
  }
  function embedUrl(id) {
    return "https://www.youtube.com/embed/" + encodeURIComponent(id) +
      "?autoplay=1&rel=0&playsinline=1&modestbranding=1";
  }

  // ---- カード一覧 ----
  var groups = [];
  skills.forEach(function (s) {
    var g = groups.filter(function (x) { return x.name === s.group; })[0];
    if (!g) { g = { name: s.group, items: [] }; groups.push(g); }
    g.items.push(s);
  });

  var no = 0;
  groups.forEach(function (g) {
    var sec = el("section", "group");
    sec.appendChild(el("h2", "group-title", g.name));
    var grid = el("div", "grid");
    g.items.forEach(function (s) {
      no += 1;
      var card = el("button", "card");
      card.type = "button";
      card.style.setProperty("--c", s.color);
      card.setAttribute("aria-label", s.name + "（" + s.yomi + "）のお手本動画を見る");
      var hasMain = !!s.video;
      var badge = hasMain ? '<span class="badge play">▶ お手本動画</span>'
        : (s.related ? '<span class="badge ref">▶ 参考動画</span>' : '<span class="badge none">動画じゅんび中</span>');
      card.innerHTML =
        '<span class="num">' + no + '</span>' +
        '<span class="art">' + window.StickFigure.drawSkill(s) + '</span>' +
        '<span class="label"><span class="yomi">' + s.yomi + '</span>' +
        '<span class="name">' + s.name + '</span></span>' + badge;
      card.addEventListener("click", function () { openSkill(s); });
      grid.appendChild(card);
    });
    sec.appendChild(grid);
    groupsEl.appendChild(sec);
  });

  // ---- 動画ウィンドウ ----
  function play(video) {
    videoBox.innerHTML = "";
    var f = document.createElement("iframe");
    f.src = embedUrl(video.id);
    f.title = video.title;
    f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    f.allowFullscreen = true;
    f.referrerPolicy = "strict-origin-when-cross-origin";
    videoBox.appendChild(f);
    document.getElementById("player-video-title").textContent = video.channel + "：" + video.title;
    var a = document.getElementById("player-yt");
    a.href = watchUrl(video.id);
    a.hidden = false;
    Array.prototype.forEach.call(document.querySelectorAll(".extra-btn"), function (b) {
      b.classList.toggle("on", b.dataset.id === video.id);
    });
  }

  function openSkill(s) {
    dialog.style.setProperty("--c", s.color);
    document.getElementById("player-title").textContent = s.name;
    document.getElementById("player-yomi").textContent = s.yomi;
    document.getElementById("player-point").textContent = "ポイント：" + s.point;

    var note = document.getElementById("player-note");
    note.hidden = !s.relatedNote || !!s.video;
    note.textContent = s.relatedNote || "";

    var main = s.video || s.related || null;
    var list = [];
    if (main) list.push(main);
    (s.extra || []).forEach(function (v) { if (!main || v.id !== main.id) list.push(v); });

    var extraWrap = document.getElementById("player-extra");
    var extraList = document.getElementById("extra-list");
    extraList.innerHTML = "";
    extraWrap.hidden = list.length < 2 && !!main || list.length === 0;
    list.forEach(function (v, i) {
      var b = el("button", "extra-btn", (i === 0 && main ? (s.video ? "お手本 " : "参考 ") : "") + v.title);
      b.type = "button";
      b.dataset.id = v.id;
      b.addEventListener("click", function () { play(v); });
      extraList.appendChild(b);
    });

    if (main) {
      play(main);
    } else if (list.length) {
      showEmpty("この わざの お手本動画は じゅんび中です。下の れんしゅう動画を 見てみよう。");
    } else {
      showEmpty("この わざの お手本動画は じゅんび中です。");
    }

    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  function showEmpty(msg) {
    videoBox.innerHTML = '<div class="empty">' + msg + "</div>";
    document.getElementById("player-video-title").textContent = "";
    document.getElementById("player-yt").hidden = true;
  }

  function closePlayer() {
    videoBox.innerHTML = ""; // 動画を止める
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  }

  document.getElementById("player-close").addEventListener("click", closePlayer);
  dialog.addEventListener("click", function (e) { if (e.target === dialog) closePlayer(); });
  dialog.addEventListener("close", function () { videoBox.innerHTML = ""; });
})();

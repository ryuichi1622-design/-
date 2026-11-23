/*
 * 技の一覧とお手本動画の設定
 *
 * 動画はすべて YouTube「ベネッセ教育情報」チャンネル（@benessekyouiku）の
 * 「できたよ！マット運動」シリーズから、技ごとに 1 本を固定しています。
 *
 *   video   : その技のお手本動画（YouTube の動画 ID = watch?v= の後ろ 11 文字）
 *   related : チャンネル内に技そのものの動画が無いとき、参考として見せる近い技の動画
 *   extra   : あわせて見られる練習動画
 *
 * 動画を差し替えたいときは、ID の部分だけ書きかえてください。
 */
(function (global) {
  "use strict";

  // ベネッセ教育情報チャンネル「できたよ！マット運動」の動画
  var V = {
    zenten:        { id: "wdrQpMbdFdk", title: "【前転のポイント】" },
    yurikago:      { id: "kKlon5ftKWk", title: "【前転の基本練習①　ゆりかご】" },
    haitouritsu:   { id: "neUG6d7tlcE", title: "【前転の基本練習②　背倒立から立ち上がる】" },
    sakaZenten:    { id: "coAeIcyYR34", title: "【前転の基本練習③　坂道を使って前転】" },
    kaikyaku:      { id: "_M4deuEAnFc", title: "【開脚前転のポイント】" },
    kaikyakuDai:   { id: "hB5zA_HDaBs", title: "【開脚前転の基本練習①　台から立ちあがる】" },
    kaikyakuHojo:  { id: "LpB0K2Np9nw", title: "【開脚前転の基本練習②　補助付き開脚前転】" },
    kouten:        { id: "YhbMAiffk7E", title: "【後転のポイント】" },
    sakaKouten:    { id: "QWJekVBjbvY", title: "【後転の基本練習①　坂道を使って後転】" },
    hojoKouten:    { id: "9wC1xR_S-Z8", title: "【後転の基本練習②　補助付き後転】" },
    sokuten:       { id: "SzKF7tnr2Sg", title: "【側転のポイント】" },
    sokutenDai:    { id: "NCesFzhK1ys", title: "【側転の基本練習①　目印を置いて台を飛び越す】" },
    sokutenHojo:   { id: "Odozyaz4tfY", title: "【側転の基本練習②　補助付き側転】" }
  };

  // よく使うポーズ（右向き）
  var P = {
    stand:      { t: 0,   a1: 170, f1: 175, a2: 190, f2: 185, l1: 177, s1: 180, l2: 183, s2: 180 },
    standUp:    { t: 0,   a1: 12,  f1: 8,   a2: 352, f2: 356, l1: 177, s1: 180, l2: 183, s2: 180 },
    squatHands: { t: 55,  a1: 150, f1: 165, a2: 145, f2: 160, l1: 70,  s1: 195, l2: 75,  s2: 192 },
    squatArms:  { t: 20,  a1: 80,  f1: 85,  a2: 75,  f2: 80,  l1: 45,  s1: 200, l2: 50,  s2: 198 },
    rollStart:  { t: 130, h: 40, a1: 120, f1: 200, a2: 115, f2: 195, l1: 195, s1: 180, l2: 200, s2: 182 },
    rollBack:   { t: 258, h: 40, a1: 10, f1: 80, a2: 5, f2: 75, l1: 325, s1: 160, l2: 330, s2: 165 },
    handstand:  { t: 180, a1: 180, f1: 180, a2: 178, f2: 178, l1: 2,   s1: 2,   l2: 358, s2: 358 }
  };
  function pose(base, over) {
    var o = {};
    Object.keys(base).forEach(function (k) { o[k] = base[k]; });
    Object.keys(over || {}).forEach(function (k) { o[k] = over[k]; });
    return o;
  }

  var SKILLS = [
    {
      key: "zenten",
      name: "前転",
      yomi: "ぜんてん",
      group: "まわる（前）",
      color: "#ef6c4a",
      point: "手を足の近くについて、おへそを見ながら丸くなって回ろう。",
      frames: [P.squatHands, P.rollStart, P.rollBack, P.squatArms],
      video: V.zenten,
      extra: [V.yurikago, V.haitouritsu, V.sakaZenten]
    },
    {
      key: "kaikyaku-zenten",
      name: "開脚前転",
      yomi: "かいきゃくぜんてん",
      group: "まわる（前）",
      color: "#f39c34",
      point: "足がマットにつきそうになってから、すばやく足を開こう。",
      frames: [
        P.squatHands,
        P.rollStart,
        pose(P.rollBack, { l1: 20, s1: 20, l2: 30, s2: 30, a1: 0, f1: 20, a2: 350, f2: 10 }),
        { t: 45, a1: 165, f1: 175, a2: 160, f2: 172, l1: 105, s1: 105, l2: 118, s2: 118 }
      ],
      video: V.kaikyaku,
      extra: [V.kaikyakuDai, V.kaikyakuHojo]
    },
    {
      key: "touritsu-zenten",
      name: "倒立前転",
      yomi: "とうりつぜんてん",
      group: "まわる（前）",
      color: "#e9b200",
      point: "倒立でまっすぐになったら、ひじを曲げて頭の後ろからゆっくり回ろう。",
      frames: [
        P.standUp,
        P.handstand,
        P.rollStart,
        P.rollBack,
        P.squatArms
      ],
      video: null,
      related: V.zenten,
      relatedNote: "ベネッセ教育情報チャンネルには倒立前転の動画がないため、「前転のポイント」を参考動画にしています。",
      extra: [V.haitouritsu]
    },
    {
      key: "kouten",
      name: "後転",
      yomi: "こうてん",
      group: "まわる（後ろ）",
      color: "#3fa34d",
      point: "おへそを見るように丸くなって、手で耳の横のマットをおそう。",
      frames: [
        pose(P.squatArms, { m: true }),
        pose(P.rollBack, { m: true, t: 262, a1: 0, f1: 255, a2: 10, f2: 260 }),
        { m: true, t: 190, a1: 160, f1: 200, a2: 165, f2: 205, l1: 260, s1: 200, l2: 255, s2: 195 },
        pose(P.squatArms, { m: true })
      ],
      video: V.kouten,
      extra: [V.sakaKouten, V.hojoKouten]
    },
    {
      key: "kaikyaku-kouten",
      name: "開脚後転",
      yomi: "かいきゃくこうてん",
      group: "まわる（後ろ）",
      color: "#2b9a8a",
      point: "足を頭の上まで回してから大きく開き、手でマットをおして立とう。",
      frames: [
        pose(P.squatArms, { m: true }),
        pose(P.rollBack, { m: true, t: 265, a1: 0, f1: 250, a2: 10, f2: 255, l1: 320, s1: 320, l2: 330, s2: 330 }),
        { m: true, t: 190, h: -40, a1: 170, f1: 200, a2: 175, f2: 205, l1: 245, s1: 245, l2: 230, s2: 230 },
        { m: true, t: 50, a1: 170, f1: 182, a2: 165, f2: 178, l1: 222, s1: 222, l2: 238, s2: 238 }
      ],
      video: null,
      related: V.kouten,
      relatedNote: "ベネッセ教育情報チャンネルには開脚後転の動画がないため、「後転のポイント」を参考動画にしています。",
      extra: [V.sakaKouten, V.hojoKouten]
    },
    {
      key: "shinshitsu-kouten",
      name: "伸膝後転",
      yomi: "しんしつこうてん",
      group: "まわる（後ろ）",
      color: "#2a86c9",
      point: "ひざをのばしたまま後ろに回り、手でマットを強くおして立とう。",
      frames: [
        pose(P.stand, { m: true, t: 10, a1: 90, f1: 90, a2: 85, f2: 85 }),
        { m: true, t: 330, a1: 60, f1: 70, a2: 55, f2: 65, l1: 85, s1: 85, l2: 90, s2: 90 },
        { m: true, t: 260, h: -15, a1: 10, f1: 250, a2: 15, f2: 255, l1: 300, s1: 300, l2: 305, s2: 305 },
        { m: true, t: 125, a1: 175, f1: 180, a2: 170, f2: 178, l1: 190, s1: 190, l2: 195, s2: 195 }
      ],
      video: null,
      related: V.kouten,
      relatedNote: "ベネッセ教育情報チャンネルには伸膝後転の動画がないため、「後転のポイント」を参考動画にしています。",
      extra: [V.sakaKouten]
    },
    {
      key: "kubi-touritsu",
      name: "首倒立",
      yomi: "くびとうりつ",
      group: "さかさになる",
      color: "#6a5acd",
      point: "こしを手でささえて、足のつま先を天じょうに向けてのばそう。",
      arrow: false,
      frames: [
        { x: 120, t: 272, a1: 95, f1: 92, a2: 98, f2: 95, l1: 90, s1: 90, l2: 92, s2: 92 },
        { x: 235, t: 268, h: 15, a1: 95, f1: 92, a2: 98, f2: 95, l1: 5, s1: 5, l2: 8, s2: 8 },
        { x: 330, t: 180, h: 90, a1: 95, f1: 330, a2: 100, f2: 335, l1: 2, s1: 2, l2: 358, s2: 358 }
      ],
      video: V.haitouritsu,
      extra: [V.yurikago]
    },
    {
      key: "atama-touritsu",
      name: "頭倒立",
      yomi: "あたまとうりつ",
      group: "さかさになる",
      color: "#9b51b5",
      point: "頭と両手で三角形をつくり、ゆっくり足を上げてまっすぐにしよう。",
      arrow: false,
      frames: [
        { x: 70, t: 100, h: 80, a1: 100, f1: 175, a2: 105, f2: 178, l1: 170, s1: 270, l2: 175, s2: 272 },
        { x: 210, t: 180, a1: 100, f1: 170, a2: 105, f2: 172, l1: 90, s1: 180, l2: 95, s2: 182 },
        { x: 330, t: 180, a1: 100, f1: 170, a2: 105, f2: 172, l1: 2, s1: 2, l2: 358, s2: 358 }
      ],
      video: null,
      relatedNote: "ベネッセ教育情報チャンネルには頭倒立のお手本動画がありません。",
      extra: [V.haitouritsu]
    },
    {
      key: "kabe-touritsu",
      name: "壁倒立",
      yomi: "かべとうりつ",
      group: "さかさになる",
      color: "#c2477a",
      point: "うでをのばして手をつき、足をけり上げてかかとを壁につけよう。",
      wall: 362,
      arrow: false,
      frames: [
        { x: 70, t: 0, a1: 15, f1: 10, a2: 5, f2: 2, l1: 160, s1: 175, l2: 195, s2: 185 },
        { x: 200, t: 165, a1: 180, f1: 180, a2: 178, f2: 178, l1: 40, s1: 40, l2: 175, s2: 185 },
        { x: 340, t: 185, a1: 182, f1: 182, a2: 180, f2: 180, l1: 15, s1: 15, l2: 10, s2: 10 }
      ],
      video: null,
      relatedNote: "ベネッセ教育情報チャンネルには壁倒立のお手本動画がありません。"
    },
    {
      key: "touritsu-bridge",
      name: "倒立ブリッジ",
      yomi: "とうりつブリッジ",
      group: "さかさになる",
      color: "#d94f4f",
      point: "倒立からおなかをそらし、足をゆっくり遠くにおろしてブリッジしよう。",
      frames: [
        P.standUp,
        P.handstand,
        { t: 190, a1: 180, f1: 180, a2: 178, f2: 178, l1: 60, s1: 85, l2: 55, s2: 80 },
        { t: 245, h: -60, a1: 205, f1: 190, a2: 200, f2: 186, l1: 135, s1: 172, l2: 130, s2: 170 }
      ],
      video: null,
      relatedNote: "ベネッセ教育情報チャンネルには倒立ブリッジのお手本動画がありません。"
    },
    {
      key: "sokuhou-touritsu-kaiten",
      name: "側方倒立回転",
      yomi: "そくほうとうりつかいてん",
      group: "よこにまわる",
      color: "#1f9bb5",
      point: "手を一本の線の上につき、こしとひざをのばして大きく回ろう。",
      frames: [
        { t: 0, a1: 25, f1: 20, a2: 335, f2: 340, l1: 165, s1: 165, l2: 205, s2: 205 },
        { t: 180, a1: 150, f1: 150, a2: 210, f2: 210, l1: 28, s1: 28, l2: 332, s2: 332 },
        { t: 0, a1: 35, f1: 30, a2: 325, f2: 330, l1: 160, s1: 160, l2: 200, s2: 200 }
      ],
      video: V.sokuten,
      extra: [V.sokutenDai, V.sokutenHojo]
    }
  ];

  global.MAT_SKILLS = SKILLS;
  global.BENESSE_CHANNEL_URL = "https://www.youtube.com/@benessekyouiku";
})(window);

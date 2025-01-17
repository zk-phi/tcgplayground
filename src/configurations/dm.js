import { shuffle as shuffleArray } from "../utils/array.js";
import {
  stack, state, setState,
  move, push, unshift, moveSingle, pushSingle, unshiftSingle,
  toggleTapped, toggleReversed, toggleFlipped, toggleLaid,
  shuffle, untapAll,
} from "../state.js";
import { showMenu } from "../components/Menu.jsx";
import { showList } from "../components/List.jsx";
import { showLightbox } from "../components/Lightbox.jsx";

/* TODO: Add support for advanced decks */

export const rows = [
  /* [
   *   { area: "shields", label: "サイド", width: 2 },
   *   [
   *     [
   *       { area: "field", label: "場" },
   *       { area: "deck", label: "山", width: 1 },
   *     ],
   *     [
   *       { area: "lands", label: "ベンチ" },
   *       { area: "graveyard", label: "墓", width: 1 },
   *     ],
   *     [{ area: "hand", label: "手札" }],
   *   ],
   * ], */
  [
    { area: "field", label: "⚔️️ 場" }
  ], [
    { area: "shields", label: "🛡️ シールド" },
    { area: "exploring", label: "🫣めくられた", optional: true },
    { area: "deck", label: "🫳 デッキ", width: 1 },
    { area: "graveyard", label: "🪦 墓地", width: 1 },
    { area: "grdeck", label: "🎰 GR", width: 1, optional: true },
    { area: "exdeck", label: "⚡ 超次元", width: 1, optional: true },
  ], [
    { area: "lands", label: "⛰️ マナ" },
  ], [
    { area: "hand", label: "🃏 手札" },
  ],
];

const extractSrcs = (classname) => {
  const elements = document.getElementsByClassName(classname)?.[0]?.children;
  return Array.from(elements ?? []).map(el => el?.children?.[0]?.src ?? "");
}

export const initialize = () => {
  const deck = shuffleArray(extractSrcs("MainCards"));
  const grdeck = extractSrcs("GRCardsList");
  const exdeck = extractSrcs("HyperspatialCardsList");
  setState({
    field: [],
    lands: [],
    graveyard: [stack({ cards: [] })],
    hand: deck.splice(0, 5).map(src => stack({ cards: [src] })),
    shields: deck.splice(0, 5).map(src => stack({ cards: [src], flipped: true })),
    deck: [stack({ cards: deck, flipped: true })],
    grdeck: grdeck.length ? [stack({ cards: grdeck, flipped: true })] : [],
    exdeck: exdeck.length ? [stack({ cards: exdeck })] : [],
    exploring: [],
  });
};

const standardOnDragHandler = (src, si) => (e, dest, di) => {
  if (dest === "graveyard" || dest === "exdeck") {
    push(src, si, dest, di ?? 0);
  } else if (dest === "deck" || dest === "grdeck" || di != null) {
    showMenu(e, [
      ["🫳 上に置く", () => push(src, si, dest, di ?? 0)],
      ["🫴 下に入れる", () => unshift(src, si, dest, di ?? 0)],
    ]);
  } else {
    move(src, si, dest, { reversed: true });
  }
};

const deckOnDragHandler = (src, si, allowEmpty) => (e, dest, di) => {
  if (dest === "graveyard" || dest === "exdeck") {
    pushSingle(src, si, 0, dest, di ?? 0, allowEmpty);
  } else if (dest === "deck" || dest === "grdeck" || di != null) {
    showMenu(e, [
      ["🫳 上に置く", () => pushSingle(src, si, 0, dest, di ?? 0, allowEmpty)],
      ["🫴 下に入れる", () => unshiftSingle(src, si, 0, dest, di ?? 0, allowEmpty)],
    ]);
  } else {
    moveSingle(src, si, 0, dest, allowEmpty, { reversed: dest === "lands" });
  }
};

const showListWithContextMenu = (e, area, ix, allowEmpty = false) => {
  showList(e, area, ix, (e, j) => showMenu(e, [
    ["🔍 拡大", () => showLightbox(e, state.value[area][ix].cards[j])],
    ["→⚔️ 場に出す", () => moveSingle(area, ix, j, "field", allowEmpty)],
    ["→🛡️ シールドに追加", () => moveSingle(area, ix, j, "shields", allowEmpty)],
    ["→🫳 デッキの上に置く", () => pushSingle(area, ix, j, "deck", 0, allowEmpty)],
    ["→🫴 デッキの下に入れる", () => unshiftSingle(area, ix, j, "deck", 0, allowEmpty)],
    ["→🪦 墓地に送る", () => pushSingle(area, ix, j, "graveyard", 0, allowEmpty)],
    ["→🎰 GRゾーンに置く", () => unshiftSingle(area, ix, j, "grdeck", 0, allowEmpty)],
    ["→⚡ 超次元ゾーンに置く", () => pushSingle(area, ix, j, "exdeck", 0, allowEmpty)],
    ["→⛰️ マナに追加", () => moveSingle(area, ix, j, "lands", allowEmpty, { reversed: true })],
    ["→🃏 手札に加える", () => moveSingle(area, ix, j, "hand", allowEmpty)],
  ]));
};

export const handlers = {
  field: ix => ({
    onClick: e => showLightbox(e, state.value.field[ix].cards[0]),
    onContextMenu: e => showMenu(e, [
      ["✅ タップ", () => toggleTapped("field", ix)],
      ["⚡ 超次元ゾーン送り", () => push("field", ix, "exdeck", 0)],
      ["⬅️ 横向きにする", () => toggleLaid("field", ix)],
      ["↕️ 上下反転する", () => toggleReversed("field", ix)],
      ["🔄 裏返す", () => toggleFlipped("field", ix)],
      ["👀 重なっているカード", e => showListWithContextMenu(e, "field", ix)],
    ]),
    onDrag: standardOnDragHandler("field", ix),
  }),

  shields: ix => ({
    onClick: e => {
      if (state.value.shields[ix].flipped) {
        toggleFlipped("shields", ix);
      } else {
        showLightbox(e, state.value.shields[ix].cards[0]);
      }
    },
    onContextMenu: e => showMenu(e, [
      ["⚡ 超次元ゾーン送り", () => push("shields", ix, "exdeck", 0)],
      ["🔄 裏返す", () => toggleFlipped("shields", ix)],
      ["👀 重なっているカード", e => showListWithContextMenu(e, "shields", ix)],
    ]),
    onDrag: standardOnDragHandler("shields", ix)
  }),

  deck: ix => ({
    onClick: e => moveSingle("deck", ix, 0, "exploring", true),
    onContextMenu: e => showMenu(e, [
      ["⚡ 超次元送り", () => pushSingle("deck", ix, 0, "exdeck", 0)],
      ["🤏 ボトムから引く", () => moveSingle("deck", ix, -1, "hand", true)],
      ["♻️ シャッフル", () => shuffle("deck", ix)],
      ["👀 リスト", e => showListWithContextMenu(e, "deck", ix, true)],
    ]),
    onDrag: deckOnDragHandler("deck", ix, true),
  }),

  graveyard: ix => ({
    onClick: e => showListWithContextMenu(e, "graveyard", ix, true),
    onContextMenu: e => showListWithContextMenu(e, "graveyard", ix, true),
    onDrag: deckOnDragHandler("graveyard", ix, true),
  }),

  grdeck: ix => ({
    onClick: e => moveSingle("grdeck", ix, 0, "exploring", true),
    onContextMenu: e => showMenu(e, [
      ["♻️ シャッフル", () => shuffle("grdeck", ix)],
      ["👀 リスト", e => showListWithContextMenu(e, "grdeck", ix, true)],
    ]),
    onDrag: deckOnDragHandler("grdeck", ix, true),
  }),

  exdeck: ix => ({
    onClick: e => showListWithContextMenu(e, "exdeck", ix),
    onContextMenu: e => showListWithContextMenu(e, "exdeck", ix),
    onDrag: deckOnDragHandler("exdeck", ix, true),
  }),

  lands: ix => ({
    onClick: () => toggleTapped("lands", ix),
    onContextMenu: e => showMenu(e, [
      ["🔍 拡大", () => showLightbox(e, state.value.lands[ix].cards[0])],
      ["⚡ 超次元送り", () => push("lands", ix, "exdeck", 0)],
      ["👀 重なっているカード", e => showListWithContextMenu(e, "lands", ix)],
    ]),
    onDrag: standardOnDragHandler("lands", ix),
  }),

  hand: ix => ({
    onClick: e => showLightbox(e, state.value.hand[ix].cards[0]),
    onContextMenu: e => showMenu(e, [
      ["⚡ 超次元送り", () => push("hand", ix, "exdeck", 0)],
      ["👀 重なっているカード", e => showListWithContextMenu(e, "hand", ix)],
    ]),
    onDrag: standardOnDragHandler("hand", ix),
  }),

  exploring: ix => ({
    onClick: e => showLightbox(e, state.value.exploring[ix].cards[0]),
    onContextMenu: e => showMenu(e, [
      ["⚡ 超次元送り", () => push("exploring", ix, "exdeck", 0)],
      ["👀 重なっているカード", e => showListWithContextMenu(e, "hand", ix)],
    ]),
    onDrag: standardOnDragHandler("exploring", ix),
  }),
};

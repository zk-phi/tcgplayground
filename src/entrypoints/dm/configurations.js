import { shuffle as shuffleArray } from "../../utils/array";
import {
  stack, gameState, setGameState,
  move, push, unshift, moveSingle, pushSingle, unshiftSingle,
  toggleTapped, toggleReversed, toggleFlipped, toggleLaid, setAttribute,
  shuffle, untapAll,
} from "../../states/game.js";
import { dropHandlers, dragHandlers } from "../../states/drag.js";
import { showList } from "../../states/list.js";
import { showMenu } from "../../states/menu.js";
import { showLightbox } from "../../states/lightbox.js";

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
    { area: "field", label: "場" }
  ], [
    { area: "shields", label: "シールド" },
    { area: "exploring", label: "めくられた", optional: true },
    { area: "deck", label: "デッキ", width: 1 },
    { area: "graveyard", label: "墓地", width: 1 },
    { area: "grdeck", label: "GR", width: 1, optional: true },
    { area: "exdeck", label: "超次元", width: 1, optional: true },
  ], [
    { area: "lands", label: "マナ" },
  ], [
    { area: "hand", label: "手札" },
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
  setGameState({
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

const dragStackHandlers = (src, si) => dragHandlers(src, si, (e, dest, di) => {
  if (dest === "graveyard" || dest === "exdeck") {
    push(src, si, dest, di ?? 0);
  } else if (dest === "deck" || dest === "grdeck" || di != null) {
    showMenu(e, [
      ["🫳 上に置く", () => push(src, si, dest, di ?? 0)],
      ["🫴 下に入れる", () => unshift(src, si, dest, di ?? 0)],
    ]);
  } else {
    move(src, si, dest, { reversed: dest === "lands" });
  }
});

const dragSingleHandlers = (src, si, allowEmpty) => dragHandlers(src, si, (e, dest, di) => {
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
});

const showListWithContextMenu = (e, area, ix, allowEmpty = false) => {
  showList(e, area, ix, (j) => ({
    onContextMenu: (e) => showLightbox(e, gameState.value[area][ix].cards[j]),
    onClick: e => showMenu(e, [
      ["⚔️ 場に出す", () => moveSingle(area, ix, j, "field", allowEmpty)],
      ["🛡️ シールドに追加", () => moveSingle(area, ix, j, "shields", allowEmpty)],
      ["🫳 デッキの上に置く", () => pushSingle(area, ix, j, "deck", 0, allowEmpty)],
      ["🫴 デッキの下に入れる", () => unshiftSingle(area, ix, j, "deck", 0, allowEmpty)],
      ["🪦 墓地に送る", () => pushSingle(area, ix, j, "graveyard", 0, allowEmpty)],
      ["🎰 GRゾーンに置く", () => unshiftSingle(area, ix, j, "grdeck", 0, allowEmpty)],
      ["⚡ 超次元ゾーンに置く", () => pushSingle(area, ix, j, "exdeck", 0, allowEmpty)],
      ["⛰️ マナに追加", () => moveSingle(area, ix, j, "lands", allowEmpty, { reversed: true })],
      ["🃏 手札に加える", () => moveSingle(area, ix, j, "hand", allowEmpty)],
    ]),
  }));
};

export const handlers = {
  field: {
    stack: ix => ({
      onContextMenu: (e) => showLightbox(e, gameState.value.field[ix].cards[0]),
      onClick: e => e => showMenu(e, [
        ["✅ タップ", () => toggleTapped("field", ix)],
        ["⚡ 超次元ゾーン送り", () => push("field", ix, "exdeck", 0)],
        ["⬅️ 横向きにする", () => toggleLaid("field", ix)],
        ["↕️ 上下反転する", () => toggleReversed("field", ix)],
        ["🔄 裏返す", () => toggleFlipped("field", ix)],
        ["👀 重なっているカード", e => showListWithContextMenu(e, "field", ix)],
      ]),
      ...dropHandlers("field", ix),
      ...dragStackHandlers("field", ix),
    }),
    area: {
      ...dropHandlers("field", null),
    },
  },

  shields: {
    stack: ix => ({
      onContextMenu: e => {
        setAttribute("shields", ix, "flipped", false);
        showLightbox(e, gameState.value.shields[ix].cards[0]);
      },
      onClick: e => showMenu(e, [
        ["⚡ 超次元ゾーン送り", () => push("shields", ix, "exdeck", 0)],
        ["🔄 裏返す", () => toggleFlipped("shields", ix)],
        ["👀 重なっているカード", e => showListWithContextMenu(e, "shields", ix)],
      ]),
      ...dropHandlers("shields", ix),
      ...dragStackHandlers("shields", ix)
    }),
    area: {
      ...dropHandlers("shields", null),
    },
  },

  deck: {
    stack: ix => ({
      onContextMenu: e => showLightbox(e, gameState.value.deck[ix].cards[0]),
      onClick: e => showMenu(e, [
        ["🫣 めくる", () => moveSingle("deck", ix, 0, "exploring", true)],
        ["⚡ 超次元送り", () => pushSingle("deck", ix, 0, "exdeck", 0)],
        ["🤏 ボトムから引く", () => moveSingle("deck", ix, -1, "hand", true)],
        ["♻️ シャッフル", () => shuffle("deck", ix)],
        ["👀 リスト", e => showListWithContextMenu(e, "deck", ix, true)],
      ]),
      ...dropHandlers("deck", ix),
      ...dragSingleHandlers("deck", ix, true),
    }),
    area: {
      ...dropHandlers("deck", null),
    },
  },

  graveyard: {
    stack: ix => ({
      onContextMenu: e => showLightbox(e, gameState.value.graveyard[ix].cards[0]),
      onClick: e => showListWithContextMenu(e, "graveyard", ix, true),
      ...dropHandlers("graveyard", ix),
      ...dragSingleHandlers("graveyard", ix, true),
    }),
    area: {
      ...dropHandlers("graveyard", null),
    },
  },

  grdeck: {
    stack: ix => ({
      onContextMenu: e => showLightbox(e, gameState.value.grdeck[ix].cards[0]),
      onClick: e => showMenu(e, [
        ["♻️ シャッフル", () => shuffle("grdeck", ix)],
        ["👀 リスト", e => showListWithContextMenu(e, "grdeck", ix, true)],
      ]),
      ...dropHandlers("grdeck", ix),
      ...dragSingleHandlers("grdeck", ix, true),
    }),
    area: {
      ...dropHandlers("grdeck", null),
    },
  },

  exdeck: {
    stack: ix => ({
      onContextMenu: e => showListWithContextMenu(e, "exdeck", ix),
      onClick: e => showListWithContextMenu(e, "exdeck", ix),
      ...dropHandlers("exdeck", ix),
      ...dragSingleHandlers("exdeck", ix, true),
    }),
    area: {
      ...dropHandlers("exdeck", null),
    },
  },

  lands: {
    stack: ix => ({
      onContextMenu: () => showLightbox(e, gameState.value.lands[ix].cards[0]),
      onClick: e => showMenu(e, [
        ["✅ タップ", () => toggleTapped("lands", ix)],
        ["⚡ 超次元送り", () => push("lands", ix, "exdeck", 0)],
        ["👀 重なっているカード", e => showListWithContextMenu(e, "lands", ix)],
      ]),
      ...dropHandlers("lands", ix),
      ...dragStackHandlers("lands", ix),
    }),
    area: {
      ...dropHandlers("lands", null),
    },
  },

  hand: {
    stack: ix => ({
      onContextMenu: e => showLightbox(e, gameState.value.hand[ix].cards[0]),
      onClick: e => showMenu(e, [
        ["⚡ 超次元送り", () => push("hand", ix, "exdeck", 0)],
        ["👀 重なっているカード", e => showListWithContextMenu(e, "hand", ix)],
      ]),
      ...dropHandlers("hand", ix),
      ...dragStackHandlers("hand", ix),
    }),
    area: {
      ...dropHandlers("hand", null),
    },
  },

  exploring: {
    stack: ix => ({
      onContextMenu: e => showLightbox(e, gameState.value.exploring[ix].cards[0]),
      onClick: e => showMenu(e, [
        ["⚡ 超次元送り", () => push("exploring", ix, "exdeck", 0)],
        ["👀 重なっているカード", e => showListWithContextMenu(e, "hand", ix)],
      ]),
      ...dropHandlers("exploring", ix),
      ...dragStackHandlers("exploring", ix),
    }),
    area: {
      ...dropHandlers("exploring", null),
    },
  },
};

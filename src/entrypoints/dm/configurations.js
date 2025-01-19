import { shuffle as shuffleArray } from "../../utils/array";
import {
  stack, gameState, setGameState,
  move, push, unshift, moveSingle, pushSingle, unshiftSingle,
  toggleTapped, toggleReversed, toggleFlipped, toggleLaid,
  shuffle, untapAll,
} from "../../states/game.js";
import { dropHandlers, dragHandlers } from "../../states/drag.js";
import { showList } from "../../states/list.js";
import { showMenu } from "../../states/menu.js";
import { showLightbox } from "../../states/lightbox.js";

export const rows = [[
  { area: "field", label: "場", expandThreshold: 8 }
], [
  { area: "shields", label: "シールド", expandThreshold: 5 },
  { area: "deck", label: "デッキ", width: 1 },
  { area: "graveyard", label: "墓地", width: 1 },
  { area: "grdeck", label: "GR", width: 1, optional: true },
  { area: "exdeck", label: "超次元", width: 1, optional: true },
], [
  { area: "lands", label: "マナ" },
  { area: "exploring", label: "めくられた", optional: true },
], [
  { area: "hand", label: "手札", expandThreshold: 5 },
]];

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
    onClick: e => showMenu(e, [
      ["🔍 拡大", () => showLightbox(e, gameState.value[area][ix].cards[j])],
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
    onContextMenu: e => showMenu(e, [
      ["🔍 拡大", () => showLightbox(e, gameState.value[area][ix].cards[j])],
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
      onClick: e => showLightbox(e, gameState.value.field[ix].cards[0]),
      onContextMenu: e => showMenu(e, [
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
      onClick: e => {
        if (gameState.value.shields[ix].flipped) {
          toggleFlipped("shields", ix);
        } else {
          showLightbox(e, gameState.value.shields[ix].cards[0]);
        }
      },
      onContextMenu: e => showMenu(e, [
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
      onClick: e => moveSingle("deck", ix, 0, "exploring", true),
      onContextMenu: e => showMenu(e, [
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
      onClick: e => showListWithContextMenu(e, "graveyard", ix, true),
      onContextMenu: e => showListWithContextMenu(e, "graveyard", ix, true),
      ...dropHandlers("graveyard", ix),
      ...dragSingleHandlers("graveyard", ix, true),
    }),
    area: {
      ...dropHandlers("graveyard", null),
    },
  },

  grdeck: {
    stack: ix => ({
      onClick: e => moveSingle("grdeck", ix, 0, "exploring", true),
      onContextMenu: e => showMenu(e, [
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
      onClick: e => showListWithContextMenu(e, "exdeck", ix),
      onContextMenu: e => showListWithContextMenu(e, "exdeck", ix),
      ...dropHandlers("exdeck", ix),
      ...dragSingleHandlers("exdeck", ix, true),
    }),
    area: {
      ...dropHandlers("exdeck", null),
    },
  },

  lands: {
    stack: ix => ({
      onClick: () => toggleTapped("lands", ix),
      onContextMenu: e => showMenu(e, [
        ["🔍 拡大", () => showLightbox(e, gameState.value.lands[ix].cards[0])],
        ["⚡ 超次元送り", () => push("lands", ix, "exdeck", 0)],
        ["🔄 裏返す", () => toggleFlipped("lands", ix)],
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
      onClick: e => showLightbox(e, gameState.value.hand[ix].cards[0]),
      onContextMenu: e => showMenu(e, [
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
      onClick: e => showLightbox(e, gameState.value.exploring[ix].cards[0]),
      onContextMenu: e => showMenu(e, [
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

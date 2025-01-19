import { shuffle as shuffleArray } from "../../utils/array";
import {
  stack, gameState, setGameState,
  move, push, unshift, moveSingle, pushSingle, unshiftSingle,
  toggleTapped, toggleReversed, toggleFlipped, toggleLaid,
  unshiftBatch, pushBatch, moveBatch,
  unshiftAll, pushAll, moveAll,
  shuffle, untapAll,
} from "../../states/game.js";
import { dropHandlers, dragHandlers } from "../../states/drag.js";
import { showList } from "../../states/list.js";
import { showMenu } from "../../states/menu.js";
import { showLightbox } from "../../states/lightbox.js";

export const rows = [[
  { area: "sides", label: "サイド", width: 1 },
  { area: "field", label: "場", expandThreshold: 5 },
  { area: "graveyard", label: "トラッシュ", width: 1 },
], [
  { area: "bench", label: "ベンチ", expandThreshold: 5 },
  { area: "deck", label: "山", width: 1 },
], [
  { area: "hand", label: "手札", expandThreshold: 3 },
  { area: "exploring", label: "めくられた", optional: true },
]];

const dragNormalAreaHandlers = (src) => dragHandlers(src, null, (e, dest, di) => {
  if (dest === "graveyard" || dest === "sides") {
    pushBatch(src, dest, di ?? 0);
  } else if (dest === "deck" || dest === "stadium" || di != null) {
    if (gameState.value[dest][di ?? 0].cards.length <= 0) {
      pushBatch(src, dest, di ?? 0);
    } else {
      showMenu(e, [
        ["🫳 上に置く", () => pushBatch(src, dest, di ?? 0)],
        ["🫴 下に入れる", () => unshiftBatch(src, dest, di ?? 0)],
      ]);
    }
  } else {
    moveBatch(src, dest, { reversed: dest === "lands" });
  }
});

const dragDeckAreaHandlers = (src) => dragHandlers(src, null, (e, dest, di) => {
  if (dest === "graveyard" || dest === "sides") {
    pushAll(src, dest, di ?? 0);
  } else if (dest === "deck" || dest === "stadium" || di != null) {
    if (gameState.value[dest][di ?? 0].cards.length <= 0) {
      pushBatch(src, dest, di ?? 0);
    } else {
      showMenu(e, [
        ["🫳 上に置く", () => pushAll(src, si, dest, di ?? 0)],
        ["🫴 下に入れる", () => unshiftAll(src, si, dest, di ?? 0)],
      ]);
    }
  } else {
    moveAll(src, 0, dest, { reversed: dest === "lands" });
  }
});

const dragStackHandlers = (src, si, allowEmpty) => dragHandlers(src, si, (e, dest, di) => {
  if (dest === "graveyard" || dest === "sides") {
    push(src, si, dest, di ?? 0, true);
  } else if (dest === "deck" || dest === "stadium" || di != null) {
    if (gameState.value[dest][di ?? 0].cards.length <= 0) {
      push(src, si, dest, di ?? 0, true);
    }
    showMenu(e, [
      ["🫳 上に置く", () => push(src, si, dest, di ?? 0, true)],
      ["🫴 下に入れる", () => unshift(src, si, dest, di ?? 0, true)],
    ]);
  } else {
    move(src, si, dest, {}, (dest !== "hand" && dest !== "exploring"));
  }
});

const dragSingleHandlers = (src, si, allowEmpty) => dragHandlers(src, si, (e, dest, di) => {
  if (dest === "graveyard" || dest === "sides") {
    pushSingle(src, si, 0, dest, di ?? 0);
  } else if (dest === "deck" || dest === "stadium" || di != null) {
    if (gameState.value[dest][di ?? 0].cards.length <= 0) {
      pushSingle(src, si, 0, dest, di ?? 0);
    }
    showMenu(e, [
      ["🫳 上に置く", () => pushSingle(src, si, 0, dest, di ?? 0)],
      ["🫴 下に入れる", () => unshiftSingle(src, si, 0, dest, di ?? 0)],
    ]);
  } else {
    moveSingle(src, si, 0, dest);
  }
});

const showListWithContextMenu = (e, area, ix, allowEmpty = false) => {
  showList(e, area, ix, (j) => ({
    onClick: e => showMenu(e, [
      ["🔍 拡大", () => showLightbox(e, gameState.value[area][ix].cards[j])],
      ["⚔️ バトル場に出す", () => pushSingle(area, ix, j, "field", 0, allowEmpty)],
      ["🫳 デッキの上に置く", () => pushSingle(area, ix, j, "deck", 0, allowEmpty)],
      ["🫴 デッキの下に入れる", () => unshiftSingle(area, ix, j, "deck", 0, allowEmpty)],
      ["🪦 トラッシュに送る", () => pushSingle(area, ix, j, "graveyard", 0, allowEmpty)],
      ["🪑 ベンチに置く", () => moveSingle(area, ix, j, "bench", allowEmpty)],
      ["🛡️ サイドに置く", () => pushSingle(area, ix, j, "sides", 0, allowEmpty)],
      ["🃏 手札に加える", () => moveSingle(area, ix, j, "hand", allowEmpty)],
    ]),
    onContextMenu: e => showMenu(e, [
      ["🔍 拡大", () => showLightbox(e, gameState.value[area][ix].cards[j])],
      ["⚔️ バトル場に出す", () => pushSingle(area, ix, j, "field", 0, allowEmpty)],
      ["🫳 デッキの上に置く", () => pushSingle(area, ix, j, "deck", 0, allowEmpty)],
      ["🫴 デッキの下に入れる", () => unshiftSingle(area, ix, j, "deck", 0, allowEmpty)],
      ["🪦 トラッシュに送る", () => pushSingle(area, ix, j, "graveyard", 0, allowEmpty)],
      ["🪑 ベンチに置く", () => moveSingle(area, ix, j, "bench", allowEmpty)],
      ["🛡️ サイドに置く", () => pushSingle(area, ix, j, "sides", 0, allowEmpty)],
      ["🃏 手札に加える", () => moveSingle(area, ix, j, "hand", allowEmpty)],
    ]),
  }));
};

export const handlers = {
  sides: {
    stack: ix => ({
      onClick: e => showListWithContextMenu(e, "sides", ix, true),
      onContextMenu: e => showListWithContextMenu(e, "sides", ix, true),
      ...dropHandlers("sides", ix),
      ...dragSingleHandlers("sides", ix, true),
    }),
    area: {
      ...dropHandlers("sides", null),
      ...dragDeckAreaHandlers("sides"),
    },
  },

  field: {
    stack: ix => ({
      onClick: () => toggleTapped("field", ix),
      onContextMenu: e => showMenu(e, [
        ["🔍 拡大", e => showLightbox(e, gameState.value.field[ix].cards[0])],
        ["👀 重なっているカード", e => showListWithContextMenu(e, "field", ix)],
      ]),
      ...dropHandlers("field", ix),
      ...dragStackHandlers("field", ix),
    }),
    area: {
      ...dropHandlers("field", null),
      ...dragNormalAreaHandlers("field"),
    },
  },

  deck: {
    stack: ix => ({
      onClick: e => moveSingle("deck", ix, 0, "exploring", true),
      onContextMenu: e => showMenu(e, [
        ["🤏 ボトムから引く", () => moveSingle("deck", ix, -1, "hand", true)],
        ["♻️ シャッフル", () => shuffle("deck", ix)],
        ["👀 リスト", e => showListWithContextMenu(e, "deck", ix, true)],
      ]),
      ...dropHandlers("deck", ix),
      ...dragSingleHandlers("deck", ix, true),
    }),
    area: {
      ...dropHandlers("deck", null),
      ...dragDeckAreaHandlers("deck"),
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
      ...dragDeckAreaHandlers("graveyard"),
    },
  },

  bench: {
    stack: ix => ({
      onClick: e => toggleTapped("bench", ix),
      onContextMenu: e => showMenu(e, [
        ["🔍 拡大", e => showLightbox(e, gameState.value.bench[ix].cards[0])],
        ["👀 重なっているカード", e => showListWithContextMenu(e, "bench", ix)],
      ]),
      ...dropHandlers("bench", ix),
      ...dragStackHandlers("bench", ix),
    }),
    area: {
      ...dropHandlers("bench", null),
      ...dragNormalAreaHandlers("bench"),
    },
  },

  hand: {
    stack: ix => ({
      onClick: e => preventDefault(e),
      onContextMenu: e => showMenu(e, [
        ["🔍 拡大", e => showLightbox(e, gameState.value.hand[ix].cards[0])],
        ["👀 重なっているカード", e => showListWithContextMenu(e, "hand", ix)],
      ]),
      ...dropHandlers("hand", ix),
      ...dragStackHandlers("hand", ix),
    }),
    area: {
      ...dropHandlers("hand", null),
      ...dragNormalAreaHandlers("hand"),
    },
  },

  exploring: {
    stack: ix => ({
      onClick: e => preventDefault(e),
      onContextMenu: e => showMenu(e, [
        ["🔍 拡大", e => showLightbox(e, gameState.value.exploring[ix].cards[0])],
        ["👀 重なっているカード", e => showListWithContextMenu(e, "hand", ix)],
      ]),
      ...dropHandlers("exploring", ix),
      ...dragStackHandlers("exploring", ix),
    }),
    area: {
      ...dropHandlers("exploring", null),
      ...dragNormalAreaHandlers("exploring"),
    },
  },
};

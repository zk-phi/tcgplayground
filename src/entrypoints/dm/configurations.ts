import {
  getStack,
  move, push, unshift, moveSingle, pushSingle, unshiftSingle,
  toggleTapped, toggleReversed, toggleFlipped, toggleLaid,
  unshiftBatch, pushBatch, moveBatch,
  unshiftAll, pushAll, moveAll,
  shuffle,
} from "../../states/game";
import { dropHandlers, dragHandlers } from "../../states/drag";
import { showList } from "../../states/list";
import { showMenu } from "../../states/menu";
import { showLightbox } from "../../states/lightbox";

const layout: LayoutConfig = [[
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

const dragNormalAreaHandlers = (src: string) => (
  dragHandlers(src, null, (e: MouseEvent, dest: string, di: number | null) => {
    if (dest === "graveyard" || dest === "exdeck") {
      pushBatch(src, dest, di ?? 0);
    } else if (dest === "deck" || dest === "grdeck" || di != null) {
      if (getStack(dest, di ?? 0).cards.length <= 0) {
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
  })
);

const dragDeckAreaHandlers = (src: string) => (
  dragHandlers(src, null, (e: MouseEvent, dest: string, di: number | null) => {
    if (dest === "graveyard" || dest === "exdeck") {
      pushAll(src, 0, dest, di ?? 0);
    } else if (dest === "deck" || dest === "grdeck" || di != null) {
      if (getStack(dest, di ?? 0).cards.length <= 0) {
        pushBatch(src, dest, di ?? 0);
      } else {
        showMenu(e, [
          ["🫳 上に置く", () => pushAll(src, 0, dest, di ?? 0)],
          ["🫴 下に入れる", () => unshiftAll(src, 0, dest, di ?? 0)],
        ]);
      }
    } else {
      moveAll(src, 0, dest, { reversed: dest === "lands" });
    }
  })
);

const dragStackHandlers = (src: string, si: number) => (
  dragHandlers(src, si, (e: MouseEvent, dest: string, di: number | null) => {
    if (dest === "graveyard" || dest === "exdeck") {
      push(src, si, dest, di ?? 0);
    } else if (dest === "deck" || dest === "grdeck" || di != null) {
      if (getStack(dest, di ?? 0).cards.length <= 0) {
        pushBatch(src, dest, di ?? 0);
      } else {
        showMenu(e, [
          ["🫳 上に置く", () => push(src, si, dest, di ?? 0)],
          ["🫴 下に入れる", () => unshift(src, si, dest, di ?? 0)],
        ]);
      }
    } else {
      move(src, si, dest, { reversed: dest === "lands" });
    }
  })
);

const dragSingleHandlers = (src: string, si: number, allowEmpty = false) => (
  dragHandlers(src, si, (e: MouseEvent, dest: string, di: number | null) => {
    if (dest === "graveyard" || dest === "exdeck") {
      pushSingle(src, si, 0, dest, di ?? 0, allowEmpty);
    } else if (dest === "deck" || dest === "grdeck" || di != null) {
      if (getStack(dest, di ?? 0).cards.length <= 0) {
        pushBatch(src, dest, di ?? 0);
      } else {
        showMenu(e, [
          ["🫳 上に置く", () => pushSingle(src, si, 0, dest, di ?? 0, allowEmpty)],
          ["🫴 下に入れる", () => unshiftSingle(src, si, 0, dest, di ?? 0, allowEmpty)],
        ]);
      }
    } else {
      moveSingle(src, si, 0, dest, allowEmpty, { reversed: dest === "lands" });
    }
  })
);

const showListWithContextMenu = (
  e: MouseEvent,
  area: string,
  ix: number,
  allowEmpty = false,
) => {
  showList(e, area, ix, (j: number) => ({
    onClick: (e: MouseEvent) => showMenu(e, [
      ["🔍 拡大", () => showLightbox(e, getStack(area, ix).cards[j])],
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
    onContextMenu: (e: MouseEvent) => showMenu(e, [
      ["🔍 拡大", () => showLightbox(e, getStack(area, ix).cards[j])],
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

const handlers = {
  field: {
    stack: (ix: number) => ({
      onClick: (e: MouseEvent) => showLightbox(e, getStack("field", ix).cards[0]),
      onContextMenu: (e: MouseEvent) => showMenu(e, [
        ["✅ タップ", () => toggleTapped("field", ix)],
        ["⚡ 超次元ゾーン送り", () => push("field", ix, "exdeck", 0)],
        ["⬅️ 横向きにする", () => toggleLaid("field", ix)],
        ["↕️ 上下反転する", () => toggleReversed("field", ix)],
        ["🔄 裏返す", () => toggleFlipped("field", ix)],
        ["👀 重なっているカード", (e: MouseEvent) => showListWithContextMenu(e, "field", ix)],
      ]),
      ...dropHandlers("field", ix),
      ...dragStackHandlers("field", ix),
    }),
    area: {
      ...dropHandlers("field", null),
      ...dragNormalAreaHandlers("field"),
    },
  },

  shields: {
    stack: (ix: number) => ({
      onClick: (e: MouseEvent) => {
        if (getStack("shields", ix).flipped) {
          toggleFlipped("shields", ix);
        } else {
          showLightbox(e, getStack("shields", ix).cards[0]);
        }
      },
      onContextMenu: (e: MouseEvent) => showMenu(e, [
        ["⚡ 超次元ゾーン送り", () => push("shields", ix, "exdeck", 0)],
        ["🔄 裏返す", () => toggleFlipped("shields", ix)],
        ["👀 重なっているカード", (e: MouseEvent) => showListWithContextMenu(e, "shields", ix)],
      ]),
      ...dropHandlers("shields", ix),
      ...dragStackHandlers("shields", ix)
    }),
    area: {
      ...dropHandlers("shields", null),
      ...dragNormalAreaHandlers("shields"),
    },
  },

  deck: {
    stack: (ix: number) => ({
      onClick: () => moveSingle("deck", ix, 0, "exploring", true),
      onContextMenu: (e: MouseEvent) => showMenu(e, [
        ["⚡ 超次元送り", () => pushSingle("deck", ix, 0, "exdeck", 0)],
        ["🤏 ボトムから引く", () => moveSingle("deck", ix, -1, "hand", true)],
        ["♻️ シャッフル", () => shuffle("deck", ix)],
        ["👀 リスト", (e: MouseEvent) => showListWithContextMenu(e, "deck", ix, true)],
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
    stack: (ix: number) => ({
      onClick: (e: MouseEvent) => showListWithContextMenu(e, "graveyard", ix, true),
      onContextMenu: (e: MouseEvent) => showListWithContextMenu(e, "graveyard", ix, true),
      ...dropHandlers("graveyard", ix),
      ...dragSingleHandlers("graveyard", ix, true),
    }),
    area: {
      ...dropHandlers("graveyard", null),
      ...dragDeckAreaHandlers("graveyard"),
    },
  },

  grdeck: {
    stack: (ix: number) => ({
      onClick: () => moveSingle("grdeck", ix, 0, "exploring", true),
      onContextMenu: (e: MouseEvent) => showMenu(e, [
        ["♻️ シャッフル", () => shuffle("grdeck", ix)],
        ["👀 リスト", (e: MouseEvent) => showListWithContextMenu(e, "grdeck", ix, true)],
      ]),
      ...dropHandlers("grdeck", ix),
      ...dragSingleHandlers("grdeck", ix, true),
    }),
    area: {
      ...dropHandlers("grdeck", null),
      ...dragDeckAreaHandlers("grdeck"),
    },
  },

  exdeck: {
    stack: (ix: number) => ({
      onClick: (e: MouseEvent) => showListWithContextMenu(e, "exdeck", ix),
      onContextMenu: (e: MouseEvent) => showListWithContextMenu(e, "exdeck", ix),
      ...dropHandlers("exdeck", ix),
      ...dragSingleHandlers("exdeck", ix, true),
    }),
    area: {
      ...dropHandlers("exdeck", null),
      ...dragNormalAreaHandlers("exdeck"),
    },
  },

  lands: {
    stack: (ix: number) => ({
      onClick: () => toggleTapped("lands", ix),
      onContextMenu: (e: MouseEvent) => showMenu(e, [
        ["🔍 拡大", () => showLightbox(e, getStack("lands", ix).cards[0])],
        ["⚡ 超次元送り", () => push("lands", ix, "exdeck", 0)],
        ["🔄 裏返す", () => toggleFlipped("lands", ix)],
        ["👀 重なっているカード", (e: MouseEvent) => showListWithContextMenu(e, "lands", ix)],
      ]),
      ...dropHandlers("lands", ix),
      ...dragStackHandlers("lands", ix),
    }),
    area: {
      ...dropHandlers("lands", null),
      ...dragNormalAreaHandlers("lands"),
    },
  },

  hand: {
    stack: (ix: number) => ({
      onClick: (e: MouseEvent) => showLightbox(e, getStack("hand", ix).cards[0]),
      onContextMenu: (e: MouseEvent) => showMenu(e, [
        ["⚡ 超次元送り", () => push("hand", ix, "exdeck", 0)],
        ["👀 重なっているカード", (e: MouseEvent) => showListWithContextMenu(e, "hand", ix)],
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
    stack: (ix: number) => ({
      onClick: (e: MouseEvent) => showLightbox(e, getStack("exploring", ix).cards[0]),
      onContextMenu: (e: MouseEvent) => showMenu(e, [
        ["⚡ 超次元送り", () => push("exploring", ix, "exdeck", 0)],
        ["👀 重なっているカード", (e: MouseEvent) => showListWithContextMenu(e, "hand", ix)],
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

export const configurations = { layout, handlers };

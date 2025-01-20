import { shuffle as shuffleArray } from "../../utils/array";
import {
  getStack, getStacks,
  move, push, unshift, moveSingle, pushSingle, unshiftSingle,
  toggleTapped, toggleReversed, toggleFlipped, toggleLaid,
  unshiftBatch, pushBatch, moveBatch,
  unshiftAll, pushAll, moveAll,
  shuffle, untapAll,
} from "../../states/game";
import { dropHandlers, dragHandlers } from "../../states/drag";
import { showList } from "../../states/list";
import { showMenu } from "../../states/menu";
import { showLightbox } from "../../states/lightbox";

export const rows: LayoutConfig = [[
  { area: "sides", label: "サイド", width: 1 },
  { area: "field", label: "場", expandThreshold: 5 },
  { area: "graveyard", label: "トラッシュ", width: 1 },
], [
  { area: "bench", label: "ベンチ", expandThreshold: 5 },
  { area: "deck", label: "山", width: 1 },
], [
  { area: "hand", label: "手札" },
  { area: "exploring", label: "めくられた", optional: true },
]];

const dragNormalAreaHandlers = (src: string) => (
  dragHandlers(src, null, (e: MouseEvent, dest: string, di: number | null) => {
    if (dest === "graveyard" || dest === "sides") {
      pushBatch(src, dest, di ?? 0);
    } else if (dest === "deck" || dest === "stadium" || di != null) {
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
    if (dest === "graveyard" || dest === "sides") {
      pushAll(src, 0, dest, di ?? 0);
    } else if (dest === "deck" || dest === "stadium" || di != null) {
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

const dragStackHandlers = (src: string, si: number, allowEmpty = false) => (
  dragHandlers(src, si, (e: MouseEvent, dest: string, di: number | null) => {
    if (dest === "graveyard" || dest === "sides") {
      push(src, si, dest, di ?? 0);
    } else if (dest === "deck" || dest === "stadium" || di != null) {
      if (getStack(dest, di ?? 0).cards.length <= 0) {
        push(src, si, dest, di ?? 0);
      }
      showMenu(e, [
        ["🫳 上に置く", () => push(src, si, dest, di ?? 0)],
        ["🫴 下に入れる", () => unshift(src, si, dest, di ?? 0)],
      ]);
    } else {
      move(src, si, dest, {}, (dest !== "hand" && dest !== "exploring"));
    }
  })
);

const dragSingleHandlers = (src: string, si: number, allowEmpty?: boolean) => (
  dragHandlers(src, si, (e: MouseEvent, dest: string, di: number | null) => {
    if (dest === "graveyard" || dest === "sides") {
      pushSingle(src, si, 0, dest, di ?? 0);
    } else if (dest === "deck" || dest === "stadium" || di != null) {
      if (getStack(dest, di ?? 0).cards.length <= 0) {
        pushSingle(src, si, 0, dest, di ?? 0);
      }
      showMenu(e, [
        ["🫳 上に置く", () => pushSingle(src, si, 0, dest, di ?? 0)],
        ["🫴 下に入れる", () => unshiftSingle(src, si, 0, dest, di ?? 0)],
      ]);
    } else {
      moveSingle(src, si, 0, dest);
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
      ["⚔️ バトル場に出す", () => moveSingle(area, ix, j, "field", allowEmpty)],
      ["🫳 デッキの上に置く", () => pushSingle(area, ix, j, "deck", 0, allowEmpty)],
      ["🫴 デッキの下に入れる", () => unshiftSingle(area, ix, j, "deck", 0, allowEmpty)],
      ["🪦 トラッシュに送る", () => pushSingle(area, ix, j, "graveyard", 0, allowEmpty)],
      ["🪑 ベンチに置く", () => moveSingle(area, ix, j, "bench", allowEmpty)],
      ["🛡️ サイドに置く", () => pushSingle(area, ix, j, "sides", 0, allowEmpty)],
      ["🃏 手札に加える", () => moveSingle(area, ix, j, "hand", allowEmpty)],
    ]),
    onContextMenu: (e: MouseEvent) => showMenu(e, [
      ["🔍 拡大", () => showLightbox(e, getStack(area, ix).cards[j])],
      ["⚔️ バトル場に出す", () => moveSingle(area, ix, j, "field", allowEmpty)],
      ["🫳 デッキの上に置く", () => pushSingle(area, ix, j, "deck", 0, allowEmpty)],
      ["🫴 デッキの下に入れる", () => unshiftSingle(area, ix, j, "deck", 0, allowEmpty)],
      ["🪦 トラッシュに送る", () => pushSingle(area, ix, j, "graveyard", 0, allowEmpty)],
      ["🪑 ベンチに置く", () => moveSingle(area, ix, j, "bench", allowEmpty)],
      ["🛡️ サイドに置く", () => pushSingle(area, ix, j, "sides", 0, allowEmpty)],
      ["🃏 手札に加える", () => moveSingle(area, ix, j, "hand", allowEmpty)],
    ]),
  }));
};

export const handlers: HandlerConfig = {
  sides: {
    stack: (ix: number) => ({
      onClick: (e: MouseEvent) => showListWithContextMenu(e, "sides", ix, true),
      onContextMenu: (e: MouseEvent) => showListWithContextMenu(e, "sides", ix, true),
      ...dropHandlers("sides", ix),
      ...dragSingleHandlers("sides", ix, true),
    }),
    area: {
      ...dropHandlers("sides", null),
      ...dragDeckAreaHandlers("sides"),
    },
  },

  field: {
    stack: (ix: number) => ({
      onClick: () => toggleTapped("field", ix),
      onContextMenu: (e: MouseEvent) => showMenu(e, [
        ["🔍 拡大", (e: MouseEvent) => showLightbox(e, getStack("field", ix).cards[0])],
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

  deck: {
    stack: (ix: number) => ({
      onClick: (e: MouseEvent) => moveSingle("deck", ix, 0, "exploring", true),
      onContextMenu: (e: MouseEvent) => showMenu(e, [
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

  bench: {
    stack: (ix: number) => ({
      onClick: (e: MouseEvent) => toggleTapped("bench", ix),
      onContextMenu: (e: MouseEvent) => showMenu(e, [
        ["🔍 拡大", (e: MouseEvent) => showLightbox(e, getStack("bench", ix).cards[0])],
        ["👀 重なっているカード", (e: MouseEvent) => showListWithContextMenu(e, "bench", ix)],
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
    stack: (ix: number) => ({
      onClick: (e: MouseEvent) => e.preventDefault(),
      onContextMenu: (e: MouseEvent) => showMenu(e, [
        ["🔍 拡大", (e: MouseEvent) => showLightbox(e, getStack("hand", ix).cards[0])],
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
      onClick: (e: MouseEvent) => e.preventDefault(),
      onContextMenu: (e: MouseEvent) => showMenu(e, [
        ["🔍 拡大", (e: MouseEvent) => showLightbox(e, getStack("exploring", ix).cards[0])],
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

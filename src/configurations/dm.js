import { shuffle as shuffleArray } from "../utils/array.js";
import {
  stack, state, setState,
  move, push, unshift, moveSingle, pushSingle, unshiftSingle,
  toggleTapped, toggleReversed, toggleFlipped, toggleLaid, setAttribute,
  shuffle, untapAll,
} from "../state.js";
import { select } from "../selection.js";
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
  [{ area: "field", label: "場" }],
  [
    { area: "shields", label: "シールド" },
    { area: "deck", label: "デッキ", width: 1 },
    { area: "graveyard", label: "墓地", width: 1 },
    { area: "grdeck", label: "GR", width: 1, optional: true },
    { area: "exdeck", label: "超次元", width: 1, optional: true },
  ],
  [{ area: "lands", label: "マナ" }],
  [{ area: "hand", label: "手札" }],
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
  });
};

export const handlers = {
  field: (ix) => ({
    onClick: () => toggleTapped("field", ix),
    onContextMenu: (e) => showMenu(e, [
      ["🔍 拡大", () => showLightbox(e, state.value.field[ix].cards[0])],
      ["→🛡️ シールド", () => move("field", ix, "shields")],
      ["→🪦 墓地", () => push("field", ix, "graveyard", 0)],
      ["→⛰️ マナ", () => move("field", ix, "lands", { reversed: true })],
      ["→🃏 手札", () => move("field", ix, "hand")],
      ["→⚡ 超次元", () => push("field", ix, "exdeck", 0)],
      ["🫳 上に乗せる", () => select("field", ix, push)],
      ["🫴 下に入れる", () => select("field", ix, unshift)],
      ["⬅️ 横向きにする", () => toggleLaid("field", ix)],
      ["⤵️ 上下反転する", () => toggleReversed("field", ix)],
      ["🔄 裏返す", () => toggleFlipped("field", ix)],
      ["👀 リスト", (e) => showList(e, "field", ix, (e, j) => showMenu(e, [
        ["🔍 拡大", () => showLightbox(e, state.value.field[ix].cards[j])],
        ["→🛡️ シールド", () => moveSingle("field", ix, j, "shields")],
        ["→🫳 デッキトップ", () => pushSingle("field", ix, j, "deck", 0)],
        ["→🫴 デッキボトム", () => unshiftSingle("field", ix, j, "deck", 0)],
        ["→🪦 墓地", () => pushSingle("field", ix, j, "graveyard", 0)],
        ["→⛰️ マナ", () => moveSingle("field", ix, j, "lands", false, { reversed: true })],
        ["→🃏 手札", () => moveSingle("field", ix, j, "hand")],
      ]))],
    ]),
  }),

  shields: (ix) => ({
    onClick: (e) => {
      setAttribute("shields", ix, "flipped", false);
      showMenu(e, [
        ["→⚔️ 場", () => move("shields", ix, "field")],
        ["→🪦 墓地", () => push("shields", ix, "graveyard", 0)],
        ["→⛰️ マナ", () => move("shields", ix, "lands", { reversed: true })],
        ["→🃏 手札", () => move("shields", ix, "hand")],
        ["🔄 裏返す", () => toggleFlipped("shields", ix)],
      ]);
    },
    onContextMenu: (e) => showMenu(e, [
      ["🔍 拡大", () => showLightbox(e, state.value.shields[ix].cards[0])],
      ["→⚡ 超次元", () => push("shields", ix, "exdeck", 0)],
      ["🫳 上に乗せる", () => select("shields", ix, push)],
      ["🫴 下に入れる", () => select("shields", ix, unshift)],
      ["👀 リスト", (e) => showList(e, "shields", ix, (e, j) => showMenu(e, [
        ["🔍 拡大", () => showLightbox(e, state.value.shields[ix].cards[j])],
        ["→⚔️ 場", () => moveSingle("shields", ix, j, "field")],
        ["→🫳 デッキトップ", () => pushSingle("shields", ix, j, "deck", 0,)],
        ["→🫴 デッキボトム", () => unshiftSingle("shields", ix, j, "deck", 0)],
        ["→🪦 墓地", () => pushSingle("shields", ix, j, "graveyard", 0)],
        ["→⛰️ マナ", () => moveSingle("shields", ix, j, "lands", false, { reversed: true })],
        ["→🃏 手札", () => moveSingle("shields", ix, j, "hand")],
      ]))],
    ]),
  }),

  deck: (ix) => ({
    onClick: (e) => showMenu(e, [
      ["→🛡️ シールド", () => moveSingle("deck", ix, 0, "shields", true)],
      ["→🪦 墓地", () => pushSingle("deck", ix, 0, "graveyard", 0, true)],
      ["→⛰️ マナ", () => moveSingle("deck", ix, 0, "lands", true, { reversed: true })],
      ["→🃏 手札", () => moveSingle("deck", ix, 0, "hand", true)],
    ]),
    onContextMenu: (e) => showMenu(e, [
      ["→⚔️ 場", () => moveSingle("deck", ix, 0, "lands", true)],
      ["→⚡ 超次元", () => pushSingle("deck", ix, 0, "exdeck", 0)],
      ["🤏 ボトムから引く", () => moveSingle("deck", ix, -1, "hand", true)],
      ["♻️ シャッフル", () => shuffle("deck", ix)],
      ["👀 リスト", (e) => showList(e, "deck", ix, (e, j) => showMenu(e, [
        ["🔍 拡大", () => showLightbox(e, state.value.deck[0].cards[ix])],
        ["→⚔️ 場", () => moveSingle("deck", ix, j, "field", true)],
        ["→🛡️ シールド", () => moveSingle("deck", ix, j, "shields", true)],
        ["→🫳 デッキトップ", () => pushSingle("deck", ix, j, "deck", ix,)],
        ["→🫴 デッキボトム", () => unshiftSingle("deck", ix, j, "deck", ix)],
        ["→🪦 墓地", () => pushSingle("deck", ix, j, "graveyard", 0, true)],
        ["→⛰️ マナ", () => moveSingle("deck", ix, j, "lands", true, { reversed: true })],
        ["→🃏 手札", () => moveSingle("deck", ix, j, "hand", true)],
      ]))],
    ]),
  }),

  graveyard: (ix) => ({
    onClick: (e) => showList(e, "graveyard", ix, (e, j) => showMenu(e, [
      ["🔍 拡大", () => showLightbox(e, state.value.graveyard[ix].cards[j])],
      ["→⚔️ 場", () => moveSingle("graveyard", ix, j, "field", true)],
      ["→🫳 デッキトップ", () => pushSingle("graveyard", ix, j, "deck", 0, true)],
      ["→🫴 デッキボトム", () => unshiftSingle("graveyard", ix, j, "deck", 0, true)],
      ["→🛡️ シールド", () => moveSingle("graveyard", ix, j, "shields", true)],
      ["→⛰️ マナ", () => moveSingle("graveyard", ix, j, "lands", true, { reversed: true })],
      ["→🃏 手札", () => moveSingle("graveyard", ix, j, "hand", true)],
    ])),
    onContextMenu: (e) => showMenu(e, [
      ["🔍 拡大", () => showLightbox(e, state.value.graveyard[ix].cards[0])],
      ["→⚔️ 場", () => moveSingle("graveyard", ix, 0, "field", true)],
      ["→🛡️ シールド", () => moveSingle("graveyard", ix, 0, "shields", true)],
      ["→🫳 デッキトップ", () => pushSingle("graveyard", ix, 0, "deck", 0, true)],
      ["→🫴 デッキボトム", () => unshiftSingle("graveyard", ix, 0, "deck", 0, true)],
      ["→⛰️ マナ", () => moveSingle("graveyard", ix, 0, "lands", true, { reversed: true })],
      ["→🃏 手札", () => moveSingle("graveyard", ix, 0, "hand", true)],
      ["→⚡ 超次元", () => pushSingle("graveyard", ix, 0, "exdeck", 0)],
    ]),
  }),

  grdeck: (ix) => ({
  }),

  exdeck: (ix) => ({
    onClick: (e) => showList(e, "exdeck", ix, (e, j) => showMenu(e, [
      ["🔍 拡大", () => showLightbox(e, state.value.exdeck[ix].cards[j])],
      ["→⚔️ 場", () => moveSingle("exdeck", ix, j, "field")],
      ["→🛡️ シールド", () => moveSingle("exdeck", ix, j, "shields")],
      ["→🫳 デッキトップ", () => pushSingle("exdeck", ix, j, "deck", 0)],
      ["→🫴 デッキボトム", () => unshiftSingle("exdeck", ix, j, "deck", 0)],
      ["→🪦 墓地", () => pushSingle("exdeck", ix, j, "graveyard", 0)],
      ["→⛰️ マナ", () => moveSingle("exdeck", ix, j, "lands", false, { reversed: true })],
      ["→🃏 手札", () => moveSingle("exdeck", ix, j, "hand")],
    ])),
    onContextMenu: (e) => null,
  }),

  lands: (ix) => ({
    onClick: () => toggleTapped("lands", ix),
    onContextMenu: (e) => showMenu(e, [
      ["🔍 拡大", () => showLightbox(e, state.value.lands[ix].cards[0])],
      ["→⚔️ 場", () => move("lands", ix, "field")],
      ["→🛡️ シールド", () => move("lands", ix, "shields")],
      ["→🪦 墓地", () => push("lands", ix, "graveyard", 0)],
      ["→🃏 手札", () => move("lands", ix, "hand")],
      ["→⚡ 超次元", () => push("lands", ix, "exdeck", 0)],
      ["🫳 上に乗せる", () => select("lands", ix, push)],
      ["🫴 下に入れる", () => select("lands", ix, unshift)],
      ["裏返す", () => toggleFlipped("lands", ix)],
    ])
  }),

  hand: (ix) => ({
    onClick: (e) => showMenu(e, [
      ["→⚔️ 場", () => move("hand", ix, "field")],
      ["→⛰️ マナ", () => move("hand", ix, "lands", { reversed: true })],
      ["→🪦 墓地", () => push("hand", ix, "graveyard", 0)],
    ]),
    onContextMenu: (e) => showMenu(e, [
      ["🔍 拡大", () => showLightbox(e, state.value.hand[ix].cards[0])],
      ["→🛡️ シールド", () => move("hand", ix, "shields")],
      ["→⚡ 超次元", () => push("hand", ix, "exdeck", 0)],
      ["🫳 上に乗せる", () => select("hand", ix, push)],
      ["🫴 下に入れる", () => select("hand", ix, unshift)],
    ]),
  }),
};

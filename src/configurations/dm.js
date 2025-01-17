import { shuffle as shuffleArray } from "../utils/array.js";
import {
  stack, state, setState,
  move, push, unshift, moveSingle, pushSingle, unshiftSingle,
  toggleTapped, toggleReversed, toggleFlipped, toggleLaid,
  shuffle, untapAll,
} from "../state.js";
import { select } from "../selection.js";
import { showMenu } from "../components/Menu.jsx";
import { showList } from "../components/List.jsx";
import { showLightbox } from "../components/Lightbox.jsx";

/* TODO: Add support for advanced decks */

export const rows = [
  [{ area: "field", label: "場" }],
  [
    { area: "shields", label: "盾" },
    { area: "deck", label: "山", width: 1 },
    { area: "graveyard", label: "墓", width: 1 },
  ],
  [{ area: "lands", label: "マナ" }],
  [{ area: "hand", label: "手札" }],
];

export const initialize = () => {
  const containerEl = document.getElementsByClassName("MainCards")?.[0]?.children;
  const cardSrcs = Array.from(containerEl ?? []).map(el => el?.children?.[0]?.src ?? "");
  const pile = shuffleArray(cardSrcs);
  setState({
    field: [],
    lands: [],
    graveyard: [stack({ cards: [] })],
    hand: pile.splice(0, 5).map(src => stack({ cards: [src] })),
    shields: pile.splice(0, 5).map(src => stack({ cards: [src], flipped: true })),
    deck: [stack({ cards: pile, flipped: true })],
  });
};

export const handlers = {
  field: (ix) => ({
    onClick: () => toggleTapped("field", ix),
    onContextMenu: (e) => showMenu(e, [
      ["拡大", () => showLightbox(e, state.value.field[ix].cards[0])],
      ["→ 盾", () => move("field", ix, "shields")],
      ["→ 墓地", () => push("field", ix, "graveyard", 0)],
      ["→ マナ", () => move("field", ix, "lands", { reversed: true })],
      ["→ 手札", () => move("field", ix, "hand")],
      ["上に乗せる", () => select("field", ix, push)],
      ["下に入れる", () => select("field", ix, unshift)],
      ["横にする", () => toggleLaid("field", ix)],
      ["反転する", () => toggleReversed("field", ix)],
      ["リスト", (e) => showList(e, "field", ix, (e, j) => showMenu(e, [
        ["拡大", () => showLightbox(e, state.value.field[ix].cards[j])],
        ["→ 盾", () => moveSingle("field", ix, j, "shields")],
        ["→ デッキボトム", () => unshiftSingle("field", ix, j, "deck", 0)],
        ["→ 墓地", () => pushSingle("field", ix, j, "graveyard", 0)],
        ["→ マナ", () => moveSingle("field", ix, j, "lands", false, { reversed: true })],
        ["→ 手札", () => moveSingle("field", ix, j, "hand")],
      ]))],
    ]),
  }),

  shields: (ix) => ({
    onClick: () => toggleFlipped("shields", ix),
    onContextMenu: (e) => showMenu(e, [
      ["拡大", () => showLightbox(e, state.value.shields[ix].cards[0])],
      ["→ 場", () => move("shields", ix, "field")],
      ["→ 墓地", () => push("shields", ix, "graveyard", 0)],
      ["→ マナ", () => move("shields", ix, "lands", { reversed: true })],
      ["→ 手札", () => move("shields", ix, "hand")],
      ["上に乗せる", () => select("shields", ix, push)],
      ["下に入れる", () => select("shields", ix, unshift)],
      ["リスト", (e) => showList(e, "shields", ix, (e, j) => showMenu(e, [
        ["拡大", () => showLightbox(e, state.value.shields[ix].cards[j])],
        ["→ 場", () => moveSingle("shields", ix, j, "field")],
        ["→ デッキトップ", () => pushSingle("shields", ix, j, "deck", 0,)],
        ["→ デッキボトム", () => unshiftSingle("shields", ix, j, "deck", 0)],
        ["→ 墓地", () => pushSingle("shields", ix, j, "graveyard", 0)],
        ["→ マナ", () => moveSingle("shields", ix, j, "lands", false, { reversed: true })],
        ["→ 手札", () => moveSingle("shields", ix, j, "hand")],
      ]))],
    ]),
  }),

  deck: (ix) => ({
    onClick: (e) => showMenu(e, [
      ["→ 手札", () => moveSingle("deck", ix, 0, "hand", true)],
      ["→ 盾", () => moveSingle("deck", ix, 0, "shields", true)],
      ["→ 墓地", () => pushSingle("deck", ix, 0, "graveyard", 0, true)],
      ["→ マナ", () => moveSingle("deck", ix, 0, "lands", true, { reversed: true })],
    ]),
    onContextMenu: (e) => showMenu(e, [
      ["→ 場", () => moveSingle("deck", ix, 0, "lands", true)],
      ["ボトムから引く", () => moveSingle("deck", ix, -1, "hand", true)],
      ["シャッフル", () => shuffle("deck", ix)],
      ["リスト", (e) => showList(e, "deck", ix, (e, j) => showMenu(e, [
        ["拡大", () => showLightbox(e, state.value.deck[0].cards[ix])],
        ["→ 場", () => moveSingle("deck", ix, j, "field", true)],
        ["→ 盾", () => moveSingle("deck", ix, j, "shields", true)],
        ["→ トップ", () => pushSingle("deck", ix, j, "deck", ix,)],
        ["→ ボトム", () => unshiftSingle("deck", ix, j, "deck", ix)],
        ["→ 墓地", () => pushSingle("deck", ix, j, "graveyard", 0, true)],
        ["→ マナ", () => moveSingle("deck", ix, j, "lands", true, { reversed: true })],
        ["→ 手札", () => moveSingle("deck", ix, j, "hand", true)],
      ]))],
    ]),
  }),

  graveyard: (ix) => ({
    onClick: (e) => showList(e, "graveyard", ix, (e, j) => showMenu(e, [
      ["拡大", () => showLightbox(e, state.value.graveyard[ix].cards[j])],
      ["→ 場", () => moveSingle("graveyard", ix, j, "field", true)],
      ["→ デッキトップ", () => pushSingle("graveyard", ix, j, "deck", 0, true)],
      ["→ デッキボトム", () => unshiftSingle("graveyard", ix, j, "deck", 0, true)],
      ["→ 盾", () => moveSingle("graveyard", ix, j, "shields", true)],
      ["→ マナ", () => moveSingle("graveyard", ix, j, "lands", true, { reversed: true })],
      ["→ 手札", () => moveSingle("graveyard", ix, j, "hand", true)],
    ])),
    onContextMenu: (e) => showMenu(e, [
      ["拡大", () => showLightbox(e, state.value.graveyard[ix].cards[0])],
      ["→ 場", () => moveSingle("graveyard", ix, 0, "field", true)],
      ["→ 盾", () => moveSingle("graveyard", ix, 0, "shields", true)],
      ["→ デッキトップ", () => pushSingle("graveyard", ix, 0, "deck", 0, true)],
      ["→ デッキボトム", () => unshiftSingle("graveyard", ix, 0, "deck", 0, true)],
      ["→ マナ", () => moveSingle("graveyard", ix, 0, "lands", true, { reversed: true })],
      ["→ 手札", () => moveSingle("graveyard", ix, 0, "hand", true)],
    ]),
  }),

  lands: (ix) => ({
    onClick: () => toggleTapped("lands", ix),
    onContextMenu: (e) => showMenu(e, [
      ["→ 場", () => move("lands", ix, "field")],
      ["→ 盾", () => move("lands", ix, "shields")],
      ["→ 墓地", () => push("lands", ix, "graveyard", 0)],
      ["→ 手札", () => move("lands", ix, "hand")],
      ["上に乗せる", () => select("lands", ix, push)],
      ["下に入れる", () => select("lands", ix, unshift)],
      ["裏返す", () => toggleFlipped("lands", ix)],
    ])
  }),

  hand: (ix) => ({
    onClick: (e) => showMenu(e, [
      ["→ 場", () => move("hand", ix, "field")],
      ["→ マナ", () => move("hand", ix, "lands", { reversed: true })],
      ["→ 墓地", () => push("hand", ix, "graveyard", 0)],
    ]),
    onContextMenu: (e) => showMenu(e, [
      ["拡大", () => showLightbox(e, state.value.hand[ix].cards[0])],
      ["→ 盾", () => move("hand", ix, "shields")],
      ["上に乗せる", () => select("hand", ix, push)],
      ["下に入れる", () => select("hand", ix, unshift)],
    ]),
  }),
};

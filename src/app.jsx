import { useEffect, useCallback, useState } from "preact/hooks";
import {
  state, deckLength,
  move, push, unshift, moveSingle, pushSingle, unshiftSingle,
  toggleTapped, toggleReversed, toggleFlipped, toggleLaid,
  reset, shuffle, untapAll,
} from "./state.js";
import { showMenu, closeMenu, Menu } from "./components/Menu.jsx";
import { showList, List } from "./components/List.jsx";
import { CardStack } from "./components/CardStack.jsx";
import { Button } from "./components/Button.jsx";

/* TODO: Add card to arbitrary stack */
/* TODO: Add support for advanced decks */

const handlers = {
  field: (ix) => ({
    onClick: () => toggleTapped("field", ix),
    onContextMenu: (e) => showMenu(e, [
      ["→ 盾", () => move("field", ix, "shields")],
      ["→ デッキトップ", () => push("field", ix, "deck", 0)],
      ["→ デッキボトム", () => unshift("field", ix, "deck", 0)],
      ["→ 墓地", () => push("field", ix, "graveyard", 0)],
      ["→ マナ", () => move("field", ix, "lands", { reversed: true })],
      ["→ 手札", () => move("field", ix, "hand")],
      ["横にする", () => toggleLaid("field", ix)],
      ["反転する", () => toggleReversed("field", ix)],
      ["リスト", (e) => showList(e, "field", ix, (e, j) => showMenu(e, [
        ["→ 盾", () => moveSingle("field", ix, j, "shields")],
        ["→ デッキトップ", () => pushSingle("field", ix, j, "deck", 0)],
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
      ["→ 場", () => move("shields", ix, "field")],
      ["→ デッキトップ", () => push("shields", ix, "deck", 0)],
      ["→ デッキボトム", () => unshift("shields", ix, "deck", 0)],
      ["→ 墓地", () => push("shields", ix, "graveyard", 0)],
      ["→ マナ", () => move("shields", ix, "lands", { reversed: true })],
      ["→ 手札", () => move("shields", ix, "hand")],
      ["リスト", (e) => showList(e, "shields", ix, (e, j) => showMenu(e, [
        ["→ 場", () => moveSingle("shields", ix, j, "field")],
        ["→ デッキトップ", () => pushSingle("shields", ix, j, "deck", 0,)],
        ["→ デッキボトム", () => unshiftSingle("shields", ix, j, "deck", 0)],
        ["→ 墓地", () => pushSingle("shields", ix, j, "graveyard", 0)],
        ["→ マナ", () => moveSingle("shields", ix, j, "lands", false, { reversed: true })],
        ["→ 手札", () => moveSingle("shields", ix, j, "hand")],
      ]))],
    ]),
  }),

  deck: {
    onClick: () => moveSingle("deck", 0, 0, "hand", true),
    onContextMenu: (e) => showMenu(e, [
      ["→ 場", () => moveSingle("deck", 0, 0, "lands", true)],
      ["→ 盾", () => moveSingle("deck", 0, 0, "shields", true)],
      ["→ 墓地", () => pushSingle("deck", 0, 0, "graveyard", 0, true)],
      ["→ マナ", () => moveSingle("deck", 0, 0, "lands", true, { reversed: true })],
      ["ボトムから引く", () => moveSingle("deck", 0, deckLength.value - 1, "hand", true)],
      ["シャッフル", () => shuffle()],
      ["リスト", (e) => showList(e, "deck", 0, (e, ix) => showMenu(e, [
        ["→ 場", () => moveSingle("deck", 0, ix, "field", true)],
        ["→ 盾", () => moveSingle("deck", 0, ix, "shields", true)],
        ["→ 墓地", () => pushSingle("deck", 0, ix, "graveyard", 0, true)],
        ["→ マナ", () => moveSingle("deck", 0, ix, "lands", true, { reversed: true })],
        ["→ 手札", () => moveSingle("deck", 0, ix, "hand", true)],
      ]))],
    ]),
  },

  graveyard: {
    onClick: (e) => showList(e, "graveyard", 0, (e, ix) => showMenu(e, [
      ["→ 場", () => moveSingle("graveyard", 0, ix, "field", true)],
      ["→ デッキトップ", () => pushSingle("graveyard", 0, ix, "deck", 0, true)],
      ["→ デッキボトム", () => unshiftSingle("graveyard", 0, ix, "deck", 0, true)],
      ["→ 盾", () => moveSingle("graveyard", 0, ix, "shields", true)],
      ["→ マナ", () => moveSingle("graveyard", 0, ix, "lands", true, { reversed: true })],
      ["→ 手札", () => moveSingle("graveyard", 0, ix, "hand", true)],
    ])),
    onContextMenu: (e) => showMenu(e, [
      ["→ 場", () => moveSingle("graveyard", 0, 0, "lands", true)],
      ["→ 盾", () => moveSingle("graveyard", 0, 0, "shields", true)],
      ["→ デッキトップ", () => pushSingle("graveyard", 0, 0, "deck", 0, true)],
      ["→ デッキボトム", () => unshiftSingle("graveyard", 0, 0, "deck", 0, true)],
      ["→ マナ", () => moveSingle("graveyard", 0, 0, "lands", true, { reversed: true })],
      ["→ 手札", () => moveSingle("graveyard", 0, 0, "hand", true)],
    ]),
  },

  lands: (ix) => ({
    onClick: () => toggleTapped("lands", ix),
    onContextMenu: (e) => showMenu(e, [
      ["→ 場", () => move("lands", ix, "field")],
      ["→ 盾", () => move("lands", ix, "shields")],
      ["→ デッキトップ", () => push("lands", ix, "deck", 0)],
      ["→ デッキボトム", () => unshift("lands", ix, "deck", 0)],
      ["→ 墓地", () => push("lands", ix, "graveyard", 0)],
      ["→ 手札", () => move("lands", ix, "hand")],
      ["裏返す", () => toggleFlipped("lands", ix)],
    ])
  }),

  hand: (ix) => ({
    onClick: (e) => showMenu(e, [
      ["→ 場", () => move("hand", ix, "field")],
      ["→ マナ", () => move("hand", ix, "lands", { reversed: true })],
    ]),
    onContextMenu: (e) => showMenu(e, [
      ["→ 盾", () => move("hand", ix, "shields")],
      ["→ デッキトップ", () => push("hand", ix, "deck", 0)],
      ["→ デッキボトム", () => unshift("hand", ix, "deck", 0)],
      ["→ 墓地", () => push("hand", ix, "graveyard", 0)],
    ]),
  }),
};

export const App = () => {
  const [show, setShow] = useState(false);

  const initialize = useCallback(() => {
    const containerEl = document.getElementsByClassName("MainCards")?.[0]?.children;
    const cardSrcs = Array.from(containerEl ?? []).map(el => el?.children?.[0]?.src ?? "");
    reset(cardSrcs);
    setShow(true);
  }, []);

  useEffect(initialize, [initialize]);

  return (
    <>
      <div class="dmpg-floating-menu">
        {show && (
          <>
            <Button onClick={untapAll}>
              アンタップ
            </Button>
            <Button onClick={initialize}>
              リセット
            </Button>
          </>
        )}
        <Button onClick={() => setShow(show => !show)}>
          {show ? "閉じる" : "開く"}
        </Button>
      </div>
      {show && (
        <div class="dmpg-wrapper" onClick={() => closeMenu()}>
          <Menu />
          <List />
          <div class="dmpg-row">
            <div class="dmpg-area">
              {state.value.field.map((stack, ix) => (
                <CardStack stack={stack} {...handlers.field(ix)} />
              ))}
              <span class="dmpg-area-label">場</span>
            </div>
          </div>
          <div className="dmpg-row">
            <div class="dmpg-area">
              {state.value.shields.map((stack, ix) => (
                <CardStack stack={stack} {...handlers.shields(ix)} />
              ))}
              <span class="dmpg-area-label">盾</span>
            </div>
            <div class="dmpg-area dmpg-area-deck">
              <CardStack stack={state.value.deck[0]} {...handlers.deck} />
              <CardStack stack={state.value.graveyard[0]} {...handlers.graveyard} />
              <span class="dmpg-area-label">山/墓</span>
            </div>
          </div>
          <div class="dmpg-row">
            <div class="dmpg-area">
              {state.value.lands.map((stack, ix) => (
                <CardStack stack={stack} {...handlers.lands(ix)} />
              ))}
              <span class="dmpg-area-label">マナ</span>
            </div>
          </div>
          <div class="dmpg-row">
            <div class="dmpg-area">
              {state.value.hand.map((stack, ix) => (
                <CardStack stack={stack} {...handlers.hand(ix)} />
              ))}
              <span class="dmpg-area-label">手札</span>
            </div>
          </div>
          <div class="dmpg-footer">
            <a href="https://zk-phi.github.io/handanalyze" target="_blank">→ 確率計算機</a>
            {" / "}
            <a href="https://x.com/zk_phi" target="_blank">@zk_phi</a>
          </div>
        </div>
      )}
    </>
  );
};

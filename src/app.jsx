import { useState, useCallback, useEffect } from "preact/hooks";
import { css } from "goober";
import { CARD_SIZE } from "./constants.js";
import { shuffle, put } from "./utils/array.js";
import { CardStack } from "./components/CardStack.jsx";

/* TODO: Add support for advanced decks */

const areaPadding = 8;
const areaMargin = 8;

const wrapper = css({
  padding: "8px 3vw",
  fontSize: "16px",
});

const row = css({
  display: "flex",
  gap: `${areaMargin}px`,
  marginBottom: "8px",
});

const area = css({
  position: "relative",
  display: "flex",
  flexWrap: "wrap",
  border: "2px dotted #888",
  padding: `${areaPadding}px`,
  boxSizing: "content-box",
  flexGrow: 1,
  minHeight: `${CARD_SIZE.h}px`,
})

const label = css({
  position: "absolute",
  zIndex: 1,
  background: "#fffc",
  padding: "1px 3px",
  left: 0,
  bottom: 0,
  fontSize: "14px",
});

const deckAndGraveAreaWidth = (CARD_SIZE.w + CARD_SIZE.gap * 2) * 2 + areaPadding * 2;

const stack = ({
  cards,
  flipped = false,
  reversed = false,
  tapped = false,
  laid = false,
}) => ({ cards, flipped, reversed, tapped, laid });

const useGameState = (cards) => {
  const [state, setState] = useState({
    field: [],
    lands: [],
    graveyard: [stack({ cards: [] })],
    hand: [],
    shields: [],
    deck: [stack({ cards: [], flipped: true })],
  })

  const reset = useCallback(() => {
    const pile = shuffle(cards);
    setState({
      field: [],
      lands: [],
      graveyard: [stack({ cards: [] })],
      hand: pile.splice(0, 5).map(src => stack({ cards: [src] })),
      shields: pile.splice(0, 5).map(src => stack({ cards: [src], flipped: true })),
      deck: [stack({ cards: pile, flipped: true })],
    });
  }, [cards, setState]);

  const unshift = useCallback((src, si, dest, di) => setState(state => ({
    ...state,
    [src]: state[src].filter((_, i) => i !== si),
    [dest]: put(state[dest], di, {
      ...state[dest][di],
      cards: [...state[dest][di].cards, ...state[src][si].cards],
    }),
  })), [setState])

  const push = useCallback((src, si, dest, di) => setState(state => ({
    ...state,
    [src]: state[src].filter((_, i) => i !== si),
    [dest]: put(state[dest], di, {
      ...state[dest][di],
      cards: [...state[src][si].cards, ...state[dest][di].cards],
    }),
  })), [setState]);

  const move = useCallback((src, si, dest) => setState(state => ({
    ...state,
    [src]: state[src].filter((_, i) => i !== si),
    [dest]: [...state[dest], state[src][si]],
  })), [setState]);

  const toggleTapped = useCallback((src, si) => setState(state => ({
    ...state,
    [src]: put(state[src], si, {
      ...state[src][si],
      tapped: !state[src][si].tapped,
    }),
  })), [setState]);

  const toggleFlipped = useCallback((src, si) => setState(state => ({
    ...state,
    [src]: put(state[src], si, {
      ...state[src][si],
      flipped: !state[src][si].flipped,
    }),
  })), [setState]);

  const toggleReversed = useCallback((src, si) => setState(state => ({
    ...state,
    [src]: put(state[src], si, {
      ...state[src][si],
      reversed: !state[src][si].reversed,
    }),
  })), [setState]);

  const toggleLaid = useCallback((src, si) => setState(state => ({
    ...state,
    [src]: put(state[src], si, {
      ...state[src][si],
      laid: !state[src][si].laid,
    }),
  })), [setState]);

  const moveSingle = useCallback((src, si, sj, dest) => setState(state => ({
    ...state,
    [src]: put(state[src], si, {
      ...state[src][si],
      cards: state[src][si].cards.filter((_, j) => j !== sj)
    }),
    [dest]: [ ...state[dest], stack({ cards: [state[src][si].cards[sj]] }) ],
  })), [setState]);

  useEffect(() => {
    reset();
  }, [reset]);

  return {
    ...state,
    reset,
    unshift, push, move,
    toggleTapped, toggleFlipped, toggleLaid, toggleReversed,
    moveSingle,
  };
};

export const App = () => {
  const [allCards] = useState(
    Array.from(
      document.getElementsByClassName("MainCards")[0].children
    ).map(el => (
      el.children[0].src
    ))
  );

  const state = useGameState(allCards);

  return (
    <div class={wrapper}>
      <div class={row}>
        <div class={area}>
          {state.field.map((stack, ix) => (
            <CardStack
                stack={stack}
                onClick={() => state.toggleTapped("field", ix)}
            />
          ))}
          <span class={label}>場</span>
        </div>
      </div>
      <div className={row}>
        <div class={area}>
          {state.shields.map(stack => <CardStack stack={stack} />)}
          <span class={label}>盾</span>
        </div>
        <div class={area} style={{ width: `${deckAndGraveAreaWidth}px`, flexGrow: 0 }}>
          <CardStack
              stack={state.deck[0]}
              onClick={() => state.moveSingle("deck", 0, 0, "hand")}
          />
          <CardStack stack={state.graveyard[0]} />
          <span class={label}>山/墓</span>
        </div>
      </div>
      <div class={row}>
        <div class={area}>
          {state.lands.map(stack => <CardStack stack={stack} />)}
          <span class={label}>マナ</span>
        </div>
      </div>
      <div class={row}>
        <div class={area}>
          {state.hand.map((stack, ix) => (
            <CardStack
                onClick={() => state.move("hand", ix, "field")}
                stack={stack}
            />
          ))}
          <span class={label}>手札</span>
        </div>
      </div>
    </div>
  );
};

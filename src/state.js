import { signal } from "@preact/signals";
import { shuffle, put } from "./utils/array.js";

export const state = signal({
  field: [],
  lands: [],
  graveyard: [stack({ cards: [] })],
  hand: [],
  shields: [],
  deck: [stack({ cards: [], flipped: true })],
});

export const reset = (cardSrcs) => {
  const pile = shuffle(cards);
  state = {
    field: [],
    lands: [],
    graveyard: [stack({ cards: [] })],
    hand: pile.splice(0, 5).map(src => stack({ cards: [src] })),
    shields: pile.splice(0, 5).map(src => stack({ cards: [src], flipped: true })),
    deck: [stack({ cards: pile, flipped: true })],
  };
}

export const unshift = (src, si, dest, di) => {
  state = {
    ...state,
    [src]: state[src].filter((_, i) => i !== si),
    [dest]: put(state[dest], di, {
      ...state[dest][di],
      cards: [...state[dest][di].cards, ...state[src][si].cards],
    }),
  };
};

const push = (src, si, dest, di) => {
  state = {
    ...state,
    [src]: state[src].filter((_, i) => i !== si),
    [dest]: put(state[dest], di, {
      ...state[dest][di],
      cards: [...state[src][si].cards, ...state[dest][di].cards],
    }),
  };
};

const move = (src, si, dest) => {
  state = {
    ...state,
    [src]: state[src].filter((_, i) => i !== si),
    [dest]: [...state[dest], state[src][si]],
  };
};

const toggleTapped = (src, si) => {
  state = {
    ...state,
    [src]: put(state[src], si, {
      ...state[src][si],
      tapped: !state[src][si].tapped,
    }),
  };
};

const toggleFlipped = (src, si) => {
  state = {
    ...state,
    [src]: put(state[src], si, {
      ...state[src][si],
      flipped: !state[src][si].flipped,
    }),
  };
};

const toggleReversed = (src, si) => {
  state = {
    ...state,
    [src]: put(state[src], si, {
      ...state[src][si],
      reversed: !state[src][si].reversed,
    }),
  };
};

const toggleLaid = (src, si) => {
  state = {
    ...state,
    [src]: put(state[src], si, {
      ...state[src][si],
      laid: !state[src][si].laid,
    }),
  };
};

const moveSingle = (src, si, sj, dest) => {
  state = {
    ...state,
    [src]: put(state[src], si, {
      ...state[src][si],
      cards: state[src][si].cards.filter((_, j) => j !== sj)
    }),
    [dest]: [ ...state[dest], stack({ cards: [state[src][si].cards[sj]] }) ],
  };
};

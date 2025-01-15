import { signal, computed } from "@preact/signals";
import { shuffle as shuffleArray, put } from "./utils/array.js";
import { closeList } from "./components/List.jsx";

const stack = ({
  cards,
  flipped = false,
  reversed = false,
  tapped = false,
  laid = false,
}) => ({ cards, flipped, reversed, tapped, laid });

export const state = signal({
  field: [],
  lands: [],
  graveyard: [stack({ cards: [] })],
  hand: [],
  shields: [],
  deck: [stack({ cards: [], flipped: true })],
});

export const deckLength = computed(() => state.value.deck[0].cards.length);

export const reset = (cardSrcs) => {
  closeList();
  const pile = shuffleArray(cardSrcs);
  state.value = {
    field: [],
    lands: [],
    graveyard: [stack({ cards: [] })],
    hand: pile.splice(0, 5).map(src => stack({ cards: [src] })),
    shields: pile.splice(0, 5).map(src => stack({ cards: [src], flipped: true })),
    deck: [stack({ cards: pile, flipped: true })],
  };
};

export const shuffle = () => {
  const shuffled = shuffleArray(state.value.deck[0].cards);
  state.value = {
    ...state.value,
    deck: [{ ...state.value.deck[0], cards: shuffled }],
  };
};

const pop = (src, si) => {
  const stack = state.value[src][si];
  state.value = {
    ...state.value,
    [src]: state.value[src].filter((_, i) => i !== si),
  };
  return stack;
};

export const unshift = (src, si, dest, di) => {
  closeList();
  const stack = pop(src, si);
  state.value = {
    ...state.value,
    [dest]: put(state.value[dest], di, {
      ...state.value[dest][di],
      cards: [...state.value[dest][di].cards, ...stack.cards],
    }),
  };
};

export const push = (src, si, dest, di) => {
  closeList();
  const stack = pop(src, si);
  state.value = {
    ...state.value,
    [dest]: put(state.value[dest], di, {
      ...state.value[dest][di],
      cards: [...stack.cards, ...state.value[dest][di].cards],
    }),
  };
};

export const move = (src, si, dest, attrs = {}) => {
  closeList();
  const stack = pop(src, si);
  state.value = {
    ...state.value,
    [dest]: [
      ...state.value[dest],
      ...stack.cards.map(card => ({ cards: [card], ...attrs })),
    ],
  };
};

export const toggleTapped = (src, si) => {
  state.value = {
    ...state.value,
    [src]: put(state.value[src], si, {
      ...state.value[src][si],
      tapped: !state.value[src][si].tapped,
    }),
  };
};

export const toggleFlipped = (src, si) => {
  state.value = {
    ...state.value,
    [src]: put(state.value[src], si, {
      ...state.value[src][si],
      flipped: !state.value[src][si].flipped,
    }),
  };
};

export const toggleReversed = (src, si) => {
  state.value = {
    ...state.value,
    [src]: put(state.value[src], si, {
      ...state.value[src][si],
      reversed: !state.value[src][si].reversed,
    }),
  };
};

export const toggleLaid = (src, si) => {
  state.value = {
    ...state.value,
    [src]: put(state.value[src], si, {
      ...state.value[src][si],
      laid: !state.value[src][si].laid,
    }),
  };
};

export const untapAll = () => {
  state.value = {
    ...state.value,
    field: state.value.field.map(stack => ({ ...stack, tapped: false })),
    lands: state.value.lands.map(stack => ({ ...stack, tapped: false })),
  };
};

const popSingle = (src, si, sj) => {
  const card = state.value[src][si].cards[sj];
  state.value = {
    ...state.value,
    [src]: put(state.value[src], si, {
      ...state.value[src][si],
      cards: state.value[src][si].cards.filter((_, j) => j !== sj),
    }),
  };
  return card;
}

export const moveSingle = (src, si, sj, dest, allowEmpty = false, attrs = {}) => {
  if (state.value[src][si].cards.length <= 1 && !allowEmpty) {
    move(src, si, dest, attrs);
  } else {
    const card = popSingle(src, si, sj);
    state.value = {
      ...state.value,
      [dest]: [
        ...state.value[dest],
        stack({ cards: [card], ...attrs }),
      ],
    };
  }
};

export const pushSingle = (src, si, sj, dest, di, allowEmpty = false) => {
  if (state.value[src][si].cards.length <= 1 && !allowEmpty) {
    push(src, si, dest, di);
  } else {
    const card = popSingle(src, si, sj);
    state.value = {
      ...state.value,
      [dest]: put(state.value[dest], di, {
        ...state.value[dest][di],
        cards: [card, ...state.value[dest][di].cards],
      }),
    };
  }
};

export const unshiftSingle = (src, si, sj, dest, di, allowEmpty = false) => {
  if (state.value[src][si].cards.length <= 1 && !allowEmpty) {
    unshift(src, si, dest, di);
  } else {
    const card = popSingle(src, si, sj);
    state.value = {
      ...state.value,
      [dest]: put(state.value[dest], di, {
        ...state.value[dest][di],
        cards: [...state.value[dest][di].cards, card],
      }),
    };
  }
};

import { signal, computed } from "@preact/signals";
import { shuffle as shuffleArray, put } from "./utils/array.js";
import { closeList } from "./components/List.jsx";

export const stack = ({
  cards,
  flipped = false,
  reversed = false,
  tapped = false,
  laid = false,
}) => ({ cards, flipped, reversed, tapped, laid });

/* Map<AreaName, Stack[]> */
export const state = signal({});

export const setState = (value) => {
  closeList();
  state.value = value;
}

export const shuffle = (src, ix) => {
  const shuffled = shuffleArray(state.value[src][ix].cards);
  state.value = {
    ...state.value,
    [src]: [{ ...state.value[src][ix], cards: shuffled }],
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
  if (!state.value[dest][di]) {
    move(src, si, dest);
  } else {
    const stack = pop(src, si);
    state.value = {
      ...state.value,
      [dest]: put(state.value[dest], di, {
        ...state.value[dest][di],
        cards: [...state.value[dest][di].cards, ...stack.cards],
      }),
    };
  }
};

export const push = (src, si, dest, di) => {
  closeList();
  if (!state.value[dest][di]) {
    move(src, si, dest);
  } else {
    const stack = pop(src, si);
    state.value = {
      ...state.value,
      [dest]: put(state.value[dest], di, {
        ...state.value[dest][di],
        cards: [...stack.cards, ...state.value[dest][di].cards],
      }),
    };
  }
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

export const setAttribute = (src, si, key, value) => {
  state.value = {
    ...state.value,
    [src]: put(state.value[src], si, {
      ...state.value[src][si],
      [key]: value,
    }),
  };
};

export const untapAll = (srcs) => {
  const untapped = Object.fromEntries(srcs.map(src => [
    src,
    state.value[src].map(stack => ({ ...stack, tapped: false })),
  ]));
  state.value = { ...state.value, ...untapped };
};

const popSingle = (src, si, sj) => {
  if (sj < 0) {
    sj += state.value[src][si].cards.length;
  }
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
  } else if (!state.value[dest][di]) {
    moveSingle(src, si, sj, dest);
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
  } else if (!state.value[dest][di]) {
    moveSingle(src, si, sj, dest);
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

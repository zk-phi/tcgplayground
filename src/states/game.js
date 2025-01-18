import { signal, computed } from "@preact/signals";
import { shuffle as shuffleArray, put } from "../utils/array.js";
import { closeList } from "./list.js";

export const stack = ({
  cards,
  flipped = false,
  reversed = false,
  tapped = false,
  laid = false,
}) => ({ cards, flipped, reversed, tapped, laid });

/* Map<AreaName, Stack[]> */
export const gameState = signal({});

export const setGameState = (value) => {
  closeList();
  gameState.value = value;
}

export const shuffle = (src, ix) => {
  const shuffled = shuffleArray(gameState.value[src][ix].cards);
  gameState.value = {
    ...gameState.value,
    [src]: [{ ...gameState.value[src][ix], cards: shuffled }],
  };
};

const pop = (src, si) => {
  const stack = gameState.value[src][si];
  gameState.value = {
    ...gameState.value,
    [src]: gameState.value[src].filter((_, i) => i !== si),
  };
  return stack;
};

export const unshift = (src, si, dest, di) => {
  closeList();
  if (!gameState.value[dest][di]) {
    move(src, si, dest, {}, true);
  } else {
    const stack = pop(src, si);
    if (src === dest && di > si) di--;
    gameState.value = {
      ...gameState.value,
      [dest]: put(gameState.value[dest], di, {
        ...gameState.value[dest][di],
        cards: [...gameState.value[dest][di].cards, ...stack.cards],
      }),
    };
  }
};

export const push = (src, si, dest, di) => {
  closeList();
  if (!gameState.value[dest][di]) {
    move(src, si, dest, {}, true);
  } else {
    const stack = pop(src, si);
    if (src === dest && di > si) di--;
    gameState.value = {
      ...gameState.value,
      [dest]: put(gameState.value[dest], di, {
        ...gameState.value[dest][di],
        cards: [...stack.cards, ...gameState.value[dest][di].cards],
      }),
    };
  }
};

export const move = (src, si, dest, attrs = {}, keepStacked = false) => {
  closeList();
  const cards = pop(src, si).cards;
  gameState.value = {
    ...gameState.value,
    [dest]: [
      ...gameState.value[dest],
      ...(keepStacked ? (
        [stack({ cards, ...attrs })]
      ) : (
        cards.map(card => stack({ cards: [card], ...attrs }))
      )),
    ],
  };
};

export const toggleTapped = (src, si) => {
  gameState.value = {
    ...gameState.value,
    [src]: put(gameState.value[src], si, {
      ...gameState.value[src][si],
      tapped: !gameState.value[src][si].tapped,
    }),
  };
};

export const toggleFlipped = (src, si) => {
  gameState.value = {
    ...gameState.value,
    [src]: put(gameState.value[src], si, {
      ...gameState.value[src][si],
      flipped: !gameState.value[src][si].flipped,
    }),
  };
};

export const toggleReversed = (src, si) => {
  gameState.value = {
    ...gameState.value,
    [src]: put(gameState.value[src], si, {
      ...gameState.value[src][si],
      reversed: !gameState.value[src][si].reversed,
    }),
  };
};

export const toggleLaid = (src, si) => {
  gameState.value = {
    ...gameState.value,
    [src]: put(gameState.value[src], si, {
      ...gameState.value[src][si],
      laid: !gameState.value[src][si].laid,
    }),
  };
};

export const untapAll = (srcs) => {
  const untapped = Object.fromEntries(srcs.map(src => [
    src,
    gameState.value[src].map(stack => ({ ...stack, tapped: false })),
  ]));
  gameState.value = { ...gameState.value, ...untapped };
};

const popSingle = (src, si, sj) => {
  if (sj < 0) {
    sj += gameState.value[src][si].cards.length;
  }
  const card = gameState.value[src][si].cards[sj];
  gameState.value = {
    ...gameState.value,
    [src]: put(gameState.value[src], si, {
      ...gameState.value[src][si],
      cards: gameState.value[src][si].cards.filter((_, j) => j !== sj),
    }),
  };
  return card;
}

export const moveSingle = (src, si, sj, dest, allowEmpty = false, attrs = {}) => {
  if (gameState.value[src][si].cards.length <= 1 && !allowEmpty) {
    move(src, si, dest, attrs);
  } else {
    const card = popSingle(src, si, sj);
    gameState.value = {
      ...gameState.value,
      [dest]: [
        ...gameState.value[dest],
        stack({ cards: [card], ...attrs }),
      ],
    };
  }
};

export const pushSingle = (src, si, sj, dest, di, allowEmpty = false) => {
  if (gameState.value[src][si].cards.length <= 1 && !allowEmpty) {
    push(src, si, dest, di);
  } else if (!gameState.value[dest][di]) {
    moveSingle(src, si, sj, dest);
  } else {
    const card = popSingle(src, si, sj);
    gameState.value = {
      ...gameState.value,
      [dest]: put(gameState.value[dest], di, {
        ...gameState.value[dest][di],
        cards: [card, ...gameState.value[dest][di].cards],
      }),
    };
  }
};

export const unshiftSingle = (src, si, sj, dest, di, allowEmpty = false) => {
  if (gameState.value[src][si].cards.length <= 1 && !allowEmpty) {
    unshift(src, si, dest, di);
  } else if (!gameState.value[dest][di]) {
    moveSingle(src, si, sj, dest);
  } else {
    const card = popSingle(src, si, sj);
    gameState.value = {
      ...gameState.value,
      [dest]: put(gameState.value[dest], di, {
        ...gameState.value[dest][di],
        cards: [...gameState.value[dest][di].cards, card],
      }),
    };
  }
};

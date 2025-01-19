import { signal, computed } from "@preact/signals";
import { shuffle as shuffleArray, put as putArray } from "../utils/array.js";
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

/* --- utils */

/* Get and remove the IX-th stack from SRC. */
const pop = (src, ix) => {
  const stack = gameState.value[src][ix];
  gameState.value = {
    ...gameState.value,
    [src]: gameState.value[src].filter((_, i) => i !== ix),
  };
  return stack;
};

/* Get and remove all stacks from SRC. */
const popBatch = (src) => {
  const stacks = gameState.value[src];
  gameState.value = { ...gameState.value, [src]: [] };
  return stacks;
};

/* Get and remove J-th cards from the I-th stack of AREA.
 * When J is negative, count from the bottom of the stack. */
const popSingle = (area, i, j) => {
  if (j < 0) {
    j += gameState.value[area][i].cards.length;
  }
  const card = gameState.value[area][i].cards[j];
  gameState.value = {
    ...gameState.value,
    [area]: putArray(gameState.value[area], i, {
      ...gameState.value[area][i],
      cards: gameState.value[area][i].cards.filter((_, ix) => j !== ix),
    }),
  };
  return card;
};

/* Get and remove all cards from the IX-th stack of AREA. */
const popAll = (area, ix) => {
  const cards = gameState.value[area][ix].cards;
  gameState.value = {
    ...gameState.value,
    [area]: putArray(gameState.value[area], ix, {
      ...gameState.value[area][ix],
      cards: [],
    }),
  };
  return cards;
};

/* Add STACKS to AREA. */
const put = (stacks, area) => {
  gameState.value = {
    ...gameState.value,
    [area]: [...gameState.value[area], ...stacks],
  };
};

/* Add CARDS on top of the IX-th stack of AREA. */
const unshiftCards = (cards, area, ix) => {
  gameState.value = {
    ...gameState.value,
    [area]: putArray(gameState.value[area], ix, {
      ...gameState.value[area][ix],
      cards: [...gameState.value[area][ix].cards, ...cards],
    }),
  };
};

/* Add CARDS to bottom of the IX-th stack of AREA. */
const pushCards = (cards, area, ix) => {
  gameState.value = {
    ...gameState.value,
    [area]: putArray(gameState.value[area], ix, {
      ...gameState.value[area][ix],
      cards: [...cards, ...gameState.value[area][ix].cards],
    }),
  };
};

/* Get all cards from STACKS. */
const reduceStacks = (stacks) => (
  stacks.reduce((l, r) => l.concat(r.cards), [])
);

/* Merge all stacks in AREA into one stack. */
const mergeStacks = (area, firstStackIx) => {
  const stack = pop(area, firstStackIx);
  gameState.value = {
    ...gameState.value,
    [area]: [{
      ...stack,
      cards: [...stack.cards, ...reduceStacks(gameState.value[area])],
    }],
  };
}

/* ---- operate on stacks */

export const unshift = (src, ix, dest, di) => {
  closeList();
  if (!gameState.value[dest][di]) {
    move(src, ix, dest, {}, true);
  } else {
    const stack = pop(src, ix);
    unshiftCards(stack.cards, dest, (src === dest && di > ix) ? di - 1 : di);
  }
};

export const push = (src, ix, dest, di) => {
  closeList();
  if (!gameState.value[dest][di]) {
    move(src, ix, dest, {}, true);
  } else {
    const stack = pop(src, ix);
    pushCards(stack.cards, dest, (src === dest && di > ix) ? di - 1 : di);
  }
};

export const move = (src, ix, dest, attrs = {}, keepStacked = false) => {
  closeList();
  const cards = pop(src, ix).cards;
  if (keepStacked) {
    put([stack({ cards, ...attrs })], dest);
  } else {
    put(cards.map(card => stack({ cards: [card], ...attrs })), dest);
  }
};

export const setAttr = (src, ix, key, value) => {
  gameState.value = {
    ...gameState.value,
    [src]: putArray(gameState.value[src], ix, {
      ...gameState.value[src][ix],
      [key]: value,
    }),
  };
};

export const toggleTapped = (src, ix) => {
  setAttr(src, ix, "tapped", !gameState.value[src][ix].tapped);
};

export const toggleFlipped = (src, ix) => {
  setAttr(src, ix, "flipped", !gameState.value[src][ix].flipped);
};

export const toggleReversed = (src, ix) => {
  setAttr(src, ix, "reversed", !gameState.value[src][ix].flipped);
};

export const toggleLaid = (src, ix) => {
  setAttr(src, ix, "laid", !gameState.value[src][ix].flipped);
};

/* ---- Operate on areas */

export const moveBatch = (src, dest, attrs = {}) => {
  closeList();
  const stacks = popBatch(src);
  put(stacks.map(stack => ({ cards: stack.cards, ...attrs })), dest);
};

export const pushBatch = (src, dest, di) => {
  closeList();
  if (src === dest) {
    mergeStacks(dest, di);
  } else {
    const stacks = popBatch(src);
    pushCards(reduceStacks(stacks), dest, di);
  }
};

export const unshiftBatch = (src, dest, di) => {
  closeList();
  if (src === dest) {
    mergeStacks(dest, di);
  } else {
    const stacks = popBatch(src);
    unshiftCards(reduceStacks(stacks), dest, di);
  }
};

/* ---- Operate on a card in stacks */

export const moveSingle = (src, ix, sj, dest, allowEmpty = false, attrs = {}) => {
  if (gameState.value[src][ix].cards.length <= 1 && !allowEmpty) {
    move(src, ix, dest, attrs);
  } else {
    const card = popSingle(src, ix, sj);
    put([stack({ cards: [card], ...attrs })], dest);
  }
};

export const pushSingle = (src, ix, sj, dest, di, allowEmpty = false) => {
  if (gameState.value[src][ix].cards.length <= 1 && !allowEmpty) {
    push(src, ix, dest, di);
  } else if (!gameState.value[dest][di]) {
    moveSingle(src, ix, sj, dest);
  } else {
    const card = popSingle(src, ix, sj);
    pushCards([card], dest, di);
  }
};

export const unshiftSingle = (src, ix, sj, dest, di, allowEmpty = false) => {
  if (gameState.value[src][ix].cards.length <= 1 && !allowEmpty) {
    unshift(src, ix, dest, di);
  } else if (!gameState.value[dest][di]) {
    moveSingle(src, ix, sj, dest);
  } else {
    const card = popSingle(src, ix, sj);
    unshiftCards([card], dest, di);
  }
};

/* ---- Operate on all cards in stacks */

export const moveAll = (src, ix, dest, attrs, keepStacked = false) => {
  const cards = popAll(src, ix);
  if (keepStacked) {
    put([stack({ cards, ...attrs})], dest);
  } else {
    put(cards.map(card => stack({ cards: [card], ...attrs })), dest);
  }
};

export const pushAll = (src, si, dest, di) => {
  const cards = popAll(src, si);
  pushCards(cards, dest, di);
};

export const unshiftAll = (src, si, dest, di) => {
  const cards = popAll(src, si);
  unshiftCards(cards, dest, di);
};

/* --- other */

export const untapAll = (srcs) => {
  const untapped = Object.fromEntries(srcs.map(src => [
    src,
    gameState.value[src].map(stack => ({ ...stack, tapped: false })),
  ]));
  gameState.value = { ...gameState.value, ...untapped };
};

export const shuffle = (src, ix) => {
  const shuffled = shuffleArray(gameState.value[src][ix].cards);
  gameState.value = {
    ...gameState.value,
    [src]: [{ ...gameState.value[src][ix], cards: shuffled }],
  };
};

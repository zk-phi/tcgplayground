import { signal } from "@preact/signals";
import { gensym } from "../utils/gensym";
import { shuffle as shuffleArray, put as putArray } from "../utils/array";
import { closeList } from "./list";

type GameState = { [K in string]: Stack[] };

export const makeStack = ({
  cards,
  flipped = false,
  reversed = false,
  tapped = false,
  laid = false,
}: { cards: string[] } & Partial<StackAttributes>): Stack => (
  { id: gensym(), cards, flipped, reversed, tapped, laid }
);

export const gameState = signal<GameState>({});

const history = signal<GameState[]>([]);
const forwardHistory = signal<GameState[]>([]);

const undoBoundary = () => {
  history.value = [gameState.value, ...history.value.slice(0, 9)];
  forwardHistory.value = [];
};

export const getStacks = (src: string): Stack[] => (
  gameState.value[src] ?? []
);

export const getStack = (src: string, ix: number): Stack => (
  gameState.value[src]?.[ix]
);

export const getUndoState = (): boolean => (
  history.value.length > 1
);

export const getRedoState = (): boolean => (
  forwardHistory.value.length > 0
);

export const undo = () => {
  forwardHistory.value = [history.value[0], ...forwardHistory.value];
  history.value = history.value.slice(1);
  gameState.value = history.value[0];
};

export const redo = () => {
  history.value = [forwardHistory.value[0], ...history.value];
  forwardHistory.value = forwardHistory.value.slice(1);
  gameState.value = history.value[0];
};

/* --- utils */

/* Get and remove the IX-th stack from SRC. */
const pop = (src: string, ix: number): Stack => {
  closeList();
  const stack = gameState.value[src][ix];
  gameState.value = {
    ...gameState.value,
    [src]: gameState.value[src].filter((_, i) => i !== ix),
  };
  return stack;
};

/* Get and remove all stacks from SRC. */
const popBatch = (src: string): Stack[] => {
  closeList();
  const stacks = gameState.value[src];
  gameState.value = { ...gameState.value, [src]: [] };
  return stacks;
};

/* Get and remove J-th cards from the I-th stack of AREA.
 * When J is negative, count from the bottom of the stack. */
const popSingle = (area: string, i: number, j: number): string => {
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
const popAll = (area: string, ix: number): string[] => {
  closeList();
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
const put = (stacks: Stack[], area: string) => {
  gameState.value = {
    ...gameState.value,
    [area]: [...gameState.value[area], ...stacks],
  };
};

/* Add CARDS on top of the IX-th stack of AREA. */
const unshiftCards = (cards: string[], area: string, ix: number) => {
  gameState.value = {
    ...gameState.value,
    [area]: putArray(gameState.value[area], ix, {
      ...gameState.value[area][ix],
      cards: [...gameState.value[area][ix].cards, ...cards],
    }),
  };
};

/* Add CARDS to bottom of the IX-th stack of AREA. */
const pushCards = (cards: string[], area: string, ix: number) => {
  gameState.value = {
    ...gameState.value,
    [area]: putArray(gameState.value[area], ix, {
      ...gameState.value[area][ix],
      cards: [...cards, ...gameState.value[area][ix].cards],
    }),
  };
};

/* Get all cards from STACKS. */
const reduceStacks = (stacks: Stack[]): string[] => (
  stacks.reduce((l: string[], r: Stack) => l.concat(r.cards), [])
);

/* Merge all stacks in AREA into one stack. */
const mergeStacks = (area: string, firstStackIx: number) => {
  closeList();
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

export const unshift = (src: string, ix: number, dest: string, di: number) => {
  if (!gameState.value[dest][di]) {
    move(src, ix, dest, {}, true);
  } else {
    const stack = pop(src, ix);
    unshiftCards(stack.cards, dest, (src === dest && di > ix) ? di - 1 : di);
  }
  undoBoundary();
};

export const push = (src: string, ix: number, dest: string, di: number) => {
  if (!gameState.value[dest][di]) {
    move(src, ix, dest, {}, true);
  } else {
    const stack = pop(src, ix);
    pushCards(stack.cards, dest, (src === dest && di > ix) ? di - 1 : di);
  }
  undoBoundary();
};

export const move = (
  src: string,
  ix: number,
  dest: string,
  attrs: Partial<StackAttributes> = {},
  keepStacked = false,
) => {
  const cards = pop(src, ix).cards;
  if (keepStacked) {
    put([makeStack({ cards, ...attrs })], dest);
  } else {
    put(cards.map(card => makeStack({ cards: [card], ...attrs })), dest);
  }
  undoBoundary();
};

export const setAttr = (
  src: string,
  ix: number,
  key: keyof StackAttributes,
  value: boolean,
) => {
  gameState.value = {
    ...gameState.value,
    [src]: putArray(gameState.value[src], ix, {
      ...gameState.value[src][ix],
      [key]: value,
    }),
  };
  undoBoundary();
};

export const toggleTapped = (src: string, ix: number) => {
  setAttr(src, ix, "tapped", !gameState.value[src][ix].tapped);
};

export const toggleFlipped = (src: string, ix: number) => {
  setAttr(src, ix, "flipped", !gameState.value[src][ix].flipped);
};

export const toggleReversed = (src: string, ix: number) => {
  setAttr(src, ix, "reversed", !gameState.value[src][ix].flipped);
};

export const toggleLaid = (src: string, ix: number) => {
  setAttr(src, ix, "laid", !gameState.value[src][ix].flipped);
};

/* ---- Operate on areas */

export const moveBatch = (
  src: string,
  dest: string,
  attrs: Partial<StackAttributes> = {},
) => {
  const stacks = popBatch(src);
  put(stacks.map((stack: Stack) => makeStack({ cards: stack.cards, ...attrs })), dest);
  undoBoundary();
};

export const pushBatch = (src: string, dest: string, di: number) => {
  if (src === dest) {
    mergeStacks(dest, di);
  } else {
    const stacks = popBatch(src);
    pushCards(reduceStacks(stacks), dest, di);
  }
  undoBoundary();
};

export const unshiftBatch = (src: string, dest: string, di: number) => {
  if (src === dest) {
    mergeStacks(dest, di);
  } else {
    const stacks = popBatch(src);
    unshiftCards(reduceStacks(stacks), dest, di);
  }
  undoBoundary();
};

/* ---- Operate on a card in stacks */

export const moveSingle = (
  src: string,
  ix: number,
  sj: number,
  dest: string,
  allowEmpty = false,
  attrs: Partial<StackAttributes> = {},
) => {
  if (gameState.value[src][ix].cards.length <= 1 && !allowEmpty) {
    move(src, ix, dest, attrs);
  } else {
    const card = popSingle(src, ix, sj);
    put([makeStack({ cards: [card], ...attrs })], dest);
  }
  undoBoundary();
};

export const pushSingle = (
  src: string,
  ix: number,
  sj: number,
  dest: string,
  di: number,
  allowEmpty = false,
) => {
  if (gameState.value[src][ix].cards.length <= 1 && !allowEmpty) {
    push(src, ix, dest, di);
  } else if (!gameState.value[dest][di]) {
    moveSingle(src, ix, sj, dest);
  } else {
    const card = popSingle(src, ix, sj);
    pushCards([card], dest, di);
  }
  undoBoundary();
};

export const unshiftSingle = (
  src: string,
  ix: number,
  sj: number,
  dest: string,
  di: number,
  allowEmpty = false,
) => {
  if (gameState.value[src][ix].cards.length <= 1 && !allowEmpty) {
    unshift(src, ix, dest, di);
  } else if (!gameState.value[dest][di]) {
    moveSingle(src, ix, sj, dest);
  } else {
    const card = popSingle(src, ix, sj);
    unshiftCards([card], dest, di);
  }
  undoBoundary();
};

/* ---- Operate on all cards in stacks */

export const moveAll = (
  src: string,
  ix: number,
  dest: string,
  attrs: Partial<StackAttributes> = {},
  keepStacked = false,
) => {
  const cards = popAll(src, ix);
  if (keepStacked) {
    put([makeStack({ cards, ...attrs})], dest);
  } else {
    put(cards.map(card => makeStack({ cards: [card], ...attrs })), dest);
  }
  undoBoundary();
};

export const pushAll = (src: string, si: number, dest: string, di: number) => {
  const cards = popAll(src, si);
  pushCards(cards, dest, di);
  undoBoundary();
};

export const unshiftAll = (src: string, si: number, dest: string, di: number) => {
  const cards = popAll(src, si);
  unshiftCards(cards, dest, di);
  undoBoundary();
};

/* --- other */

export const setGameState = (value: GameState) => {
  closeList();
  gameState.value = value;
  undoBoundary();
}

export const untapAll = (srcs: string[]) => {
  const untapped = Object.fromEntries(srcs.map(src => [
    src,
    gameState.value[src].map(stack => ({ ...stack, tapped: false })),
  ]));
  gameState.value = { ...gameState.value, ...untapped };
  undoBoundary();
};

export const shuffle = (src: string, ix: number) => {
  const shuffled = shuffleArray(gameState.value[src][ix].cards);
  gameState.value = {
    ...gameState.value,
    [src]: [{ ...gameState.value[src][ix], cards: shuffled }],
  };
  undoBoundary();
};

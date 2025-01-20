import { render } from "preact";
import { useEffect } from "preact/hooks";
import { configurations } from "../configurations";

import { shuffle as shuffleArray } from "../../../playground/utils/array";
import {
  makeStack, setGameState, untapAll,
  undo, redo, getUndoState, getRedoState,
} from "../../../playground/states/game";

import { Playground } from "../../../playground/Playground";
import { FloatingButtons } from "../../../playground/components/FloatingButtons";
import { Button } from "../../../playground/components/Button";

import "../../../playground/styles.min.css";
import "./style.css";
import "../../../playground/utils/dndtouch";

const sampleDeck = [
  "/tcgplayground/dm24sp2-013.jpg",
  "/tcgplayground/dm24sp2-013.jpg",
  "/tcgplayground/dm24sp2-013.jpg",
  "/tcgplayground/dm24sp2-013.jpg",
  "/tcgplayground/dm23bd5-060.jpg",
  "/tcgplayground/dm23bd5-060.jpg",
  "/tcgplayground/dm23bd5-060.jpg",
  "/tcgplayground/dm23bd5-060.jpg",
  "/tcgplayground/dm24sp2-010.jpg",
  "/tcgplayground/dm24sp2-010.jpg",
  "/tcgplayground/dm24sp2-010.jpg",
  "/tcgplayground/dm24sp2-010.jpg",
  "/tcgplayground/dm23ex3-030.jpg",
  "/tcgplayground/dm23ex3-030.jpg",
  "/tcgplayground/dm23ex3-030.jpg",
  "/tcgplayground/dm23ex3-030.jpg",
  "/tcgplayground/dm23ex3-029.jpg",
  "/tcgplayground/dm23ex3-029.jpg",
  "/tcgplayground/dm23ex3-029.jpg",
  "/tcgplayground/dm23ex3-029.jpg",
  "/tcgplayground/dm24sp2-009.jpg",
  "/tcgplayground/dm24sp2-009.jpg",
  "/tcgplayground/dm24sp2-009.jpg",
  "/tcgplayground/dm24sp2-009.jpg",
  "/tcgplayground/dm23ex3-008.jpg",
  "/tcgplayground/dm23ex3-008.jpg",
  "/tcgplayground/dm24sp2-002.jpg",
  "/tcgplayground/dm24sp2-002.jpg",
  "/tcgplayground/dm24sp2-002.jpg",
  "/tcgplayground/dm23ex3-002.jpg",
  "/tcgplayground/dm23ex3-002.jpg",
  "/tcgplayground/dm23ex3-002.jpg",
  "/tcgplayground/dm23ex3-002.jpg",
  "/tcgplayground/dm24sp2-003.jpg",
  "/tcgplayground/dm24sp2-003.jpg",
  "/tcgplayground/dm24sp2-003.jpg",
  "/tcgplayground/dm24sp2-003.jpg",
  "/tcgplayground/dm24sp2-001.jpg",
  "/tcgplayground/dm24sp2-001.jpg",
  "/tcgplayground/dm24sp2-001.jpg",
];

const initialize = () => {
  const deck = shuffleArray(sampleDeck);
  setGameState({
    field: [],
    lands: [],
    graveyard: [makeStack({ cards: [] })],
    hand: deck.splice(0, 5).map(src => makeStack({ cards: [src] })),
    shields: deck.splice(0, 5).map(src => makeStack({ cards: [src], flipped: true })),
    deck: [makeStack({ cards: deck, flipped: true })],
    grdeck: [],
    exdeck: [],
    exploring: [],
  });
};

const App = () => {
  useEffect(() => initialize(), []);
  return (
    <>
      <FloatingButtons>
        <Button onClick={undo} disabled={!getUndoState()}>
          一手戻す
        </Button>
        <Button onClick={redo} disabled={!getRedoState()}>
          一手進む
        </Button>
        <Button onClick={() => untapAll(["field", "lands"])}>
          アンタップ
        </Button>
        <Button onClick={initialize}>
          リセット
        </Button>
      </FloatingButtons>
      <Playground {...configurations} />
    </>
  );
};

const div = document.getElementById("dmplayground")!;
document.body.append(div);

render(<App />, div)

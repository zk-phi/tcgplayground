import { render } from "preact";
import { useEffect } from "preact/hooks";
import * as configurations from "../configurations.js";

import { stack, setGameState, untapAll } from "../../../states/game.js";
import { shuffle as shuffleArray } from "../../../utils/array.js";

import { Playground } from "../../../Playground";
import { FloatingButtons } from "../../../components/FloatingButtons";
import { Button } from "../../../components/Button";

import "../../../styles.min.css";
import "./style.css";
import { enableDragDropTouch } from "drag-drop-touch/dist/drag-drop-touch.esm.min.js";

enableDragDropTouch(undefined, undefined, {
  pressHoldDelayMS: 0,
  contextMenuDelayMS: 400,
});

const sampleDeck = [
  "/dmplayground/dm24sp2-013.jpg",
  "/dmplayground/dm24sp2-013.jpg",
  "/dmplayground/dm24sp2-013.jpg",
  "/dmplayground/dm24sp2-013.jpg",
  "/dmplayground/dm23bd5-060.jpg",
  "/dmplayground/dm23bd5-060.jpg",
  "/dmplayground/dm23bd5-060.jpg",
  "/dmplayground/dm23bd5-060.jpg",
  "/dmplayground/dm24sp2-010.jpg",
  "/dmplayground/dm24sp2-010.jpg",
  "/dmplayground/dm24sp2-010.jpg",
  "/dmplayground/dm24sp2-010.jpg",
  "/dmplayground/dm23ex3-030.jpg",
  "/dmplayground/dm23ex3-030.jpg",
  "/dmplayground/dm23ex3-030.jpg",
  "/dmplayground/dm23ex3-030.jpg",
  "/dmplayground/dm23ex3-029.jpg",
  "/dmplayground/dm23ex3-029.jpg",
  "/dmplayground/dm23ex3-029.jpg",
  "/dmplayground/dm23ex3-029.jpg",
  "/dmplayground/dm24sp2-009.jpg",
  "/dmplayground/dm24sp2-009.jpg",
  "/dmplayground/dm24sp2-009.jpg",
  "/dmplayground/dm24sp2-009.jpg",
  "/dmplayground/dm23ex3-008.jpg",
  "/dmplayground/dm23ex3-008.jpg",
  "/dmplayground/dm24sp2-002.jpg",
  "/dmplayground/dm24sp2-002.jpg",
  "/dmplayground/dm24sp2-002.jpg",
  "/dmplayground/dm23ex3-002.jpg",
  "/dmplayground/dm23ex3-002.jpg",
  "/dmplayground/dm23ex3-002.jpg",
  "/dmplayground/dm23ex3-002.jpg",
  "/dmplayground/dm24sp2-003.jpg",
  "/dmplayground/dm24sp2-003.jpg",
  "/dmplayground/dm24sp2-003.jpg",
  "/dmplayground/dm24sp2-003.jpg",
  "/dmplayground/dm24sp2-001.jpg",
  "/dmplayground/dm24sp2-001.jpg",
  "/dmplayground/dm24sp2-001.jpg",
];

const initialize = () => {
  const deck = shuffleArray(sampleDeck);
  setGameState({
    field: [],
    lands: [],
    graveyard: [stack({ cards: [] })],
    hand: deck.splice(0, 5).map(src => stack({ cards: [src] })),
    shields: deck.splice(0, 5).map(src => stack({ cards: [src], flipped: true })),
    deck: [stack({ cards: deck, flipped: true })],
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
        <Button onClick={() => untapAll(["field", "lands"])}>
          アンタップ
        </Button>
        <Button onClick={initialize}>
          リセット
        </Button>
      </FloatingButtons>
      <Playground initialize={initialize} {...configurations} />
    </>
  );
};

const div = document.getElementById("dmplayground");
document.body.append(div);

render(<App />, div)

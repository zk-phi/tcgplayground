import { render } from "preact";
import type { CSSProperties } from "preact/compat";
import { useState, useEffect } from "preact/hooks";
import { configurations } from "../configurations";

import {
  makeStack, setGameState, untapAll,
  undo, redo, getUndoState, getRedoState,
} from "../../../playground/states/game";
import { shuffle as shuffleArray } from "../../../playground/utils/array";

import { Playground } from "../../../playground/Playground";
import { FloatingButtons } from "../../../playground/components/FloatingButtons";
import { Button } from "../../../playground/components/Button";

/* CSS-in-JS frameworks may interfere with the Deckmaker,
 * so we manually inject raw CSS string into a plain style-tag */
import styles from "../../../playground/styles.min.css?raw";

const extractSrcs = (classname: string) => {
  const elements = document.getElementsByClassName(classname)?.[0]?.children;
  // @ts-ignore
  const thumbs = Array.from(elements ?? []).map(el => el?.children?.[0]?.src ?? "");
  return thumbs.map(thumb => thumb.replace("/s/", "/"));
}

const initialize = () => {
  const deck = shuffleArray(extractSrcs("MainCards"));
  const grdeck = extractSrcs("GRCardsList");
  const exdeck = extractSrcs("HyperspatialCardsList");
  setGameState({
    field: [],
    lands: [],
    graveyard: [makeStack({ cards: [] })],
    hand: deck.splice(0, 5).map(src => makeStack({ cards: [src] })),
    shields: deck.splice(0, 5).map(src => makeStack({ cards: [src], flipped: true })),
    deck: [makeStack({ cards: deck, flipped: true })],
    grdeck: grdeck.length > 0 ? [makeStack({ cards: grdeck, flipped: true })] : [],
    exdeck: exdeck.length > 0 ? [makeStack({ cards: exdeck })] : [],
    exploring: [],
  });
};

const FloatingMenu = ({ show, setShow }: {
  show: boolean,
  setShow: (show: boolean) => void,
}) => (
  <FloatingButtons>
    {show && (
      <>
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
      </>
    )}
    <Button onClick={() => setShow(!show)}>
      {show ? "閉じる" : "開く"}
    </Button>
  </FloatingButtons>
);

const backgroundStyles: CSSProperties = {
  position: "fixed",
  zIndex: 99999,
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  margin: 0,
  boxSizing: "border-box",
  background: "#222",
};

const containerStyles: CSSProperties = {
  padding: "12px",
  maxWidth: "960px",
  margin: "auto",
};

const App = () => {
  const [show, setShow] = useState(true);
  useEffect(() => initialize(), []);

  return (
    <>
      <FloatingMenu show={show} setShow={setShow} />
      {show && (
        <div style={backgroundStyles}>
          <div style={containerStyles}>
            <Playground {...configurations} />
          </div>
        </div>
      )}
    </>
  );
};

const div = document.createElement("div");
document.body.append(div);

const style = document.createElement("style");
style.innerHTML = styles;
document.head.append(style);

render(<App />, div)

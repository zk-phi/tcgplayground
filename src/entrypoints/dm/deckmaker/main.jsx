import { render } from "preact";
import { useState, useEffect } from "preact/hooks";
import * as configurations from "../configurations.js";

import { stack, setGameState, untapAll } from "../../../states/game.js";
import { shuffle as shuffleArray } from "../../../utils/array.js";

import { Playground } from "../../../Playground";
import { Button } from "../../../components/Button";
import styles from "../../../styles.min.css?raw";

const extractSrcs = (classname) => {
  const elements = document.getElementsByClassName(classname)?.[0]?.children;
  return Array.from(elements ?? []).map(el => el?.children?.[0]?.src ?? "");
}

const initialize = () => {
  const deck = shuffleArray(extractSrcs("MainCards"));
  const grdeck = extractSrcs("GRCardsList");
  const exdeck = extractSrcs("HyperspatialCardsList");
  setGameState({
    field: [],
    lands: [],
    graveyard: [stack({ cards: [] })],
    hand: deck.splice(0, 5).map(src => stack({ cards: [src] })),
    shields: deck.splice(0, 5).map(src => stack({ cards: [src], flipped: true })),
    deck: [stack({ cards: deck, flipped: true })],
    grdeck: grdeck.length ? [stack({ cards: grdeck, flipped: true })] : [],
    exdeck: exdeck.length ? [stack({ cards: exdeck })] : [],
    exploring: [],
  });
};

const floatingMenuStyles = {
  display: "flex",
  gap: "8px",
  position: "fixed",
  top: "8px",
  right: "8px",
  zIndex: 100000,
};

const FloatingMenu = ({ show, setShow }) => (
  <div style={floatingMenuStyles}>
    {show && (
      <>
        <Button onClick={() => untapAll(["field", "lands"])}>
          アンタップ
        </Button>
        <Button onClick={initialize}>
          リセット
        </Button>
      </>
    )}
    <Button onClick={() => setShow(show => !show)}>
      {show ? "閉じる" : "開く"}
    </Button>
  </div>
);

const containerStyles = {
  position: "fixed",
  zIndex: 99999,
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  padding: "20px 3vw",
  margin: 0,
  boxSizing: "border-box",
  background: "#222",
};

const App = () => {
  const [show, setShow] = useState(true);
  useEffect(() => initialize(), []);

  return (
    <>
      <FloatingMenu show={show} setShow={setShow} />
      {show && (
        <div style={containerStyles}>
          <Playground initialize={initialize} {...configurations} />
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

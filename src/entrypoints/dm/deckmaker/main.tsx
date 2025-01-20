import { render } from "preact";
import type { CSSProperties } from "preact/compat";
import { useState, useEffect } from "preact/hooks";
import * as configurations from "../configurations";

import { makeStack, setGameState, untapAll } from "../../../states/game";
import { shuffle as shuffleArray } from "../../../utils/array";

import { Playground } from "../../../Playground";
import { FloatingButtons } from "../../../components/FloatingButtons";
import { Button } from "../../../components/Button";
import styles from "../../../styles.min.css?raw";

const extractSrcs = (classname: string) => {
  const elements = document.getElementsByClassName(classname)?.[0]?.children;
  // @ts-ignore
  return Array.from(elements ?? []).map(el => el?.children?.[0]?.src ?? "");
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
    grdeck: grdeck.length ? [makeStack({ cards: grdeck, flipped: true })] : [],
    exdeck: exdeck.length ? [makeStack({ cards: exdeck })] : [],
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

const containerStyles: CSSProperties = {
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
          <Playground {...configurations} />
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

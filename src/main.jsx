import { render, h } from "preact";
import * as configurations from "./configurations/dm.js";
import { App } from "./components/App.jsx";
import styles from "./styles.min.css?raw";

/* TODO: Add stand-alone deck-builder */
/* TODO: Better layouting for large screens */
/* TODO: Support touch devices */

const div = document.createElement("div");
div.id = "dmplayground";
Object.assign(div.style, {
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
});
document.body.append(div);

const style = document.createElement("style");
style.innerHTML = styles;
document.head.append(style);

render(<App {...configurations} />, div)

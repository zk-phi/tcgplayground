import { render, h } from "preact";
import { setup, css } from "goober";
import { App } from "./app.jsx";

setup(h);

const div = document.createElement("div");
document.body.append(div);

div.classList.add(css({
  position: "fixed",
  zIndex: 99999,
  width: "100vw",
  height: "100vh",
  top: 0,
  left: 0,
  background: "white",
}));

render(<App />, div)

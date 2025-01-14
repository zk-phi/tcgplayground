import { render, h } from "preact";
import { App } from "./app.jsx";
import styles from "./styles.min.css?raw";

const div = document.createElement("div");
div.id = "dmplayground";
document.body.append(div);

const style = document.createElement("style");
style.innerHTML = styles;
document.head.append(style);

render(<App />, div)

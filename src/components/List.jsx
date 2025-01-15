import { signal, computed } from "@preact/signals";
import { state } from "../state.js";
import { CardStack } from "./CardStack.jsx";
import { closeMenu } from "./Menu.jsx"

const list = signal(null);

export const showList = (e, src, ix, handler) => {
  list.value = { src, ix, handler };

  /* Prevent event bubbling that closes the list immediately */
  e.stopPropagation();
  /* ... but close menu instead */
  closeMenu();
};

export const closeList = () => {
  list.value = null;
};

export const List = () => list.value && (
  <div class="dmpg-list-container" onClick={(e) => e.stopPropagation()}>
    {state.value[list.value.src][list.value.ix].cards.map((card, ix) => (
      <CardStack
          stack={{ cards: [card] }}
          onClick={list.value.handler && ((e) => list.value.handler(e, ix))}
      />
    ))}
  </div>
);

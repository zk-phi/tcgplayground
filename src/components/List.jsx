import { signal } from "@preact/signals";
import { state } from "../state.js";
import { Overlay } from "./Overlay.jsx";
import { CardStack } from "./CardStack.jsx";
import { closeMenu } from "./Menu.jsx"

const list = signal(null);

export const showList = (e, area, ix, handlers) => {
  list.value = { area, ix, handlers };

  /* Prevent event bubbling that closes the list immediately */
  e.stopPropagation();
  /* ... but the menu should be closed */
  closeMenu();
};

export const closeList = () => {
  list.value = null;
};

export const List = () => {
  const cards = list.value && state.value[list.value.area][list.value.ix].cards;

  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <Overlay onClick={() => closeList()}>
      <div class="dmpg-list-container" onClick={e => { closeMenu(); e.stopPropagation(); }}>
        {state.value[list.value.area][list.value.ix].cards.map((card, j) => (
          <CardStack stack={{ cards: [card] }} {...list.value.handlers(j)} />
        ))}
      </div>
    </Overlay>
  );
};

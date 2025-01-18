import { signal, computed } from "@preact/signals";
import { gameState } from "../states/game.js";
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

/* ---- */

const onClickOverlay = () => {
  closeList();
};

const onClickContainer = e => {
  closeMenu();
  e.stopPropagation();
};

const cards = computed(() => (
  list.value ? gameState.value[list.value.area][list.value.ix].cards : []
));

export const List = () => cards.value.length > 0 && (
  <Overlay onClick={onClickOverlay}>
    <div class="dmpg-list-container" onClick={onClickContainer}>
      {cards.value.map((card, j) => (
        <CardStack stack={{ cards: [card] }} {...list.value.handlers(j)} />
      ))}
    </div>
  </Overlay>
);

import { signal, computed } from "@preact/signals";
import { globalDragEndHooks } from "../hooks.js";
import { gameState } from "./game.js";
import { closeMenu } from "./menu.js";

const list = signal(null);

export const showList = (e, area, ix, handlers) => {
  list.value = { area, ix, handlers };

  /* Prevent browser from showing the default context menu */
  e.preventDefault();
  /* Prevent event bubbling that closes the list immediately */
  e.stopPropagation();
  /* ... but the menu should be closed */
  closeMenu();
};

export const closeList = () => {
  list.value = null;
};

export const getListProps = () => ({
  onClose: closeList,
  cards: list.value ? gameState.value[list.value.area][list.value.ix].cards : [],
  handlers: list.value?.handlers,
});

globalDragEndHooks.push(closeList);

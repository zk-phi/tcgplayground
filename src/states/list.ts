import { signal } from "@preact/signals";
import { getStack } from "./game";
import { closeMenu } from "./menu";

type ListState = {
  area: string,
  ix: number,
  handlers: IndexedHandlers,
};

export type ListProps = {
  onClose: () => void,
  cards: string[],
  handlers: IndexedHandlers,
};

const list = signal<ListState | null>(null);

export const showList = (
  e: MouseEvent,
  area: string,
  ix: number,
  handlers: IndexedHandlers,
) => {
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

export const getListProps = (): ListProps => ({
  onClose: closeList,
  cards: list.value ? getStack(list.value.area, list.value.ix).cards : [],
  handlers: list.value?.handlers ?? (() => ({})),
});

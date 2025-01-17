import { signal } from "@preact/signals";

export const selection = signal(null);

export const select = (area, ix, handler) => {
  selection.value = {
    area,
    ix,
    handler: (dest, di) => {
      unselect();
      handler(area, ix, dest, di);
    },
  };
};

export const selectSingle = (area, ix, j, handler) => {
  selection.value = {
    area,
    ix,
    handler: (dest, di) => {
      unselect();
      handler(area, ix, j, dest, di);
    },
  };
};

export const unselect = () => {
  selection.value = null;
};

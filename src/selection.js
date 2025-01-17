import { signal } from "@preact/signals";

export const selection = signal(null);

export const select = (src, si, handler) => {
  selection.value = {
    src,
    si,
    handler: (dest, di) => {
      unselect();
      handler(src, si, dest, di);
    },
  };
};

export const selectSingle = (src, si, j, handler) => {
  selection.value = {
    src,
    si,
    handler: (dest, di) => {
      unselect();
      handler(src, si, j, dest, di);
    },
  };
};

export const unselect = () => {
  selection.value = null;
};

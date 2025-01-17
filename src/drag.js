import { signal } from "@preact/signals";
import { move, moveSingle, unshift, push, unshiftSingle, pushSingle } from "./state.js";

export const dragging = signal(null);

export const drag = (area, ix, handler) => {
  dragging.value = { area, ix, handler };
};

export const dragStop = () => {
  dragging.value = null;
};

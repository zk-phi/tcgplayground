import { signal } from "@preact/signals";
import { globalDragEndHooks } from "../hooks";
import { closeMenu } from "./menu";

export const dragging = signal(null);

/* start dragging from (AREA, IX) */
export const drag = (area, ix, handler) => {
  dragging.value = { handler, src: { area, ix }, dest: null };
};

/* finish dragging */
export const dragStop = () => {
  dragging.value = null;
};

/* generate a set of handlers for droppable elements */
export const dropHandlers = (area, ix) => ({
  onDragEnter: e => {
    if (!dragging.value) return;
    dragging.value = { ...dragging.value, dest: { area, ix } };
    e.stopPropagation();
  },
  onDragLeave: e => {
    if (!dragging.value) return;
    const { dest } = dragging.value;
    if (dest.area === area && dest.ix === ix) {
      dragging.value = { ...dragging.value, dest: null };
    }
    e.stopPropagation();
  },
  onDragOver: e => {
    if (!dragging.value) return;
    e.preventDefault();
  },
  onDrop: e => {
    if (!dragging.value) return;
    const { dest, src } = dragging.value;
    /* cancel if src and dest is the same */
    if (src.area !== dest.area || src.ix !== dest.ix) {
      dragging.value.handler(e, dest.area, dest.ix);
    }
    dragStop();
    e.stopPropagation();
  },
});

/* generate a set of handlers for draggable elements */
export const dragHandlers = (area, ix, handler) => ({
  draggable: true,
  onDragStart: e => {
    closeMenu();
    drag(area, ix, handler);
    e.stopPropagation();
  },
});

/* query if (AREA, IX) is selected */
export const getIsSelected = (area, ix) => dragging.value?.src && (
  dragging.value.src.area === area && dragging.value.src.ix === ix
);

/* query if (AREA, IX) is targetted */
export const getIsTargetted = (area, ix) => dragging.value?.dest && (
  dragging.value.dest.area === area && dragging.value.dest.ix === ix
);

globalDragEndHooks.push(dragStop);

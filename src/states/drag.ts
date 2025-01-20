import { signal } from "@preact/signals";
import { globalDragEndHooks } from "../hooks";
import { closeMenu } from "./menu";

type DragHandler = (e: MouseEvent, area: string, ix: number | null) => void;

type DragState = {
  handler: DragHandler,
  src: { area: string, ix: number | null },
  dest: { area: string, ix: number | null } | null,
};

export const dragging = signal<DragState | null>(null);

/* start dragging from (AREA, IX) */
export const drag = (area: string, ix: number | null, handler: DragHandler) => {
  dragging.value = { handler, src: { area, ix }, dest: null };
};

/* finish dragging */
export const dragStop = () => {
  dragging.value = null;
};

/* generate a set of handlers for droppable elements */
export const dropHandlers = (area: string, ix: number | null) => ({
  onDragEnter: (e: MouseEvent) => {
    if (!dragging.value) return;
    dragging.value = { ...dragging.value, dest: { area, ix } };
    e.stopPropagation();
  },
  onDragLeave: (e: MouseEvent) => {
    if (!dragging.value) return;
    const { dest } = dragging.value;
    if (dest && dest.area === area && dest.ix === ix) {
      dragging.value = { ...dragging.value, dest: null };
    }
    e.stopPropagation();
  },
  onDragOver: (e: MouseEvent) => {
    if (!dragging.value) return;
    e.preventDefault();
  },
  onDrop: (e: MouseEvent) => {
    if (!dragging.value) return;
    const { dest, src } = dragging.value;
    /* cancel if src and dest is the same */
    if (dest && (src.area !== dest.area || src.ix !== dest.ix)) {
      dragging.value.handler(e, dest.area, dest.ix);
    }
    dragStop();
    e.stopPropagation();
  },
});

/* generate a set of handlers for draggable elements */
export const dragHandlers = (area: string, ix: number | null, handler: DragHandler) => ({
  draggable: true,
  onDragStart: (e: MouseEvent) => {
    closeMenu();
    drag(area, ix, handler);
    e.stopPropagation();
  },
});

/* query if (AREA, IX) is selected */
export const getIsSelected = (area: string, ix: number | null): boolean => (
  !!dragging.value?.src && (
    dragging.value.src.area === area && dragging.value.src.ix === ix
  )
);

/* query if (AREA, IX) is targetted */
export const getIsTargetted = (area: string, ix: number | null): boolean => (
  !!dragging.value?.dest && (
    dragging.value.dest.area === area && dragging.value.dest.ix === ix
  )
);

globalDragEndHooks.push(dragStop);

import { enableDragDropTouch } from "drag-drop-touch/dist/drag-drop-touch.esm.min.js";

enableDragDropTouch(undefined, undefined, {
  allowDragScroll: false,
  /* more permissive to drift before fireing the oncontextmenu event */
  dragThresholdPixels: 32,
});

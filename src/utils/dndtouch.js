import { enableDragDropTouch } from "drag-drop-touch/dist/drag-drop-touch.esm.min.js";

enableDragDropTouch(undefined, undefined, {
  contextMenuDelayMS: 300,
  /* more permissive to drift before fireing the oncontextmenu event */
  dragThresholdPixels: 32,
});

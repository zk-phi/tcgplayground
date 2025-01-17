import { useState } from "preact/hooks";
import { dragging, dragStop } from "../drag.js";

export const Area = ({ name, label, children, width, nogrow, onDrop }) => {
  const [dropReady, setDropReady] = useState(false);

  const style = {
    width: width == null ? undefined : `calc(var(--dmpg-card-width) * ${width})`,
    flexGrow: (width || nogrow) ? 0 : 1,
    background: dropReady ? "#0ff8" : undefined,
  };

  const droppable = name != null;
  const handlers = {
    onDragEnter: !droppable || !dragging.value ? null : (e => {
      setDropReady(true);
      e.stopPropagation();
    }),
    onDragLeave: !droppable || !dragging.value ? null : (e => {
      setDropReady(false);
      e.stopPropagation();
    }),
    onDragOver: !droppable || !dragging.value ? null : (e => {
      e.preventDefault();
      e.stopPropagation();
    }),
    onDrop: !droppable || !dragging.value ? null : (e => {
      dragging.value.handler(e, name);
      setDropReady(false);
      e.stopPropagation();
    }),
  };

  return (
    <div class="dmpg-area" style={style} {...handlers}>
      {children}
      <span class="dmpg-area-label">{label}</span>
    </div>
  );
};

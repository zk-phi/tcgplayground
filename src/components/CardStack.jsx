import { useCallback, useState, useRef } from "preact/hooks";
import { drag, dragStop, dragging } from "../drag.js";
import { closeMenu } from "./Menu.jsx";

export const CardStack = ({ stack, onClick, onContextMenu, onDrag, area, ix }) => {
  const [isDragDest, setIsDragDest] = useState(false);

  const angle = (
    (stack.tapped ? -30 : 0) + (stack.reversed ? 180 : 0) + (stack.laid ? -90 : 0)
  );

  const containerStyles = stack.cards.length === 0 ? null : {
    backgroundImage: `url(${stack.cards[0]})`,
    transform: `rotate(${angle}deg)`,
  };

  const { area: dragArea, ix: dragIx } = dragging?.value ?? {};
  const isDragSrc = (dragArea && dragIx) != null && (dragArea === area && dragIx === ix);

  const innerColor = isDragSrc ? (
    "#ff08"
  ) : isDragDest ? (
    "#0ff8"
  ) : stack.cards.length > 0 && stack.flipped ? (
    "#006"
  ) : (
    "transparent"
  );

  const handlers = {
    onDragStart: e => {
      closeMenu();
      drag(area, ix, onDrag);
    },
    onDragEnter: dragging.value && (e => {
      if (dragging.value.area !== area || dragging.value.ix !== ix) {
        setIsDragDest(true);
      }
      e.stopPropagation();
    }),
    onDragLeave: dragging.value && (e => {
      setIsDragDest(false);
      e.stopPropagation();
    }),
    onDragOver: dragging.value && (e => {
      e.preventDefault();
    }),
    onDrop: dragging.value && (e => {
      if (dragging.value.area !== area || dragging.value.ix !== ix) {
        dragging.value.handler(e, area, ix);
      }
      setIsDragDest(false);
      e.stopPropagation();
    }),
    onClick,
    onContextMenu,
  };

  return (
    <div
        class="dmpg-card-container"
        style={containerStyles}
        draggable={!!onDrag}
        {...handlers}>
      <div class="dmpg-card-inner" style={{ background: innerColor }}>
        {stack.cards.length > 1 && (
          <div
              class="dmpg-card-counter"
              style={{ color: stack.flipped ? "white" : "black" }}>
            {stack.flipped ? stack.cards.length : `+${stack.cards.length - 1}`}
          </div>
        )}
      </div>
    </div>
  );
};

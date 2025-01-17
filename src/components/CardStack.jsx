import { useCallback, useState, useRef } from "preact/hooks";
import { drag, dragStop, dragging } from "../drag.js";
import { closeMenu } from "./Menu.jsx";
import { closeList } from "./List.jsx";

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
  const isDragSrc = dragging.value && (dragArea === area && dragIx === ix);

  const innerColor = isDragSrc ? (
    "#ff08"
  ) : isDragDest ? (
    "#0ff8"
  ) : stack.cards.length > 0 && stack.flipped ? (
    "#006"
  ) : (
    "transparent"
  );

  const droppable = area != null && ix != null;
  const handlers = {
    onDragStart: e => {
      closeMenu();
      closeList();
      drag(area, ix, onDrag);
    },
    onDragEnter: !droppable || !dragging.value ? null : (e => {
      if (dragging.value.area !== area || dragging.value.ix !== ix) {
        setIsDragDest(true);
      }
      e.stopPropagation();
    }),
    onDragLeave: !droppable || !dragging.value ? null : (e => {
      setIsDragDest(false);
      e.stopPropagation();
    }),
    onDragOver: !droppable || !dragging.value ? null : (e => {
      e.preventDefault();
    }),
    onDrop: !droppable || !dragging.value ? null : (e => {
      /* cancel if src and dest is the same */
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

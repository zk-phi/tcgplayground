import { useCallback, useState, useRef } from "preact/hooks";
import { selection, unselect } from "../selection.js";
import { drag, dragStop, dragging } from "../drag.js";
import { closeMenu } from "./Menu.jsx";

export const CardStack = ({ stack, onClick, onContextMenu, onDrag, area, ix }) => {
  const [dropReady, setDropReady] = useState(false);

  const angle = (
    (stack.tapped ? -30 : 0) + (stack.reversed ? 180 : 0) + (stack.laid ? -90 : 0)
  );

  const containerStyles = stack.cards.length === 0 ? null : {
    backgroundImage: `url(${stack.cards[0]})`,
    transform: `rotate(${angle}deg)`,
  };

  const { area: selectedArea, ix: selectedIx } = selection?.value ?? dragging?.value ?? {};
  const selected = (selectedArea && selectedIx) != null && (
    selectedArea === area && selectedIx === ix
  );

  const innerColor = selected ? (
    "#ff08"
  ) : dropReady ? (
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
        setDropReady(true);
      }
      e.stopPropagation();
    }),
    onDragLeave: dragging.value && (e => {
      setDropReady(false);
      e.stopPropagation();
    }),
    onDragOver: dragging.value && (e => {
      e.preventDefault();
    }),
    onDrop: dragging.value && (e => {
      if (dragging.value.area !== area || dragging.value.ix !== ix) {
        dragging.value.handler(e, area, ix);
      }
      setDropReady(false);
      e.stopPropagation();
    }),
    onClick: !selection.value ? onClick : () => {
      const { area: src, ix: si, handler } = selection?.value;
      if (src === area && si === ix) {
        unselect();
      } else {
        handler?.(area, ix);
      }
    },
    onContextMenu: !selection.value && onContextMenu,
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

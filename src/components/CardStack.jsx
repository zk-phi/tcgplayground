import { useCallback } from "preact/hooks";
import { selection, unselect } from "../selection.js";

export const CardStack = ({ stack, onClick, onContextMenu, area, ix }) => {
  const angle = (
    (stack.tapped ? -30 : 0) + (stack.reversed ? 180 : 0) + (stack.laid ? -90 : 0)
  );

  const containerStyles = stack.cards.length === 0 ? null : {
    backgroundImage: `url(${stack.cards[0]})`,
    transform: `rotate(${angle}deg)`,
  };

  const selected = selection.value && (
    selection?.value?.src === area && selection?.value?.si === ix
  );

  const innerColor = stack.cards.length > 0 && stack.flipped ? (
    "#006"
  ) : selected ? (
    "#ff08"
  ) : (
    "transparent"
  );

  const modalOnClick = useCallback(() => {
    const { src, si, handler } = selection?.value;
    if (src === area && si === ix) {
      unselect();
    } else {
      handler?.(area, ix);
    }
  }, [area, ix]);

  return (
    <div class="dmpg-card-container" style={containerStyles}>
      {stack.cards.length > 0 && (
        <div
            class="dmpg-card-inner"
            style={{ background: innerColor }}
            onClick={selection.value ? modalOnClick : onClick}
            onContextMenu={selection.value ? null : onContextMenu}>
          {stack.cards.length > 1 && (
            <div
                class="dmpg-card-counter"
                style={{ color: stack.flipped ? "white" : "black" }}>
              {stack.flipped ? stack.cards.length : `+${stack.cards.length - 1}`}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

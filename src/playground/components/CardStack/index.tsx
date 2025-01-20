import type { CSSProperties } from "preact/compat";

export const CardStack = ({ stack, isSelected, isTargetted, style = {}, ...handlers }: {
  stack: Stack,
  isSelected?: boolean,
  isTargetted?: boolean,
  style?: CSSProperties,
} & Handlers) => {
  const angle = (
    (stack.tapped ? -30 : 0) + (stack.reversed ? 180 : 0) + (stack.laid ? -90 : 0)
  );

  const containerStyles = stack.cards.length === 0 ? {
    pointerEvents: "none",
  } : {
    ...style,
    backgroundImage: `url(${stack.cards[0]})`,
    transform: `rotate(${angle}deg)`,
  };

  const extraClass = isSelected ? (
    "tcgpg-selected"
  ) : isTargetted ? (
    "tcgpg-targetted"
  ) : stack.cards.length <= 0 ? (
    "tcgpg-empty"
  ) : stack.cards.length > 0 && stack.flipped ? (
    "tcgpg-flipped"
  ) : (
    "tcgpg-nonempty"
  );

  return (
    <div class="tcgpg-card-container" style={containerStyles} {...handlers}>
      <div class={`tcgpg-card-inner ${extraClass}`}>
        {stack.cards.length > 1 && (
          <div class={`tcgpg-card-counter ${stack.flipped ? 'tcgpg-flipped' : ''}`}>
            {stack.flipped ? stack.cards.length : `+${stack.cards.length - 1}`}
          </div>
        )}
      </div>
    </div>
  );
};

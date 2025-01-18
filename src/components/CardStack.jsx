export const CardStack = ({ stack, isSelected, isTargetted, ...props }) => {
  const angle = (
    (stack.tapped ? -30 : 0) + (stack.reversed ? 180 : 0) + (stack.laid ? -90 : 0)
  );

  const containerStyles = stack.cards.length === 0 ? null : {
    backgroundImage: `url(${stack.cards[0]})`,
    transform: `rotate(${angle}deg)`,
  };

  const innerColor = isSelected ? (
    "#ff08"
  ) : isTargetted ? (
    "#0ff8"
  ) : stack.cards.length > 0 && stack.flipped ? (
    "#006"
  ) : (
    "transparent"
  );

  const counterColor = stack.flipped ? "white" : "black";

  return (
    <div class="dmpg-card-container" style={containerStyles} {...props}>
      <div class="dmpg-card-inner" style={{ background: innerColor }}>
        {stack.cards.length > 1 && (
          <div class="dmpg-card-counter" style={{ color: counterColor }}>
            {stack.flipped ? stack.cards.length : `+${stack.cards.length - 1}`}
          </div>
        )}
      </div>
    </div>
  );
};

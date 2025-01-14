export const CardStack = ({ stack, onClick, onContextMenu }) => {
  const angle = (
    (stack.tapped ? -30 : 0) + (stack.reversed ? 180 : 0) + (stack.laid ? -90 : 0)
  );

  const container = stack.cards.length === 0 ? null : {
    backgroundImage: `url(${stack.cards[0]})`,
    transform: `rotate(${angle}deg)`,
  };

  const inner = {
    background: stack.cards.length > 0 && stack.flipped ? "#006" : "transparent",
    cursor: "pointer",
  };

  return (
    <div class="dmpg-card-container" style={container}>
      {stack.cards.length > 0 && (
        <div class="dmpg-card-inner" style={inner} onClick={onClick} onContextMenu={onContextMenu}>
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

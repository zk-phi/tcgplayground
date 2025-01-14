import { css } from "goober";
import { CARD_SIZE } from "../constants.js";

const cardContainerStyle = css({
  display: "inline-flex",
  width: `${CARD_SIZE.w + CARD_SIZE.gap * 2}px`,
  height: `${CARD_SIZE.h}px`,
  justifyContent: "center",
  alignItems: "center",
  backgroundSize: "cover",
});

const cardInnerStyle = css({
  position: "relative",
  display: "inline-flex",
  width: `${CARD_SIZE.w - CARD_SIZE.padding * 2}px`,
  height: `${CARD_SIZE.h - CARD_SIZE.padding * 2}px`,
  borderRadius: `${CARD_SIZE.radius}px`,
  alignItems: "flex-end",
  justifyContent: "flex-end",
  "&:hover": {
    opacity: 0.6,
  },
});

const counterStyle = css({
  display: "inline-block",
  padding: "2px 6px",
  background: "#aaac",
  borderRadius: `${CARD_SIZE.radius}px`,
  fontSize: "14px",
});

export const CardStack = ({ stack, onClick }) => {
  const angle = (
    (stack.tapped ? -30 : 0) + (stack.reversed ? 180 : 0) + (stack.laid ? -90 : 0)
  );

  const containerExtraStyle = stack.cards.length === 0 ? null : {
    backgroundImage: `url(${stack.cards[0]})`,
    transform: `rotate(${angle}deg)`,
  };

  const innerExtraStyle = {
    background: stack.cards.length > 0 && stack.flipped ? "#006" : "transparent",
    cursor: "pointer",
  };

  return (
    <div class={cardContainerStyle} style={containerExtraStyle}>
      {stack.cards.length > 0 && (
        <div class={cardInnerStyle} style={innerExtraStyle} onClick={onClick}>
          {stack.cards.length > 1 && (
            <div class={counterStyle} style={{ color: stack.flipped ? "white" : "black" }}>
              {stack.flipped ? stack.cards.length : `+${stack.cards.length - 1}`}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

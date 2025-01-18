import { Overlay } from "./Overlay.jsx";
import { CardStack } from "./CardStack.jsx";
import { globalHandlers } from "../hooks.js";

export const List = ({ cards, onClose, handlers }) => cards.length > 0 && (
  <Overlay onClick={onClose}>
    <div class="dmpg-list-container" {...globalHandlers}>
      {cards.map((card, j) => (
        <CardStack stack={{ cards: [card] }} {...handlers(j)} />
      ))}
    </div>
  </Overlay>
);

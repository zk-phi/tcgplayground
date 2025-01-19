import { Overlay } from "../Overlay";
import { CardStack } from "../CardStack";
import { globalHandlers } from "../../hooks";

export const List = ({ cards, onClose, handlers }) => cards.length > 0 && (
  <Overlay onClick={onClose}>
    <div class="dmpg-list-container" {...globalHandlers}>
      {cards.map((card, j) => (
        <CardStack stack={{ cards: [card] }} {...handlers(j)} />
      ))}
    </div>
  </Overlay>
);

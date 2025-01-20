import type { ListProps } from "../../states/list";
import { makeStack } from "../../states/game";
import { Overlay } from "../Overlay";
import { CardStack } from "../CardStack";
import { globalHandlers } from "../../hooks";

export const List = ({ cards, onClose, handlers }: ListProps) => cards.length > 0 && (
  <Overlay onClick={onClose}>
    <div class="tcgpg-list-container" {...globalHandlers}>
      {cards.map((card, j) => (
        <CardStack key={card} stack={makeStack({ cards: [card] })} {...handlers(j)} />
      ))}
    </div>
  </Overlay>
);

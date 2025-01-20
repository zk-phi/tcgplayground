import type { LightboxProps } from "../../states/lightbox";
import { Overlay } from "../Overlay";

export const Lightbox = ({ onClose, src }: LightboxProps) => src && (
  <Overlay onClick={onClose}>
    <img class="tcgpg-lightbox-img" src={src} />
  </Overlay>
);

import type { LightboxProps } from "../../states/lightbox";
import { Overlay } from "../Overlay";

export const Lightbox = ({ onClose, src, laid }: LightboxProps) => src && (
  <Overlay onClick={onClose}>
    <img class={`tcgpg-lightbox-img ${laid ? 'laid' : ''}`} src={src} />
  </Overlay>
);

import { signal } from "@preact/signals";
import { closeMenu } from "./menu"

export type LightboxProps = {
  onClose: () => void,
  src: string | null,
  laid: boolean,
};

const lightbox = signal<Omit<LightboxProps, "onClose">>({ src: null, laid: false });

export const showLightbox = (e: MouseEvent, stack: Stack, ix: number) => {
  lightbox.value = { src: stack.cards[ix], laid: stack.laid };

  /* Prevent browser from showing the default context menu */
  e.preventDefault();
  /* Prevent event bubbling that closes the lightbox immediately */
  e.stopPropagation();
  /* ... but the menu should be closed */
  closeMenu();
};

export const closeLightbox = () => {
  lightbox.value = { src: null, laid: false };
};

export const getLightboxProps = (): LightboxProps => ({
  onClose: closeLightbox,
  ...lightbox.value
});

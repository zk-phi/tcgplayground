import { signal } from "@preact/signals";
import { closeMenu } from "./menu"

export type LightboxProps = {
  onClose: () => void,
  src: string | null,
};

const lightbox = signal<string | null>(null);

export const showLightbox = (e: MouseEvent, src: string) => {
  lightbox.value = src;

  /* Prevent browser from showing the default context menu */
  e.preventDefault();
  /* Prevent event bubbling that closes the lightbox immediately */
  e.stopPropagation();
  /* ... but the menu should be closed */
  closeMenu();
};

export const closeLightbox = () => {
  lightbox.value = null;
};

export const getLightboxProps = (): LightboxProps => ({
  onClose: closeLightbox,
  src: lightbox.value,
});

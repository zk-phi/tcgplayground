import { signal } from "@preact/signals";
import { closeMenu } from "./menu"

const lightbox = signal(null);

export const showLightbox = (e, src) => {
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

export const getLightboxProps = () => ({
  onClose: closeLightbox,
  src: lightbox.value,
});

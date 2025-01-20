import { signal } from "@preact/signals";
import { globalClickHooks } from "../hooks";

const menu = signal(null);

export const showMenu = (e, options) => {
  const ypos = e.clientY / window.innerHeight;
  const xpos = e.clientX / window.innerWidth;

  menu.value = {
    options,
    pos: {
      top: ypos < 0.5 ? e.clientY - 16 : null,
      left: xpos < 0.5 ? e.clientX + 12 : null,
      bottom: ypos >= 0.5 ? window.innerHeight - (e.clientY + 16) : null,
      right: xpos >= 0.5 ? window.innerWidth - (e.clientX - 12) : null,
    },
  }

  /* Prevent browser from showing the default context menu */
  e.preventDefault();
  /* Prevent event bubbling that closes the menu immediately */
  e.stopPropagation();
};

export const closeMenu = () => {
  menu.value = null;
};

export const getMenuProps = () => ({
  onClose: closeMenu,
  ...menu.value,
});

globalClickHooks.push(closeMenu);

import { signal } from "@preact/signals";

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

  e.stopPropagation();
  e.preventDefault();
};

export const closeMenu = () => {
  menu.value = null;
};

export const Menu = () => menu.value && (
  <div class="dmpg-menu-container" style={menu.value.pos}>
    {menu.value.options.map(option => (
      <div class="dmpg-menu-option" onClick={option[1]}>
        {option[0]}
      </div>
    ))}
  </div>
);

import type { ComponentChildren } from "preact";

export const Button = ({ children, disabled, ...handlers }: {
  children: ComponentChildren,
  disabled?: boolean,
} & Handlers) => (
  <button class="tcgpg-button" disabled={disabled} {...handlers}>
    {children}
  </button>
);

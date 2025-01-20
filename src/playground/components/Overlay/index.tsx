import type { ComponentChildren } from "preact";

export const Overlay = ({ children, onClick }: {
  children: ComponentChildren,
  onClick: MouseEventHandler,
}) => (
  <div class="tcgpg-overlay" onClick={onClick}>
    {children}
  </div>
);

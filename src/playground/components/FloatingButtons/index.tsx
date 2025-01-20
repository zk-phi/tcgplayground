import type { ComponentChildren } from "preact";

export const FloatingButtons = ({ children }: {
  children: ComponentChildren,
}) => (
  <div class="tcgpg-floating-buttons">
    {children}
  </div>
)

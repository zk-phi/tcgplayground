import type { ComponentChildren } from "preact";

export const FloatingButtons = ({ children }: {
  children: ComponentChildren,
}) => (
  <div class="dmpg-floating-buttons">
    {children}
  </div>
)

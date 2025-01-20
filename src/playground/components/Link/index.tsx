import type { ComponentChildren } from "preact";

export const Link = ({ href, target, children }: {
  href: string,
  target?: string,
  children: ComponentChildren,
}) => (
  <a class="tcgpg-link" href={href} target={target}>
    {children}
  </a>
)

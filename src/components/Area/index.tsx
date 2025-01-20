import type { ComponentChildren } from "preact";

export const Area = ({ label, children, width, nogrow, isSelected, isTargetted, ...handlers }: {
  label: string,
  children: ComponentChildren,
  width?: number,
  nogrow?: boolean,
  isSelected?: boolean,
  isTargetted?: boolean,
} & Handlers) => {
  const style = {
    width: width == null ? undefined : (
      `calc(var(--tcgpg-card-width) * ${width} + var(--tcgpg-card-gap) * ${width - 1})`
    ),
    flexGrow: (width || nogrow) ? 0 : 1,
  };

  const extraClass = isSelected ? (
    "tcgpg-selected"
  ) : isTargetted ? (
    "tcgpg-targetted"
  ) : (
    ""
  );

  return (
    <div class={`tcgpg-area ${extraClass}`} style={style} {...handlers}>
      {children}
      <span class="tcgpg-area-label">{label}</span>
    </div>
  );
};

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
      `calc(var(--dmpg-card-width) * ${width} + var(--dmpg-card-gap) * ${width - 1})`
    ),
    flexGrow: (width || nogrow) ? 0 : 1,
  };

  const extraClass = isSelected ? (
    "dmpg-selected"
  ) : isTargetted ? (
    "dmpg-targetted"
  ) : (
    ""
  );

  return (
    <div class={`dmpg-area ${extraClass}`} style={style} {...handlers}>
      {children}
      <span class="dmpg-area-label">{label}</span>
    </div>
  );
};

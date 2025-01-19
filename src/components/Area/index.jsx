export const Area = ({ label, children, width, nogrow, isSelected, isTargetted, ...props }) => {
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
    <div class={`dmpg-area ${extraClass}`} style={style} {...props}>
      {children}
      <span class="dmpg-area-label">{label}</span>
    </div>
  );
};

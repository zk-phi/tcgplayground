export const Area = ({ area, label, children, width, nogrow, isTargetted, ...props }) => {
  const style = {
    width: width == null ? undefined : (
      `calc(var(--dmpg-card-width) * ${width} + var(--dmpg-card-gap) * ${width - 1})`
    ),
    flexGrow: (width || nogrow) ? 0 : 1,
    background: isTargetted ? "#0ff8" : undefined,
  };

  return (
    <div class="dmpg-area" style={style} {...props}>
      {children}
      <span class="dmpg-area-label">{label}</span>
    </div>
  );
};

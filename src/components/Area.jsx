export const Area = ({ label, children, width, nogrow }) => {
  const style = {
    width: width == null ? undefined : `calc(var(--dmpg-card-width) * ${width})`,
    flexGrow: (width || nogrow) ? 0 : 1,
  };

  return (
    <div class="dmpg-area" style={style}>
      {children}
      <span class="dmpg-area-label">{label}</span>
    </div>
  );
};

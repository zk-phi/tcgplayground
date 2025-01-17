export const Area = ({ label, children, width }) => {
  const style = width == null ? null : {
    width: `calc(var(--dmpg-card-width) * ${width})`,
    flexGrow: 0,
  };

  return (
    <div class="dmpg-area" style={style}>
      {children}
      <span class="dmpg-area-label">{label}</span>
    </div>
  );
};

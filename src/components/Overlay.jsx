export const Overlay = ({ children, onClick }) => (
  <div class="dmpg-overlay" onClick={onClick}>
    {children}
  </div>
);

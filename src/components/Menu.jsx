import { useCallback } from "preact/hooks";

export const Menu = ({ onClose, pos, options }) => {
  const onClickMenu = useCallback((e, handler) => {
    handler(e);
    e.stopPropagation();
    onClose();
  }, [onClose]);

  return options && (
    <div class="dmpg-menu-container" style={pos}>
      {options.map(option => (
        <div class="dmpg-menu-option" onClick={e => onClickMenu(e, option[1])}>
          {option[0]}
        </div>
      ))}
    </div>
  );
};

import { useCallback } from "preact/hooks";
import type { MenuProps } from "../../states/menu";

export const Menu = ({ onClose, pos, options }: MenuProps) => {
  const onClickMenu = useCallback((e: MouseEvent, handler: MouseEventHandler) => {
    handler(e);
    e.stopPropagation();
    onClose();
  }, [onClose]);

  return options && (
    <div class="tcgpg-menu-container" style={pos}>
      {options.map(option => (
        <div key={option[0]} class="tcgpg-menu-option" onClick={e => onClickMenu(e, option[1])}>
          {option[0]}
        </div>
      ))}
    </div>
  );
};

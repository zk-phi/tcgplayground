import { globalHandlers } from "./hooks.js";

import { gameState } from "./states/game.js";
import { getIsSelected, getIsTargetted, dragStop } from "./states/drag.js";
import { getListProps } from "./states/list.js";
import { getMenuProps, closeMenu } from "./states/menu.js";
import { getLightboxProps } from "./states/lightbox.js";

import { Area } from "./components/Area.jsx";
import { Menu } from "./components/Menu.jsx";
import { List } from "./components/List.jsx";
import { Lightbox } from "./components/Lightbox.jsx";
import { CardStack } from "./components/CardStack.jsx";
import { Button } from "./components/Button.jsx";

const Rows = ({ rows, handlers }) => (
  <div class="dmpg-rows">
    {rows.map(row => (
      <div class="dmpg-row">
        <Areas areas={row} handlers={handlers} />
      </div>
    ))}
  </div>
);

const Areas = ({ areas, handlers }) => (
  areas.map(area => (
    Array.isArray(area) ? (
      <Rows rows={area} handlers={handlers} />
    ) : gameState.value[area.area]?.length || !area.optional ? (
      <Area
          label={area.label}
          width={area.width}
          nogrow={area.optional}
          isTargetted={getIsTargetted(area.area, null)}
          {...handlers[area.area].area}>
        {gameState.value[area.area]?.map((stack, ix) => (
          <CardStack
              stack={stack}
              isSelected={getIsSelected(area.area, ix)}
              isTargetted={getIsTargetted(area.area, ix)}
              {...handlers[area.area].stack(ix)}
          />
        ))}
      </Area>
    ) : null
  ))
);

export const Playground = ({ rows, handlers }) => (
  <div class="dmpg-wrapper" {...globalHandlers}>
    <Menu {...getMenuProps()} />
    <List {...getListProps()} />
    <Lightbox {...getLightboxProps()} />
    <Rows rows={rows} handlers={handlers} />
    <div class="dmpg-footer">
      <a href="https://zk-phi.github.io/handanalyze" target="_blank">→ 確率計算機</a>
      {" / "}
      <a href="https://x.com/zk_phi" target="_blank">@zk_phi</a>
    </div>
  </div>
);

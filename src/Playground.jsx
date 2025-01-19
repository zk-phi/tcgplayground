import { globalHandlers } from "./hooks.js";

import { gameState } from "./states/game.js";
import { getIsSelected, getIsTargetted, dragStop } from "./states/drag.js";
import { getListProps } from "./states/list.js";
import { getMenuProps, closeMenu } from "./states/menu.js";
import { getLightboxProps } from "./states/lightbox.js";

import { Area } from "./components/Area";
import { Menu } from "./components/Menu";
import { List } from "./components/List";
import { Lightbox } from "./components/Lightbox";
import { CardStack } from "./components/CardStack";
import { Button } from "./components/Button";
import { Link } from "./components/Link";

const NEGATIVE_MARGIN_PER_CARD = -8;
const MIN_NEGATIVE_MARGIN = -72;

const AreaWithCards = ({ area, handlers }) => {
  const stacks = gameState.value[area.area] ?? [];
  const margin = Math.max(
    Math.max(stacks.length - (area.expandThreshold ?? 0), 0) * NEGATIVE_MARGIN_PER_CARD,
    MIN_NEGATIVE_MARGIN,
  );

  return (
    <Area
        label={area.label}
        width={area.width}
        nogrow={area.optional}
        isTargetted={getIsTargetted(area.area, null)}
        {...handlers[area.area].area}>
      {stacks.map((stack, ix) => (
        <CardStack
            stack={stack}
            isSelected={getIsSelected(area.area, ix)}
            isTargetted={getIsTargetted(area.area, ix)}
            style={{ marginLeft: ix > 0 ? `${margin}px` : 0 }}
            {...handlers[area.area].stack(ix)}
        />
      ))}
    </Area>
  );
};

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
      <AreaWithCards area={area} handlers={handlers} />
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
      <Link href="https://zk-phi.github.io/handanalyze" target="_blank">→ 確率計算機</Link>
      {" / "}
      <Link href="https://x.com/zk_phi" target="_blank">@zk_phi</Link>
    </div>
  </div>
);

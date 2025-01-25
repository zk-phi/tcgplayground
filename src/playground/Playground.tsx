import { globalHandlers } from "./hooks";

import { getStacks } from "./states/game";
import { getIsSelected, getIsTargetted, } from "./states/drag";
import { getListProps } from "./states/list";
import { getMenuProps, } from "./states/menu";
import { getLightboxProps } from "./states/lightbox";

import { Area } from "./components/Area";
import { Menu } from "./components/Menu";
import { List } from "./components/List";
import { Lightbox } from "./components/Lightbox";
import { CardStack } from "./components/CardStack";
import { Link } from "./components/Link";

const NEGATIVE_MARGIN_PER_CARD = -10;
const MIN_NEGATIVE_MARGIN = -70;
const STACKED_NEGATIVE_MARGIN = -90;

const AreaWithCards = ({ area, handlers }: {
  area: Area,
  handlers: HandlerConfig,
}) => {
  const stacks = getStacks(area.area);
  const margin = area.stacked ? STACKED_NEGATIVE_MARGIN : Math.max(
    Math.max(stacks.length - (area.expandThreshold ?? 2), 0) * NEGATIVE_MARGIN_PER_CARD,
    MIN_NEGATIVE_MARGIN,
  );

  return (
    <Area
        label={area.label}
        width={area.width}
        nogrow={area.optional || area.stacked}
        isSelected={getIsSelected(area.area, null)}
        isTargetted={getIsTargetted(area.area, null)}
        {...handlers[area.area].area}>
      {stacks.map((stack, ix) => (
        <CardStack
            key={stack.id}
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

const Rows = ({ rows, handlers }: {
  rows: LayoutConfig,
  handlers: HandlerConfig,
}) => (
  <div class="tcgpg-rows">
    {rows.map((row, ix) => (
      <div key={ix} class="tcgpg-row">
        <Areas areas={row} handlers={handlers} />
      </div>
    ))}
  </div>
);

const Areas = ({ areas, handlers }: {
  areas: LayoutRow,
  handlers: HandlerConfig,
}) => (
  areas.map((area: Area | LayoutRow[], ix: number) => (
    Array.isArray(area) ? (
      <Rows key={ix} rows={area} handlers={handlers} />
    ) : getStacks(area.area).length > 0 || !area.optional ? (
      <AreaWithCards key={area.area} area={area} handlers={handlers} />
    ) : null
  ))
);

export const Playground = ({ layout, handlers }: Configuration) => (
  <div class="tcgpg-wrapper" {...globalHandlers}>
    <Menu {...getMenuProps()} />
    <List {...getListProps()} />
    <Lightbox {...getLightboxProps()} />
    <Rows rows={layout} handlers={handlers} />
    <div class="tcgpg-footer">
      <Link href="https://zk-phi.github.io/handanalyze" target="_blank">→ 確率計算機</Link>
      {" / "}
      <Link href="https://x.com/zk_phi" target="_blank">@zk_phi</Link>
    </div>
  </div>
);

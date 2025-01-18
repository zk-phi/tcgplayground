import { useEffect, useState } from "preact/hooks";
import { state } from "../state.js";
import { globalHandlers } from "../hooks.js";
import { dropHandlers, getIsSelected, getIsTargetted } from "../drag.js";
import { Area } from "./Area.jsx";
import { Menu } from "./Menu.jsx";
import { List } from "./List.jsx";
import { Lightbox } from "./Lightbox.jsx";
import { CardStack } from "./CardStack.jsx";
import { Button } from "./Button.jsx";

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
    ) : state.value[area.area]?.length || !area.optional ? (
      <Area
          label={area.label}
          width={area.width}
          nogrow={area.optional}
          isTargetted={getIsTargetted(area.area, null)}
          {...dropHandlers(area.area, null)}>
        {state.value[area.area]?.map((stack, ix) => (
          <CardStack
              stack={stack}
              isSelected={getIsSelected(area.area, ix)}
              isTargetted={getIsTargetted(area.area, ix)}
              {...handlers[area.area](ix)}
          />
        ))}
      </Area>
    ) : null
  ))
);

export const App = ({ rows, initialize, handlers }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    initialize();
  }, []);

  return (
    <>
      <div class="dmpg-floating-menu">
        {show && (
          <>
            <Button onClick={() => untapAll(["field", "lands"])}>
              アンタップ
            </Button>
            <Button onClick={initialize}>
              リセット
            </Button>
          </>
        )}
        <Button onClick={() => setShow(show => !show)}>
          {show ? "閉じる" : "開く"}
        </Button>
      </div>
      {show && (
        <div class="dmpg-wrapper" {...globalHandlers}>
          <Menu />
          <List />
          <Lightbox />
          <Rows rows={rows} handlers={handlers} />
          <div class="dmpg-footer">
            <a href="https://zk-phi.github.io/handanalyze" target="_blank">→ 確率計算機</a>
            {" / "}
            <a href="https://x.com/zk_phi" target="_blank">@zk_phi</a>
          </div>
        </div>
      )}
    </>
  );
};

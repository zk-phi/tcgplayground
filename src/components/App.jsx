import { useEffect, useState } from "preact/hooks";
import { state } from "../state.js";
import { Area } from "./Area.jsx";
import { closeMenu, Menu } from "./Menu.jsx";
import { List } from "./List.jsx";
import { Lightbox } from "./Lightbox.jsx";
import { CardStack } from "./CardStack.jsx";
import { Button } from "./Button.jsx";

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
        <div class="dmpg-wrapper" onClick={() => closeMenu()}>
          <Menu />
          <List />
          <Lightbox />
          {rows.map(row => (
            <div class="dmpg-row">
              {row.map(area => (
                <Area label={area.label} width={area.width}>
                  {state.value[area.area]?.map((stack, ix) => (
                    <CardStack
                        area={area.area}
                        ix={ix}
                        stack={stack}
                        {...handlers[area.area](ix)}
                    />
                  ))}
                </Area>
              ))}
            </div>
          ))}
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

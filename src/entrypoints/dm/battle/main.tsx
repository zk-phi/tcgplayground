import { render } from "preact";
import { useEffect } from "preact/hooks";
import { configurations } from "../configurations";

import { shuffle as shuffleArray } from "../../../playground/utils/array";
import {
  makeStack, setGameState, untapAll,
  undo, redo, getUndoState, getRedoState,
} from "../../../playground/states/game";

import { Playground } from "../../../playground/Playground";
import { FloatingButtons } from "../../../playground/components/FloatingButtons";
import { Button } from "../../../playground/components/Button";

import "../../../playground/styles.min.css";
import "./style.css";
import "../../../playground/utils/dndtouch";

// // battle-1
// const initialize = () => {
//   const enemies = shuffleArray([
//     "/tcgplayground/battle-1/e01.jpg",
//     "/tcgplayground/battle-1/e02.jpg",
//     "/tcgplayground/battle-1/e03.jpg",
//     "/tcgplayground/battle-1/e04.webp",
//     "/tcgplayground/battle-1/e05.webp",
//     "/tcgplayground/battle-1/e06.webp",
//     "/tcgplayground/battle-1/e07.jpg",
//     "/tcgplayground/battle-1/e08.jpg",
//     "/tcgplayground/battle-1/e09.jpg",
//     "/tcgplayground/battle-1/e10.jpg",
//   ]);
//   setGameState({
//     field: [],
//     lands: [],
//     graveyard: [makeStack({ cards: [] })],
//     hand: [
//       makeStack({ cards: ["/tcgplayground/battle-1/00.webp"] }),
//     ],
//     shields: [
//       makeStack({ cards: ["/tcgplayground/battle-1/09.jpg"] }),
//       makeStack({ cards: ["/tcgplayground/battle-1/08.jpg"] }),
//       makeStack({ cards: ["/tcgplayground/battle-1/07.jpg"] }),
//       makeStack({ cards: ["/tcgplayground/battle-1/06.jpg"] }),
//       makeStack({ cards: ["/tcgplayground/battle-1/05.jpg"] }),
//       makeStack({ cards: ["/tcgplayground/battle-1/04.jpg"] }),
//       makeStack({ cards: ["/tcgplayground/battle-1/03.jpg"] }),
//       makeStack({ cards: ["/tcgplayground/battle-1/02.jpg"] }),
//       makeStack({ cards: ["/tcgplayground/battle-1/01.jpg"] }),
//     ],
//     deck: [makeStack({ cards: enemies, flipped: true })],
//     grdeck: [],
//     exdeck: [],
//     exploring: [],
//   });
// };

// // battle-2
// const initialize = () => {
//   const enemies = shuffleArray([
//     "/tcgplayground/battle-2/e01.jpg",
//     "/tcgplayground/battle-2/e02.jpg",
//     "/tcgplayground/battle-2/e03.jpg",
//     "/tcgplayground/battle-2/e04.webp",
//     "/tcgplayground/battle-2/e05.jpg",
//     "/tcgplayground/battle-2/e06.jpg",
//     "/tcgplayground/battle-2/e07.jpg",
//     "/tcgplayground/battle-2/e08.jpg",
//     "/tcgplayground/battle-2/e09.jpg",
//     "/tcgplayground/battle-2/e10.webp",
//   ]);
//   setGameState({
//     field: [],
//     lands: [],
//     graveyard: [makeStack({ cards: [] })],
//     hand: [
//       makeStack({ cards: ["/tcgplayground/battle-2/00.webp"] }),
//     ],
//     shields: [
//       makeStack({ cards: ["/tcgplayground/battle-2/09.jpg"] }),
//       makeStack({ cards: ["/tcgplayground/battle-2/08.jpg"] }),
//       makeStack({ cards: ["/tcgplayground/battle-2/07.jpg"] }),
//       makeStack({ cards: ["/tcgplayground/battle-2/06.jpg"] }),
//       makeStack({ cards: ["/tcgplayground/battle-2/05.jpg"] }),
//       makeStack({ cards: ["/tcgplayground/battle-2/04.jpg"] }),
//       makeStack({ cards: ["/tcgplayground/battle-2/03.jpg"] }),
//       makeStack({ cards: ["/tcgplayground/battle-2/02.jpg"] }),
//       makeStack({ cards: ["/tcgplayground/battle-2/01.jpg"] }),
//     ],
//     deck: [makeStack({ cards: enemies, flipped: true })],
//     grdeck: [],
//     exdeck: [],
//     exploring: [],
//   });
// };

//// battle-neo

// basic
const neoEnemies = shuffleArray([
  // "/tcgplayground/neo-battle/dm23ex3-012a.jpg", // カルマコットン
  // "/tcgplayground/neo-battle/dm24rp4-044.webp", // 瓜割
  // "/tcgplayground/neo-battle/dm24ex3-050.webp", // ヴェネラック
  // "/tcgplayground/neo-battle/dmrp20-071.webp", // ガンヴィ２
  // "/tcgplayground/neo-battle/dm23rp4x-016a.jpg", // シェケダンドメゲルス
  // "/tcgplayground/neo-battle/dm25rp1-046.webp", // デスキャッチビートル
  // "/tcgplayground/neo-battle/dmrp02-024.webp", // 陽々スピン
  // "/tcgplayground/neo-battle/dm24rp4-044.webp", // 瓜割
  // "/tcgplayground/neo-battle/dmex12-095.webp", // フォクシット
  // "/tcgplayground/neo-battle/dmrp01-073.webp", // ラベン
  // "/tcgplayground/neo-battle/dm24ex3-024.webp", // ウインドアックス
  // "/tcgplayground/neo-battle/dmrp08-082a.webp", // ゲキトツ汽車
  // "/tcgplayground/neo-battle/dmsd12-017.webp", // ゴロン
  // "/tcgplayground/neo-battle/dmsd21-015.webp", // アヤツリ
  // "/tcgplayground/neo-battle/dm24bd6-006.webp", // 修羅丸
  // "/tcgplayground/neo-battle/promoy21-905.webp", // ゼリーワーム
  // "/tcgplayground/neo-battle/dm24ex3-053.webp", // 二角魚
  // "/tcgplayground/neo-battle/dm24bd5-022a.webp", // 同期
  // "/tcgplayground/neo-battle/dm25rp1-017.webp", // ベリュガデス
  // "/tcgplayground/neo-battle/dmrp21-055.jpg", // アクアメル
  // "/tcgplayground/neo-battle/dm24ex3-075.webp", // コユキ
  // "/tcgplayground/neo-battle/promoy21-908.jpg", // 汽車男
  // "/tcgplayground/neo-battle/10.jpg", // オドルニードル
  // "/tcgplayground/neo-battle/dm24ex4-066a.webp", // セージ
  // "/tcgplayground/neo-battle/dm24rp2-061.jpg", // インジェクトワーム
  // "/tcgplayground/neo-battle/dm22rp1-027.webp", // 針亜
  // "/tcgplayground/neo-battle/dm24rp2-068.jpg", // ブレイズザウルス
  // "/tcgplayground/neo-battle/dm24bd6-045.webp", // サイコホラー
  // "/tcgplayground/neo-battle/dmex10-022.webp", // 腐敗ガレック
  // "/tcgplayground/neo-battle/dmrp16-012.jpg", // ムテキホッグ
  "/tcgplayground/neo-battle/dmrp13-028.webp", // ヴァイストン
  "/tcgplayground/neo-battle/dmrp06-083.webp", // K殴ラッタ
  "/tcgplayground/neo-battle/dm25rp2-070.webp", // DAKITE
  "/tcgplayground/neo-battle/dm22rp2x-066.webp", // ドライザウルス
  "/tcgplayground/neo-battle/dmrp04m-013.webp", // バチチ
  "/tcgplayground/neo-battle/dmsd15-009.webp", // デスハンズ
  "/tcgplayground/neo-battle/dm25rp1-050.webp", // バザカジール
  "/tcgplayground/neo-battle/dm23rp3-019.webp", // h4ch1
  "/tcgplayground/neo-battle/dmrp05-043.webp", // マタドール
  "/tcgplayground/neo-battle/dmrp19-041.webp", // フロッガ-1
  "/tcgplayground/neo-battle/dm24rp2-033.jpg", // ワールプール
  "/tcgplayground/neo-battle/dmex09-035.webp", // クックポロン
]);

// // classic
// const neoEnemies = [
//   "/tcgplayground/neo-battle/dm04-026.webp", // ハンタークラスター
//   "/tcgplayground/neo-battle/dm20-031.webp", // チューザ
//   "/tcgplayground/neo-battle/dmc34-034.webp", // ガレック
//   "/tcgplayground/neo-battle/dmc42-045.webp", // 汽車男
//   "/tcgplayground/neo-battle/dmc27-040.webp", // コーライル
//   "/tcgplayground/neo-battle/dmc55-066.webp", // メルニア
//   "/tcgplayground/neo-battle/dm13-049.webp", // ポコペン
//   "/tcgplayground/neo-battle/dmc41-004.webp", // ロウバンレイ
//   "/tcgplayground/neo-battle/dm32-100.webp", // クックポロン
//   "/tcgplayground/neo-battle/dmx21-025.webp", // オドルニードル
//   "/tcgplayground/neo-battle/dm20-013.webp", // 百発人形マグナム
//   "/tcgplayground/neo-battle/dm35-010.webp", // スベンガリィクロウラー
// ];

// // nijisanji
// const neoEnemies = [
//   "/tcgplayground/neo-battle/dm24ex4-067a.webp", // ドルブロ
//   "/tcgplayground/neo-battle/dm24ex4-089a.webp", // ジェニムーン
//   "/tcgplayground/neo-battle/dm24ex4-046.webp", // ガチャック
//   "/tcgplayground/neo-battle/dm24ex4-097a.webp", // レモングラス
//   "/tcgplayground/neo-battle/dm24ex4-094.webp", // ブレイズクロー
//   "/tcgplayground/neo-battle/dm24ex4-070.webp", // ニンギョ
//   "/tcgplayground/neo-battle/dm24ex4-063.webp", // ダイヤモン
//   "/tcgplayground/neo-battle/dm24ex4-044a.webp", // キゴマイム
//   "/tcgplayground/neo-battle/dm24ex4-066a.webp", // セージ
//   "/tcgplayground/neo-battle/dm24ex4-035.webp", // キューブリック
//   "/tcgplayground/neo-battle/dm24ex4-091.webp", // ザレッド
// ];

// battle-neo app
const initialize = () => {
  const enemies = shuffleArray(neoEnemies);
  setGameState({
    field: [],
    lands: [],
    graveyard: [makeStack({ cards: [] })],
    hand: [
      makeStack({ cards: ["/tcgplayground/neo-battle/a.png"] }),
      makeStack({ cards: ["/tcgplayground/neo-battle/b.png"] }),
      makeStack({ cards: ["/tcgplayground/neo-battle/1.png"] }),
    ],
    shields: [
      makeStack({ cards: ["/tcgplayground/neo-battle/6.png", enemies.pop()!] }),
      makeStack({ cards: ["/tcgplayground/neo-battle/5.png", enemies.pop()!] }),
      makeStack({ cards: ["/tcgplayground/neo-battle/4.png", enemies.pop()!] }),
      makeStack({ cards: ["/tcgplayground/neo-battle/3.png", enemies.pop()!] }),
      makeStack({ cards: ["/tcgplayground/neo-battle/2.png", enemies.pop()!] }),
    ],
    deck: [makeStack({ cards: enemies, flipped: true })],
    grdeck: [],
    exdeck: [],
    exploring: [],
  });
};

const App = () => {
  useEffect(() => initialize(), []);
  return (
    <>
      <FloatingButtons>
        <Button onClick={undo} disabled={!getUndoState()}>
          一手戻す
        </Button>
        <Button onClick={redo} disabled={!getRedoState()}>
          一手進む
        </Button>
        <Button onClick={() => untapAll(["field", "lands"])}>
          アンタップ
        </Button>
        <Button onClick={initialize}>
          リセット
        </Button>
      </FloatingButtons>
      <Playground {...configurations} />
    </>
  );
};

const div = document.getElementById("dmplayground")!;
document.body.append(div);

render(<App />, div)

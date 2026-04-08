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
  // "/tcgplayground/neo-battle/creatures/dmrp21-055.jpg", // アクアメル
  // "/tcgplayground/neo-battle/creatures/dm23ex3-012a.jpg", // カルマコットン
  // "/tcgplayground/neo-battle/creatures/dm24rp4-044.webp", // 瓜割
  // "/tcgplayground/neo-battle/creatures/dm24ex3-050.webp", // ヴェネラック
  // "/tcgplayground/neo-battle/creatures/dmrp20-071.webp", // ガンヴィ２
  // "/tcgplayground/neo-battle/creatures/dm23rp4x-016a.jpg", // シェケダンドメゲルス
  // "/tcgplayground/neo-battle/creatures/dm25rp1-046.webp", // デスキャッチビートル
  // "/tcgplayground/neo-battle/creatures/dmrp02-024.webp", // 陽々スピン
  // "/tcgplayground/neo-battle/creatures/dm24rp4-044.webp", // 瓜割
  // "/tcgplayground/neo-battle/creatures/dm24ex3-024.webp", // ウインドアックス
  // "/tcgplayground/neo-battle/creatures/dmsd12-017.webp", // ゴロン
  // "/tcgplayground/neo-battle/creatures/dm24bd6-006.webp", // 修羅丸
  // "/tcgplayground/neo-battle/creatures/promoy21-905.webp", // ゼリーワーム
  // "/tcgplayground/neo-battle/creatures/promoy21-908.jpg", // 汽車男
  // "/tcgplayground/neo-battle/creatures/dm24ex4-066a.webp", // セージ
  // "/tcgplayground/neo-battle/creatures/dm24rp2-061.jpg", // インジェクトワーム
  // "/tcgplayground/neo-battle/creatures/dm22rp1-027.webp", // 針亜
  // "/tcgplayground/neo-battle/creatures/dm24rp2-068.jpg", // ブレイズザウルス
  // "/tcgplayground/neo-battle/creatures/dm24bd6-045.webp", // サイコホラー
  // "/tcgplayground/neo-battle/creatures/dmrp01-073.webp", // ラベン
  // "/tcgplayground/neo-battle/creatures/dm25rp2-030.webp", // c0br4
  // "/tcgplayground/neo-battle/creatures/dm23bd4-027.webp", // メガブレード
  // "/tcgplayground/neo-battle/creatures/dm24ex3-053.webp", // 二角魚
  // "/tcgplayground/neo-battle/creatures/dmrp06-083.webp", // K殴ラッタ
  // "/tcgplayground/neo-battle/creatures/dmrp13-028.webp", // ヴァイストン
  // "/tcgplayground/neo-battle/creatures/dm25rp2-070.webp", // DAKITE
  // "/tcgplayground/neo-battle/creatures/dm22rp2x-066.webp", // ドライザウルス
  // "/tcgplayground/neo-battle/creatures/dmex09-035.webp", // クックポロン
  // "/tcgplayground/neo-battle/creatures/dm23rp3-019.webp", // h4ch1
  // "/tcgplayground/neo-battle/creatures/dm25ex2-087.webp", // スパークイエロー
  // "/tcgplayground/neo-battle/creatures/dm25rp4-014.webp", // 進封せし大悪魔
  // "/tcgplayground/neo-battle/creatures/dmrp13-046.webp", // リツイーギョ
  // "/tcgplayground/neo-battle/creatures/dmrp20-067.webp", // タギャースツ
  // "/tcgplayground/neo-battle/creatures/dm25rp1-050.webp", // バザカジール
  // "/tcgplayground/neo-battle/creatures/dmrp14-092.webp", // コブシ童子
  // "/tcgplayground/neo-battle/creatures/dmrp07-041.webp", // リブロス
  // "/tcgplayground/neo-battle/creatures/dmrp16-012.jpg", // ムテキホッグ
  // "/tcgplayground/neo-battle/creatures/dmex11-016.webp", // ミストリエス
  // "/tcgplayground/neo-battle/creatures/dmrp14-064.webp", // 不可視の密偵
  // "/tcgplayground/neo-battle/creatures/dm24rp1-063.webp", // 汽球男
  // "/tcgplayground/neo-battle/creatures/dm23sd3-009.jpg", // メルダウ
  // "/tcgplayground/neo-battle/creatures/dmex19-054.webp", // 終わりポンの助
  // "/tcgplayground/neo-battle/creatures/dmrp12-017.webp", // オリオン
  // "/tcgplayground/neo-battle/creatures/dm24sp1-009.webp", // 熊田すず
  // "/tcgplayground/neo-battle/creatures/dmsd15-009.webp", // デスハンズ
  // "/tcgplayground/neo-battle/creatures/dm23bd5-020.webp", // ホーリー
  // "/tcgplayground/neo-battle/creatures/dmrp04m-013.webp", // バチチ
  // "/tcgplayground/neo-battle/creatures/dmrp15-030.webp", // レスラコーン
  // "/tcgplayground/neo-battle/creatures/dmex10-022.webp", // 腐敗ガレック
  // "/tcgplayground/neo-battle/creatures/dm25rp1-051.webp", // バースターブ
  // "/tcgplayground/neo-battle/creatures/dmex03-035.webp", // エイエイオー
  // "/tcgplayground/neo-battle/creatures/dm24bd5-022a.webp", // 同期
  // "/tcgplayground/neo-battle/creatures/10.jpg", // オドルニードル
  // "/tcgplayground/neo-battle/creatures/dmrp08-082a.webp", // ゲキトツ汽車
  // "/tcgplayground/neo-battle/creatures/dmrp16-016.webp", // アローワーム
  /* -------------------------------------------------- */
  "/tcgplayground/neo-battle/creatures/dm25ex2-093.webp", // ハンドパープル
  "/tcgplayground/neo-battle/creatures/dmex12-095.webp", // フォクシット
  "/tcgplayground/neo-battle/creatures/dm25rp3-073.webp", // SAMBA-38
  "/tcgplayground/neo-battle/creatures/dmrp14-013.webp", // ダセンゼ
  "/tcgplayground/neo-battle/creatures/dmrp05-043.webp", // マタドール
  "/tcgplayground/neo-battle/creatures/dm25rp1-017.webp", // ベリュガデス
  "/tcgplayground/neo-battle/creatures/dmrp19-031.webp", // クリティブ-1
  "/tcgplayground/neo-battle/creatures/dm24ex3-075.webp", // コユキ
  "/tcgplayground/neo-battle/creatures/dmrp16-078.jpg", // ザイタクチュリス
  "/tcgplayground/neo-battle/creatures/dm24rp2-033.jpg", // ワールプール
  "/tcgplayground/neo-battle/creatures/dm25rp4-056.webp", // ペナルティフリート
  // "/tcgplayground/neo-battle/creatures/dmrp19-041.webp", // フロッガ-1
  "/tcgplayground/neo-battle/creatures/HEFgSiqbMAAf-az.jpeg", // ボルメテハック
  "/tcgplayground/neo-battle/creatures/dmbd16-teki003.webp", // メルニア
  "/tcgplayground/neo-battle/creatures/dmsd21-015.webp", // アヤツリ
  // "/tcgplayground/neo-battle/creatures/dmsd15-007.webp", // ザブラック
]);

// battle-neo app
const initialize = () => {
  const enemies = shuffleArray(neoEnemies);
  setGameState({
    field: [],
    lands: [],
    graveyard: [makeStack({ cards: [] })],
    hand: [
      makeStack({ cards: ["/tcgplayground/neo-battle/howto.png"]}),
      makeStack({ cards: ["/tcgplayground/neo-battle/faq.png"]}),
      // ザブラック
      makeStack({ cards: ["/tcgplayground/neo-battle/creatures/dmsd15-007.webp"]}),
    ],
    shields: [
      makeStack({ cards: ["/tcgplayground/neo-battle/w5.png"] }),
      makeStack({ cards: ["/tcgplayground/neo-battle/w4.png"] }),
      makeStack({ cards: ["/tcgplayground/neo-battle/w3.png"] }),
      makeStack({ cards: ["/tcgplayground/neo-battle/w2.png"] }),
      makeStack({ cards: ["/tcgplayground/neo-battle/w1.png"] }),
    ],
    deck: [makeStack({ cards: enemies, flipped: true })],
    exdeck: [
      makeStack({ cards: [
        // "/tcgplayground/neo-battle/events/dmr21-036.webp",
        // "/tcgplayground/neo-battle/events/dmex19-038.jpg",
        // "/tcgplayground/neo-battle/events/dm25ex1-054.webp", // ヴァルハラの天宝
        // "/tcgplayground/neo-battle/events/dm22rp2x-044.webp", // ブルレイザーのハサミ
        // "/tcgplayground/neo-battle/events/dm22rp1-025.webp", // ブーストドライバー
        // "/tcgplayground/neo-battle/events/dm22rp2x-047.webp", // ジャイロボール
        // "/tcgplayground/neo-battle/events/dmrp22-024.jpg", // マンハッタン
        // "/tcgplayground/neo-battle/events/dm23ex3-014.jpeg", // ニルヴァーナゼニシア
        // "/tcgplayground/neo-battle/events/dm22rp1-021.webp", // 暴竜爵の爪
        // "/tcgplayground/neo-battle/events/dmex01-074.webp", // 禁断エリア
        // --------------------------------------------------
        "/tcgplayground/neo-battle/events/dmex08-274.jpeg", // トミカタウン
        "/tcgplayground/neo-battle/events/dmr21-047.webp", // 爆裂筋肉養成所
        "/tcgplayground/neo-battle/events/dmr22-025.webp", // フェスライブ
        // "/tcgplayground/neo-battle/events/dmex17-048.jpeg", // パルテノン
        // "/tcgplayground/neo-battle/events/dmex03-055.webp", // オーバーキルグレイブヤード
        "/tcgplayground/neo-battle/events/dm24bd5-036.jpeg", // メメント守神宮
        "/tcgplayground/neo-battle/events/dm25rp4-026.webp", // コアラ大佐
      ]}),
    ],
    grdeck: [
      makeStack({ cards: [
        "/tcgplayground/neo-battle/t1.png",
        "/tcgplayground/neo-battle/t2.png",
        "/tcgplayground/neo-battle/t3.png",
        "/tcgplayground/neo-battle/t4.png",
        "/tcgplayground/neo-battle/t5.png",
        "/tcgplayground/neo-battle/t6.png",
        "/tcgplayground/neo-battle/t7.png",
      ]}),
    ],
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

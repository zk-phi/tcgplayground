import { render } from "preact";
import { useEffect } from "preact/hooks";
import * as configurations from "../configurations";

import { shuffle as shuffleArray } from "../../../utils/array";
import {
  makeStack, setGameState, untapAll,
  undo, redo, getUndoState, getRedoState,
} from "../../../states/game";

import { Playground } from "../../../Playground";
import { FloatingButtons } from "../../../components/FloatingButtons";
import { Button } from "../../../components/Button";

import "../../../styles.min.css";
import "./style.css";
import "../../../utils/dndtouch";

const sampleDeck = [
  "https://www.pokemon-card.com/assets/images/card_images/large/ENE/034670_E_KIHONCHOUENERUGI.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/ENE/034670_E_KIHONCHOUENERUGI.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/ENE/034670_E_KIHONCHOUENERUGI.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/ENE/034670_E_KIHONCHOUENERUGI.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/ENE/034670_E_KIHONCHOUENERUGI.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/ENE/034670_E_KIHONCHOUENERUGI.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/ENE/034670_E_KIHONCHOUENERUGI.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/ENE/034670_E_KIHONCHOUENERUGI.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/ENE/034670_E_KIHONCHOUENERUGI.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037256_P_MYUUTSUMYUUGX.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037256_P_MYUUTSUMYUUGX.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037256_P_MYUUTSUMYUUGX.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037256_P_MYUUTSUMYUUGX.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037257_P_OROTTOYONOWARUGX.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037257_P_OROTTOYONOWARUGX.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SM9/035982_P_GENGAMIMIKKYUGX.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SM12/037137_P_MEGAMIMIROPPUPURINGX.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SM11/036781_P_RATEIOSUGX.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SM10b/036689_P_AGOYONGX.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SM11/036816_P_KAIRYUGX.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037252_P_DEDENNEGX.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037252_P_DEDENNEGX.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037265_P_MAIKA.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037265_P_MAIKA.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SMM/036846_P_KARAMANERO.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SMM/036846_P_KARAMANERO.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SMM/036846_P_KARAMANERO.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SM7a/035204_P_METAMON.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SM8a/035422_P_ABUSORU.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SK/041117_T_KUIKKUBORU.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SK/041117_T_KUIKKUBORU.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SK/041117_T_KUIKKUBORU.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SK/041117_T_KUIKKUBORU.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037338_T_MISUTERITOREJA.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037338_T_MISUTERITOREJA.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037338_T_MISUTERITOREJA.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037338_T_MISUTERITOREJA.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037331_T_PURESHASUBORU.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037331_T_PURESHASUBORU.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/S11a/042022_T_POKEMONIREKAE.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/S11a/042022_T_POKEMONIREKAE.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/S11a/042022_T_POKEMONIREKAE.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/S11a/042022_T_POKEMONIREKAE.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SMP/035397_T_ENERUGISUPINA.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SMP/035397_T_ENERUGISUPINA.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SC2/038902_T_RISETTOSUTANPU.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SM11a/036956_T_GURETOKYACCHA.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SK/041125_T_OOKINAOMAMORI.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SK/041125_T_OOKINAOMAMORI.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SK/041126_T_FUUSEN.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SK/041126_T_FUUSEN.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SA/037595_T_HAKASENOKENKYUUMAGUNORIAHAKASE.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SA/037595_T_HAKASENOKENKYUUMAGUNORIAHAKASE.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SA/037595_T_HAKASENOKENKYUUMAGUNORIAHAKASE.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SA/037595_T_HAKASENOKENKYUUMAGUNORIAHAKASE.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SK/041131_T_MARII.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SK/041131_T_MARII.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SK/041131_T_MARII.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SK/041131_T_MARII.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SM12/037155_T_KONTONNOUNERI.jpg",
  "https://www.pokemon-card.com/assets/images/card_images/large/SM12/037155_T_KONTONNOUNERI.jpg",
];

const initialize = () => {
  const deck = shuffleArray(sampleDeck);
  setGameState({
    sides: [makeStack({ cards: deck.splice(0, 6), flipped: true })],
    hand: deck.splice(0, 7).map(src => makeStack({ cards: [src] })),
    deck: [makeStack({ cards: deck, flipped: true })],
    field: [],
    graveyard: [makeStack({ cards: [] })],
    bench: [],
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
      <Playground initialize={initialize} {...configurations} />
    </>
  );
};

const div = document.getElementById("dmplayground");
document.body.append(div);

render(<App />, div)

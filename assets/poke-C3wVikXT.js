import{d as o,b as E,a as d,m as p,c as O,e as N,s as _,g as w,j as K,i as t,u as U,p as S,k as I,l as u,n as R,D as T,o as n,y as j,F as P,B as M,q as G,P as H,r as f,v as C,w as b,x as l}from"./drag-drop-touch.esm.min-B3PT6zON.js";const v=[[{area:"sides",label:"サイド",width:1},{area:"field",label:"場"},{area:"graveyard",label:"トラッシュ",width:1}],[{area:"bench",label:"ベンチ",expandThreshold:5},{area:"deck",label:"山",width:1}],[{area:"hand",label:"手札",expandThreshold:3},{area:"exploring",label:"めくられた",optional:!0}]],i=(a,e,s)=>O(a,e,(r,g,c)=>{g==="graveyard"||g==="sides"?S(a,e,g,c??0):g==="stadium"||c==="deck"||c!=null?d(r,[["🫳 上に置く",()=>S(a,e,g,c??0)],["🫴 下に入れる",()=>I(a,e,g,c??0)]]):u(a,e,g,{},g!=="hand"&&g!=="exploring")}),h=(a,e,s)=>O(a,e,(r,g,c)=>{g==="graveyard"||g==="sides"?t(a,e,0,g,c??0):g==="stadium"||c==="deck"||c!=null?d(r,[["🫳 上に置く",()=>t(a,e,0,g,c??0)],["🫴 下に入れる",()=>U(a,e,0,g,c??0)]]):p(a,e,0,g)}),m=(a,e,s,r=!1)=>{N(a,e,s,g=>({onClick:c=>d(c,[["🔍 拡大",()=>_(c,w.value[e][s].cards[g])],["⚔️ バトル場に出す",()=>t(e,s,g,"field",0,r)],["🫳 デッキの上に置く",()=>t(e,s,g,"deck",0,r)],["🫴 デッキの下に入れる",()=>U(e,s,g,"deck",0,r)],["🪦 トラッシュに送る",()=>t(e,s,g,"graveyard",0,r)],["🪑 ベンチに置く",()=>p(e,s,g,"bench",r)],["🛡️ サイドに置く",()=>t(e,s,g,"sides",0,r)],["🃏 手札に加える",()=>p(e,s,g,"hand",r)]]),onContextMenu:c=>d(c,[["🔍 拡大",()=>_(c,w.value[e][s].cards[g])],["⚔️ バトル場に出す",()=>t(e,s,g,"field",0,r)],["🫳 デッキの上に置く",()=>t(e,s,g,"deck",0,r)],["🫴 デッキの下に入れる",()=>U(e,s,g,"deck",0,r)],["🪦 トラッシュに送る",()=>t(e,s,g,"graveyard",0,r)],["🪑 ベンチに置く",()=>p(e,s,g,"bench",r)],["🛡️ サイドに置く",()=>t(e,s,g,"sides",0,r)],["🃏 手札に加える",()=>p(e,s,g,"hand",r)]])}))},Y={sides:{stack:a=>({onClick:e=>m(e,"sides",a,!0),onContextMenu:e=>m(e,"sides",a,!0),...o("sides",a),...h("sides",a)}),area:{...o("sides",null)}},field:{stack:a=>({onClick:()=>E("field",a),onContextMenu:e=>d(e,[["🔍 拡大",s=>_(s,w.value.field[a].cards[0])],["👀 重なっているカード",s=>m(s,"field",a)]]),...o("field",a),...i("field",a)}),area:{...o("field",null)}},deck:{stack:a=>({onClick:e=>p("deck",a,0,"exploring",!0),onContextMenu:e=>d(e,[["🤏 ボトムから引く",()=>p("deck",a,-1,"hand",!0)],["♻️ シャッフル",()=>K("deck",a)],["👀 リスト",s=>m(s,"deck",a,!0)]]),...o("deck",a),...h("deck",a)}),area:{...o("deck",null)}},graveyard:{stack:a=>({onClick:e=>m(e,"graveyard",a,!0),onContextMenu:e=>m(e,"graveyard",a,!0),...o("graveyard",a),...h("graveyard",a)}),area:{...o("graveyard",null)}},bench:{stack:a=>({onClick:e=>E("bench",a),onContextMenu:e=>d(e,[["🔍 拡大",s=>_(s,w.value.bench[a].cards[0])],["👀 重なっているカード",s=>m(s,"bench",a)]]),...o("bench",a),...i("bench",a)}),area:{...o("bench",null)}},hand:{stack:a=>({onClick:e=>preventDefault(e),onContextMenu:e=>d(e,[["🔍 拡大",s=>_(s,w.value.hand[a].cards[0])],["👀 重なっているカード",s=>m(s,"hand",a)]]),...o("hand",a),...i("hand",a)}),area:{...o("hand",null)}},exploring:{stack:a=>({onClick:e=>preventDefault(e),onContextMenu:e=>d(e,[["🔍 拡大",s=>_(s,w.value.exploring[a].cards[0])],["👀 重なっているカード",s=>m(s,"hand",a)]]),...o("exploring",a),...i("exploring",a)}),area:{...o("exploring",null)}}},X=Object.freeze(Object.defineProperty({__proto__:null,handlers:Y,rows:v},Symbol.toStringTag,{value:"Module"}));R(void 0,void 0,{pressHoldDelayMS:300,contextMenuDelayMS:400});const B=["https://www.pokemon-card.com/assets/images/card_images/large/ENE/034670_E_KIHONCHOUENERUGI.jpg","https://www.pokemon-card.com/assets/images/card_images/large/ENE/034670_E_KIHONCHOUENERUGI.jpg","https://www.pokemon-card.com/assets/images/card_images/large/ENE/034670_E_KIHONCHOUENERUGI.jpg","https://www.pokemon-card.com/assets/images/card_images/large/ENE/034670_E_KIHONCHOUENERUGI.jpg","https://www.pokemon-card.com/assets/images/card_images/large/ENE/034670_E_KIHONCHOUENERUGI.jpg","https://www.pokemon-card.com/assets/images/card_images/large/ENE/034670_E_KIHONCHOUENERUGI.jpg","https://www.pokemon-card.com/assets/images/card_images/large/ENE/034670_E_KIHONCHOUENERUGI.jpg","https://www.pokemon-card.com/assets/images/card_images/large/ENE/034670_E_KIHONCHOUENERUGI.jpg","https://www.pokemon-card.com/assets/images/card_images/large/ENE/034670_E_KIHONCHOUENERUGI.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037256_P_MYUUTSUMYUUGX.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037256_P_MYUUTSUMYUUGX.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037256_P_MYUUTSUMYUUGX.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037256_P_MYUUTSUMYUUGX.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037257_P_OROTTOYONOWARUGX.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037257_P_OROTTOYONOWARUGX.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM9/035982_P_GENGAMIMIKKYUGX.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12/037137_P_MEGAMIMIROPPUPURINGX.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM11/036781_P_RATEIOSUGX.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM10b/036689_P_AGOYONGX.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM11/036816_P_KAIRYUGX.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037252_P_DEDENNEGX.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037252_P_DEDENNEGX.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037265_P_MAIKA.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037265_P_MAIKA.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SMM/036846_P_KARAMANERO.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SMM/036846_P_KARAMANERO.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SMM/036846_P_KARAMANERO.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM7a/035204_P_METAMON.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM8a/035422_P_ABUSORU.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SK/041117_T_KUIKKUBORU.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SK/041117_T_KUIKKUBORU.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SK/041117_T_KUIKKUBORU.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SK/041117_T_KUIKKUBORU.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037338_T_MISUTERITOREJA.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037338_T_MISUTERITOREJA.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037338_T_MISUTERITOREJA.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037338_T_MISUTERITOREJA.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037331_T_PURESHASUBORU.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037331_T_PURESHASUBORU.jpg","https://www.pokemon-card.com/assets/images/card_images/large/S11a/042022_T_POKEMONIREKAE.jpg","https://www.pokemon-card.com/assets/images/card_images/large/S11a/042022_T_POKEMONIREKAE.jpg","https://www.pokemon-card.com/assets/images/card_images/large/S11a/042022_T_POKEMONIREKAE.jpg","https://www.pokemon-card.com/assets/images/card_images/large/S11a/042022_T_POKEMONIREKAE.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SMP/035397_T_ENERUGISUPINA.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SMP/035397_T_ENERUGISUPINA.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SC2/038902_T_RISETTOSUTANPU.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM11a/036956_T_GURETOKYACCHA.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SK/041125_T_OOKINAOMAMORI.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SK/041125_T_OOKINAOMAMORI.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SK/041126_T_FUUSEN.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SK/041126_T_FUUSEN.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SA/037595_T_HAKASENOKENKYUUMAGUNORIAHAKASE.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SA/037595_T_HAKASENOKENKYUUMAGUNORIAHAKASE.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SA/037595_T_HAKASENOKENKYUUMAGUNORIAHAKASE.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SA/037595_T_HAKASENOKENKYUUMAGUNORIAHAKASE.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SK/041131_T_MARII.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SK/041131_T_MARII.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SK/041131_T_MARII.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SK/041131_T_MARII.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12/037155_T_KONTONNOUNERI.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12/037155_T_KONTONNOUNERI.jpg"],k=()=>{const a=C(B);b({sides:[l({cards:a.splice(0,6),flipped:!0})],hand:a.splice(0,7).map(e=>l({cards:[e]})),deck:[l({cards:a,flipped:!0})],field:[],graveyard:[l({cards:[]})],bench:[],exploring:[]})},y=()=>(j(()=>k(),[]),n(f,{children:[n(P,{children:[n(M,{onClick:()=>G(["field","lands"]),children:"アンタップ"}),n(M,{onClick:k,children:"リセット"})]}),n(H,{initialize:k,...X})]})),A=document.getElementById("dmplayground");document.body.append(A);T(n(y,{}),A);

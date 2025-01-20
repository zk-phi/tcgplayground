import{d as c,b as N,a as o,m as n,c as E,e as R,s as _,g as m,j as T,i as d,u as O,k as U,l as j,n as f,o as K,q as H,r as P,p as S,v as G,w as C,D as b,x as p,y as v,F as Y,B as l,z as B,A as X,C as D,E as y,G as J,P as F,H as L,I as W,J as z,K as i}from"./dndtouch-Dauizxe8.js";const q=[[{area:"sides",label:"サイド",width:1},{area:"field",label:"場",expandThreshold:5},{area:"graveyard",label:"トラッシュ",width:1}],[{area:"bench",label:"ベンチ",expandThreshold:5},{area:"deck",label:"山",width:1}],[{area:"hand",label:"手札"},{area:"exploring",label:"めくられた",optional:!0}]],h=a=>E(a,null,(s,e,g)=>{e==="graveyard"||e==="sides"?U(a,e,g??0):e==="deck"||e==="stadium"||g!=null?m(e,g??0).cards.length<=0?U(a,e,g??0):o(s,[["🫳 上に置く",()=>U(a,e,g??0)],["🫴 下に入れる",()=>j(a,e,g??0)]]):f(a,e,{reversed:e==="lands"})}),M=a=>E(a,null,(s,e,g)=>{e==="graveyard"||e==="sides"?K(a,0,e,g??0):e==="deck"||e==="stadium"||g!=null?m(e,g??0).cards.length<=0?U(a,e,g??0):o(s,[["🫳 上に置く",()=>K(a,0,e,g??0)],["🫴 下に入れる",()=>H(a,0,e,g??0)]]):P(a,0,e,{reversed:e==="lands"})}),k=(a,s)=>E(a,s,(e,g,r)=>{g==="graveyard"||g==="sides"?S(a,s,g,r??0):g==="deck"||g==="stadium"||r!=null?(m(g,r??0).cards.length<=0&&S(a,s,g,r??0),o(e,[["🫳 上に置く",()=>S(a,s,g,r??0)],["🫴 下に入れる",()=>G(a,s,g,r??0)]])):C(a,s,g,{},g!=="hand"&&g!=="exploring")}),A=(a,s)=>E(a,s,(e,g,r)=>{g==="graveyard"||g==="sides"?d(a,s,0,g,r??0):g==="deck"||g==="stadium"||r!=null?(m(g,r??0).cards.length<=0&&d(a,s,0,g,r??0),o(e,[["🫳 上に置く",()=>d(a,s,0,g,r??0)],["🫴 下に入れる",()=>O(a,s,0,g,r??0)]])):n(a,s,0,g)}),t=(a,s,e,g=!1)=>{R(a,s,e,r=>({onClick:w=>o(w,[["🔍 拡大",()=>_(w,m(s,e).cards[r])],["⚔️ バトル場に出す",()=>n(s,e,r,"field",g)],["🫳 デッキの上に置く",()=>d(s,e,r,"deck",0,g)],["🫴 デッキの下に入れる",()=>O(s,e,r,"deck",0,g)],["🪦 トラッシュに送る",()=>d(s,e,r,"graveyard",0,g)],["🪑 ベンチに置く",()=>n(s,e,r,"bench",g)],["🛡️ サイドに置く",()=>d(s,e,r,"sides",0,g)],["🃏 手札に加える",()=>n(s,e,r,"hand",g)]]),onContextMenu:w=>o(w,[["🔍 拡大",()=>_(w,m(s,e).cards[r])],["⚔️ バトル場に出す",()=>n(s,e,r,"field",g)],["🫳 デッキの上に置く",()=>d(s,e,r,"deck",0,g)],["🫴 デッキの下に入れる",()=>O(s,e,r,"deck",0,g)],["🪦 トラッシュに送る",()=>d(s,e,r,"graveyard",0,g)],["🪑 ベンチに置く",()=>n(s,e,r,"bench",g)],["🛡️ サイドに置く",()=>d(s,e,r,"sides",0,g)],["🃏 手札に加える",()=>n(s,e,r,"hand",g)]])}))},$={sides:{stack:a=>({onClick:s=>t(s,"sides",a,!0),onContextMenu:s=>t(s,"sides",a,!0),...c("sides",a),...A("sides",a)}),area:{...c("sides",null),...M("sides")}},field:{stack:a=>({onClick:()=>N("field",a),onContextMenu:s=>o(s,[["🔍 拡大",e=>_(e,m("field",a).cards[0])],["👀 重なっているカード",e=>t(e,"field",a)]]),...c("field",a),...k("field",a)}),area:{...c("field",null),...h("field")}},deck:{stack:a=>({onClick:()=>n("deck",a,0,"exploring",!0),onContextMenu:s=>o(s,[["🤏 ボトムから引く",()=>n("deck",a,-1,"hand",!0)],["♻️ シャッフル",()=>T("deck",a)],["👀 リスト",e=>t(e,"deck",a,!0)]]),...c("deck",a),...A("deck",a)}),area:{...c("deck",null),...M("deck")}},graveyard:{stack:a=>({onClick:s=>t(s,"graveyard",a,!0),onContextMenu:s=>t(s,"graveyard",a,!0),...c("graveyard",a),...A("graveyard",a)}),area:{...c("graveyard",null),...M("graveyard")}},bench:{stack:a=>({onClick:()=>N("bench",a),onContextMenu:s=>o(s,[["🔍 拡大",e=>_(e,m("bench",a).cards[0])],["👀 重なっているカード",e=>t(e,"bench",a)]]),...c("bench",a),...k("bench",a)}),area:{...c("bench",null),...h("bench")}},hand:{stack:a=>({onClick:s=>s.preventDefault(),onContextMenu:s=>o(s,[["🔍 拡大",e=>_(e,m("hand",a).cards[0])],["👀 重なっているカード",e=>t(e,"hand",a)]]),...c("hand",a),...k("hand",a)}),area:{...c("hand",null),...h("hand")}},exploring:{stack:a=>({onClick:s=>s.preventDefault(),onContextMenu:s=>o(s,[["🔍 拡大",e=>_(e,m("exploring",a).cards[0])],["👀 重なっているカード",e=>t(e,"hand",a)]]),...c("exploring",a),...k("exploring",a)}),area:{...c("exploring",null),...h("exploring")}}},Q={layout:q,handlers:$},V=["https://www.pokemon-card.com/assets/images/card_images/large/ENE/034670_E_KIHONCHOUENERUGI.jpg","https://www.pokemon-card.com/assets/images/card_images/large/ENE/034670_E_KIHONCHOUENERUGI.jpg","https://www.pokemon-card.com/assets/images/card_images/large/ENE/034670_E_KIHONCHOUENERUGI.jpg","https://www.pokemon-card.com/assets/images/card_images/large/ENE/034670_E_KIHONCHOUENERUGI.jpg","https://www.pokemon-card.com/assets/images/card_images/large/ENE/034670_E_KIHONCHOUENERUGI.jpg","https://www.pokemon-card.com/assets/images/card_images/large/ENE/034670_E_KIHONCHOUENERUGI.jpg","https://www.pokemon-card.com/assets/images/card_images/large/ENE/034670_E_KIHONCHOUENERUGI.jpg","https://www.pokemon-card.com/assets/images/card_images/large/ENE/034670_E_KIHONCHOUENERUGI.jpg","https://www.pokemon-card.com/assets/images/card_images/large/ENE/034670_E_KIHONCHOUENERUGI.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037256_P_MYUUTSUMYUUGX.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037256_P_MYUUTSUMYUUGX.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037256_P_MYUUTSUMYUUGX.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037256_P_MYUUTSUMYUUGX.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037257_P_OROTTOYONOWARUGX.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037257_P_OROTTOYONOWARUGX.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM9/035982_P_GENGAMIMIKKYUGX.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12/037137_P_MEGAMIMIROPPUPURINGX.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM11/036781_P_RATEIOSUGX.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM10b/036689_P_AGOYONGX.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM11/036816_P_KAIRYUGX.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037252_P_DEDENNEGX.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037252_P_DEDENNEGX.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037265_P_MAIKA.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037265_P_MAIKA.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SMM/036846_P_KARAMANERO.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SMM/036846_P_KARAMANERO.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SMM/036846_P_KARAMANERO.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM7a/035204_P_METAMON.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM8a/035422_P_ABUSORU.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SK/041117_T_KUIKKUBORU.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SK/041117_T_KUIKKUBORU.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SK/041117_T_KUIKKUBORU.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SK/041117_T_KUIKKUBORU.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037338_T_MISUTERITOREJA.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037338_T_MISUTERITOREJA.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037338_T_MISUTERITOREJA.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037338_T_MISUTERITOREJA.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037331_T_PURESHASUBORU.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12a/037331_T_PURESHASUBORU.jpg","https://www.pokemon-card.com/assets/images/card_images/large/S11a/042022_T_POKEMONIREKAE.jpg","https://www.pokemon-card.com/assets/images/card_images/large/S11a/042022_T_POKEMONIREKAE.jpg","https://www.pokemon-card.com/assets/images/card_images/large/S11a/042022_T_POKEMONIREKAE.jpg","https://www.pokemon-card.com/assets/images/card_images/large/S11a/042022_T_POKEMONIREKAE.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SMP/035397_T_ENERUGISUPINA.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SMP/035397_T_ENERUGISUPINA.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SC2/038902_T_RISETTOSUTANPU.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM11a/036956_T_GURETOKYACCHA.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SK/041125_T_OOKINAOMAMORI.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SK/041125_T_OOKINAOMAMORI.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SK/041126_T_FUUSEN.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SK/041126_T_FUUSEN.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SA/037595_T_HAKASENOKENKYUUMAGUNORIAHAKASE.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SA/037595_T_HAKASENOKENKYUUMAGUNORIAHAKASE.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SA/037595_T_HAKASENOKENKYUUMAGUNORIAHAKASE.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SA/037595_T_HAKASENOKENKYUUMAGUNORIAHAKASE.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SK/041131_T_MARII.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SK/041131_T_MARII.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SK/041131_T_MARII.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SK/041131_T_MARII.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12/037155_T_KONTONNOUNERI.jpg","https://www.pokemon-card.com/assets/images/card_images/large/SM12/037155_T_KONTONNOUNERI.jpg"],I=()=>{const a=W(V);z({sides:[i({cards:a.splice(0,6),flipped:!0})],hand:a.splice(0,7).map(s=>i({cards:[s]})),deck:[i({cards:a,flipped:!0})],field:[],graveyard:[i({cards:[]})],bench:[],exploring:[]})},Z=()=>(v(()=>I(),[]),p(L,{children:[p(Y,{children:[p(l,{onClick:B,disabled:!X(),children:"一手戻す"}),p(l,{onClick:D,disabled:!y(),children:"一手進む"}),p(l,{onClick:()=>J(["field","lands"]),children:"アンタップ"}),p(l,{onClick:I,children:"リセット"})]}),p(F,{...Q})]})),u=document.getElementById("dmplayground");document.body.append(u);b(p(Z,{}),u);

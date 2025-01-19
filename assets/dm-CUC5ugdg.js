import{s as k,g as c,a as p,d as r,t as f,m as g,b as i,c as S,e as T,p as m,f as B,h as D,i as u,j as b,u as y,k as G,l as L,n as R,D as _,o as t,y as F,F as P,B as M,q as z,P as A,r as O,v as q,w as I,x as v}from"./drag-drop-touch.esm.min-B3PT6zON.js";const W=[[{area:"field",label:"場",expandThreshold:8}],[{area:"shields",label:"シールド",expandThreshold:5},{area:"deck",label:"デッキ",width:1},{area:"graveyard",label:"墓地",width:1},{area:"grdeck",label:"GR",width:1,optional:!0},{area:"exdeck",label:"超次元",width:1,optional:!0}],[{area:"lands",label:"マナ"},{area:"exploring",label:"めくられた",optional:!0}],[{area:"hand",label:"手札",expandThreshold:5}]],h=(d,e)=>S(d,e,(n,l,a)=>{l==="graveyard"||l==="exdeck"?m(d,e,l,a??0):l==="deck"||l==="grdeck"||a!=null?p(n,[["🫳 上に置く",()=>m(d,e,l,a??0)],["🫴 下に入れる",()=>G(d,e,l,a??0)]]):L(d,e,l,{reversed:l==="lands"})}),j=(d,e,n)=>S(d,e,(l,a,o)=>{a==="graveyard"||a==="exdeck"?u(d,e,0,a,o??0,n):a==="deck"||a==="grdeck"||o!=null?p(l,[["🫳 上に置く",()=>u(d,e,0,a,o??0,n)],["🫴 下に入れる",()=>y(d,e,0,a,o??0,n)]]):g(d,e,0,a,n,{reversed:a==="lands"})}),s=(d,e,n,l=!1)=>{T(d,e,n,a=>({onClick:o=>p(o,[["🔍 拡大",()=>k(o,c.value[e][n].cards[a])],["⚔️ 場に出す",()=>g(e,n,a,"field",l)],["🛡️ シールドに追加",()=>g(e,n,a,"shields",l)],["🫳 デッキの上に置く",()=>u(e,n,a,"deck",0,l)],["🫴 デッキの下に入れる",()=>y(e,n,a,"deck",0,l)],["🪦 墓地に送る",()=>u(e,n,a,"graveyard",0,l)],["🎰 GRゾーンに置く",()=>y(e,n,a,"grdeck",0,l)],["⚡ 超次元ゾーンに置く",()=>u(e,n,a,"exdeck",0,l)],["⛰️ マナに追加",()=>g(e,n,a,"lands",l,{reversed:!0})],["🃏 手札に加える",()=>g(e,n,a,"hand",l)]]),onContextMenu:o=>p(o,[["🔍 拡大",()=>k(o,c.value[e][n].cards[a])],["⚔️ 場に出す",()=>g(e,n,a,"field",l)],["🛡️ シールドに追加",()=>g(e,n,a,"shields",l)],["🫳 デッキの上に置く",()=>u(e,n,a,"deck",0,l)],["🫴 デッキの下に入れる",()=>y(e,n,a,"deck",0,l)],["🪦 墓地に送る",()=>u(e,n,a,"graveyard",0,l)],["🎰 GRゾーンに置く",()=>y(e,n,a,"grdeck",0,l)],["⚡ 超次元ゾーンに置く",()=>u(e,n,a,"exdeck",0,l)],["⛰️ マナに追加",()=>g(e,n,a,"lands",l,{reversed:!0})],["🃏 手札に加える",()=>g(e,n,a,"hand",l)]])}))},$={field:{stack:d=>({onClick:e=>k(e,c.value.field[d].cards[0]),onContextMenu:e=>p(e,[["✅ タップ",()=>i("field",d)],["⚡ 超次元ゾーン送り",()=>m("field",d,"exdeck",0)],["⬅️ 横向きにする",()=>B("field",d)],["↕️ 上下反転する",()=>D("field",d)],["🔄 裏返す",()=>f("field",d)],["👀 重なっているカード",n=>s(n,"field",d)]]),...r("field",d),...h("field",d)}),area:{...r("field",null)}},shields:{stack:d=>({onClick:e=>{c.value.shields[d].flipped?f("shields",d):k(e,c.value.shields[d].cards[0])},onContextMenu:e=>p(e,[["⚡ 超次元ゾーン送り",()=>m("shields",d,"exdeck",0)],["🔄 裏返す",()=>f("shields",d)],["👀 重なっているカード",n=>s(n,"shields",d)]]),...r("shields",d),...h("shields",d)}),area:{...r("shields",null)}},deck:{stack:d=>({onClick:e=>g("deck",d,0,"exploring",!0),onContextMenu:e=>p(e,[["⚡ 超次元送り",()=>u("deck",d,0,"exdeck",0)],["🤏 ボトムから引く",()=>g("deck",d,-1,"hand",!0)],["♻️ シャッフル",()=>b("deck",d)],["👀 リスト",n=>s(n,"deck",d,!0)]]),...r("deck",d),...j("deck",d,!0)}),area:{...r("deck",null)}},graveyard:{stack:d=>({onClick:e=>s(e,"graveyard",d,!0),onContextMenu:e=>s(e,"graveyard",d,!0),...r("graveyard",d),...j("graveyard",d,!0)}),area:{...r("graveyard",null)}},grdeck:{stack:d=>({onClick:e=>g("grdeck",d,0,"exploring",!0),onContextMenu:e=>p(e,[["♻️ シャッフル",()=>b("grdeck",d)],["👀 リスト",n=>s(n,"grdeck",d,!0)]]),...r("grdeck",d),...j("grdeck",d,!0)}),area:{...r("grdeck",null)}},exdeck:{stack:d=>({onClick:e=>s(e,"exdeck",d),onContextMenu:e=>s(e,"exdeck",d),...r("exdeck",d),...j("exdeck",d,!0)}),area:{...r("exdeck",null)}},lands:{stack:d=>({onClick:()=>i("lands",d),onContextMenu:e=>p(e,[["🔍 拡大",()=>k(e,c.value.lands[d].cards[0])],["⚡ 超次元送り",()=>m("lands",d,"exdeck",0)],["🔄 裏返す",()=>f("lands",d)],["👀 重なっているカード",n=>s(n,"lands",d)]]),...r("lands",d),...h("lands",d)}),area:{...r("lands",null)}},hand:{stack:d=>({onClick:e=>k(e,c.value.hand[d].cards[0]),onContextMenu:e=>p(e,[["⚡ 超次元送り",()=>m("hand",d,"exdeck",0)],["👀 重なっているカード",n=>s(n,"hand",d)]]),...r("hand",d),...h("hand",d)}),area:{...r("hand",null)}},exploring:{stack:d=>({onClick:e=>k(e,c.value.exploring[d].cards[0]),onContextMenu:e=>p(e,[["⚡ 超次元送り",()=>m("exploring",d,"exdeck",0)],["👀 重なっているカード",n=>s(n,"hand",d)]]),...r("exploring",d),...h("exploring",d)}),area:{...r("exploring",null)}}},J=Object.freeze(Object.defineProperty({__proto__:null,handlers:$,rows:W},Symbol.toStringTag,{value:"Module"}));R(void 0,void 0,{pressHoldDelayMS:300,contextMenuDelayMS:400});const K=["/dmplayground/dm24sp2-013.jpg","/dmplayground/dm24sp2-013.jpg","/dmplayground/dm24sp2-013.jpg","/dmplayground/dm24sp2-013.jpg","/dmplayground/dm23bd5-060.jpg","/dmplayground/dm23bd5-060.jpg","/dmplayground/dm23bd5-060.jpg","/dmplayground/dm23bd5-060.jpg","/dmplayground/dm24sp2-010.jpg","/dmplayground/dm24sp2-010.jpg","/dmplayground/dm24sp2-010.jpg","/dmplayground/dm24sp2-010.jpg","/dmplayground/dm23ex3-030.jpg","/dmplayground/dm23ex3-030.jpg","/dmplayground/dm23ex3-030.jpg","/dmplayground/dm23ex3-030.jpg","/dmplayground/dm23ex3-029.jpg","/dmplayground/dm23ex3-029.jpg","/dmplayground/dm23ex3-029.jpg","/dmplayground/dm23ex3-029.jpg","/dmplayground/dm24sp2-009.jpg","/dmplayground/dm24sp2-009.jpg","/dmplayground/dm24sp2-009.jpg","/dmplayground/dm24sp2-009.jpg","/dmplayground/dm23ex3-008.jpg","/dmplayground/dm23ex3-008.jpg","/dmplayground/dm24sp2-002.jpg","/dmplayground/dm24sp2-002.jpg","/dmplayground/dm24sp2-002.jpg","/dmplayground/dm23ex3-002.jpg","/dmplayground/dm23ex3-002.jpg","/dmplayground/dm23ex3-002.jpg","/dmplayground/dm23ex3-002.jpg","/dmplayground/dm24sp2-003.jpg","/dmplayground/dm24sp2-003.jpg","/dmplayground/dm24sp2-003.jpg","/dmplayground/dm24sp2-003.jpg","/dmplayground/dm24sp2-001.jpg","/dmplayground/dm24sp2-001.jpg","/dmplayground/dm24sp2-001.jpg"],C=()=>{const d=q(K);I({field:[],lands:[],graveyard:[v({cards:[]})],hand:d.splice(0,5).map(e=>v({cards:[e]})),shields:d.splice(0,5).map(e=>v({cards:[e],flipped:!0})),deck:[v({cards:d,flipped:!0})],grdeck:[],exdeck:[],exploring:[]})},N=()=>(F(()=>C(),[]),t(O,{children:[t(P,{children:[t(M,{onClick:()=>z(["field","lands"]),children:"アンタップ"}),t(M,{onClick:C,children:"リセット"})]}),t(A,{initialize:C,...J})]})),H=document.getElementById("dmplayground");document.body.append(H);_(t(N,{}),H);

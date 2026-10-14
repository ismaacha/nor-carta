/* Arranque y barra superior */
(function(N){
"use strict";

var bar=N.$("topbar");

function labels(){
  N.$("skip").textContent=N.t("skip");
  N.$("tbCode").textContent=N.CODE[N.L.indexOf(N.state.lang)];
  N.$("tbSet").setAttribute("aria-label",N.t("settings")+" · "+N.t("language"));
  N.$("tbSearch").setAttribute("aria-label",N.t("search"));
  N.$("tbBack").setAttribute("aria-label",N.t("back"));
  N.$("tbHome").setAttribute("aria-label",N.t("home"));
  N.$("tbLogo").setAttribute("aria-label","Restaurante Nor · "+N.t("home"));
}

/* La barra es transparente sobre la cabecera y se vuelve sólida al bajar.
   En un apartado muestra la flecha de volver y el nombre del apartado. */
function update(){
  var onCat=N.route.name==="cat";
  var ref=onCat?document.querySelector(".cat-hero"):N.$("hero");
  var limit=ref?ref.offsetHeight-bar.offsetHeight-10:200;
  var solid=window.scrollY>limit;
  bar.classList.toggle("solid",solid);
  bar.classList.toggle("on-cat",onCat);
  bar.classList.toggle("over-photo",onCat&&!solid);
}
function onRoute(){
  var t=N.$("tbTitle");
  t.textContent=N.route.name==="cat"?N.T(N.CAT[N.route.id].n):"";
  update();
}

var ticking=false;
window.addEventListener("scroll",function(){
  if(ticking)return;ticking=true;
  requestAnimationFrame(function(){ticking=false;update();});
},{passive:true});
window.addEventListener("resize",update);

N.$("tbHome").addEventListener("click",function(){N.router.home();});
N.$("tbBack").addEventListener("click",function(){
  if(history.length>1&&N.route.cameFromHome)history.back();else location.hash="#/";
});
N.on("route",function(){
  onRoute();
});

/* "Volver" usa el historial si se llegó desde la portada; si se entró directo, va a la portada */
var lastName=null;
N.on("route",function(){
  if(N.route.name==="cat")N.route.cameFromHome=lastName==="home"||lastName==="cat";
  lastName=N.route.name;
});

N.on("lang",function(){labels();onRoute();document.title=(N.route.name==="cat"?N.T(N.CAT[N.route.id].n):N.t("menu"))+" · Restaurante Nor";});
N.on("prefs",update);

if(window.matchMedia){
  var mq=matchMedia("(prefers-color-scheme: dark)");
  var onScheme=function(){if(N.state.theme==="auto")N.applyPrefs();};
  if(mq.addEventListener)mq.addEventListener("change",onScheme);else if(mq.addListener)mq.addListener(onScheme);
}

N.applyPrefs();
labels();
N.home.render();
N.router.start();

})(window.NOR=window.NOR||{});

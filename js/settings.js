/* Hoja inferior de ajustes: idioma, tamaño del texto y aspecto */
(function(N){
"use strict";

var isOpen=false;

function build(){
  var st=N.state,h="";
  h+='<div class="shead" data-drag><h2 id="sheetT">'+N.t("settings")+'</h2>'+
     '<button class="x" type="button" data-x aria-label="'+N.esc(N.t("close"))+'">'+N.IC.x+'</button></div>';
  h+='<div class="grp"><h3>'+N.t("language")+'</h3><div class="lgrid">'+N.L.map(function(l,i){
    return '<button class="lrow" type="button" lang="'+l+'" data-l="'+l+'" aria-pressed="'+(l===st.lang)+'"><b>'+N.CODE[i]+'</b><span>'+N.NATIVE[i]+'</span></button>';
  }).join("")+'</div></div>';
  h+='<div class="grp"><h3>'+N.t("textsize")+'</h3><div class="seg">'+["0.9em","1.1em","1.35em"].map(function(fs,i){
    return '<button type="button" data-s="'+i+'" aria-pressed="'+(st.size===i)+'" aria-label="'+["100%","112%","125%"][i]+'" style="font-size:'+fs+'">A</button>';
  }).join("")+'</div></div>';
  h+='<div class="grp"><h3>'+N.t("theme")+'</h3><div class="seg">'+["auto","light","dark"].map(function(k){
    return '<button type="button" data-th="'+k+'" aria-pressed="'+(st.theme===k)+'">'+N.t(k)+'</button>';
  }).join("")+'</div></div>';
  N.$("sbody").innerHTML=h;
}

function rebuild(){
  if(!isOpen)return;
  var a=document.activeElement,key=null;
  if(a&&a.dataset){["l","s","th"].some(function(k){if(a.dataset[k]!==undefined){key=[k,a.dataset[k]];return true;}return false;});}
  build();
  if(key){var el=N.$("sbody").querySelector("[data-"+key[0]+'="'+key[1]+'"]');if(el)el.focus({preventScroll:true});}
}

function open(){
  if(isOpen)return;
  isOpen=true;build();
  var s=N.$("scrim");
  s.hidden=false;void s.offsetWidth;s.classList.add("open");
  N.layer.open("sheet",hide,N.$("sheet"));
  var x=N.$("sheet").querySelector(".x");if(x)x.focus({preventScroll:true});
}
function hide(){
  isOpen=false;
  var s=N.$("scrim"),sh=N.$("sheet");
  s.classList.remove("open");sh.style.transform="";
  setTimeout(function(){if(!isOpen)s.hidden=true;},N.reduce?0:320);
}

N.settings={open:open};
N.on("lang",rebuild);
N.on("prefs",rebuild);

document.addEventListener("click",function(e){
  var b=e.target.closest("button");if(!b)return;
  if(b.hasAttribute("data-settings")){open();return;}
  if(!N.$("sheet").contains(b))return;
  var ds=b.dataset;
  if(ds.x!==undefined){N.layer.close();return;}
  if(ds.l){N.setPref("lang",ds.l);return;}
  if(ds.s!==undefined){N.setPref("size",+ds.s);return;}
  if(ds.th){N.setPref("theme",ds.th);return;}
});

/* Cerrar tocando fuera o arrastrando hacia abajo */
(function(){
  var scrim=N.$("scrim"),sh=N.$("sheet"),drag=null;
  scrim.addEventListener("click",function(e){if(e.target===scrim)N.layer.close();});
  sh.addEventListener("pointerdown",function(e){
    if(!e.target.closest("[data-drag]")||e.target.closest("button")||e.button>0)return;
    drag={y:e.clientY,dy:0,id:e.pointerId};
    try{sh.setPointerCapture(e.pointerId);}catch(_){}
    sh.style.transition="none";
  });
  sh.addEventListener("pointermove",function(e){
    if(!drag||e.pointerId!==drag.id)return;
    drag.dy=Math.max(0,e.clientY-drag.y);
    sh.style.transform="translateY("+drag.dy+"px)";
  });
  function end(){
    if(!drag)return;
    var d=drag;drag=null;sh.style.transition="";
    if(d.dy>90)N.layer.close();else sh.style.transform="";
  }
  sh.addEventListener("pointerup",end);
  sh.addEventListener("pointercancel",end);
})();

})(window.NOR=window.NOR||{});

/* Navegación por #/ : portada (#/) y apartado (#/c/<id>?d=<plato>) */
(function(N){
"use strict";

var homeScroll=0;
N.route={name:null};

function parse(){
  var h=location.hash.replace(/^#\/?/,""),q=h.split("?"),params={};
  (q[1]||"").split("&").forEach(function(p){
    if(!p)return;var kv=p.split("=");
    try{params[decodeURIComponent(kv[0])]=decodeURIComponent(kv[1]||"");}catch(e){}
  });
  return {parts:q[0].split("/").filter(Boolean),params:params};
}

function show(name){
  ["home","cat"].forEach(function(v){
    var el=N.$("view-"+v),on=v===name;
    el.hidden=!on;
    if(on&&N.route.name&&N.route.name!==name&&!N.reduce){
      el.classList.remove("enter");void el.offsetWidth;el.classList.add("enter");
    }
  });
}

function render(){
  var r=parse(),prev=N.route.name;
  var html=document.documentElement,sb=html.style.scrollBehavior;
  html.style.scrollBehavior="auto";
  if(r.parts[0]==="c"&&N.CAT[r.parts[1]]){
    if(prev==="home")homeScroll=window.scrollY;
    N.category.render(r.parts[1],r.params.d||null);
    show("cat");
    N.route={name:"cat",id:r.parts[1],dish:r.params.d||null};
    window.scrollTo(0,0);
    N.category.focusDish();
    document.title=N.T(N.CAT[r.parts[1]].n)+" · Restaurante Nor";
  }else{
    show("home");
    N.route={name:"home"};
    window.scrollTo(0,prev&&prev!=="home"?homeScroll:0);
    document.title=N.t("menu")+" · Restaurante Nor";
  }
  html.style.scrollBehavior=sb;
  N.emit("route");
}

N.router={
  start:function(){window.addEventListener("hashchange",render);render();},
  refresh:render,
  /* Ir a la portada, arriba del todo */
  home:function(){homeScroll=0;if(location.hash.replace(/^#\/?/,"")==="")render();else location.hash="#/";}
};

})(window.NOR=window.NOR||{});

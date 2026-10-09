/* Portada: cabecera NOR, carrusel de destacados y apartados de la carta */
(function(N){
"use strict";

var booted=false,slider=null;

function hero(){
  var r=booted?"":" rise";
  var total=N.ITEMS.length;
  return '<section class="hero" id="hero">'+
    '<div class="hero-bg" aria-hidden="true"><div class="zellige"></div></div>'+
    '<div class="wrap hero-in">'+
      '<h1 class="wm'+r+'" style="--d:0" aria-label="Restaurante Nor"><span aria-hidden="true">N</span><svg aria-hidden="true"><use href="#star"/></svg><span aria-hidden="true">R</span></h1>'+
      '<p class="carta-word'+r+'" style="--d:1">'+N.t("menu")+'</p>'+
      '<p class="tagline'+r+'" style="--d:2">'+N.t("tagline")+'</p>'+
      '<button class="search-cta'+r+'" style="--d:3" type="button" data-search>'+N.IC.search+
        '<span>'+N.t("searchCta")+'</span><span class="go" aria-hidden="true">'+N.IC.arrow+'</span></button>'+
      '<p class="stats'+r+'" style="--d:4"><span><b>'+total+'</b> '+N.t("dishes")+'</span><i aria-hidden="true"></i><span><b>'+N.CATS.length+'</b> '+N.t("sections")+'</span></p>'+
    '</div></section>';
}

function featured(){
  var list=N.FEATURED.map(function(id){return N.BY[id];}).filter(Boolean);
  if(!list.length)return "";
  var n=list.length;
  return '<section class="feat" id="feat" aria-roledescription="carousel" aria-label="'+N.esc(N.t("featTitle"))+'">'+
    '<div class="wrap sec-head"><div><p class="kicker">'+N.t("featKicker")+'</p><h2 class="sec-title">'+N.t("featTitle")+'</h2></div>'+
      '<div class="sl-ctrl"><button type="button" data-sl="-1" aria-label="'+N.esc(N.t("prev"))+'">'+N.IC.prev+'</button>'+
      '<button type="button" data-sl="1" aria-label="'+N.esc(N.t("next"))+'">'+N.IC.next+'</button></div></div>'+
    '<div class="track" id="track">'+list.map(function(it,i){
      var c=N.CAT[it.c];
      return '<a class="slide'+(i===0?" active":"")+'" href="#/c/'+c.id+'?d='+it.id+'" style="--cat:'+c.col+'" aria-roledescription="slide" aria-label="'+N.esc(N.T(it.n)+" · "+(i+1)+" / "+n)+'">'+
        N.media(N.dishImg(it),"",c.col,i===0)+
        '<span class="slide-top"><span class="tag"><i aria-hidden="true"></i>'+N.T(c.n)+'</span><span class="slide-num" aria-hidden="true" dir="ltr">'+N.pad(i+1)+' / '+N.pad(n)+'</span></span>'+
        '<span class="slide-body"><span class="slide-name">'+N.T(it.n)+'</span>'+N.orig(it,"span","slide-es")+
          '<span class="slide-foot"><span class="slide-pr">'+N.price(it.p)+'</span><span class="round" aria-hidden="true">'+N.IC.arrow+'</span></span></span>'+
      '</a>';
    }).join("")+'</div>'+
    '<div class="wrap progress" id="prog">'+list.map(function(it,i){
      return '<button type="button" data-dot="'+i+'" aria-label="'+N.esc(N.t("slide")+" "+(i+1))+'"'+(i===0?' class="cur" aria-current="true"':"")+'><i></i></button>';
    }).join("")+'</div>'+
  '</section>';
}

function cards(){
  var n=N.CATS.length;
  return '<section class="carta" id="carta">'+
    '<div class="wrap sec-head"><div><p class="kicker">'+N.t("menuKicker")+'</p><h2 class="sec-title">'+N.t("menuTitle")+'</h2></div>'+
      '<p class="sec-aside">'+N.count(n,"section","sections")+'</p></div>'+
    '<div class="wrap cards">'+N.CATS.map(function(c,i){
      var half=c.id==="postres"||c.id==="bebidas";
      return '<a class="card rv'+(half?" half":"")+'" href="#/c/'+c.id+'" style="--cat:'+c.col+';--i:'+(i%2)+'">'+
        N.media(N.catImg(c),"",c.col)+
        '<span class="card-num" aria-hidden="true" dir="ltr">'+N.pad(i+1)+'</span>'+
        '<span class="card-in"><span class="card-meta">'+N.count(c.items.length)+'</span>'+
          '<span class="card-name">'+N.T(c.n)+'</span>'+(half?"":'<span class="card-sub">'+N.T(c.sub)+'</span>')+'</span>'+
        '<span class="card-go" aria-hidden="true">'+N.IC.next+'</span>'+
      '</a>';
    }).join("")+'</div></section>';
}

function render(){
  N.$("view-home").innerHTML=hero()+featured()+'<div class="band" aria-hidden="true"></div>'+cards()+
    '<footer class="foot"><svg aria-hidden="true"><use href="#star"/></svg><span>Restaurante Nor · Reus</span></footer>';
  booted=true;
  if(slider)slider.destroy();
  slider=Slider(N.$("feat"));
  N.reveal(N.$("view-home"));
}

/* ---------- Carrusel ----------
   Avanza solo (barras de progreso), se pausa al tocarlo o si no está a la vista. */
function Slider(root){
  if(!root)return null;
  var track=root.querySelector(".track"),slides=[].slice.call(track.children),
      dots=[].slice.call(root.querySelectorAll("[data-dot]")),n=slides.length,idx=0,
      hold=false,visible=true,scrollT=null,lock=false,io=null;
  if(N.reduce)root.classList.add("static");

  function setActive(i){
    idx=i;
    slides.forEach(function(s,k){s.classList.toggle("active",k===i);});
    dots.forEach(function(d,k){
      d.classList.toggle("done",k<i);
      d.classList.remove("cur");d.removeAttribute("aria-current");
      if(k===i){void d.offsetWidth;d.classList.add("cur");d.setAttribute("aria-current","true");}
    });
  }
  function goTo(i,smooth){
    i=(i+n)%n;
    var tr=track.getBoundingClientRect(),sr=slides[i].getBoundingClientRect();
    var pad=parseFloat(getComputedStyle(track).paddingInlineStart)||16;
    var dx=N.rtl()?(sr.right-tr.right+pad):(sr.left-tr.left-pad);
    lock=true;clearTimeout(scrollT);scrollT=setTimeout(function(){lock=false;},700);
    try{track.scrollBy({left:dx,behavior:smooth&&!N.reduce?"smooth":"auto"});}catch(e){track.scrollLeft+=dx;}
    setActive(i);
  }
  function nearest(){
    var tr=track.getBoundingClientRect(),c=N.rtl()?tr.right:tr.left,best=0,bd=1e9;
    slides.forEach(function(s,k){
      var r=s.getBoundingClientRect(),d=Math.abs((N.rtl()?r.right:r.left)-c);
      if(d<bd){bd=d;best=k;}
    });
    return best;
  }
  function paused(){root.classList.toggle("paused",hold||!visible||document.hidden);}

  function onScroll(){
    if(lock)return;
    clearTimeout(scrollT);
    scrollT=setTimeout(function(){var k=nearest();if(k!==idx)setActive(k);},90);
  }
  function onEnd(e){if(e.target.parentNode===dots[idx]&&e.animationName==="fill")goTo(idx+1,true);}
  function down(){hold=true;paused();}
  function up(){hold=false;paused();}
  function onVis(){paused();}

  track.addEventListener("scroll",onScroll,{passive:true});
  root.addEventListener("animationend",onEnd);
  track.addEventListener("pointerdown",down);
  window.addEventListener("pointerup",up);
  track.addEventListener("pointercancel",up);
  root.addEventListener("focusin",down);
  root.addEventListener("focusout",up);
  document.addEventListener("visibilitychange",onVis);
  if("IntersectionObserver" in window){
    io=new IntersectionObserver(function(es){visible=es[0].isIntersecting;paused();},{threshold:.35});
    io.observe(track);
  }
  root.addEventListener("click",function(e){
    var b=e.target.closest("[data-sl],[data-dot]");if(!b)return;
    if(b.dataset.sl)goTo(idx+(+b.dataset.sl),true);
    else goTo(+b.dataset.dot,true);
  });
  setActive(0);

  return {destroy:function(){
    window.removeEventListener("pointerup",up);
    document.removeEventListener("visibilitychange",onVis);
    if(io)io.disconnect();
  }};
}

N.home={render:render};
N.on("lang",render);

})(window.NOR=window.NOR||{});

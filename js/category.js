/* Página de apartado.
   PROVISIONAL: listado sencillo. En el bloque 2 se sustituye por la vista con
   slides de cada plato y desglose de ingredientes. */
(function(N){
"use strict";

var cur=null,dish=null;

function render(id,d){
  cur=id;dish=d;
  var c=N.CAT[id],i=c.i,n=N.CATS.length;
  var prev=N.CATS[(i-1+n)%n],next=N.CATS[(i+1)%n];
  var h='<section class="cat-hero" style="--cat:'+c.col+'">'+N.media(N.catImg(c),"",c.col,true)+
    '<div class="wrap cat-hero-in"><p class="kicker light"><span dir="ltr">'+N.pad(i+1)+' / '+N.pad(n)+'</span></p>'+
    '<h1 class="cat-title">'+N.T(c.n)+'</h1><p class="cat-sub">'+N.T(c.sub)+'</p>'+
    '<span class="card-meta">'+N.count(c.items.length)+'</span></div></section>';
  h+='<div class="wrap cat-body" style="--cat:'+c.col+'">';
  if(c.note)h+='<p class="cat-note">'+N.T(c.note)+'</p>';
  h+='<ul class="dlist">'+c.items.map(function(it){
    return '<li class="dl" id="d-'+it.id+'">'+N.media(N.dishImg(it),"",c.col)+
      '<div class="dl-tx"><h2>'+N.T(it.n)+'</h2>'+N.orig(it,"p","dl-es")+(it.d?'<p class="dl-desc">'+N.T(it.d)+'</p>':"")+'</div>'+
      '<span class="dl-pr">'+N.price(it.p)+'</span></li>';
  }).join("")+'</ul>';
  h+='<p class="s-label">'+N.t("otherCats")+'</p><nav class="cat-nav">'+[prev,next].map(function(o,k){
    return '<a class="card half mini" href="#/c/'+o.id+'" style="--cat:'+o.col+'">'+N.media(N.catImg(o),"",o.col)+
      '<span class="card-in"><span class="card-meta">'+(k?N.t("next"):N.t("prev"))+'</span><span class="card-name">'+N.T(o.n)+'</span></span>'+
      '<span class="card-go" aria-hidden="true">'+(k?N.IC.next:N.IC.prev)+'</span></a>';
  }).join("")+'</nav></div>';
  h+='<footer class="foot"><svg aria-hidden="true"><use href="#star"/></svg><span>Restaurante Nor · Reus</span></footer>';
  N.$("view-cat").innerHTML=h;
}

function focusDish(){
  if(!dish)return;
  var el=N.$("d-"+dish);if(!el)return;
  var top=el.getBoundingClientRect().top+window.scrollY-(N.$("topbar").offsetHeight+20);
  window.scrollTo(0,Math.max(0,top));
  el.classList.remove("flash");void el.offsetWidth;el.classList.add("flash");
}

N.category={render:render,focusDish:focusDish};
N.on("lang",function(){if(N.route.name==="cat"){var y=window.scrollY;render(cur,dish);window.scrollTo(0,y);}});

})(window.NOR=window.NOR||{});

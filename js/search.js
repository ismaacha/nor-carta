/* Buscador a pantalla completa: sugerencias al abrir, resultados agrupados por apartado */
(function(N){
"use strict";

var isOpen=false,query="",raw="",tag=null;
var box=N.$("search");

function matches(it){
  if(tag&&it.t.indexOf(tag)<0)return false;
  if(query&&it.hay.indexOf(query)<0)return false;
  return true;
}

function chips(){
  return '<div class="chipset row" role="group" aria-label="'+N.esc(N.t("filterBy"))+'">'+N.FT.map(function(f){
    return '<button class="fchip" type="button" data-tag="'+f.k+'" aria-pressed="'+(tag===f.k)+'" style="--c:'+f.col+'"><i aria-hidden="true"></i>'+N.t(f.k)+'</button>';
  }).join("")+'</div>';
}

function suggestions(){
  var h='<p class="s-label">'+N.t("filterBy")+'</p>'+chips();
  h+='<p class="s-label">'+N.t("menuTitle")+'</p><div class="s-cats">'+N.CATS.map(function(c){
    return '<a class="s-cat" href="#/c/'+c.id+'" data-go style="--cat:'+c.col+'">'+N.media(N.catImg(c),"","")+
      '<span class="s-cat-in"><b>'+N.T(c.n)+'</b><small>'+N.count(c.items.length)+'</small></span></a>';
  }).join("")+'</div>';
  h+='<p class="s-label">'+N.t("ideas")+'</p><div class="chipset">'+N.t("ideasList").map(function(w){
    return '<button class="fchip idea" type="button" data-idea="'+N.esc(w)+'">'+N.IC.search+N.esc(w)+'</button>';
  }).join("")+'</div>';
  return h;
}

function results(){
  var total=0,h="";
  N.CATS.forEach(function(c){
    var its=c.items.filter(matches);
    if(!its.length)return;
    total+=its.length;
    h+='<section class="r-group" style="--cat:'+c.col+'"><h3><i aria-hidden="true"></i>'+N.T(c.n)+'<span>'+its.length+'</span></h3><ul>'+
      its.map(function(it){
        return '<li><a class="res" href="#/c/'+c.id+'?d='+it.id+'" data-go>'+N.media(N.dishImg(it),"",c.col)+
          '<span class="res-tx"><b>'+N.T(it.n)+'</b>'+N.orig(it,"small","")+'</span>'+
          '<span class="res-pr">'+N.price(it.p)+'</span>'+N.IC.next+'</a></li>';
      }).join("")+'</ul></section>';
  });
  var top=chips()+'<p class="s-count" aria-live="polite">'+N.count(total)+'</p>';
  if(!total){
    return top+'<div class="s-empty"><svg aria-hidden="true"><use href="#star"/></svg><p>'+N.t("empty")+'</p>'+
      '<button class="btn-gold" type="button" data-reset>'+N.t("reset")+'</button></div>';
  }
  return top+h;
}

function renderBody(){
  var b=N.$("s-body"),y=b.scrollTop;
  b.innerHTML=(query||tag)?results():suggestions();
  b.scrollTop=(query||tag)?0:y;
  N.$("s-clr").hidden=!raw;
}

function build(){
  box.innerHTML='<div class="s-head">'+
    '<button class="s-back" type="button" data-sclose aria-label="'+N.esc(N.t("close"))+'">'+N.IC.back+'</button>'+
    '<label class="s-field">'+N.IC.search+'<span class="sr">'+N.t("search")+'</span>'+
    '<input id="s-q" type="search" enterkeyhint="search" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="'+N.esc(N.t("searchCta"))+'"></label>'+
    '<button class="s-clr" id="s-clr" type="button" hidden aria-label="'+N.esc(N.t("clear"))+'">'+N.IC.x+'</button>'+
    '</div><div class="s-body" id="s-body"></div>';
  box.setAttribute("aria-label",N.t("search"));
  var q=N.$("s-q");q.value=raw;
  q.addEventListener("input",function(){raw=q.value;query=N.norm(raw.trim());renderBody();});
  q.addEventListener("keydown",function(e){if(e.key==="Enter")q.blur();});
  renderBody();
}

function open(){
  if(isOpen)return;
  isOpen=true;build();
  box.hidden=false;void box.offsetWidth;box.classList.add("open");
  N.layer.open("search",hide,box);
  N.$("s-q").focus({preventScroll:true});
}
function hide(){
  isOpen=false;
  box.classList.remove("open");
  setTimeout(function(){if(!isOpen)box.hidden=true;},N.reduce?0:260);
}

N.search={open:open};
N.on("lang",function(){if(isOpen)build();});

document.addEventListener("click",function(e){
  var el=e.target.closest("button,a");if(!el)return;
  if(el.hasAttribute("data-search")){e.preventDefault();open();return;}
  if(!box.contains(el))return;
  var ds=el.dataset;
  if(ds.sclose!==undefined){N.layer.close();return;}
  if(el.id==="s-clr"){raw="";query="";N.$("s-q").value="";renderBody();N.$("s-q").focus();return;}
  if(ds.tag){tag=tag===ds.tag?null:ds.tag;renderBody();
    var b=box.querySelector('[data-tag="'+ds.tag+'"]');if(b)b.focus({preventScroll:true});return;}
  if(ds.idea){raw=ds.idea;query=N.norm(raw);N.$("s-q").value=raw;renderBody();return;}
  if(ds.reset!==undefined){raw="";query="";tag=null;N.$("s-q").value="";renderBody();N.$("s-q").focus();return;}
  if(ds.go!==undefined){
    e.preventDefault();
    var href=el.getAttribute("href");
    N.layer.close(function(){location.hash=href;});
  }
});

})(window.NOR=window.NOR||{});

/* Núcleo: estado, preferencias, formato, imágenes y capas (buscador, hojas) */
(function(N){
"use strict";

var L=N.L;

/* ---------- Almacenamiento ---------- */
var store=N.store={
  get:function(k,d){try{var v=localStorage.getItem(k);return v===null?d:JSON.parse(v);}catch(e){return d;}},
  set:function(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
};

/* ---------- Utilidades de texto ---------- */
N.norm=function(s){return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");};
N.slug=function(s){return N.norm(s).replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");};
N.esc=function(s){return String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");};
N.$=function(id){return document.getElementById(id);};
N.reduce=!!(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches);

/* ---------- Índices de datos ---------- */
N.BY={};N.CAT={};
N.CATS.forEach(function(c,i){c.i=i;c.items=[];N.CAT[c.id]=c;});
N.ITEMS.forEach(function(it){
  it.id=N.slug(it.n[0]);
  it.hay=N.norm(it.n.join(" ")+" "+(it.d?it.d.join(" "):""));
  N.BY[it.id]=it;
  N.CAT[it.c].items.push(it);
});

/* ---------- Estado y preferencias ---------- */
var st=N.state={};
(function(){
  var lang=null;
  try{var qp=new URLSearchParams(location.search).get("lang");if(L.indexOf(qp)>=0)lang=qp;}catch(e){}
  if(!lang)lang=store.get("nor-lang",null);
  if(L.indexOf(lang)<0){
    var nl=(navigator.languages||[navigator.language||"es"]).map(function(x){return String(x).slice(0,2).toLowerCase();});
    lang=nl.filter(function(x){return L.indexOf(x)>=0;})[0]||"en";
  }
  st.lang=lang;
  st.theme=store.get("nor-theme","auto");if(["auto","light","dark"].indexOf(st.theme)<0)st.theme="auto";
  st.size=store.get("nor-size",0);if([0,1,2].indexOf(st.size)<0)st.size=0;
})();

N.T=function(a){return a[L.indexOf(st.lang)];};
N.t=function(k){return N.T(N.UI[k]);};
N.rtl=function(){return st.lang==="ar";};

N.applyPrefs=function(){
  var r=document.documentElement;
  r.lang=st.lang;
  r.dir=N.rtl()?"rtl":"ltr";
  if(st.theme==="auto")r.removeAttribute("data-theme");else r.setAttribute("data-theme",st.theme);
  r.style.fontSize=["100%","112.5%","125%"][st.size];
  var bg=getComputedStyle(r).getPropertyValue("--bg").trim(),m=N.$("themeColor");
  if(bg&&m)m.setAttribute("content",bg);
};

/* Avisos simples entre módulos: N.on("lang", fn) / N.emit("lang") */
var subs={};
N.on=function(ev,fn){(subs[ev]=subs[ev]||[]).push(fn);};
N.emit=function(ev,arg){(subs[ev]||[]).forEach(function(fn){fn(arg);});};

N.setPref=function(k,v){
  st[k]=v;store.set("nor-"+k,v);N.applyPrefs();
  N.emit(k==="lang"?"lang":"prefs");
};

/* ---------- Formato ---------- */
function loc(l){l=l||st.lang;return l==="ar"?"ar-MA-u-nu-latn":l;}
function fmt(n,l,cur){
  var o={minimumFractionDigits:n%1?2:0,maximumFractionDigits:2};
  if(cur){o.style="currency";o.currency="EUR";}
  try{return new Intl.NumberFormat(loc(l),o).format(n);}catch(e){return cur?n+" €":String(n);}
}
N.eur=function(n,l){return fmt(Math.round(n*100)/100,l,true);};
N.price=function(p,l){return p.length===1?N.eur(p[0],l):p.slice(0,-1).map(function(x){return fmt(x,l);}).join(" / ")+" / "+N.eur(p[p.length-1],l);};
N.count=function(n,one,many){return n+" "+(n===1?N.t(one||"dish"):N.t(many||"dishes"));};
N.pad=function(n){return (n<10?"0":"")+n;};
/* Nombre en castellano bajo el nombre traducido (sin duplicar) */
N.orig=function(it,tag,cls){
  var es=it.n[0];
  return (st.lang!=="es"&&es!==N.T(it.n))?"<"+tag+' class="'+cls+'" lang="es" dir="ltr">'+es+"</"+tag+">":"";
};

/* ---------- Imágenes con respaldo ----------
   Orden: foto local -> foto de muestra -> degradado del color de la categoría */
N.catImg=function(c){
  return [c.img||"assets/img/categorias/"+c.id+".jpg",N.DEMO&&N.DEMO.cat[c.id]].filter(Boolean);
};
N.dishImg=function(it){
  return [it.img||"assets/img/platos/"+it.id+".jpg",N.DEMO&&N.DEMO.dish[it.id]].filter(Boolean);
};
N.media=function(srcs,cls,col,eager){
  return '<span class="media'+(cls?" "+cls:"")+'"'+(col?' style="--cat:'+col+'"':"")+'>'+
    '<img alt="" decoding="async"'+(eager?' fetchpriority="high"':' loading="lazy"')+
    ' data-srcs="'+N.esc(srcs.join("|"))+'" src="'+N.esc(srcs[0])+'"></span>';
};
document.addEventListener("load",function(e){
  var t=e.target;
  if(t.tagName==="IMG"&&t.dataset&&t.dataset.srcs!==undefined)t.classList.add("ok");
},true);
document.addEventListener("error",function(e){
  var t=e.target;
  if(t.tagName!=="IMG"||!t.dataset||t.dataset.srcs===undefined)return;
  var list=t.dataset.srcs.split("|"),i=(+t.dataset.i||0)+1;
  if(i<list.length){t.dataset.i=i;t.src=list[i];}
  else if(t.parentNode)t.parentNode.classList.add("noimg");
},true);

/* ---------- Iconos ---------- */
function ic(d,cls){return '<svg class="ic'+(cls?" "+cls:"")+'" viewBox="0 0 24 24" aria-hidden="true">'+d+"</svg>";}
N.IC={
  search:ic('<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>'),
  x:ic('<path d="M6 6l12 12M18 6L6 18"/>'),
  next:ic('<path d="M9 6l6 6-6 6"/>',"flip"),
  prev:ic('<path d="M15 6l-6 6 6 6"/>',"flip"),
  arrow:ic('<path d="M5 12h14M13 6l6 6-6 6"/>',"flip"),
  back:ic('<path d="M19 12H5M11 6l-6 6 6 6"/>',"flip"),
  globe:ic('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>')
};

/* ---------- Capas: buscador y hojas ----------
   Cada capa añade una entrada al historial, así el botón "atrás" del móvil la cierra. */
var stack=[],canHist=true,after=null;
function lock(){document.documentElement.classList.toggle("locked",stack.length>0);}
N.layer={
  open:function(name,hide,box){
    stack.push({name:name,hide:hide,box:box,focus:document.activeElement});
    lock();
    if(canHist){try{history.pushState({norLayer:stack.length},"");}catch(e){canHist=false;}}
  },
  close:function(then){
    if(!stack.length){if(then)then();return;}
    after=then||null;
    if(canHist)history.back();else pop();
  },
  top:function(){return stack.length?stack[stack.length-1]:null;}
};
function pop(){
  var l=stack.pop();if(!l)return;
  l.hide();lock();
  var f=after;after=null;
  if(f)f();
  else if(l.focus&&l.focus.focus&&document.contains(l.focus)){try{l.focus.focus({preventScroll:true});}catch(e){}}
}
window.addEventListener("popstate",function(){if(stack.length)pop();});

document.addEventListener("keydown",function(e){
  var top=N.layer.top();if(!top)return;
  if(e.key==="Escape"){e.preventDefault();N.layer.close();return;}
  if(e.key==="Tab"&&top.box){
    var f=[].slice.call(top.box.querySelectorAll("button:not([disabled]),a[href],input")).filter(function(x){return x.offsetParent!==null;});
    if(!f.length)return;
    var a=f[0],z=f[f.length-1],act=document.activeElement;
    if(e.shiftKey&&(act===a||!top.box.contains(act))){e.preventDefault();z.focus();}
    else if(!e.shiftKey&&(act===z||!top.box.contains(act))){e.preventDefault();a.focus();}
  }
});

/* Animación de entrada al hacer scroll */
N.reveal=function(root){
  var els=(root||document).querySelectorAll(".rv:not(.in)");
  if(!("IntersectionObserver" in window)||N.reduce){els.forEach(function(e){e.classList.add("in");});return;}
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});
  },{rootMargin:"0px 0px -6% 0px"});
  els.forEach(function(e){io.observe(e);});
};

})(window.NOR=window.NOR||{});

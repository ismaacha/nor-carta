/* =====================================================================
   FOTOS DE MUESTRA (Unsplash, licencia libre)
   Solo sirven para ver el diseño mientras no haya fotos propias.
   Si existe la foto local (assets/img/...), se usa la local.
   Cuando estén todas las fotos propias, borra este archivo y su
   <script> en index.html.
   ===================================================================== */
(function(N){
"use strict";
function U(id){return "https://images.unsplash.com/photo-"+id+"?auto=format&fit=crop&w=1200&q=70";}

N.DEMO={
  cat:{
    entradas:U("1511690743698-d9d85f2fbf38"),
    paellas:U("1763647738062-d83e44328a6f"),
    combinados:U("1603360946369-dc9bb6258143"),
    pescado:U("1519708227418-c8fd9a32b7a2"),
    tipicos:U("1761168955192-d710bf401325"),
    snacks:U("1568901346375-23c9450c58cd"),
    postres:U("1702728109878-c61a98d80491"),
    bebidas:U("1527960471264-932f39eb5846")
  },
  dish:{
    "paella-de-marisco":U("1779119381168-d75935e4742e"),
    "tajine-de-cordero-con-ciruelas":U("1773209927898-a0a7e0a13125"),
    "fritura-de-pescado-1-kg":U("1780823231663-6f08dde9b54c"),
    "calamares":U("1763467940825-d067fb3baf22"),
    "hamburguesa-o-chicken-burger":U("1586190848861-99aa4a171e90")
  }
};
})(window.NOR=window.NOR||{});

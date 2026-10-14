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
    /* Entradas */
    "ensalada-verde":U("1608032077018-c9aad9565d29"),
    "ensalada-de-verano":U("1592417817098-8fd3d9eb14a5"),
    "ensalada-rusa":U("1587471088253-421884425efb"),
    "ensalada-de-pasta":U("1473093295043-cdd812d0e601"),
    "ensalada-marroqui":U("1656853834420-51980b12a920"),
    "ensalada-de-pollo":U("1546069901-ba9599a7e63c"),
    "sopa-de-pescado":U("1571167366136-b57e07761625"),
    "sopa-marroqui-harira":U("1547592166-23ac45744acd"),
    "baisara":U("1613478881379-175a54184a27"),
    "lentejas":U("1648455320791-a667c8aab7e4"),
    "alubias":U("1698917467449-08bcd1d9014b"),
    "pastela-de-pollo":U("1647540239862-e87d53dec6bc"),
    "pastela-de-pescado":U("1546024664-9226c2d3819b"),
    /* Paellas */
    "paella-de-marisco":U("1779119381168-d75935e4742e"),
    "fideua":U("1539586345401-51d5bfba7ac0"),
    /* Platos combinados */
    "plato-de-pinchos-de-pollo":U("1705359573325-f2006d5e459f"),
    "plato-de-pinchos-de-ternera":U("1599487488170-d11ec9c172f0"),
    "plato-de-kefta":U("1763647818263-62a9256f097c"),
    "plato-de-higado-de-cordero":U("1762305196143-3a3bd09a87db"),
    "plato-de-pechuga-de-pollo":U("1670398564097-0762e1b30b3a"),
    "plato-de-alitas-de-pollo":U("1567620832903-9fc6debc209f"),
    "plato-de-costillas-de-cordero":U("1766589152455-22eb3ab8849e"),
    "plato-de-escalopa-de-pollo":U("1599921841143-819065a55cc6"),
    "plato-royal-5-variedades-de-carne":U("1555939594-58d7cb561ad1"),
    /* Pescado y marisco */
    "gambas-a-la-gallega":U("1691201659377-978b28daa417"),
    "gambas-a-la-plancha":U("1723325697529-6e2679650b39"),
    "dorada-a-la-plancha":U("1665401015549-712c0dc5ef85"),
    "dorada-al-ajillo":U("1765265432607-cdc1060294ba"),
    "lubina-a-la-plancha":U("1600699899970-b1c9fadd8f9e"),
    "calamares":U("1763467940825-d067fb3baf22"),
    "chipirones":U("1762305195844-94479ea6aca4"),
    "plato-de-salmon":U("1788240145923-e99729607216"),
    "salmonete-a-la-plancha":U("1556814901-18c866c057da"),
    "fritura-de-pescado-1-kg":U("1780823231663-6f08dde9b54c"),
    /* Platos típicos */
    "tajine-de-cordero-con-ciruelas":U("1773209927898-a0a7e0a13125"),
    "tajine-de-ternera-con-verduras":U("1643019237176-8ae0859f1123"),
    "tajine-de-pollo":U("1682370207954-c8a9cccaabb4"),
    "tajine-de-kefta":U("1661083098412-054431ab7112"),
    "tajine-de-conejo":U("1708782344071-35ed44b849a9"),
    "tajine-pil-pil":U("1758972572427-fc3d4193bbd2"),
    "cuscus-verduras-pollo-o-ternera":U("1607116685391-29c9e9726561"),
    "pollo-asado":U("1606728035253-49e8a23146de"),
    "medio-pollo-asado":U("1598103442097-8b74394b95c6"),
    "arroz-con-pollo":U("1603496987674-79600a000f55"),
    /* Snacks */
    "bocadillo-pollo-ternera-kefta-o-mixto":U("1554433607-66b5efe9d304"),
    "bocadillo-de-calamares":U("1738173689012-95fa988f684d"),
    "tacos-pollo-ternera-kefta-o-mixto":U("1731090389603-d63060ee08a6"),
    "tacos-de-gambas-o-calamares":U("1562059390-a761a084768e"),
    "hamburguesa-o-chicken-burger":U("1586190848861-99aa4a171e90"),
    "nuggets-con-ensalada-y-patatas-fritas":U("1646475696467-dea01be909d3"),
    /* Postres */
    "flan-casero":U("1653988354010-39637252a2db"),
    "porcion-de-tarta":U("1702745284678-2ae974a7f0aa"),
    "fruta-de-temporada":U("1523033904333-243d0283acae"),
    "helado":U("1567206563064-6f60f40a2b57"),
    /* Bebidas */
    "refresco":U("1554866585-cd94860890b7"),
    "refresco-botella-1-5-l":U("1594971475674-6a97f8fe8c2b"),
    "bebida-energetica":U("1622543925917-763c34d1a86e"),
    "red-bull":U("1570526427001-9d80d114054d"),
    "batido":U("1579954115545-a95591f28bfc"),
    "agua-pequena":U("1561041695-d2fadf9f318c"),
    "agua-grande":U("1523362628745-0c100150b504")
  }
};
})(window.NOR=window.NOR||{});

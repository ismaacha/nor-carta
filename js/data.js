/* =====================================================================
   DATOS DE LA CARTA · Restaurante Nor
   Idiomas, siempre en este orden: es, ca, en, fr, de, ar

   Para añadir un plato, una línea en N.ITEMS:
     I(categoría, [precios], [6 nombres], [etiquetas], descripción)
   - precios: [8] o [1.5, 3] si hay dos
   - etiquetas (filtros): "fish", "chicken", "lamb", "veal"
   - descripción: una entrada de N.D (o nada)

   FOTOS: no hace falta tocar este archivo. Basta con guardar la foto con
   el nombre del plato (ver assets/img/LEEME.md):
     assets/img/platos/<id-del-plato>.jpg
     assets/img/categorias/<id-de-categoria>.jpg
   ===================================================================== */
(function(N){
"use strict";

N.CATS=[
  {id:"entradas",col:"#7d9a48",
    n:["Entradas","Entrants","Starters","Entrées","Vorspeisen","المقبلات"],
    sub:["Ensaladas, sopas, legumbres y pastela","Amanides, sopes, llegums i pastela","Salads, soups, legumes and pastilla","Salades, soupes, légumineuses et pastilla","Salate, Suppen, Hülsenfrüchte und Pastilla","سلطات، شربة، قطاني وبسطيلة"]},
  {id:"paellas",col:"#e0a526",
    n:["Paellas","Paelles","Paellas","Paellas","Paellas","الباييا"],
    sub:["Paella de marisco y fideuà","Paella de marisc i fideuà","Seafood paella and fideuà","Paella aux fruits de mer et fideuà","Meeresfrüchte-Paella und Fideuà","باييا بفواكه البحر وفيديوا"]},
  {id:"combinados",col:"#c4523a",
    n:["Platos combinados","Plats combinats","Combo plates","Assiettes composées","Kombiteller","الأطباق المركبة"],
    sub:["Pinchos, kefta, cordero y pollo","Broquetes, kefta, xai i pollastre","Skewers, kefta, lamb and chicken","Brochettes, kefta, agneau et poulet","Spieße, Kefta, Lamm und Hähnchen","شوايا، كفتة، خروف ودجاج"]},
  {id:"pescado",col:"#2f7fa3",
    n:["Pescado y marisco","Peix i marisc","Fish & seafood","Poissons et fruits de mer","Fisch & Meeresfrüchte","الحوت وفواكه البحر"],
    sub:["Gambas, dorada, lubina, calamares y fritura","Gambes, orada, llobarro, calamars i fregit","Prawns, sea bream, sea bass, squid and fried fish","Crevettes, dorade, loup, calmars et friture","Garnelen, Dorade, Wolfsbarsch, Calamari und Frittiertes","قمرون، دوراد، لوبينا، كالامار وقلية"]},
  {id:"tipicos",col:"#c26a3a",
    n:["Platos típicos","Plats típics","Traditional dishes","Plats typiques","Traditionelle Gerichte","الأطباق التقليدية"],
    sub:["Tajines, cuscús y pollo asado","Tajines, cuscús i pollastre rostit","Tagines, couscous and roast chicken","Tajines, couscous et poulet rôti","Tajines, Couscous und Brathähnchen","طواجن، كسكس ودجاج مشوي"],
    note:["Tajines: guiso lento en olla de barro","Tajines: guisat lent en olla de fang","Tagines: slow-cooked stew in a clay pot","Tajines : mijotés lentement en terre cuite","Tajines: langsam im Tontopf geschmort","الطاجين: طبخ بطيء في إناء الطين"]},
  {id:"snacks",col:"#d08a2c",
    n:["Snacks","Snacks","Snacks","Snacks","Snacks","سناك"],
    sub:["Bocadillos, tacos, hamburguesas y nuggets","Entrepans, tacos, hamburgueses i nuggets","Sandwiches, tacos, burgers and nuggets","Sandwichs, tacos, burgers et nuggets","Sandwiches, Tacos, Burger und Nuggets","ساندويتشات، طاكوس، برغر وناجتس"]},
  {id:"postres",col:"#c76b8a",
    n:["Postres","Postres","Desserts","Desserts","Desserts","الحلويات"],
    sub:["Flan casero, tarta, fruta y helado","Flam casolà, pastís, fruita i gelat","Homemade flan, cake, fruit and ice cream","Flan maison, gâteau, fruits et glace","Hausgemachter Flan, Kuchen, Obst und Eis","فلان بيتي، حلوى، فواكه ومثلجات"]},
  {id:"bebidas",col:"#2fa094",
    n:["Bebidas","Begudes","Drinks","Boissons","Getränke","المشروبات"],
    sub:["Refrescos, agua y bebidas energéticas","Refrescos, aigua i begudes energètiques","Soft drinks, water and energy drinks","Sodas, eau et boissons énergisantes","Softdrinks, Wasser und Energydrinks","مشروبات غازية، ماء ومشروبات الطاقة"]}
];

/* Filtros por ingrediente (con su color) */
N.FT=[
  {k:"fish",col:"#3d8fb8"},
  {k:"chicken",col:"#d9a23a"},
  {k:"lamb",col:"#c4523a"},
  {k:"veal",col:"#8a5a3a"}
];

var D=N.D={
  kefta:["Carne picada especiada a la plancha","Carn picada especiada a la planxa","Spiced minced meat, grilled","Viande hachée épicée grillée","Gewürztes Hackfleisch vom Grill","لحم مفروم متبل مشوي"],
  harira:["Sopa de tomate con legumbres y especias","Sopa de tomàquet amb llegums i espècies","Tomato soup with legumes and spices","Soupe de tomate aux légumineuses et épices","Tomatensuppe mit Hülsenfrüchten und Gewürzen","شربة بالطماطم والقطاني والتوابل"],
  baisara:["Crema de habas con aceite de oliva y comino","Crema de faves amb oli d'oliva i comí","Fava bean purée with olive oil and cumin","Purée de fèves à l'huile d'olive et au cumin","Saubohnenpüree mit Olivenöl und Kreuzkümmel","كريمة الفول بزيت الزيتون والكمون"],
  pastelaP:["Hojaldre fino relleno de pollo","Full·lat fi farcit de pollastre","Thin flaky pastry filled with chicken","Feuilleté fin garni de poulet","Dünner Blätterteig mit Hähnchenfüllung","رقائق رقيقة محشوة بالدجاج"],
  pastelaF:["Hojaldre fino relleno de pescado","Full·lat fi farcit de peix","Thin flaky pastry filled with fish","Feuilleté fin garni de poisson","Dünner Blätterteig mit Fischfüllung","رقائق رقيقة محشوة بالحوت"],
  fideua:["Como una paella, pero con fideos","Com una paella, però amb fideus","Like paella, but made with noodles","Comme une paella, mais avec des vermicelles","Wie Paella, aber mit Nudeln","بحال الباييا ولكن بالشعرية"],
  cuscus:["Sémola de trigo al vapor","Sèmola de blat al vapor","Steamed wheat semolina","Semoule de blé à la vapeur","Gedämpfter Weizengrieß","سميد القمح على البخار"],
  tarta:["Pistacho · galleta","Pistatxo · galeta","Pistachio · cookie","Pistache · biscuit","Pistazie · Keks","فستق · بسكويت"]
};

function I(c,p,n,t,d,img){return{c:c,p:p,n:n,t:t||[],d:d||null,img:img||null};}
N.ITEMS=[
  I("entradas",[8],["Ensalada verde","Amanida verda","Green salad","Salade verte","Grüner Salat","سلطة خضراء"]),
  I("entradas",[8],["Ensalada de verano","Amanida d'estiu","Summer salad","Salade d'été","Sommersalat","سلطة الصيف"]),
  I("entradas",[8],["Ensalada rusa","Amanida russa","Russian salad","Salade russe","Russischer Salat","سلطة روسية"]),
  I("entradas",[8],["Ensalada de pasta","Amanida de pasta","Pasta salad","Salade de pâtes","Nudelsalat","سلطة المعكرونة"]),
  I("entradas",[8],["Ensalada marroquí","Amanida marroquina","Moroccan salad","Salade marocaine","Marokkanischer Salat","سلطة مغربية"]),
  I("entradas",[10],["Ensalada de pollo","Amanida de pollastre","Chicken salad","Salade de poulet","Hähnchensalat","سلطة الدجاج"],["chicken"]),
  I("entradas",[6],["Ensalada de Nor","Amanida de Nor","Nor salad","Salade Nor","Nor-Salat","سلطة نور"]),
  I("entradas",[4],["Sopa de pescado","Sopa de peix","Fish soup","Soupe de poisson","Fischsuppe","شربة الحوت"],["fish"]),
  I("entradas",[3.5],["Sopa marroquí (harira)","Sopa marroquina (harira)","Moroccan soup (harira)","Soupe marocaine (harira)","Marokkanische Suppe (Harira)","الحريرة"],[],D.harira),
  I("entradas",[5],["Baisara","Baisara","Baisara","Baisara","Baisara","البيصارة"],[],D.baisara),
  I("entradas",[5],["Lentejas","Llenties","Lentils","Lentilles","Linsen","العدس"]),
  I("entradas",[5],["Alubias","Mongetes","Beans","Haricots","Bohnen","اللوبيا"]),
  I("entradas",[7],["Pastela de pollo","Pastela de pollastre","Chicken pastilla","Pastilla au poulet","Hähnchen-Pastilla","بسطيلة الدجاج"],["chicken"],D.pastelaP),
  I("entradas",[7],["Pastela de pescado","Pastela de peix","Fish pastilla","Pastilla au poisson","Fisch-Pastilla","بسطيلة الحوت"],["fish"],D.pastelaF),

  I("paellas",[7],["Paella de marisco","Paella de marisc","Seafood paella","Paella aux fruits de mer","Meeresfrüchte-Paella","باييا بفواكه البحر"],["fish"]),
  I("paellas",[8],["Fideuà","Fideuà","Fideuà","Fideuà","Fideuà","فيديوا"],["fish"],D.fideua),

  I("combinados",[10],["Plato de pinchos de pollo","Plat de broquetes de pollastre","Chicken skewers plate","Assiette de brochettes de poulet","Hähnchenspieße-Teller","طبق شوايا الدجاج"],["chicken"]),
  I("combinados",[8],["Plato de pinchos de ternera","Plat de broquetes de vedella","Veal skewers plate","Assiette de brochettes de veau","Kalbsspieße-Teller","طبق شوايا العجل"],["veal"]),
  I("combinados",[10],["Plato de kefta","Plat de kefta","Kefta plate","Plat de kefta","Kefta-Teller","طبق الكفتة"],[],D.kefta),
  I("combinados",[8],["Plato de hígado de cordero","Plat de fetge de xai","Lamb liver plate","Assiette de foie d'agneau","Lammleber-Teller","طبق كبدة الخروف"],["lamb"]),
  I("combinados",[10],["Plato de pechuga de pollo","Plat de pit de pollastre","Chicken breast plate","Assiette de poitrine de poulet","Hähnchenbrust-Teller","طبق صدر الدجاج"],["chicken"]),
  I("combinados",[15],["Plato de alitas de pollo","Plat d'ales de pollastre","Chicken wings plate","Assiette d'ailes de poulet","Hähnchenflügel-Teller","طبق أجنحة الدجاج"],["chicken"]),
  I("combinados",[8],["Plato de costillas de cordero","Plat de costelles de xai","Lamb ribs plate","Assiette de côtes d'agneau","Lammrippchen-Teller","طبق ضلوع الخروف"],["lamb"]),
  I("combinados",[14],["Plato de escalopa de pollo","Plat d'escalopa de pollastre","Chicken escalope plate","Assiette d'escalopes de poulet","Hähnchenschnitzel-Teller","طبق إسكالوب الدجاج"],["chicken"]),
  I("combinados",[12],["Plato Royal (5 variedades de carne)","Plat Royal (5 varietats de carn)","Royal plate (5 kinds of meat)","Assiette Royale (5 variétés de viande)","Royal-Teller (5 Fleischsorten)","الطبق الملكي (5 أنواع من اللحم)"]),

  I("pescado",[12],["Gambas a la gallega","Gambes a la gallega","Galician-style prawns","Crevettes à la galicienne","Garnelen nach galicischer Art","القمرون بالطريقة الغاليسية"],["fish"]),
  I("pescado",[12],["Gambas a la plancha","Gambes a la planxa","Grilled prawns","Crevettes grillées","Gegrillte Garnelen","القمرون مشوي"],["fish"]),
  I("pescado",[12],["Dorada a la plancha","Orada a la planxa","Grilled sea bream","Dorade grillée","Gegrillte Dorade","الدوراد مشوي"],["fish"]),
  I("pescado",[15],["Dorada al ajillo","Orada a l'all","Sea bream with garlic","Dorade à l'ail","Dorade mit Knoblauch","الدوراد بالثوم"],["fish"]),
  I("pescado",[12],["Lubina a la plancha","Llobarro a la planxa","Grilled sea bass","Loup de mer grillé","Gegrillter Wolfsbarsch","اللوبينا مشوية"],["fish"]),
  I("pescado",[8],["Calamares","Calamars","Squid","Calmar","Calamari","الكالامار"],["fish"]),
  I("pescado",[15],["Chipirones","Calamarcets","Small squid","Seiche","Kleine Tintenfische","السيبيا"],["fish"]),
  I("pescado",[15],["Plato de salmón","Plat de salmó","Salmon plate","Assiette de saumon","Lachs-Teller","طبق السلمون"],["fish"]),
  I("pescado",[13],["Salmonete a la plancha","Moll a la planxa","Grilled red mullet","Rouget grillé","Gegrillte Rotbarbe","الروجي مشوي"],["fish"]),
  I("pescado",[22],["Fritura de pescado (1 kg)","Fregit de peix (1 kg)","Fried fish platter (1 kg)","Friture de poisson (1 kg)","Frittierte Fischplatte (1 kg)","قلية الحوت (1 كلغ)"],["fish"]),

  I("tipicos",[12],["Tajine de cordero con ciruelas","Tajine de xai amb pruna","Lamb tagine with prunes","Tajine d'agneau aux pruneaux","Lamm-Tajine mit Pflaumen","طاجين الخروف بالبرقوق"],["lamb"]),
  I("tipicos",[10],["Tajine de ternera con verduras","Tajine de vedella amb verdures","Veal tagine with vegetables","Tajine de veau aux légumes","Kalbs-Tajine mit Gemüse","طاجين العجل بالخضر"],["veal"]),
  I("tipicos",[8],["Tajine de pollo","Tajine de pollastre","Chicken tagine","Tajine de poulet","Hähnchen-Tajine","طاجين الدجاج"],["chicken"]),
  I("tipicos",[8],["Tajine de kefta","Tajine de kefta","Kefta tagine","Tajine de kefta","Kefta-Tajine","طاجين الكفتة"],[],D.kefta),
  I("tipicos",[10],["Tajine de pavo","Tajine de gall dindi","Turkey tagine","Tajine de dinde","Truthahn-Tajine","طاجين الديك الرومي"]),
  I("tipicos",[8],["Tajine de conejo","Tajine de conill","Rabbit tagine","Tajine de lapin","Kaninchen-Tajine","طاجين الأرنب"]),
  I("tipicos",[10],["Tajine de pescado","Tajine de peix","Fish tagine","Tajine de poisson","Fisch-Tajine","طاجين الحوت"],["fish"]),
  I("tipicos",[12],["Tajine pil-pil","Tajine pil-pil","Pil-pil tagine","Tajine pil-pil","Pil-Pil-Tajine","طاجين بيل بيل"]),
  I("tipicos",[12],["Cuscús (verduras, pollo o ternera)","Cuscús (verdures, pollastre o vedella)","Couscous (vegetables, chicken or veal)","Couscous (légumes, poulet ou veau)","Couscous (Gemüse, Hähnchen oder Kalb)","الكسكس (خضر، دجاج أو عجل)"],["chicken","veal"],D.cuscus),
  I("tipicos",[7],["Pollo asado (½ pollo)","Pollastre rostit (½ pollastre)","Roast chicken (half)","Poulet rôti (½ poulet)","Brathähnchen (halb)","دجاج مشوي (نصف دجاجة)"],["chicken"]),
  I("tipicos",[10],["Arroz con pollo","Arròs amb pollastre","Rice with chicken","Riz au poulet","Reis mit Hähnchen","الأرز بالدجاج"],["chicken"]),

  I("snacks",[5],["Bocadillo (pollo, ternera, kefta o mixto)","Entrepà (pollastre, vedella, kefta o mixt)","Sandwich (chicken, veal, kefta or mixed)","Sandwich (poulet, veau, kefta ou mixte)","Sandwich (Hähnchen, Kalb, Kefta oder gemischt)","ساندويتش (دجاج، عجل، كفتة أو مخلط)"],["chicken","veal"]),
  I("snacks",[7],["Bocadillo de calamares","Entrepà de calamars","Squid sandwich","Sandwich aux calamars","Calamari-Sandwich","ساندويتش الكالامار"],["fish"]),
  I("snacks",[6],["Tacos (pollo, ternera, kefta o mixto)","Tacos (pollastre, vedella, kefta o mixt)","Tacos (chicken, veal, kefta or mixed)","Tacos (poulet, veau, kefta ou mixte)","Tacos (Hähnchen, Kalb, Kefta oder gemischt)","طاكوس (دجاج، عجل، كفتة أو مخلط)"],["chicken","veal"]),
  I("snacks",[8],["Tacos de gambas o calamares","Tacos de gambes o calamars","Prawn or squid tacos","Tacos aux crevettes ou calamars","Tacos mit Garnelen oder Calamari","طاكوس القمرون أو الكالامار"],["fish"]),
  I("snacks",[5],["Hamburguesa o chicken burger","Hamburguesa o chicken burger","Burger or chicken burger","Burger ou chicken burger","Burger oder Chicken-Burger","برغر أو تشيكن برغر"]),
  I("snacks",[8],["Nuggets con ensalada y patatas fritas","Nuggets amb amanida i patates fregides","Nuggets with salad and fries","Nuggets avec salade et frites","Nuggets mit Salat und Pommes","ناجتس مع السلطة والبطاطس المقلية"],["chicken"]),

  I("postres",[5],["Flan casero","Flam casolà","Homemade flan","Flan maison","Hausgemachter Flan","فلان بيتي"]),
  I("postres",[5],["Porción de tarta","Porció de pastís","Slice of cake","Part de gâteau","Stück Kuchen","قطعة حلوى"],[],D.tarta),
  I("postres",[5],["Fruta de temporada","Fruita de temporada","Seasonal fruit","Fruits de saison","Obst der Saison","فواكه الموسم"]),
  I("postres",[3],["Helado","Gelat","Ice cream","Glace","Eis","المثلجات"]),

  I("bebidas",[1.5,3],["Refresco","Refresc","Soft drink","Boisson gazeuse","Erfrischungsgetränk","مشروب غازي"]),
  I("bebidas",[2],["Bebida energética","Beguda energètica","Energy drink","Boisson énergisante","Energydrink","مشروب الطاقة"]),
  I("bebidas",[2],["Red Bull","Red Bull","Red Bull","Red Bull","Red Bull","Red Bull"]),
  I("bebidas",[1.5,2],["Agua","Aigua","Water","Eau","Wasser","ماء"])
];

/* Platos del carrusel de la portada (por id). Cambia el orden o los platos aquí. */
N.FEATURED=["paella-de-marisco","tajine-de-cordero-con-ciruelas","fritura-de-pescado-1-kg","calamares","hamburguesa-o-chicken-burger"];

})(window.NOR=window.NOR||{});

/* =====================================================================
   DATOS DE LA CARTA · Restaurante Nor
   Idiomas, siempre en este orden: es, ca, en, fr, de, ar

   Para añadir un plato, una línea en N.ITEMS:
     I(categoría, [precios], [6 nombres], [etiquetas], descripción)
   - precios: [8] o [1.5, 3] si hay dos
   - etiquetas (filtros): "fish", "chicken", "lamb", "veal"
   - descripción: una entrada de N.D (todos los platos tienen una)

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
    sub:["Refrescos, batidos, agua y bebidas energéticas","Refrescos, batuts, aigua i begudes energètiques","Soft drinks, milkshakes, water and energy drinks","Sodas, milk-shakes, eau et boissons énergisantes","Softdrinks, Milchshakes, Wasser und Energydrinks","مشروبات غازية، ميلك شيك، ماء ومشروبات الطاقة"]}
];

/* Filtros por ingrediente (con su color) */
N.FT=[
  {k:"fish",col:"#3d8fb8"},
  {k:"chicken",col:"#d9a23a"},
  {k:"lamb",col:"#c4523a"},
  {k:"veal",col:"#8a5a3a"}
];

var D=N.D={
  /* Entradas */
  verde:["Hojas verdes frescas y verduras de temporada","Fulles verdes fresques i verdures de temporada","Fresh green leaves and seasonal vegetables","Feuilles vertes fraîches et légumes de saison","Frische grüne Blätter und Gemüse der Saison","أوراق خضراء طرية وخضر الموسم"],
  verano:["Ensalada fresca de tomate y verduras de verano","Amanida fresca de tomàquet i verdures d'estiu","Fresh tomato and summer vegetable salad","Salade fraîche de tomates et légumes d'été","Frischer Salat mit Tomaten und Sommergemüse","سلطة طرية بالطماطم وخضر الصيف"],
  rusa:["Patata, zanahoria, guisantes y mayonesa","Patata, pastanaga, pèsols i maionesa","Potato, carrot, peas and mayonnaise","Pomme de terre, carotte, petits pois et mayonnaise","Kartoffeln, Karotten, Erbsen und Mayonnaise","بطاطا، جزر، جلبانة ومايونيز"],
  pasta:["Pasta fría con verduras y aliño","Pasta freda amb verdures i amaniment","Cold pasta with vegetables and dressing","Pâtes froides aux légumes et vinaigrette","Kalte Nudeln mit Gemüse und Dressing","معكرونة باردة بالخضر والتتبيلة"],
  marroqui:["Tomate, pepino y cebolla picados con especias","Tomàquet, cogombre i ceba tallats amb espècies","Diced tomato, cucumber and onion with spices","Tomate, concombre et oignon en dés aux épices","Gewürfelte Tomaten, Gurken und Zwiebeln mit Gewürzen","طماطم، خيار وبصل مقطعين مع التوابل"],
  ensPollo:["Verduras frescas con pollo a la plancha","Verdures fresques amb pollastre a la planxa","Fresh vegetables with grilled chicken","Légumes frais et poulet grillé","Frisches Gemüse mit gegrilltem Hähnchen","خضر طرية مع دجاج مشوي"],
  sopaPescado:["Caldo de pescado con trozos de pescado y verduras","Brou de peix amb trossos de peix i verdures","Fish broth with pieces of fish and vegetables","Bouillon de poisson avec morceaux de poisson et légumes","Fischbrühe mit Fischstücken und Gemüse","مرق الحوت مع قطع الحوت والخضر"],
  harira:["Sopa de tomate con legumbres y especias","Sopa de tomàquet amb llegums i espècies","Tomato soup with legumes and spices","Soupe de tomate aux légumineuses et épices","Tomatensuppe mit Hülsenfrüchten und Gewürzen","شربة بالطماطم والقطاني والتوابل"],
  baisara:["Crema de habas con aceite de oliva y comino","Crema de faves amb oli d'oliva i comí","Fava bean purée with olive oil and cumin","Purée de fèves à l'huile d'olive et au cumin","Saubohnenpüree mit Olivenöl und Kreuzkümmel","كريمة الفول بزيت الزيتون والكمون"],
  lentejas:["Guiso de lentejas con verduras","Guisat de llenties amb verdures","Lentil stew with vegetables","Ragoût de lentilles aux légumes","Linseneintopf mit Gemüse","عدس مطبوخ بالخضر"],
  alubias:["Alubias blancas guisadas en salsa de tomate y especias","Mongetes blanques guisades amb salsa de tomàquet i espècies","White beans stewed in tomato sauce with spices","Haricots blancs mijotés à la sauce tomate et aux épices","Weiße Bohnen in Tomatensoße mit Gewürzen","لوبيا بيضاء مطبوخة بصلصة الطماطم والتوابل"],
  pastelaP:["Hojaldre fino relleno de pollo","Full·lat fi farcit de pollastre","Thin flaky pastry filled with chicken","Feuilleté fin garni de poulet","Dünner Blätterteig mit Hähnchenfüllung","رقائق رقيقة محشوة بالدجاج"],
  pastelaF:["Hojaldre fino relleno de pescado","Full·lat fi farcit de peix","Thin flaky pastry filled with fish","Feuilleté fin garni de poisson","Dünner Blätterteig mit Fischfüllung","رقائق رقيقة محشوة بالحوت"],
  /* Paellas */
  paella:["Arroz al azafrán con marisco variado","Arròs amb safrà i marisc variat","Saffron rice with mixed seafood","Riz au safran et fruits de mer variés","Safranreis mit gemischten Meeresfrüchten","أرز بالزعفران مع فواكه البحر المتنوعة"],
  fideua:["Como una paella, pero con fideos","Com una paella, però amb fideus","Like paella, but made with noodles","Comme une paella, mais avec des vermicelles","Wie Paella, aber mit Nudeln","بحال الباييا ولكن بالشعرية"],
  /* Platos combinados */
  pinchoPollo:["Brochetas de pollo a la plancha con guarnición","Broquetes de pollastre a la planxa amb guarnició","Grilled chicken skewers with sides","Brochettes de poulet grillées et garniture","Gegrillte Hähnchenspieße mit Beilage","شوايا دجاج مشوية مع مرافقات"],
  pinchoTernera:["Brochetas de ternera a la plancha con guarnición","Broquetes de vedella a la planxa amb guarnició","Grilled veal skewers with sides","Brochettes de veau grillées et garniture","Gegrillte Kalbsspieße mit Beilage","شوايا العجل مشوية مع مرافقات"],
  kefta:["Carne picada especiada a la plancha","Carn picada especiada a la planxa","Spiced minced meat, grilled","Viande hachée épicée grillée","Gewürztes Hackfleisch vom Grill","لحم مفروم متبل مشوي"],
  higado:["Hígado de cordero a la plancha con especias","Fetge de xai a la planxa amb espècies","Grilled lamb liver with spices","Foie d'agneau grillé aux épices","Gegrillte Lammleber mit Gewürzen","كبدة الخروف مشوية بالتوابل"],
  pechuga:["Pechuga de pollo a la plancha con guarnición","Pit de pollastre a la planxa amb guarnició","Grilled chicken breast with sides","Poitrine de poulet grillée et garniture","Gegrillte Hähnchenbrust mit Beilage","صدر دجاج مشوي مع مرافقات"],
  alitas:["Alitas de pollo doradas y crujientes","Ales de pollastre daurades i cruixents","Golden, crispy chicken wings","Ailes de poulet dorées et croustillantes","Goldbraune, knusprige Hähnchenflügel","أجنحة دجاج محمرة ومقرمشة"],
  costillas:["Costillas de cordero a la plancha","Costelles de xai a la planxa","Grilled lamb ribs","Côtes d'agneau grillées","Gegrillte Lammrippchen","ضلوع الخروف مشوية"],
  escalopa:["Filete de pollo empanado y frito","Filet de pollastre arrebossat i fregit","Breaded, fried chicken fillet","Filet de poulet pané et frit","Paniertes, gebratenes Hähnchenfilet","شريحة دجاج مكسوة ومقلية"],
  royal:["Surtido de cinco carnes a la plancha","Assortiment de cinc carns a la planxa","Assortment of five grilled meats","Assortiment de cinq viandes grillées","Auswahl aus fünf gegrillten Fleischsorten","تشكيلة من خمسة أنواع من اللحم المشوي"],
  /* Pescado y marisco */
  gallega:["Gambas cocidas con aceite de oliva y pimentón","Gambes bullides amb oli d'oliva i pebre vermell","Boiled prawns with olive oil and paprika","Crevettes cuites à l'huile d'olive et au paprika","Gekochte Garnelen mit Olivenöl und Paprika","قمرون مسلوق بزيت الزيتون والفلفل الأحمر"],
  gambasPlancha:["Gambas enteras hechas a la plancha","Gambes senceres fetes a la planxa","Whole prawns cooked on the griddle","Crevettes entières cuites à la plancha","Ganze Garnelen von der Grillplatte","قمرون كامل مطبوخ على البلانشا"],
  dorada:["Dorada entera a la plancha","Orada sencera a la planxa","Whole sea bream on the griddle","Dorade entière à la plancha","Ganze Dorade von der Grillplatte","دوراد كاملة على البلانشا"],
  doradaAjo:["Dorada con salsa de ajo y aceite de oliva","Orada amb salsa d'all i oli d'oliva","Sea bream with garlic and olive oil sauce","Dorade à la sauce ail et huile d'olive","Dorade mit Knoblauch-Olivenöl-Soße","دوراد بصلصة الثوم وزيت الزيتون"],
  lubina:["Lubina entera a la plancha","Llobarro sencer a la planxa","Whole sea bass on the griddle","Loup de mer entier à la plancha","Ganzer Wolfsbarsch von der Grillplatte","لوبينا كاملة على البلانشا"],
  calamares:["Anillas de calamar rebozadas y fritas","Anelles de calamar arrebossades i fregides","Battered, fried squid rings","Anneaux de calmar frits en beignets","Frittierte Tintenfischringe im Teigmantel","حلقات الكالامار مقلية"],
  chipirones:["Calamares pequeños y tiernos","Calamarcets petits i tendres","Small, tender squid","Petits calmars tendres","Kleine, zarte Tintenfische","كالامار صغير وطري"],
  salmon:["Lomo de salmón a la plancha con guarnición","Llom de salmó a la planxa amb guarnició","Grilled salmon fillet with sides","Pavé de saumon grillé et garniture","Gegrilltes Lachsfilet mit Beilage","فيليه السلمون مشوي مع مرافقات"],
  salmonete:["Salmonetes enteros a la plancha","Molls sencers a la planxa","Whole red mullet on the griddle","Rougets entiers à la plancha","Ganze Rotbarben von der Grillplatte","روجي كامل على البلانشا"],
  fritura:["Pescado variado frito, para compartir","Peix variat fregit, per compartir","Mixed fried fish, for sharing","Poissons variés frits, à partager","Gemischter frittierter Fisch zum Teilen","حوت متنوع مقلي، للمشاركة"],
  /* Platos típicos */
  tajCordero:["Cordero guisado a fuego lento con ciruelas dulces","Xai guisat a foc lent amb prunes dolces","Lamb slow-cooked with sweet prunes","Agneau mijoté aux pruneaux","Langsam geschmortes Lamm mit süßen Pflaumen","لحم الخروف مطبوخ على نار هادئة بالبرقوق"],
  tajTernera:["Ternera guisada a fuego lento con verduras","Vedella guisada a foc lent amb verdures","Veal slow-cooked with vegetables","Veau mijoté aux légumes","Langsam geschmortes Kalb mit Gemüse","لحم العجل مطبوخ على نار هادئة بالخضر"],
  tajPollo:["Pollo guisado a fuego lento con especias","Pollastre guisat a foc lent amb espècies","Chicken slow-cooked with spices","Poulet mijoté aux épices","Langsam geschmortes Hähnchen mit Gewürzen","دجاج مطبوخ على نار هادئة بالتوابل"],
  tajKefta:["Albóndigas especiadas en salsa de tomate","Mandonguilles especiades amb salsa de tomàquet","Spiced meatballs in tomato sauce","Boulettes épicées à la sauce tomate","Gewürzte Fleischbällchen in Tomatensoße","كويرات اللحم المتبلة بصلصة الطماطم"],
  tajConejo:["Conejo guisado a fuego lento con especias","Conill guisat a foc lent amb espècies","Rabbit slow-cooked with spices","Lapin mijoté aux épices","Langsam geschmortes Kaninchen mit Gewürzen","لحم الأرنب مطبوخ على نار هادئة بالتوابل"],
  pilpil:["Gambas en salsa picante de ajo y guindilla","Gambes amb salsa picant d'all i bitxo","Prawns in a spicy garlic and chilli sauce","Crevettes en sauce piquante à l'ail et au piment","Garnelen in scharfer Knoblauch-Chili-Soße","قمرون بصلصة حارة بالثوم والفلفل الحار"],
  cuscus:["Sémola de trigo al vapor","Sèmola de blat al vapor","Steamed wheat semolina","Semoule de blé à la vapeur","Gedämpfter Weizengrieß","سميد القمح على البخار"],
  polloAsado:["Pollo entero asado, dorado y jugoso","Pollastre sencer rostit, daurat i sucós","Whole roast chicken, golden and juicy","Poulet entier rôti, doré et juteux","Ganzes Brathähnchen, goldbraun und saftig","دجاجة كاملة مشوية، محمرة وطرية"],
  medioPollo:["Medio pollo asado, dorado y jugoso","Mig pollastre rostit, daurat i sucós","Half a roast chicken, golden and juicy","Demi-poulet rôti, doré et juteux","Halbes Brathähnchen, goldbraun und saftig","نص دجاجة مشوية، محمرة وطرية"],
  arrozPollo:["Arroz guisado con pollo y verduras","Arròs guisat amb pollastre i verdures","Rice cooked with chicken and vegetables","Riz mijoté au poulet et aux légumes","Reis mit Hähnchen und Gemüse gekocht","أرز مطبوخ بالدجاج والخضر"],
  /* Snacks */
  bocadillo:["Pan crujiente relleno de la carne que elijas","Pa cruixent farcit de la carn que triïs","Crusty bread filled with your choice of meat","Pain croustillant garni de la viande de votre choix","Knuspriges Brot mit Fleisch nach Wahl","خبز مقرمش محشو باللحم اللي بغيتي"],
  bocCalamar:["Pan crujiente con calamares fritos","Pa cruixent amb calamars fregits","Crusty bread with fried squid","Pain croustillant aux calmars frits","Knuspriges Brot mit frittierten Calamari","خبز مقرمش بالكالامار المقلي"],
  tacos:["Tortilla de trigo rellena de la carne que elijas","Truita de blat farcida de la carn que triïs","Wheat tortilla filled with your choice of meat","Galette de blé garnie de la viande de votre choix","Weizentortilla mit Fleisch nach Wahl","خبز طاكوس محشو باللحم اللي بغيتي"],
  tacosMar:["Tortilla de trigo rellena de gambas o calamares","Truita de blat farcida de gambes o calamars","Wheat tortilla filled with prawns or squid","Galette de blé garnie de crevettes ou calmars","Weizentortilla mit Garnelen oder Calamari","خبز طاكوس محشو بالقمرون أو الكالامار"],
  burger:["Hamburguesa de ternera o de pollo con lechuga y tomate","Hamburguesa de vedella o de pollastre amb enciam i tomàquet","Beef or chicken burger with lettuce and tomato","Burger de bœuf ou de poulet, salade et tomate","Rind- oder Hähnchenburger mit Salat und Tomate","برغر باللحم ولا بالدجاج مع الخس والطماطم"],
  nuggets:["Bocaditos de pollo empanados y crujientes","Mossets de pollastre arrebossats i cruixents","Crispy breaded chicken bites","Bouchées de poulet panées et croustillantes","Knusprig panierte Hähnchenstücke","قطع دجاج مكسوة ومقرمشة"],
  /* Postres */
  flan:["Flan de huevo con caramelo","Flam d'ou amb caramel","Egg custard with caramel","Flan aux œufs et caramel","Eierpudding mit Karamell","فلان بالبيض والكراميل"],
  tarta:["Tarta de pistacho con base de galleta","Pastís de pistatxo amb base de galeta","Pistachio cake on a cookie base","Gâteau à la pistache sur base biscuitée","Pistazientorte auf Keksboden","حلوى بالفستق على قاعدة البسكويت"],
  fruta:["Fruta fresca del momento","Fruita fresca del moment","Fresh fruit of the moment","Fruits frais du moment","Frisches Obst je nach Saison","فواكه طرية ديال الوقت"],
  helado:["Helado cremoso, pregunta por los sabores","Gelat cremós, pregunta pels sabors","Creamy ice cream, ask about flavours","Glace onctueuse, demandez les parfums","Cremiges Eis, fragen Sie nach den Sorten","مثلجات كريمية، سول على النكهات"],
  /* Bebidas */
  refresco:["Lata de refresco a elegir","Llauna de refresc a triar","Can of soft drink of your choice","Canette de soda au choix","Dose Softdrink nach Wahl","كانيط مشروب غازي على اختيارك"],
  refrescoBot:["Botella grande para compartir","Ampolla gran per compartir","Large bottle for sharing","Grande bouteille à partager","Große Flasche zum Teilen","قرعة كبيرة للمشاركة"],
  energetica:["Lata de bebida energética","Llauna de beguda energètica","Can of energy drink","Canette de boisson énergisante","Dose Energydrink","كانيط مشروب الطاقة"],
  redbull:["Bebida energética en lata","Beguda energètica en llauna","Energy drink in a can","Boisson énergisante en canette","Energydrink in der Dose","مشروب الطاقة فكانيط"],
  batido:["Batido frío y cremoso","Batut fred i cremós","Cold, creamy milkshake","Milk-shake frais et onctueux","Kalter, cremiger Milchshake","ميلك شيك بارد وكريمي"],
  aguaP:["Botella de agua pequeña","Ampolla d'aigua petita","Small bottle of water","Petite bouteille d'eau","Kleine Flasche Wasser","قرعة ماء صغيرة"],
  aguaG:["Botella de agua grande","Ampolla d'aigua gran","Large bottle of water","Grande bouteille d'eau","Große Flasche Wasser","قرعة ماء كبيرة"]
};

function I(c,p,n,t,d,img){return{c:c,p:p,n:n,t:t||[],d:d||null,img:img||null};}
N.ITEMS=[
  I("entradas",[8],["Ensalada verde","Amanida verda","Green salad","Salade verte","Grüner Salat","سلطة خضراء"],[],D.verde),
  I("entradas",[8],["Ensalada de verano","Amanida d'estiu","Summer salad","Salade d'été","Sommersalat","سلطة الصيف"],[],D.verano),
  I("entradas",[8],["Ensalada rusa","Amanida russa","Russian salad","Salade russe","Russischer Salat","سلطة روسية"],[],D.rusa),
  I("entradas",[8],["Ensalada de pasta","Amanida de pasta","Pasta salad","Salade de pâtes","Nudelsalat","سلطة المعكرونة"],[],D.pasta),
  I("entradas",[8],["Ensalada marroquí","Amanida marroquina","Moroccan salad","Salade marocaine","Marokkanischer Salat","سلطة مغربية"],[],D.marroqui),
  I("entradas",[10],["Ensalada de pollo","Amanida de pollastre","Chicken salad","Salade de poulet","Hähnchensalat","سلطة الدجاج"],["chicken"],D.ensPollo),
  I("entradas",[4],["Sopa de pescado","Sopa de peix","Fish soup","Soupe de poisson","Fischsuppe","شربة الحوت"],["fish"],D.sopaPescado),
  I("entradas",[3.5],["Sopa marroquí (harira)","Sopa marroquina (harira)","Moroccan soup (harira)","Soupe marocaine (harira)","Marokkanische Suppe (Harira)","الحريرة"],[],D.harira),
  I("entradas",[5],["Baisara","Baisara","Baisara","Baisara","Baisara","البيصارة"],[],D.baisara),
  I("entradas",[5],["Lentejas","Llenties","Lentils","Lentilles","Linsen","العدس"],[],D.lentejas),
  I("entradas",[5],["Alubias","Mongetes","Beans","Haricots","Bohnen","اللوبيا"],[],D.alubias),
  I("entradas",[7],["Pastela de pollo","Pastela de pollastre","Chicken pastilla","Pastilla au poulet","Hähnchen-Pastilla","بسطيلة الدجاج"],["chicken"],D.pastelaP),
  I("entradas",[7],["Pastela de pescado","Pastela de peix","Fish pastilla","Pastilla au poisson","Fisch-Pastilla","بسطيلة الحوت"],["fish"],D.pastelaF),

  I("paellas",[8],["Paella de marisco","Paella de marisc","Seafood paella","Paella aux fruits de mer","Meeresfrüchte-Paella","باييا بفواكه البحر"],["fish"],D.paella),
  I("paellas",[8],["Fideuà","Fideuà","Fideuà","Fideuà","Fideuà","فيديوا"],["fish"],D.fideua),

  I("combinados",[8],["Plato de pinchos de pollo","Plat de broquetes de pollastre","Chicken skewers plate","Assiette de brochettes de poulet","Hähnchenspieße-Teller","طبق شوايا الدجاج"],["chicken"],D.pinchoPollo),
  I("combinados",[12],["Plato de pinchos de ternera","Plat de broquetes de vedella","Veal skewers plate","Assiette de brochettes de veau","Kalbsspieße-Teller","طبق شوايا العجل"],["veal"],D.pinchoTernera),
  I("combinados",[8],["Plato de kefta","Plat de kefta","Kefta plate","Plat de kefta","Kefta-Teller","طبق الكفتة"],[],D.kefta),
  I("combinados",[8],["Plato de hígado de cordero","Plat de fetge de xai","Lamb liver plate","Assiette de foie d'agneau","Lammleber-Teller","طبق كبدة الخروف"],["lamb"],D.higado),
  I("combinados",[8],["Plato de pechuga de pollo","Plat de pit de pollastre","Chicken breast plate","Assiette de poitrine de poulet","Hähnchenbrust-Teller","طبق صدر الدجاج"],["chicken"],D.pechuga),
  I("combinados",[10],["Plato de alitas de pollo","Plat d'ales de pollastre","Chicken wings plate","Assiette d'ailes de poulet","Hähnchenflügel-Teller","طبق أجنحة الدجاج"],["chicken"],D.alitas),
  I("combinados",[15],["Plato de costillas de cordero","Plat de costelles de xai","Lamb ribs plate","Assiette de côtes d'agneau","Lammrippchen-Teller","طبق ضلوع الخروف"],["lamb"],D.costillas),
  I("combinados",[8],["Plato de escalopa de pollo","Plat d'escalopa de pollastre","Chicken escalope plate","Assiette d'escalopes de poulet","Hähnchenschnitzel-Teller","طبق إسكالوب الدجاج"],["chicken"],D.escalopa),
  I("combinados",[14],["Plato Royal (5 variedades de carne)","Plat Royal (5 varietats de carn)","Royal plate (5 kinds of meat)","Assiette Royale (5 variétés de viande)","Royal-Teller (5 Fleischsorten)","الطبق الملكي (5 أنواع من اللحم)"],[],D.royal),

  I("pescado",[12],["Gambas a la gallega","Gambes a la gallega","Galician-style prawns","Crevettes à la galicienne","Garnelen nach galicischer Art","القمرون بالطريقة الغاليسية"],["fish"],D.gallega),
  I("pescado",[12],["Gambas a la plancha","Gambes a la planxa","Grilled prawns","Crevettes grillées","Gegrillte Garnelen","القمرون مشوي"],["fish"],D.gambasPlancha),
  I("pescado",[12],["Dorada a la plancha","Orada a la planxa","Grilled sea bream","Dorade grillée","Gegrillte Dorade","الدوراد مشوي"],["fish"],D.dorada),
  I("pescado",[15],["Dorada al ajillo","Orada a l'all","Sea bream with garlic","Dorade à l'ail","Dorade mit Knoblauch","الدوراد بالثوم"],["fish"],D.doradaAjo),
  I("pescado",[12],["Lubina a la plancha","Llobarro a la planxa","Grilled sea bass","Loup de mer grillé","Gegrillter Wolfsbarsch","اللوبينا مشوية"],["fish"],D.lubina),
  I("pescado",[9],["Calamares","Calamars","Squid","Calmar","Calamari","الكالامار"],["fish"],D.calamares),
  I("pescado",[15],["Chipirones","Calamarcets","Small squid","Seiche","Kleine Tintenfische","السيبيا"],["fish"],D.chipirones),
  I("pescado",[13],["Plato de salmón","Plat de salmó","Salmon plate","Assiette de saumon","Lachs-Teller","طبق السلمون"],["fish"],D.salmon),
  I("pescado",[10],["Salmonete a la plancha","Moll a la planxa","Grilled red mullet","Rouget grillé","Gegrillte Rotbarbe","الروجي مشوي"],["fish"],D.salmonete),
  I("pescado",[22],["Fritura de pescado (1 kg)","Fregit de peix (1 kg)","Fried fish platter (1 kg)","Friture de poisson (1 kg)","Frittierte Fischplatte (1 kg)","قلية الحوت (1 كلغ)"],["fish"],D.fritura),

  I("tipicos",[12],["Tajine de cordero con ciruelas","Tajine de xai amb pruna","Lamb tagine with prunes","Tajine d'agneau aux pruneaux","Lamm-Tajine mit Pflaumen","طاجين الخروف بالبرقوق"],["lamb"],D.tajCordero),
  I("tipicos",[10],["Tajine de ternera con verduras","Tajine de vedella amb verdures","Veal tagine with vegetables","Tajine de veau aux légumes","Kalbs-Tajine mit Gemüse","طاجين العجل بالخضر"],["veal"],D.tajTernera),
  I("tipicos",[8],["Tajine de pollo","Tajine de pollastre","Chicken tagine","Tajine de poulet","Hähnchen-Tajine","طاجين الدجاج"],["chicken"],D.tajPollo),
  I("tipicos",[8],["Tajine de kefta","Tajine de kefta","Kefta tagine","Tajine de kefta","Kefta-Tajine","طاجين الكفتة"],[],D.tajKefta),
  I("tipicos",[8],["Tajine de conejo","Tajine de conill","Rabbit tagine","Tajine de lapin","Kaninchen-Tajine","طاجين الأرنب"],[],D.tajConejo),
  I("tipicos",[12],["Tajine pil-pil","Tajine pil-pil","Pil-pil tagine","Tajine pil-pil","Pil-Pil-Tajine","طاجين بيل بيل"],["fish"],D.pilpil),
  I("tipicos",[10],["Cuscús (verduras, pollo o ternera)","Cuscús (verdures, pollastre o vedella)","Couscous (vegetables, chicken or veal)","Couscous (légumes, poulet ou veau)","Couscous (Gemüse, Hähnchen oder Kalb)","الكسكس (خضر، دجاج أو عجل)"],["chicken","veal"],D.cuscus),
  I("tipicos",[12],["Pollo asado","Pollastre rostit","Roast chicken","Poulet rôti","Brathähnchen","دجاج مشوي"],["chicken"],D.polloAsado),
  I("tipicos",[7],["Medio pollo asado","Mig pollastre rostit","Half roast chicken","Demi-poulet rôti","Halbes Brathähnchen","نص دجاجة مشوية"],["chicken"],D.medioPollo),
  I("tipicos",[10],["Arroz con pollo","Arròs amb pollastre","Rice with chicken","Riz au poulet","Reis mit Hähnchen","الأرز بالدجاج"],["chicken"],D.arrozPollo),

  I("snacks",[5],["Bocadillo (pollo, ternera, kefta o mixto)","Entrepà (pollastre, vedella, kefta o mixt)","Sandwich (chicken, veal, kefta or mixed)","Sandwich (poulet, veau, kefta ou mixte)","Sandwich (Hähnchen, Kalb, Kefta oder gemischt)","ساندويتش (دجاج، عجل، كفتة أو مخلط)"],["chicken","veal"],D.bocadillo),
  I("snacks",[7],["Bocadillo de calamares","Entrepà de calamars","Squid sandwich","Sandwich aux calamars","Calamari-Sandwich","ساندويتش الكالامار"],["fish"],D.bocCalamar),
  I("snacks",[6],["Tacos (pollo, ternera, kefta o mixto)","Tacos (pollastre, vedella, kefta o mixt)","Tacos (chicken, veal, kefta or mixed)","Tacos (poulet, veau, kefta ou mixte)","Tacos (Hähnchen, Kalb, Kefta oder gemischt)","طاكوس (دجاج، عجل، كفتة أو مخلط)"],["chicken","veal"],D.tacos),
  I("snacks",[8],["Tacos de gambas o calamares","Tacos de gambes o calamars","Prawn or squid tacos","Tacos aux crevettes ou calamars","Tacos mit Garnelen oder Calamari","طاكوس القمرون أو الكالامار"],["fish"],D.tacosMar),
  I("snacks",[5],["Hamburguesa o chicken burger","Hamburguesa o chicken burger","Burger or chicken burger","Burger ou chicken burger","Burger oder Chicken-Burger","برغر أو تشيكن برغر"],[],D.burger),
  I("snacks",[8],["Nuggets con ensalada y patatas fritas","Nuggets amb amanida i patates fregides","Nuggets with salad and fries","Nuggets avec salade et frites","Nuggets mit Salat und Pommes","ناجتس مع السلطة والبطاطس المقلية"],["chicken"],D.nuggets),

  I("postres",[3],["Flan casero","Flam casolà","Homemade flan","Flan maison","Hausgemachter Flan","فلان بيتي"],[],D.flan),
  I("postres",[5],["Porción de tarta","Porció de pastís","Slice of cake","Part de gâteau","Stück Kuchen","قطعة حلوى"],[],D.tarta),
  I("postres",[5],["Fruta de temporada","Fruita de temporada","Seasonal fruit","Fruits de saison","Obst der Saison","فواكه الموسم"],[],D.fruta),
  I("postres",[3],["Helado","Gelat","Ice cream","Glace","Eis","المثلجات"],[],D.helado),

  I("bebidas",[2],["Refresco","Refresc","Soft drink","Boisson gazeuse","Erfrischungsgetränk","مشروب غازي"],[],D.refresco),
  I("bebidas",[3],["Refresco (botella 1,5 L)","Refresc (ampolla 1,5 L)","Soft drink (1.5 L bottle)","Boisson gazeuse (bouteille 1,5 L)","Erfrischungsgetränk (1,5-L-Flasche)","مشروب غازي (قرعة 1.5 لتر)"],[],D.refrescoBot),
  I("bebidas",[2],["Bebida energética","Beguda energètica","Energy drink","Boisson énergisante","Energydrink","مشروب الطاقة"],[],D.energetica),
  I("bebidas",[2.5],["Red Bull","Red Bull","Red Bull","Red Bull","Red Bull","Red Bull"],[],D.redbull),
  I("bebidas",[5],["Batido","Batut","Milkshake","Milk-shake","Milchshake","ميلك شيك"],[],D.batido),
  I("bebidas",[1.5],["Agua pequeña","Aigua petita","Small water","Petite bouteille d'eau","Kleines Wasser","ماء صغير"],[],D.aguaP),
  I("bebidas",[2],["Agua grande","Aigua gran","Large water","Grande bouteille d'eau","Großes Wasser","ماء كبير"],[],D.aguaG)
];

/* Platos del carrusel de la portada (por id). Cambia el orden o los platos aquí. */
N.FEATURED=["paella-de-marisco","tajine-de-cordero-con-ciruelas","fritura-de-pescado-1-kg","calamares","hamburguesa-o-chicken-burger"];

})(window.NOR=window.NOR||{});

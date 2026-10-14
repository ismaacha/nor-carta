# Contexto del proyecto: Carta digital de Restaurante Nor

## Qué es
Web que es SOLO la carta de Restaurante Nor (Reus, Catalunya). Sin información extra (nada de horarios, historia, contacto), de momento. Se accede por QR desde el móvil: diseño móvil primero. Tiene que ser muy visual, moderna y con fotos: que con la vista se entienda qué hay y cómo es cada plato. Nada de "texto e iconos".

## Restaurante
Cocina mediterránea con toque marroquí. Pescado y marisco, paellas, snacks (tacos, hamburguesas, bocadillos), platos combinados de carne (pinchos, kefta, costillas de cordero, pollo), tajines, cuscús, postres (tarta de pistacho y galleta, flan casero, fruta).

## Plan de trabajo por bloques
Se avanza bloque a bloque; el siguiente empieza cuando el anterior gusta.
1. **Portada** (hecho, en revisión): lo que se ve nada más entrar.
2. **Página de cada apartado**: al entrar en una categoría, slides de cada plato con foto de fondo y **desglose visual de ingredientes con líneas** (p. ej. la hamburguesa por capas). Ahora mismo `js/category.js` es un listado provisional.
3. Selección para enseñar al camarero, pulido final, publicación y QR.

## Estado actual (bloque 1: portada)
- Cabecera con la palabra NOR (estrella de 8 puntas en la O), fondo de zellige con degradado, "Carta", frase de cocina, buscador y el número de platos y apartados (se calcula solo).
- Sin selector de idiomas en la cabecera: el idioma se cambia desde el botón de ajustes (globo + código) arriba a la derecha. Se detecta solo por el idioma del móvil, o con `?lang=xx` en la URL.
- Carrusel "Destacados" con fotos a toda tarjeta, avance automático con barras de progreso, se pausa al tocarlo. Platos elegidos en `N.FEATURED` (`js/data.js`).
- "La carta": una tarjeta grande con foto por apartado, color propio, número, nº de platos, qué contiene y flecha `>` que lleva a `#/c/<apartado>`. Postres y Bebidas en tarjetas más pequeñas.
- Barra superior: transparente arriba; al bajar se vuelve sólida y aparece el logo y la lupa. En un apartado muestra flecha de volver y el nombre.
- Buscador a pantalla completa: al abrir muestra filtros (pescado, pollo, cordero, ternera), apartados con foto e ideas de búsqueda; al escribir, resultados agrupados por apartado con su color. Busca en los 6 idiomas.
- Ajustes (hoja inferior): idioma, tamaño de texto (3 niveles) y aspecto (auto / claro / oscuro). Se guardan en localStorage.
- El botón "atrás" del móvil cierra el buscador o los ajustes y vuelve de un apartado a la portada.
- Funciona abriendo `index.html` directamente (sin servidor) y en GitHub Pages.

## Estilo
Negro y dorado (identidad de la carta de papel) con toques marroquíes: zellige, franja azul marino con rombos dorados, estrella de 8 puntas. Color propio por apartado (tarjetas, etiquetas, resultados). Tipografías: Marcellus (títulos), Hanken Grotesk (texto), Tajawal (árabe). Colores en `css/tokens.css`, con versión clara y oscura. Sobre foto, el texto es siempre claro.

## Estructura de archivos
```
index.html            estructura mínima; carga CSS y JS
css/tokens.css        colores (oscuro y claro), tipografías, radios, capas
css/base.css          reset, utilidades, imagen con respaldo, zellige, franja, animaciones
css/topbar.css        barra superior
css/home.css          portada: cabecera, destacados, tarjetas de apartados
css/search.css        buscador
css/sheet.css         hoja de ajustes
css/category.css      página de apartado (provisional)
js/i18n.js            textos de interfaz en 6 idiomas (N.UI)
js/data.js            categorías, platos, descripciones y destacados
js/demo-photos.js     fotos de muestra de Unsplash (borrar cuando haya fotos propias)
js/core.js            estado, formato de precios, imágenes con respaldo, capas
js/router.js          navegación #/ y #/c/<id>
js/settings.js        ajustes
js/search.js          buscador
js/home.js            portada y carrusel
js/category.js        página de apartado (provisional)
js/main.js            arranque y barra superior
assets/favicon.svg
assets/img/LEEME.md   lista de nombres de archivo de todas las fotos
assets/img/categorias/  fotos de portada de cada apartado
assets/img/platos/      fotos de cada plato
_backup/index-v1.html  primera versión (archivo único)
```
Todo el JS cuelga de un objeto global `window.NOR` (scripts clásicos, sin módulos, para que funcione abriendo el archivo directamente). El orden de los idiomas es siempre `es, ca, en, fr, de, ar`.

## Fotos
- Se guardan con el id del plato o del apartado: `assets/img/platos/<id>.jpg`, `assets/img/categorias/<id>.jpg`. La lista completa está en `assets/img/LEEME.md`. No hace falta tocar código.
- Orden de carga: foto local → foto de muestra (`js/demo-photos.js`, hay una para cada plato y apartado) → degradado con el color del apartado y zellige.
- Bebidas: basta con una foto de la marca o de un ejemplo de esa bebida.

## Para añadir o cambiar un plato
Una línea `I(...)` en `N.ITEMS` (`js/data.js`): `I(categoría, [precios], [6 nombres], [etiquetas], descripción)`. Precio en array (`[8]`, o `[1.5, 3]` si hay dos). El id del plato (y el nombre de su foto) sale del nombre en castellano.

## Pendiente
1. Bloque 2: página de apartado con slides y desglose de ingredientes.
2. Fotos propias de platos y apartados.
3. Revisar con un hablante nativo las traducciones al árabe darija.
4. Confirmar con el restaurante: alérgenos, y si los platos de "Destacados" les parecen bien. Revisar las descripciones de los platos (son genéricas).
5. Publicar en GitHub Pages y generar el QR. Opcional: teléfono de reservas (877 643 423) y dominio propio.

## Reglas de trabajo
- Responder en castellano, directo, sin rodeos.
- Código separado por archivos (HTML, CSS, JS, datos).
- No cambiar nombres ni precios de platos sin confirmarlo.
- Móvil primero (probar a 390 px de ancho) y siempre con tema claro y oscuro.
- Visual y con fotos; separar apartados con color y elementos visuales.

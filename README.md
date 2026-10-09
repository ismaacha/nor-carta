# Nor Carta

Carta digital interactiva de **Restaurante Nor** (Reus) · cocina mediterránea con toque marroquí.

Pensada para abrirse desde el móvil escaneando un QR en la mesa.

**Ver la carta:** https://ismaacha.github.io/nor-carta/

## Qué incluye
- 60 platos en 8 apartados, en 6 idiomas: castellano, català, English, français, Deutsch y العربية (de derecha a izquierda).
- Portada con carrusel de destacados y tarjetas con foto por apartado.
- Buscador en todos los idiomas con filtros por ingrediente.
- Tema claro y oscuro, y tres tamaños de texto.
- Sin dependencias: HTML, CSS y JavaScript, solo con fuentes de Google Fonts.

## Estructura
```
index.html     estructura
css/           estilos (tokens, base, portada, buscador...)
js/data.js     platos, precios y apartados
js/i18n.js     textos de la interfaz
js/            resto de la lógica
assets/img/    fotos (ver assets/img/LEEME.md)
```

## Fotos
Guarda cada foto con el nombre indicado en [`assets/img/LEEME.md`](assets/img/LEEME.md) y aparecerá sola en la web.
Mientras tanto se usan fotos de muestra de [Unsplash](https://unsplash.com) (`js/demo-photos.js`).

## Probar en local
Abre `index.html` en el navegador. No necesita servidor.

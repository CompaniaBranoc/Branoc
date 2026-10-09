# Compañía Branoc

Cuarta revisión del rediseño para GitHub Pages: verde oliva y arena, cabecera de dos filas, navegación de gran formato, emblemas originales y páginas interiores con aspecto de manual de campaña. Seis páginas, recursos locales y animaciones que respetan la preferencia de movimiento reducido. No requiere Node, npm, servidores, cuentas ni compilación.

## Publicación en GitHub Pages

1. Descomprime el ZIP.
2. Crea un repositorio de GitHub o utiliza el repositorio destinado a la compañía.
3. Sube **todos los archivos del ZIP** a la raíz del repositorio. `index.html` debe quedar directamente en la raíz, junto a `styles.css`, `app.js`, `config.js` y la carpeta `assets`. No subas únicamente el ZIP.
4. En **Settings → Pages → Build and deployment**, elige **Deploy from a branch**.
5. Selecciona la rama **main** y la carpeta **/(root)**; guarda.
6. GitHub mostrará la dirección cuando termine la publicación. Puede tardar unos minutos.

Los enlaces son relativos: funcionan tanto en un dominio propio como dentro de una ruta de proyecto de GitHub Pages.

## Revisar antes de publicar

- Revisa las seis páginas en ordenador y móvil. La versión entregada se ha comprobado mediante verificaciones de contenido, enlaces y sintaxis; no se ha podido realizar la revisión visual en un navegador de esta sesión.
- Confirma con la Administración la correspondencia actual de nombres entre las fichas de Unidades y el organigrama. Se han conservado ambas fuentes sin asumir equivalencias.
- Discord usa la invitación facilitada el 09/10/2026: https://discord.gg/ZEfmJJxBvb. TeamSpeak y su descarga conservan los enlaces actuales de la compañía.

## Cambiar enlaces y dirección de TeamSpeak

Edita `config.js`. Sus valores se aplican a todos los botones de contacto al cargar las páginas. Actualiza también los atributos `href` originales y el texto de la dirección en `contacto.html` si quieres que el cambio esté disponible incluso con JavaScript desactivado.

## Organigrama

`organigrama.html` muestra una reproducción visual de la pestaña visible **Compañia Branoc** del documento compartido, consultada el **08/10/2026**. Conserva la distribución por columnas, las combinaciones de celdas, los colores, las filas vacías, las insignias de rango, las escuadras, el personal y las frecuencias. Incluye controles para ampliar, reducir, ajustar, volver al 100 % y activar pantalla completa cuando el navegador lo admite. En móvil se puede ampliar y desplazar la hoja sin convertirla en tarjetas. El contenido está disponible también en una tabla de texto accesible. No incluye las pestañas ocultas del documento.

La vista web es una instantánea; **no se sincroniza automáticamente**. El botón **Abrir hoja original** abre el documento original. Cuando cambie la plantilla, actualiza la reproducción `assets/organigrama-original.png`, su versión vectorial `assets/organigrama.svg` y `data/organigrama.json`, así como la fecha indicada en la página. El archivo JSON conserva las celdas de la pestaña visible para facilitar esa revisión.

## Estructura

- `index.html`: inicio, presentación, oferta, horarios y acceso a comunicaciones.
- `acceso.html`: proceso completo de reclutamiento, con las dos capturas originales.
- `normativa.html`: normativa íntegra, con índice y correcciones de redacción.
- `unidades.html`: Cerberus, Dagger, Sereco, Draken, Cuervo y Foxtrot, academia de reclutas con el emblema proporcionado.
- `organigrama.html`: reproducción del organigrama original, con zoom, desplazamiento y pantalla completa.
- `contacto.html`: Discord, staff, TeamSpeak 3 y Cooperativas de clanes, con sus dos capturas originales.
- `assets/`: emblemas, capturas, fuente local, textura, mapa de curvas de nivel decorativo y reproducción del organigrama.
- `docs/contenido-original.md`: archivo de los textos originales para mantenimiento.
- `docs/cambios.md`: correcciones y datos que necesitan confirmación de la compañía.

## Compatibilidad y mantenimiento

Puedes abrir `index.html` directamente en tu ordenador para revisar la web; en GitHub Pages también funcionará el botón para copiar TeamSpeak. Si el navegador no permite copiar al portapapeles, selecciona la dirección para copiarla manualmente.

El menú móvil funciona sin JavaScript. La normativa y el organigrama son HTML visible, sin descargas de datos ni dependencia de Google para mostrarse. No se cargan fuentes remotas, trackers ni bibliotecas externas.

Los emblemas y capturas se han recuperado de la web original. Se mantienen para el uso de la compañía. La licencia de la fuente Nimbus Sans Narrow se incluye en `assets/FONT-LICENSE.txt`.

## Actualizar la versión ya subida

Este ZIP contiene el proyecto completo y se extrae directamente en la raíz del repositorio. Sustituye los seis HTML, `styles.css` y `app.js`, y sube **la carpeta assets completa**, incluida `organigrama-original.png`, `organigrama.svg`, `grain.svg` y `field-map.svg`. Sube también todos los archivos de `data` y `docs`. No borres archivos de configuración de GitHub que ya tengas.

En esta revisión se mantienen todos los textos de las seis páginas, las capturas, el Discord actualizado y las 66 celdas con contenido del organigrama. El menú puede cerrarse con Escape y los desplazamientos a secciones tienen en cuenta la altura real de la cabecera.

## Revisión del 09/10/2026

- Foxtrot tiene ficha propia en Unidades y aparece en Inicio, con su emblema original suministrado por la compañía.
- Discord se actualiza en `config.js` y en todos los enlaces HTML; funciona también con JavaScript desactivado.
- Los saltos de línea opcionales conservan espacios al ocultarse en móvil: «Nos vemos en el servidor» y «Cooperativas de clanes».
- Los párrafos se justifican con separación de palabras y guionado automático para español cuando lo admite el navegador.
- Las seis unidades tienen índice de navegación; Inicio organiza sus emblemas en seis columnas, tres columnas o dos columnas según el espacio disponible.
- Se añaden entradas escalonadas, transiciones de página cuando el navegador las admite, detalles de galones y costuras, y un distintivo con los colores de España. Se respeta la preferencia de movimiento reducido, incluso si cambia durante la visita.
- El organigrama conserva la imagen y datos del Excel. Ahora puede ajustarse también a pantallas estrechas y admite `+`, `−` y `0` con el visor enfocado.
- Se conserva la corrección sobre TS6 que estaba en la versión actual del repositorio.

Sube todos los archivos descomprimidos a la raíz del repositorio, incluido `assets/foxtrot.png`. Si el navegador muestra la versión anterior después de publicar, recarga la página. Los enlaces a CSS y JavaScript llevan una versión nueva para evitar que se reutilicen los archivos antiguos.

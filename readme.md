Sitio web de una pasteleria llamada Bien Dulce.
Desarrollado para mi cuñada, dueña del emprendimiento quien hoy solo se da a conocer por instagram.
TODO:

-Cambiar bg del banner en modo mobile
-Agregar fotos a la galeria
-Verificar tamaño de titulos y parrafos en modo mobile
-Redimensionar carrousel para modo mobile

********************************************
Correcciones
********************************************

************************************************
09/06/2022
************************************************

nesting en la clase .prods_card en la hoja _cards.scss

nesting en la clase .submenu en la hoja _navBar.scss

links relativos en barra de naegacion en todos los html de la carpeta pages

**************************************************
16/06/2022
**************************************************
MAPS
Se agregó un partial de _maps con un mapa de colores
Se importó en style.scss
Esto creo tres clases nuevas en style.css (.color--facebook, .color--whatsapp, .color--send)
Estos colores se utilizarón en los iconos de facebook y whatsapp en toda la pagina y en el boton de cotizar en quote.html

Se creo un map con estilos de fuentes y se aplicó en las clases .titulo, .mainText, .commentContainer, .prods_card a, .navBar__list a.

@extend
Se agrego un extend en _navBar.scss linea 80 y 86 de navBar.scss aplicado a las clases de .logo_desktop y .logo_mobile. Esto agrupó las clases en linea 113 de css.

@mixin
Se agregó un nuevo partial _mixin de dimensiones (width, height) y se utiliza en style.scss linea 92 y en _navBar.scss linea 4

Se agregaron etiquetas meta con title, description y keywords en todos los html
Se agregaron etiquetas H1 en todos los html
Se agregaron descripcion de imagen en todos los atributos alt. Aun hay imagenes repetidas por tanto tambien los alt.

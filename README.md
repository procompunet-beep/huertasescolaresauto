# Sembrar para aprender — versión pública

Portal educativo estático sobre huertas escolares, tecnología y realidad aumentada. Esta carpeta es una copia preparada para publicación pública; la versión de trabajo original permanece intacta en la carpeta principal.

## Contenido de esta versión

- Sitio responsive en español con secciones del proyecto, proceso, comparación, tecnología, multimedia y realidad aumentada.
- Tres marcadores QR independientes: huerta vertical, huerta convencional y video explicativo del sistema de riego.
- Fotos autorizadas del proceso y videos del proyecto alojados en Cloudinary, además de esquemas ilustrados propios.
- Biblioteca con cuatro PDF pedagógicos y fichas técnicas revisadas; las copias públicas no conservan metadatos personales.
- Código Arduino de ejemplo y filtros de galería con ampliación accesible.

Las fotografías autorizadas del proceso y los videos enlazados se sirven desde Cloudinary; las copias de carga de las fotos se prepararon sin EXIF. Se excluyen formularios con datos de identificación, respuestas de encuestas, documentos con contactos de autores y archivos con enlaces internos a unidades compartidas. No copies aquí los directorios originales `1/`, `4/` o `5/` sin revisar el contenido, los permisos y los metadatos.

La página enlaza las 20 fotos y los videos registrados en `cloudinary-upload/MANIFEST.tsv`. Los cuatro PDF de `docs/` son copias revisadas con metadatos de autor eliminados. Las copias de carga de `cloudinary-upload/` se conservan localmente para referencia y están excluidas de Git.

## Probar localmente

Desde esta carpeta ejecuta:

```sh
python3 -m http.server 8000
```

Abre `http://localhost:8000`. La cámara requiere localhost o HTTPS. El visor usa A-Frame, MindAR y el shader de chromakey desde CDN, por lo que necesita conexión a internet.

## Publicar con GitHub Pages

1. Crea el repositorio público `huertasescolaresauto` en la cuenta `procompunet-beep`, vacío y sin inicializar con README, si aún no existe.
2. Desde esta carpeta revisa `git status`, crea el commit y publica la rama `main` con `git push -u origin main`. El remoto `origin` ya está configurado. No compartas contraseñas ni tokens.
3. En **Settings → Pages**, publica la rama `main` desde la carpeta raíz.
4. GitHub Pages ofrecerá el sitio con HTTPS; usa esa URL para probar los tres QR en un teléfono.

GitHub Pages entrega un subdominio `github.io` sin costo. Un dominio personalizado normalmente requiere comprar el dominio.

## Visor de realidad aumentada

Los QR son marcadores de seguimiento, no enlaces web. Las dos huertas usan `assets/markers/huertas-ra.mind` con índices 0 y 1; el riego usa `assets/markers/riego-automatico.mind` con índice 0 y muestra el video `riego-demo.mp4` alojado en Cloudinary. El visor solicita acceso a la cámara al iniciar.

El ejemplo Arduino es didáctico; calibra el sensor y valida el circuito antes de usarlo con una bomba real.

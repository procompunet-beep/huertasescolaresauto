# Sembrar para aprender

Sitio educativo responsive sobre las huertas escolares, su proceso, el componente Arduino y las experiencias de realidad aumentada. La versión pública conserva la estructura, el contenido y la línea gráfica de la página de trabajo; solo adapta las rutas de medios y presenta los resultados agregados de la encuesta de Arduino.

## Contenido

- Secciones de proyecto, bitácora, hallazgos, comparativa, tecnología, galería multimedia, biblioteca y realidad aumentada.
- Fotografías y videos del proyecto servidos desde Cloudinary.
- Filtros de galería, ampliación accesible de medios y tres marcadores QR independientes.
- Ejemplo didáctico de Arduino con botón para copiar el código.
- Gráfico interactivo con conteos agregados de la encuesta de sensores. El XLSX no se publica.
- [Informe de entrega con las URL del sitio, documentos y marcadores QR](INFORME-ENTREGA.md).

Las imágenes y videos de la página usan las direcciones del manifiesto `cloudinary-upload/MANIFEST.tsv`. Las copias locales de carga se conservan solo para referencia y están excluidas de Git.

La biblioteca conserva sus nueve tarjetas. Siete documentos (ficha del proyecto, artículo, actividades 1, 2 y 3, encuesta diagnóstica de compost e informe de Arduino) están enlazados desde Cloudinary. La ficha conjunta de cultivos y el modelo pedagógico usan copias en `docs/`. Los documentos externos deben ser copias revisadas y autorizadas; no copies aquí los directorios originales `1/`, `4/` o `5/`.

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

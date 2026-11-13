const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  primaryNav.classList.toggle("is-open", !isOpen);
});

primaryNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    primaryNav.classList.remove("is-open");
  }
});

const gallery = document.querySelector(".multimedia-grid");
const lightbox = document.querySelector(".lightbox");
const lightboxContent = document.querySelector(".lightbox-content");
const lightboxCaption = document.querySelector(".lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");
let lightboxTrigger;

function openLightbox(media, caption, trigger) {
  lightboxContent.replaceChildren(media);
  lightboxCaption.textContent = caption;
  lightboxTrigger = trigger;
  lightbox.showModal();
  lightboxClose.focus();
}

document.querySelectorAll(".gallery-filter").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document.querySelectorAll(".gallery-filter").forEach((filterButton) => {
      const selected = filterButton === button;
      filterButton.classList.toggle("is-active", selected);
      filterButton.setAttribute("aria-pressed", String(selected));
    });
    gallery.querySelectorAll(".media-card").forEach((card) => {
      const categories = card.dataset.category.split(/\s+/);
      card.hidden = filter !== "all" && !categories.includes(filter);
    });
  });
});

gallery.addEventListener("click", (event) => {
  const card = event.target.closest(".media-card");
  if (!card) return;

  const imageTrigger = event.target.closest(".media-trigger");
  const video = event.target.closest("video") || (event.target.closest(".media-video-open") && card.querySelector("video"));
  const caption = card.querySelector("figcaption").textContent.trim();

  if (imageTrigger) {
    const image = imageTrigger.querySelector("img");
    const enlargedImage = document.createElement("img");
    enlargedImage.src = image.currentSrc || image.src;
    enlargedImage.alt = image.alt;
    openLightbox(enlargedImage, caption, imageTrigger);
  } else if (video) {
    video.pause();
    const enlargedVideo = document.createElement("video");
    enlargedVideo.controls = true;
    enlargedVideo.preload = "metadata";
    enlargedVideo.poster = video.poster;
    enlargedVideo.src = video.currentSrc || video.querySelector("source").src;
    enlargedVideo.setAttribute("aria-label", video.getAttribute("aria-label"));
    openLightbox(enlargedVideo, caption, video);
  }
});

lightboxClose.addEventListener("click", () => lightbox.close());
lightbox.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    lightbox.close();
  }
});
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});
lightbox.addEventListener("close", () => {
  lightboxContent.replaceChildren();
  lightboxTrigger?.focus();
});

const copyCodeButton = document.querySelector(".copy-code");
const codeSample = document.querySelector(".arduino-code");
const copyStatus = document.querySelector(".copy-status");
copyCodeButton.addEventListener("click", async () => {
  const code = codeSample.textContent;
  try {
    await navigator.clipboard.writeText(code);
    copyStatus.textContent = "Código copiado al portapapeles.";
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(codeSample);
    selection.removeAllRanges();
    selection.addRange(range);
    const copied = document.execCommand("copy");
    selection.removeAllRanges();
    copyStatus.textContent = copied
      ? "Código copiado al portapapeles."
      : "No se pudo copiar. Selecciona el código para copiarlo manualmente.";
  }
});

document.querySelectorAll(".preview-button").forEach((button) => {
  button.addEventListener("click", () => {
    const preview = button.closest(".document-card").querySelector(".pdf-preview");
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
    button.textContent = isOpen ? "Vista previa" : "Cerrar vista";
    preview.hidden = isOpen;

    if (!isOpen && !preview.querySelector("iframe")) {
      const frame = document.createElement("iframe");
      frame.src = `${button.dataset.pdf}#view=FitH`;
      frame.title = `Vista previa: ${button.closest(".document-card").querySelector("h3").textContent}`;
      frame.loading = "lazy";
      preview.append(frame);
    }
  });
});

const comparisonGallery = document.querySelector(".comparison-gallery");
const compareWrap = document.querySelector(".compare-range-wrap");
document.querySelectorAll(".view-button").forEach((button) => {
  button.addEventListener("click", () => {
    const isSlider = button.dataset.view === "slider";
    comparisonGallery.dataset.layout = button.dataset.view;
    compareWrap.hidden = !isSlider;
    document.querySelectorAll(".comparison-image").forEach((image) => {
      image.hidden = isSlider;
    });
    document.querySelectorAll(".view-button").forEach((choice) => {
      const selected = choice === button;
      choice.classList.toggle("is-active", selected);
      choice.setAttribute("aria-pressed", String(selected));
    });
  });
});

const range = document.querySelector(".compare-range-input");
const overlay = document.querySelector(".compare-overlay");
const divider = document.querySelector(".compare-divider");
range.addEventListener("input", () => {
  overlay.style.width = `${range.value}%`;
  divider.style.left = `${range.value}%`;
});

const gardenOptions = document.querySelectorAll(".marker-option");
const markerDownload = document.querySelector(".marker-download");
const markerStatus = document.querySelector(".marker-status");
const markerPreview = document.querySelector(".ar-qr-example img");
const modelUpload = document.querySelector(".model-upload");
let selectedGarden = "vertical";

function selectGarden(garden) {
  selectedGarden = garden;
  gardenOptions.forEach((option) => {
    const selected = option.dataset.garden === garden;
    option.classList.toggle("is-selected", selected);
    option.setAttribute("aria-pressed", String(selected));
  });
  const experiences = {
    vertical: {
      markerFile: "huerta-ra-qr.png",
      label: "la huerta vertical",
      downloadLabel: "Descargar QR de la huerta vertical",
      stageLabel: "MODELO 3D · HUERTA VERTICAL",
      stageCode: "AR / 01"
    },
    conventional: {
      markerFile: "huerta-convencional-qr.png",
      label: "la huerta convencional",
      downloadLabel: "Descargar QR de la huerta convencional",
      stageLabel: "MODELO 3D · HUERTA CONVENCIONAL",
      stageCode: "AR / 02"
    },
    irrigation: {
      markerFile: "riego-automatico-qr.png",
      label: "el sistema de riego automático",
      downloadLabel: "Descargar QR del sistema de riego",
      stageLabel: "VIDEO · SISTEMA DE RIEGO AUTOMÁTICO",
      stageCode: "AR / 03"
    }
  };
  const experience = experiences[garden];
  if (!experience) throw new Error(`Experiencia de realidad aumentada desconocida: ${garden}`);
  const isIrrigation = garden === "irrigation";
  const { markerFile, label, downloadLabel, stageLabel, stageCode } = experience;
  markerDownload.href = `assets/markers/${markerFile}`;
  markerDownload.setAttribute("download", markerFile);
  markerDownload.querySelector(".marker-download-label").textContent = downloadLabel;
  markerPreview.src = `assets/markers/${markerFile}`;
  markerPreview.alt = `Código QR propio para ${label}`;
  const stageTag = document.querySelector(".stage-tag");
  const stageCoordinates = document.querySelector(".stage-coordinates");
  const modelPreview = document.querySelector(".model-preview");
  const irrigationPreview = document.querySelector(".irrigation-preview");
  const isConventional = garden === "conventional";
  stageTag.textContent = stageLabel;
  stageCoordinates.textContent = stageCode;
  modelPreview.classList.toggle("is-conventional", isConventional);
  modelPreview.hidden = isIrrigation;
  irrigationPreview.hidden = !isIrrigation;
  modelUpload.hidden = isIrrigation;
  markerStatus.textContent = `QR para ${label} listo para descargar e imprimir.`;
}

const viewer = document.querySelector(".ar-viewer");
const sceneHost = document.querySelector(".ar-scene-host");
const viewerStatus = document.querySelector(".viewer-status");
const launchButton = document.querySelector(".ar-launch");
const fullscreenButton = document.querySelector(".viewer-fullscreen");
const soundButton = document.querySelector(".viewer-sound");
const modelInput = document.querySelector(".model-upload input");
const irrigationVideo = document.querySelector("#riego-automatico-video");
let modelUrl = "";
let launchInProgress = false;
let targetDetected = false;
let cameraListenersController;

function getActiveVideo() {
  return selectedGarden === "irrigation" ? irrigationVideo : null;
}

function getActiveExperienceLabel() {
  return selectedGarden === "irrigation"
    ? "del sistema de riego automático"
    : `de la ${selectedGarden === "vertical" ? "huerta vertical" : "huerta convencional"}`;
}

function resetVideos() {
  irrigationVideo.pause();
  irrigationVideo.muted = true;
  if (irrigationVideo.readyState > 0) irrigationVideo.currentTime = 0;
  updateSoundButton();
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing?.dataset.loaded === "true") {
      resolve();
      return;
    }
    const script = existing || document.createElement("script");
    script.src = src;
    script.async = true;
    script.addEventListener("load", () => {
      script.dataset.loaded = "true";
      resolve();
    }, { once: true });
    script.addEventListener("error", () => reject(new Error("No se pudo cargar el componente de realidad aumentada.")), { once: true });
    if (!existing) document.head.append(script);
  });
}

function createPlant(x, y, z, color) {
  return `<a-entity position="${x} ${y} ${z}">
    <a-cylinder color="#557342" height="0.28" radius="0.018" position="0 0.14 0"></a-cylinder>
    <a-sphere color="${color}" radius="0.12" scale="1 0.55 0.75" position="0 0.28 0"></a-sphere>
    <a-sphere color="#91a95d" radius="0.1" scale="0.75 0.5 0.8" position="0.08 0.33 0.04"></a-sphere>
  </a-entity>`;
}

function verticalGarden() {
  return `<a-entity position="0 0 0">
    <a-box color="#806044" width="0.08" height="1.8" depth="0.08" position="-0.47 0.9 0"></a-box>
    <a-box color="#806044" width="0.08" height="1.8" depth="0.08" position="0.47 0.9 0"></a-box>
    <a-box color="#b18860" width="1" height="0.07" depth="0.12" position="0 0.13 0"></a-box>
    <a-box color="#b18860" width="1" height="0.07" depth="0.12" position="0 0.68 0"></a-box>
    <a-box color="#b18860" width="1" height="0.07" depth="0.12" position="0 1.22 0"></a-box>
    <a-cylinder color="#5681a0" height="1.4" radius="0.025" position="0.38 1.02 -0.12"></a-cylinder>
    <a-box color="#89664b" width="0.28" height="0.16" depth="0.24" position="-0.28 0.28 0"></a-box>
    <a-box color="#89664b" width="0.28" height="0.16" depth="0.24" position="0.28 0.83 0"></a-box>
    <a-box color="#89664b" width="0.28" height="0.16" depth="0.24" position="-0.28 1.37 0"></a-box>
    ${createPlant(-0.28, 0.4, 0, "#72934d")}
    ${createPlant(0.28, 0.95, 0, "#849c59")}
    ${createPlant(-0.28, 1.5, 0, "#72934d")}
    <a-text value="HUERTA VERTICAL" align="center" color="#273b2b" width="3" position="0 1.95 0"></a-text>
  </a-entity>`;
}

function conventionalGarden() {
  return `<a-entity position="0 0 0">
    <a-box color="#614c37" width="1.65" height="0.14" depth="1.05" position="0 0.08 0"></a-box>
    <a-box color="#9b7450" width="1.72" height="0.09" depth="0.08" position="0 0.16 0.53"></a-box>
    <a-box color="#9b7450" width="1.72" height="0.09" depth="0.08" position="0 0.16 -0.53"></a-box>
    <a-box color="#9b7450" width="0.08" height="0.09" depth="1.05" position="0.82 0.16 0"></a-box>
    <a-box color="#9b7450" width="0.08" height="0.09" depth="1.05" position="-0.82 0.16 0"></a-box>
    ${createPlant(-0.48, 0.18, -0.24, "#76954c")}
    ${createPlant(0, 0.18, -0.24, "#8fa75e")}
    ${createPlant(0.48, 0.18, -0.24, "#76954c")}
    ${createPlant(-0.48, 0.18, 0.24, "#8fa75e")}
    ${createPlant(0, 0.18, 0.24, "#76954c")}
    ${createPlant(0.48, 0.18, 0.24, "#8fa75e")}
    <a-cylinder color="#956f4e" radius="0.24" height="0.45" position="1.08 0.22 -0.35"></a-cylinder>
    <a-cylinder color="#75894d" radius="0.25" height="0.08" position="1.08 0.47 -0.35"></a-cylinder>
    <a-text value="HUERTA CONVENCIONAL" align="center" color="#273b2b" width="3" position="0 0.85 0"></a-text>
  </a-entity>`;
}

function buildScene() {
  const isIrrigation = selectedGarden === "irrigation";
  const garden = selectedGarden === "vertical" ? verticalGarden() : conventionalGarden();
  const targetIndex = selectedGarden === "conventional" ? 1 : 0;
  const targetFile = isIrrigation ? "riego-automatico.mind" : "huertas-ra.mind";
  const experienceContent = isIrrigation
    ? `<a-plane position="0 0 0.02" width="1" height="0.5625" material="shader: chromakey; src: #riego-automatico-video; color: 1 1 1"></a-plane>`
    : `${modelUrl
      ? `<a-entity gltf-model="url(${modelUrl})" position="0 0.05 0" scale="0.35 0.35 0.35"></a-entity>`
      : `<a-entity position="0 0.08 0" scale="0.5 0.5 0.5">${garden}</a-entity>`}`;
  return `<a-scene embedded vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false" renderer="alpha: true; logarithmicDepthBuffer: true; colorManagement: true;" mindar-image="imageTargetSrc: assets/markers/${targetFile}; autoStart: false; uiLoading: no; uiScanning: no;">
    <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
    <a-entity mindar-image-target="targetIndex: ${targetIndex}">
      ${experienceContent}
    </a-entity>
  </a-scene>`;
}

function updateSoundButton() {
  const video = getActiveVideo();
  const soundEnabled = Boolean(video && !video.muted);
  soundButton.disabled = !targetDetected || !video;
  soundButton.textContent = soundEnabled ? "Silenciar audio" : "Activar audio";
  soundButton.setAttribute("aria-label", soundEnabled ? "Silenciar audio del video" : "Activar audio del video");
  soundButton.setAttribute("aria-pressed", String(soundEnabled));
}

async function playActiveVideo() {
  const video = getActiveVideo();
  if (!video) return;
  try {
    await video.play();
  } catch (error) {
    if (!video.muted) {
      video.muted = true;
      updateSoundButton();
      viewerStatus.textContent = "El navegador requiere una acción para reproducir el audio. Pulsa «Activar audio».";
      return;
    }
    viewerStatus.textContent = `No se pudo reproducir el video: ${error.message}`;
  }
}

async function startViewer() {
  if (launchInProgress) return;
  launchInProgress = true;
  viewer.hidden = false;
  viewerStatus.textContent = "Comprobando navegador y cámara…";
  viewer.scrollIntoView({ behavior: "smooth", block: "center" });

  if (!window.isSecureContext && location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
    showViewerError("La cámara requiere una conexión segura. Abre este sitio en HTTPS o desde localhost y vuelve a intentarlo.");
    launchInProgress = false;
    return;
  }

  try {
    await loadScript("https://aframe.io/releases/1.5.0/aframe.min.js");
    await loadScript("https://cdn.jsdelivr.net/npm/aframe-chromakey-material@1.1.4/dist/aframe-chromakey-material.min.js");
    await loadScript("https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.1.5/dist/mindar-image.prod.js");
    await loadScript("https://cdn.jsdelivr.net/npm/mind-ar@1.1.5/dist/mindar-image-aframe.prod.js");
    cameraListenersController?.abort();
    cameraListenersController = new AbortController();
    sceneHost.innerHTML = buildScene();
    const scene = sceneHost.querySelector("a-scene");
    const target = scene.querySelector("[mindar-image-target]");
    scene.addEventListener("arReady", () => {
      viewerStatus.textContent = `Cámara activa. Enfoca el QR ${getActiveExperienceLabel()}.`;
    }, { once: true, signal: cameraListenersController.signal });
    scene.addEventListener("arError", (event) => {
      const reason = event.detail?.error;
      showViewerError(reason === "VIDEO_FAIL"
        ? "No fue posible acceder a la cámara. Revisa los permisos del navegador y comprueba que otra aplicación no la esté usando."
        : `No se pudo iniciar el seguimiento QR${reason ? `: ${reason}` : "."}`);
    }, { once: true, signal: cameraListenersController.signal });
    target.addEventListener("targetFound", () => {
      targetDetected = true;
      if (selectedGarden === "irrigation") {
        soundButton.disabled = false;
        viewerStatus.textContent = "Código QR detectado. Video explicativo del sistema de riego activo.";
        void playActiveVideo();
      } else {
        soundButton.disabled = true;
        viewerStatus.textContent = "Código QR detectado. Modelo de huerta activo.";
      }
    }, { signal: cameraListenersController.signal });
    target.addEventListener("targetLost", () => {
      targetDetected = false;
      soundButton.disabled = true;
      getActiveVideo()?.pause();
      viewerStatus.textContent = `Cámara activa. Enfoca el QR ${getActiveExperienceLabel()}.`;
    }, { signal: cameraListenersController.signal });
    if (!scene.hasLoaded) {
      await new Promise((resolve) => scene.addEventListener("loaded", resolve, { once: true }));
    }
    const mindarSystem = scene.systems["mindar-image-system"];
    if (!mindarSystem) throw new Error("No se pudo inicializar el seguimiento por imagen.");
    viewerStatus.textContent = "Solicitando acceso a la cámara y preparando el seguimiento QR…";
    mindarSystem.start();
  } catch (error) {
    showViewerError(`${error.message} Comprueba tu conexión e inténtalo de nuevo.`);
  } finally {
    launchInProgress = false;
  }
}

function stopMindar(scene) {
  const system = scene?.systems?.["mindar-image-system"];
  const video = system?.video;
  if (!video) return;
  if (system.controller) system.pause();
  video.srcObject?.getTracks().forEach((track) => track.stop());
  video.remove();
}

function showViewerError(message) {
  cameraListenersController?.abort();
  targetDetected = false;
  soundButton.disabled = true;
  resetVideos();
  stopMindar(sceneHost.querySelector("a-scene"));
  sceneHost.innerHTML = `<p class="ar-error" role="alert">${message}</p>`;
  viewerStatus.textContent = "Visor no disponible";
}

launchButton.addEventListener("click", startViewer);

soundButton.addEventListener("click", () => {
  if (!targetDetected) return;
  const video = getActiveVideo();
  if (!video) return;
  video.muted = !video.muted;
  updateSoundButton();
  if (!video.muted && video.paused) {
    void playActiveVideo();
  }
  viewerStatus.textContent = video.muted
    ? "Video silenciado."
    : "Audio activado para el video explicativo del sistema de riego.";
});

fullscreenButton.addEventListener("click", async () => {
  try {
    if (document.fullscreenElement === viewer) {
      await document.exitFullscreen();
      return;
    }
    if (!viewer.requestFullscreen) {
      throw new Error("Este navegador no permite pantalla completa.");
    }
    await viewer.requestFullscreen({ navigationUI: "hide" });
  } catch (error) {
    viewerStatus.textContent = `No fue posible cambiar a pantalla completa: ${error.message}`;
  }
});

document.addEventListener("fullscreenchange", () => {
  const isFullscreen = document.fullscreenElement === viewer;
  fullscreenButton.textContent = isFullscreen ? "Salir de pantalla completa" : "Pantalla completa";
  fullscreenButton.setAttribute("aria-label", isFullscreen ? "Salir de pantalla completa" : "Abrir visor en pantalla completa");
  window.dispatchEvent(new Event("resize"));
});

async function stopViewer() {
  if (document.fullscreenElement === viewer) {
    try {
      await document.exitFullscreen();
    } catch (error) {
      viewerStatus.textContent = `No fue posible salir de pantalla completa: ${error.message}`;
    }
  }
  cameraListenersController?.abort();
  targetDetected = false;
  soundButton.disabled = true;
  resetVideos();
  const scene = sceneHost.querySelector("a-scene");
  stopMindar(scene);
  sceneHost.replaceChildren();
  viewer.hidden = true;
  viewerStatus.textContent = "Preparando cámara y seguimiento QR…";
}

document.querySelector(".viewer-close").addEventListener("click", () => {
  void stopViewer();
});

gardenOptions.forEach((option) => {
  option.addEventListener("click", () => {
    if (!viewer.hidden) void stopViewer();
    selectGarden(option.dataset.garden);
  });
});

modelInput.addEventListener("change", () => {
  const [file] = modelInput.files;
  if (!file) return;
  if (!viewer.hidden) void stopViewer();
  if (modelUrl) URL.revokeObjectURL(modelUrl);
  modelUrl = URL.createObjectURL(file);
  viewerStatus.textContent = `Modelo cargado: ${file.name}. Inicia la experiencia para verlo.`;
  sceneHost.replaceChildren();
});

selectGarden(selectedGarden);

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const root = document.querySelector('[data-sequence-root]');

if (root) {
  const stage = root.querySelector('[data-sequence-stage]');
  const canvas = root.querySelector('[data-sequence-canvas]');
  const poster = root.querySelector('[data-sequence-poster]');
  const progressBar = root.querySelector('[data-sequence-progress]');
  const scenes = [...root.querySelectorAll('[data-sequence-scene]')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const compact = window.matchMedia('(max-width: 760px)').matches;
  const ctx = canvas?.getContext('2d', { alpha: false, desynchronized: true });
  const base = root.dataset.baseUrl || '/';
  const frameCount = 144;
  const frameDir = `${base}images/hero-sequence/`;
  const videoUrl = `${base}media/sthira-hero-source.mp4`;
  const frames = new Array(frameCount);
  const pointer = { x: 0, y: 0 };
  let sourceMode = 'poster';
  let video;
  let currentFrame = 0;
  let frameLoadPromise;
  let disposed = false;
  let scrollTrigger;

  if (!canvas || !ctx || !stage) {
    root.classList.add('sequence-poster-only');
  } else {
    const resize = () => {
      const width = stage.clientWidth || window.innerWidth;
      const height = stage.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, compact ? 1 : 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawCurrent();
    };

    function drawCover(media) {
      if (!media || !ctx) return;
      const width = stage.clientWidth || window.innerWidth;
      const height = stage.clientHeight || window.innerHeight;
      const mediaWidth = media.videoWidth || media.naturalWidth;
      const mediaHeight = media.videoHeight || media.naturalHeight;
      if (!mediaWidth || !mediaHeight) return;

      const scale = Math.max(width / mediaWidth, height / mediaHeight);
      const drawWidth = mediaWidth * scale;
      const drawHeight = mediaHeight * scale;
      const offsetX = (width - drawWidth) * 0.5;
      const offsetY = (height - drawHeight) * 0.5;

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(media, offsetX, offsetY, drawWidth, drawHeight);
    }

    function drawCurrent() {
      if (sourceMode === 'frames') {
        const frame = frames[currentFrame];
        if (frame?.complete && frame.naturalWidth) drawCover(frame);
      } else if (sourceMode === 'video' && video?.readyState >= 2) {
        drawCover(video);
      }
    }

    function loadImage(url) {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.decoding = 'async';
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = url;
      });
    }

    async function loadFrames() {
      const firstUrl = `${frameDir}frame-001.webp`;
      try {
        frames[0] = await loadImage(firstUrl);
        sourceMode = 'frames';
        root.classList.add('sequence-ready');
        drawCurrent();
      } catch {
        return false;
      }

      // Load in small batches to avoid opening 144 simultaneous image requests.
      const batchSize = compact ? 8 : 12;
      let next = 1;
      const loadBatch = async () => {
        while (next < frameCount && !disposed) {
          const start = next;
          const end = Math.min(next + batchSize, frameCount);
          next = end;
          await Promise.all(Array.from({ length: end - start }, async (_, offset) => {
            const index = start + offset;
            try {
              frames[index] = await loadImage(`${frameDir}frame-${String(index + 1).padStart(3, '0')}.webp`);
            } catch {
              // A partial sequence is still usable; the nearest loaded frame is drawn.
            }
          }));
        }
      };
      frameLoadPromise = loadBatch();
      return true;
    }

    async function loadVideoFallback() {
      try {
        // HEAD avoids a noisy 404 when the video has not yet been copied into public/media.
        const response = await fetch(videoUrl, { method: 'HEAD', cache: 'no-store' });
        if (!response.ok || disposed) return false;
      } catch {
        return false;
      }

      video = document.createElement('video');
      video.muted = true;
      video.playsInline = true;
      video.preload = 'auto';
      video.src = videoUrl;
      video.addEventListener('seeked', drawCurrent);
      video.setAttribute('aria-hidden', 'true');
      video.style.position = 'absolute';
      video.style.width = '1px';
      video.style.height = '1px';
      video.style.opacity = '0';
      video.style.pointerEvents = 'none';
      stage.appendChild(video);

      return new Promise((resolve) => {
        const done = (success) => {
          video.removeEventListener('loadeddata', onReady);
          video.removeEventListener('error', onError);
          if (success) {
            sourceMode = 'video';
            root.classList.add('sequence-ready', 'sequence-video-mode');
            drawCurrent();
          }
          resolve(success);
        };
        const onReady = () => done(true);
        const onError = () => done(false);
        video.addEventListener('loadeddata', onReady, { once: true });
        video.addEventListener('error', onError, { once: true });
        video.load();
      });
    }

    function setScene(progress) {
      // Intro lives in the first 18%; four short story chapters take the rest.
      const points = [0, 0.18, 0.385, 0.59, 0.795];
      let active = 0;
      for (let index = 1; index < points.length; index += 1) {
        if (progress >= points[index]) active = index;
      }
      scenes.forEach((scene, index) => {
        const isActive = index === active;
        scene.classList.toggle('is-active', isActive);
        scene.setAttribute('aria-hidden', String(!isActive));
      });
    }

    function setProgress(progress) {
      const safeProgress = Math.min(1, Math.max(0, progress));
      currentFrame = Math.min(frameCount - 1, Math.round(safeProgress * (frameCount - 1)));
      if (sourceMode === 'video' && video?.duration) {
        const targetTime = safeProgress * Math.max(0, video.duration - 0.04);
        if (Math.abs(video.currentTime - targetTime) > 0.045) {
          try { video.currentTime = targetTime; } catch { /* metadata may still be settling */ }
        }
      } else {
        drawCurrent();
      }
      if (progressBar) progressBar.style.transform = `scaleX(${safeProgress})`;
      setScene(safeProgress);
      root.style.setProperty('--sequence-progress', String(safeProgress));
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const pointerMove = (event) => {
      if (reducedMotion || compact) return;
      const bounds = stage.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8;
      pointer.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 6;
      gsap.to(canvas, { x: pointer.x, y: pointer.y, duration: 0.9, ease: 'power3.out', overwrite: true });
      gsap.to(root.querySelectorAll('[data-parallax]'), {
        x: (index, element) => -pointer.x * (Number(element.dataset.parallax) || 0.35),
        y: (index, element) => -pointer.y * (Number(element.dataset.parallax) || 0.35),
        duration: 1.1,
        ease: 'power3.out',
        overwrite: true,
      });
    };
    stage.addEventListener('pointermove', pointerMove, { passive: true });

    async function start() {
      const hasFrames = await loadFrames();
      if (!hasFrames) await loadVideoFallback();
      if (disposed) return;
      if (sourceMode === 'poster') {
        root.classList.add('sequence-poster-only');
        return;
      }

      if (reducedMotion) {
        setProgress(0);
        root.classList.add('sequence-reduced-motion');
        return;
      }

      scrollTrigger = ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.25,
        onUpdate: (self) => setProgress(self.progress),
        onRefresh: (self) => setProgress(self.progress),
      });
      setProgress(0);
    }

    start();

    window.addEventListener('pagehide', () => {
      disposed = true;
      scrollTrigger?.kill();
      stage.removeEventListener('pointermove', pointerMove);
      window.removeEventListener('resize', resize);
      if (video) {
        video.pause();
        video.removeAttribute('src');
        video.load();
      }
      gsap.killTweensOf(canvas);
      gsap.killTweensOf(root.querySelectorAll('[data-parallax]'));
      if (frameLoadPromise) frameLoadPromise = null;
    }, { once: true });
  }
}

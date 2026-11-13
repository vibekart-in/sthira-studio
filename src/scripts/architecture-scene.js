import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const canvas = document.querySelector('#architecture-canvas');

if (canvas) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const compact = window.matchMedia('(max-width: 760px)').matches;
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x080d19, 0.045);

  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 80);
  camera.position.set(0.15, 1.25, 9.6);
  camera.lookAt(0.2, 0.4, 0);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !compact,
      powerPreference: 'low-power',
      stencil: false,
      depth: true,
    });
  } catch (error) {
    console.warn('Sthira 3D scene could not start; CSS fallback remains visible.', error);
  }

  if (renderer) {
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, compact ? 1 : 1.35));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;

    const ambient = new THREE.HemisphereLight(0xc8e6ff, 0x101627, 2.15);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xeaf4ff, 3.4);
    keyLight.position.set(-4, 7, 6);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xc8ff45, 30, 18, 2);
    rimLight.position.set(3.8, 2.8, -1.8);
    scene.add(rimLight);

    const blueLight = new THREE.PointLight(0x567cff, 22, 20, 2);
    blueLight.position.set(-4, 1.2, 3);
    scene.add(blueLight);

    const architecture = new THREE.Group();
    architecture.position.set(1.05, -0.15, 0);
    scene.add(architecture);
    const model = new THREE.Group();
    architecture.add(model);

    const mat = {
      concrete: new THREE.MeshStandardMaterial({ color: 0x8a9bab, roughness: 0.56, metalness: 0.16 }),
      slate: new THREE.MeshStandardMaterial({ color: 0x34465d, roughness: 0.34, metalness: 0.38 }),
      dark: new THREE.MeshStandardMaterial({ color: 0x111e30, roughness: 0.3, metalness: 0.54 }),
      glass: new THREE.MeshPhysicalMaterial({ color: 0x4e9eaa, roughness: 0.12, metalness: 0.3, transmission: 0.16, transparent: true, opacity: 0.68, side: THREE.DoubleSide }),
      lime: new THREE.MeshStandardMaterial({ color: 0xcaff45, emissive: 0x5b850d, emissiveIntensity: 0.55, metalness: 0.22, roughness: 0.3 }),
      line: new THREE.LineBasicMaterial({ color: 0xcaff45, transparent: true, opacity: 0.62 }),
    };

    function block(width, height, depth, x, y, z, material, outline = false) {
      const geometry = new THREE.BoxGeometry(width, height, depth);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      model.add(mesh);
      if (outline) {
        const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), mat.line);
        edges.position.copy(mesh.position);
        model.add(edges);
      }
      return mesh;
    }

    // A procedural architectural maquette: layered cantilevers, glazed planes,
    // a courtyard void, vertical fins and a floating roof. No model download needed.
    block(4.7, 0.24, 3.65, 0, -0.82, 0, mat.dark, true);
    block(2.45, 1.72, 2.72, -0.55, 0.12, 0.12, mat.concrete, true);
    block(2.38, 0.18, 3.18, -0.36, 1.03, 0.05, mat.lime, false);
    block(2.6, 1.12, 2.05, 0.76, 0.82, -0.1, mat.slate, true);
    block(2.94, 0.16, 2.52, 0.62, 1.48, -0.08, mat.concrete, true);
    block(0.22, 2.45, 2.7, 1.82, 0.36, 0.1, mat.dark, true);
    block(1.72, 0.12, 2.9, -1.0, 1.88, -0.18, mat.slate, true);

    // Glazed façade panels, set slightly forward of the main volume.
    block(1.42, 1.2, 0.035, 0.62, 0.82, 0.94, mat.glass, false);
    block(0.88, 1.14, 0.035, -0.72, 0.15, 1.51, mat.glass, false);
    block(0.055, 1.36, 0.12, -0.11, 0.82, 1.02, mat.lime, false);

    // Repeating brise-soleil fins give the model a clear architectural scale.
    for (let i = 0; i < 9; i += 1) {
      const fin = block(0.045, 1.48, 0.12, 1.04 + i * 0.105, 0.72, 1.05, i % 3 === 0 ? mat.lime : mat.dark, false);
      fin.rotation.z = -0.035;
    }

    // Raised bridge/canopy and a slender vertical stair tower.
    block(1.05, 0.09, 1.85, -1.22, 1.78, -0.72, mat.lime, true);
    block(0.7, 2.45, 0.24, -1.52, 0.35, -1.25, mat.slate, true);
    block(0.14, 0.14, 2.45, -1.54, 1.65, -0.2, mat.concrete, false);

    // A thin orbital datum line and elevation rings around the maquette.
    const orbit = new THREE.Mesh(
      new THREE.TorusGeometry(2.55, 0.012, 6, 140),
      new THREE.MeshBasicMaterial({ color: 0x87a4c3, transparent: true, opacity: 0.42 }),
    );
    orbit.rotation.x = Math.PI / 2.5;
    orbit.rotation.z = -0.24;
    orbit.position.y = 0.04;
    model.add(orbit);

    const orbitAccent = new THREE.Mesh(
      new THREE.TorusGeometry(2.78, 0.009, 5, 140, Math.PI * 0.72),
      new THREE.MeshBasicMaterial({ color: 0xcaff45, transparent: true, opacity: 0.9 }),
    );
    orbitAccent.rotation.x = Math.PI / 2.5;
    orbitAccent.rotation.z = 0.82;
    orbitAccent.position.y = 0.08;
    model.add(orbitAccent);

    const platform = new THREE.Mesh(
      new THREE.CylinderGeometry(3.8, 3.8, 0.045, 96),
      new THREE.MeshStandardMaterial({ color: 0x111a2b, roughness: 0.7, metalness: 0.2 }),
    );
    platform.position.set(0, -1.0, 0);
    model.add(platform);

    const grid = new THREE.GridHelper(16, 30, 0x29425c, 0x1a2a40);
    grid.position.y = -1.035;
    grid.material.transparent = true;
    grid.material.opacity = 0.45;
    scene.add(grid);

    // Tiny floating datum markers add depth without competing with the building.
    const markers = new THREE.Group();
    scene.add(markers);
    for (let i = 0; i < 5; i += 1) {
      const marker = new THREE.Mesh(
        new THREE.SphereGeometry(i === 2 ? 0.035 : 0.022, 10, 10),
        new THREE.MeshBasicMaterial({ color: i === 2 ? 0xcaff45 : 0x8da8c3 }),
      );
      marker.position.set(-3.1 + i * 1.55, 1.4 + Math.sin(i * 1.7) * 0.55, -0.8 - (i % 2) * 0.45);
      markers.add(marker);
    }

    const pointer = { x: 0, y: 0 };
    const pointerTarget = { x: 0, y: 0 };
    const clock = new THREE.Clock();
    let visible = true;
    let rafId = 0;

    const resize = () => {
      const width = canvas.clientWidth || canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || canvas.parentElement?.clientHeight || window.innerHeight;
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      if (reducedMotion) renderer.render(scene, camera);
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const hero = document.querySelector('.home-hero');
    if (hero && !reducedMotion) {
      const scrollTween = gsap.to(architecture.rotation, {
        y: architecture.rotation.y + 0.9,
        x: 0.12,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1.1 },
      });
      gsap.to(camera.position, {
        z: 8.0,
        x: 0.65,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1.1 },
      });
      gsap.to(orbit.rotation, {
        z: orbit.rotation.z + 0.42,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1.1 },
      });
      window.addEventListener('pagehide', () => scrollTween.scrollTrigger?.kill(), { once: true });
    }

    if (!reducedMotion) {
      window.addEventListener('pointermove', (event) => {
        pointerTarget.x = (event.clientX / window.innerWidth - 0.5) * 0.22;
        pointerTarget.y = (event.clientY / window.innerHeight - 0.5) * 0.16;
      }, { passive: true });

      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !rafId) animate();
        if (!visible && rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
      }, { threshold: 0.01 });
      observer.observe(canvas);

      const animate = () => {
        if (!visible || document.hidden) { rafId = 0; return; }
        const elapsed = clock.getElapsedTime();
        pointer.x += (pointerTarget.x - pointer.x) * 0.035;
        pointer.y += (pointerTarget.y - pointer.y) * 0.035;
        model.rotation.y += 0.0019;
        model.rotation.x += (pointer.y - model.rotation.x) * 0.018;
        architecture.rotation.z += (-pointer.x * 0.22 - architecture.rotation.z) * 0.018;
        architecture.position.y = -0.15 + Math.sin(elapsed * 0.55) * 0.045;
        markers.rotation.y = elapsed * 0.025;
        renderer.render(scene, camera);
        rafId = requestAnimationFrame(animate);
      };
      animate();
      document.addEventListener('visibilitychange', () => {
        if (document.hidden && rafId) { cancelAnimationFrame(rafId); rafId = 0; }
        else if (!document.hidden && visible && !rafId) animate();
      });
    } else {
      renderer.render(scene, camera);
    }
  }
}

// Motion design for type, editorial reveals and project cards.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion) {
  gsap.from('.hero-kicker, .hero-copy h1, .hero-description, .hero-actions, .hero-meta', {
    y: 34, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.08,
  });
  gsap.utils.toArray('[data-reveal]').forEach((element) => {
    gsap.from(element, {
      y: 44,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: element, start: 'top 84%', once: true },
    });
  });
  gsap.utils.toArray('.project-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card.querySelector('.project-card-image'), { rotateY: x * 3, rotateX: -y * 3, transformPerspective: 900, duration: 0.35, overwrite: true });
    });
    card.addEventListener('pointerleave', () => gsap.to(card.querySelector('.project-card-image'), { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'power2.out' }));
  });
}

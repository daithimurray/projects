// The hero scene: a Kildare estate at night. Move onto the driveway and the
// PIR floodlight trips, the CCTV head pans to follow, the OSD reports motion.
// Loaded with dynamic import() after first paint; the poster is the fallback.
import {
  AdditiveBlending,
  BackSide,
  BufferGeometry,
  CapsuleGeometry,
  CatmullRomCurve3,
  CircleGeometry,
  Color,
  CylinderGeometry,
  DirectionalLight,
  DoubleSide,
  Float32BufferAttribute,
  FogExp2,
  HemisphereLight,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  NeutralToneMapping,
  PCFShadowMap,
  PMREMGenerator,
  PerspectiveCamera,
  PlaneGeometry,
  Plane,
  PointLight,
  Points,
  Quaternion,
  Raycaster,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  SpotLight,
  Sprite,
  SpriteMaterial,
  Vector2,
  Vector3,
  Vector4,
  WebGLRenderer,
} from 'three';
import { glow, rng } from './textures.js';
import { buildStreet, SPOTS, W, DRIVE, PITCH } from './street.js';
import * as SH from './shaders.js';

const V = (a) => new Vector3(...a);
const COL = {
  fog: '#1a2236',
  zenith: '#070d19',
  mid: '#121c33',
  glow: '#5e3624',
  sodium: '#ff9a3c',
  flood: '#eef3ff',
  strobe: '#3d7cff',
  tungsten: '#ffcf8f',
};

// Framing by aspect ratio: [aspect, camera, look-at, vertical fov, lens shift].
// Level camera plus lens shift keeps verticals straight, like an architectural shot.
// Below 0.6 the vertical fov holds, so narrower screens crop the sides exactly
// as object-fit: cover crops the 900x1500 poster: poster and scene line up.
const FRAMES = [
  [0.6, [13.8, 3.3, 24.5], [5.0, 3.3, 0], 66, -0.47],
  [0.78, [14, 3.3, 23], [1.2, 3.3, 0], 50, -0.24],
  [1.25, [15.5, 3.3, 25.5], [-4, 3.3, 0], 38, -0.08],
  [1.9, [17, 3.3, 28], [-9.5, 3.3, 0], 32, -0.03],
];

// The PIR covers the drive and the paved front; the footpath doesn't trip it.
const ZONE = { x0: 3.9, x1: W + DRIVE + 0.1, z0: -3.35, z1: 5.8 };
const inZone = (p) => p.x > ZONE.x0 && p.x < ZONE.x1 && p.z > ZONE.z0 && p.z < ZONE.z1;
const inTrack = (p) => p.x > -3 && p.x < 16 && p.z > -3.4 && p.z < 13;
const HOLD = 2.5;
const DECAY = 1.4;
const FLICK = [[0, 0], [0.045, 1], [0.085, 0.3], [0.13, 1], [0.19, 0.7], [0.25, 1]];

// Idle passers-by: approach, pause on the drive, walk on.
const WALKS = [
  [[[18, 0, 7.2], [12, 0, 7.1], [9.2, 0, 5.5], [8.5, 0, 3.1]], [[8.5, 0, 3.1], [9, 0, 5.4], [6.5, 0, 7.1], [-2, 0, 7.2], [-13, 0, 7.2]]],
  [[[-13, 0, 7.1], [2, 0, 7.1], [6.4, 0, 6.4], [6.6, 0, 2.1]], [[6.6, 0, 2.1], [7.6, 0, 5.7], [11.5, 0, 7.0], [18, 0, 7.2]]],
].map((legs) => legs.map((pts) => new CatmullRomCurve3(pts.map(V), false, 'centripetal')));
const WALK_SPEED = 1.35;
const WALK_PAUSE = 1.4;

export async function createScene({ canvas, root, state, poster, hq, decayEase, onReady, onMotion, onFrame, onLost }) {
  const renderer = new WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.toneMapping = NeutralToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;

  const scene = new Scene();
  scene.fog = new FogExp2(COL.fog, 0.0165);
  const camera = new PerspectiveCamera(36, 1.6, 0.3, 420);
  const r = rng(11);
  const st = buildStreet(scene, r);

  // Sky dome follows the camera
  const sky = new Mesh(
    new SphereGeometry(200, 32, 16),
    new ShaderMaterial({
      ...SH.sky,
      side: BackSide,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uZenith: { value: new Color(COL.zenith) },
        uMid: { value: new Color(COL.mid) },
        uGlow: { value: new Color(COL.glow) },
        uHorizon: { value: new Color(COL.fog) },
      },
    }),
  );
  sky.renderOrder = -1;
  sky.frustumCulled = false;
  scene.add(sky);

  // Light: dusk sky fill, a cool moon wash, sodium from two streetlights.
  // Image-based light from the same sky: wet slate and paving pick up its glow.
  const pmrem = new PMREMGenerator(renderer);
  const envScene = new Scene();
  envScene.add(new Mesh(sky.geometry, sky.material));
  scene.environment = pmrem.fromScene(envScene, 0.02).texture;
  scene.environmentIntensity = 0.9;
  pmrem.dispose();
  scene.add(new HemisphereLight('#3b4d7a', '#0a0e17', 0.45));
  const moon = new DirectionalLight('#8ea3d6', 0.35);
  moon.position.set(-30, 40, 20);
  scene.add(moon);

  const spot = (color, intensity, dist, angle, pen, decay, pos, aim) => {
    const l = new SpotLight(color, intensity, dist, angle, pen, decay);
    l.position.copy(pos);
    l.target.position.copy(aim);
    scene.add(l, l.target);
    return l;
  };
  const lampPos = V(SPOTS.lamp);
  const lampAim = V(SPOTS.lampAim);
  spot(COL.sodium, 95, 28, 0.98, 0.9, 1.5, lampPos, lampAim);
  spot('#ffae62', 22, 46, 0.42, 1, 1.4, V([3, 8, 20]), V([2, 2.4, 0]));

  const floodPos = V(SPOTS.flood);
  const floodAim = V(SPOTS.floodAim);
  const floodDir = floodAim.clone().sub(floodPos).normalize();
  const FLOOD_I = 170;
  const flood = spot(COL.flood, FLOOD_I, 16, 0.64, 0.8, 1.6, floodPos.clone().addScaledVector(floodDir, 0.18), floodAim);
  flood.castShadow = true;
  flood.shadow.mapSize.set(1024, 1024);
  flood.shadow.bias = -0.0008;
  flood.shadow.normalBias = 0.03;
  flood.shadow.camera.near = 0.3;
  flood.shadow.camera.far = 16;

  const porch = new PointLight(COL.tungsten, 2.2, 5, 2);
  porch.position.copy(V(SPOTS.porch)).add(V([0, 0, 0.3]));
  const strobe = new PointLight(COL.strobe, 0, 3, 2);
  strobe.position.copy(V(SPOTS.led)).add(V([0, 0, 0.3]));
  scene.add(porch, strobe);

  // Volumetric cones (additive, fade before the ground)
  const beam = (pos, dir, len, radius, color, level) => {
    const g = new CylinderGeometry(0.05, radius, len, 40, 1, true);
    g.translate(0, -len / 2, 0);
    const m = new Mesh(
      g,
      new ShaderMaterial({
        ...SH.cone,
        uniforms: { uLen: { value: len }, uColor: { value: new Color(color) }, uLevel: { value: level } },
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
        side: DoubleSide,
      }),
    );
    m.position.copy(pos);
    m.quaternion.copy(new Quaternion().setFromUnitVectors(V([0, -1, 0]), dir));
    scene.add(m);
    return m.material.uniforms.uLevel;
  };
  const lampDir = lampAim.clone().sub(lampPos).normalize();
  beam(lampPos, lampDir, 7.4, 3.6, COL.sodium, 0.16);
  const floodBeam = beam(floodPos, floodDir, 6.6, 3.5, COL.flood, 0);

  // Bloom stand-ins for the light sources
  const glowTex = glow();
  const halo = (color, size, pos, opacity = 1) => {
    const s = new Sprite(new SpriteMaterial({ map: glowTex, color, blending: AdditiveBlending, depthWrite: false, fog: false, opacity }));
    s.scale.setScalar(size);
    s.position.copy(pos);
    scene.add(s);
    return s.material;
  };
  st.lampLens.forEach((m, i) => halo(COL.sodium, i ? 3.2 : 2.6, m.position.clone().add(V([0, -0.12, 0])), i ? 0.45 / i : 0.95));
  for (const i of [1, 2]) {
    // warm pools under the distant lamps
    const pool = new Mesh(
      new PlaneGeometry(13, 13),
      new MeshBasicMaterial({ map: glowTex, color: COL.sodium, blending: AdditiveBlending, transparent: true, depthWrite: false, fog: false, opacity: 0.32 / i }),
    );
    pool.rotation.x = -Math.PI / 2;
    pool.position.set(SPOTS.lamp[0] - 2 * i * PITCH, 0.02, 9.2);
    scene.add(pool);
  }
  const floodHalo = halo(COL.flood, 1.5, floodPos.clone().addScaledVector(floodDir, 0.1), 0);
  halo(COL.tungsten, 1.0, V(SPOTS.porch).add(V([0, 0, 0.12])), 0.8);
  const ledHalo = halo(COL.strobe, 0.8, V(SPOTS.led).add(V([0, 0, 0.05])), 0);

  // Drizzle, visible only inside the light cones
  const pos = [];
  const fall = [];
  const cloud = (n, [x0, x1], [y0, y1], [z0, z1]) => {
    for (let i = 0; i < n; i++) {
      pos.push(x0 + r() * (x1 - x0), y0 + r() * (y1 - y0), z0 + r() * (z1 - z0));
      fall.push(y0, y1 - y0, 4.2 + r() * 2.2);
    }
  };
  cloud(760, [4.4, 11.4], [0, 4.0], [-1.2, 7.6]);
  cloud(680, [-5.5, 4.3], [0, 7.1], [4.2, 14]);
  const rainGeo = new BufferGeometry();
  rainGeo.setAttribute('position', new Float32BufferAttribute(pos, 3));
  rainGeo.setAttribute('aFall', new Float32BufferAttribute(fall, 3));
  const rainU = {
    uTime: { value: 0 },
    uScale: { value: 300 },
    uFlood: { value: 0 },
    uFloodPos: { value: floodPos },
    uFloodDir: { value: floodDir },
    uStreetPos: { value: lampPos },
    uStreetDir: { value: lampDir },
    uFloodCol: { value: new Color(COL.flood).multiplyScalar(0.9) },
    uStreetCol: { value: new Color(COL.sodium) },
    uCos: { value: new Vector2(Math.cos(0.54), Math.cos(0.92)) },
  };
  const rain = new Points(
    rainGeo,
    new ShaderMaterial({ ...SH.rain, uniforms: rainU, transparent: true, depthWrite: false, blending: AdditiveBlending }),
  );
  rain.frustumCulled = false;
  scene.add(rain);

  // PIR detection sweep on the ground
  const pirAt = V([SPOTS.flood[0], 0.03, SPOTS.flood[2] + 0.1]);
  const sweepGeo = new CircleGeometry(8.5, 64, MathUtils.degToRad(-120), MathUtils.degToRad(168));
  sweepGeo.rotateX(-Math.PI / 2);
  const sweepU = {
    uRadius: { value: 8.5 },
    uProg: { value: 1 },
    uColor: { value: new Color(COL.flood).multiplyScalar(0.55) },
    uRect: { value: new Vector4(ZONE.x0, ZONE.z0, ZONE.x1, ZONE.z1) },
  };
  const sweepMesh = new Mesh(
    sweepGeo,
    new ShaderMaterial({ ...SH.sweep, uniforms: sweepU, transparent: true, depthWrite: false, blending: AdditiveBlending }),
  );
  sweepMesh.position.copy(pirAt);
  scene.add(sweepMesh);

  // The visitor: invisible, but the floodlight throws their shadow on the drive.
  const body = new Mesh(new CapsuleGeometry(0.24, 1.25, 4, 10), new MeshBasicMaterial({ colorWrite: false, depthWrite: false }));
  body.castShadow = true;
  body.visible = false;
  scene.add(body);

  // ---------- Framing ----------
  const base = { pos: new Vector3(), look: new Vector3(), fov: 36, shift: 0 };
  const DOOR = V(SPOTS.door);
  const DOLLY = V([8.5, 2.7, 10]);
  function frame(aspect) {
    let i = 0;
    while (i < FRAMES.length - 2 && aspect > FRAMES[i + 1][0]) i++;
    const [a0, p0, l0, f0, s0] = FRAMES[i];
    const [a1, p1, l1, f1, s1] = FRAMES[i + 1];
    const k = MathUtils.smoothstep(aspect, a0, a1);
    base.pos.lerpVectors(V(p0), V(p1), k);
    base.look.lerpVectors(V(l0), V(l1), k);
    base.fov = MathUtils.lerp(f0, f1, k);
    base.shift = MathUtils.lerp(s0, s1, k);
    camera.aspect = aspect;
    camera.fov = base.fov;
    camera.updateProjectionMatrix();
    camera.projectionMatrix.elements[9] = base.shift;
    camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
  }

  let dpr = Math.min(window.devicePixelRatio || 1, 1.75);
  let size = { w: 0, h: 0 };
  function resize(w = canvas.clientWidth, h = canvas.clientHeight, ratio = dpr) {
    if (!w || !h) return;
    size = { w, h };
    renderer.setPixelRatio(ratio);
    renderer.setSize(w, h, false);
    frame(w / h);
    rainU.uScale.value = (0.34 * h * ratio) / (2 * Math.tan(MathUtils.degToRad(base.fov) / 2));
  }

  // ---------- Interaction ----------
  const ray = new Raycaster();
  const ground = new Plane(V([0, 1, 0]), 0);
  const ndc = new Vector2();
  const hit = new Vector3();
  const target = new Vector3();
  const walkAt = new Vector3();
  const pointer = { on: false, x: 0, y: 0, seen: -9 };
  const par = new Vector2();
  const tap = { until: -1, x: 0, y: 0 };
  let t = poster ? 12.4 : 0;
  let lastInteract = 0;
  let walker = null;
  let walks = 0;

  const toNdc = (e) => {
    const b = canvas.getBoundingClientRect();
    return [((e.clientX - b.left) / b.width) * 2 - 1, -((e.clientY - b.top) / b.height) * 2 + 1];
  };
  const pick = (x, y) => {
    ndc.set(x, y);
    ray.setFromCamera(ndc, camera);
    return ray.ray.intersectPlane(ground, hit);
  };
  const onMove = (e) => {
    if (e.pointerType === 'touch') return;
    [pointer.x, pointer.y] = toNdc(e);
    pointer.on = true;
    pointer.seen = t;
    lastInteract = t;
  };
  const onLeave = () => (pointer.on = false);
  const onClick = (e) => {
    if (e.target.closest('a, button')) return;
    [tap.x, tap.y] = toNdc(e);
    tap.until = t + 3.5;
    lastInteract = t;
    walker = null;
  };
  if (!poster) {
    root.addEventListener('pointermove', onMove, { passive: true });
    root.addEventListener('pointerleave', onLeave);
    root.addEventListener('click', onClick);
  }

  // ---------- State ----------
  let mode = 'on';
  let level = 1;
  let from = 0;
  let tripAt = -9;
  let decayAt = 0;
  let lastSeen = 0;
  let led = 0;
  let source = null;
  const head = st.head;
  const cctvAt = V(SPOTS.cctv);
  const rest = V([8.8, 0.7, 5.8]);
  const look = rest.clone();
  const scroll = { v: 0 };
  const info = { hx: 0, hy: 0, box: null };
  const boxOut = { x: 0, y: 0, w: 0, h: 0 };
  const v3 = new Vector3();
  const setAim = (p, dt, rate) => {
    look.lerp(p, dt ? 1 - Math.exp(-dt * rate) : 1);
    const d = v3.copy(look).sub(cctvAt);
    const yaw = MathUtils.clamp(Math.atan2(d.x, d.z), -0.9, 2.3);
    const pitch = MathUtils.clamp(Math.atan2(-d.y, Math.hypot(d.x, d.z)), 0.08, 1.25);
    head.rotation.set(pitch, yaw, 0, 'YXZ');
  };
  setAim(rest, 0, 0);
  const project = (p) => {
    v3.copy(p).project(camera);
    return [((v3.x + 1) / 2) * size.w, ((1 - v3.y) / 2) * size.h];
  };
  const HINT = V([8.3, 0.05, 2.7]);

  function currentTarget() {
    if (tap.until > t && pick(tap.x, tap.y)) return (source = 'user'), target.copy(hit);
    // A resting cursor still counts on the drive; elsewhere only while it moves.
    if (pointer.on && pick(pointer.x, pointer.y) && (t - pointer.seen < 4 || inZone(hit))) return (source = 'user'), target.copy(hit);
    if (walker) {
      const [a, b, la, lb] = walker;
      const k = t - walker.t0;
      if (k < la) a.getPointAt(k / la, walkAt);
      else if (k < la + WALK_PAUSE) a.getPointAt(1, walkAt);
      else if (k < la + WALK_PAUSE + lb) b.getPointAt((k - la - WALK_PAUSE) / lb, walkAt);
      else {
        walker = null;
        lastInteract = t;
        return null;
      }
      source = 'walker';
      return target.copy(walkAt);
    }
    return null;
  }

  function update(dt) {
    t += dt;
    if (!poster) {
      // Idle passer-by so touch visitors see the mechanism too
      if (!walker && mode === 'off' && t - lastInteract > (walks ? 11 : 8) && t > 5) {
        const legs = WALKS[walks++ % WALKS.length];
        walker = [legs[0], legs[1], legs[0].getLength() / WALK_SPEED, legs[1].getLength() / WALK_SPEED];
        walker.t0 = t;
      }
      const p = currentTarget();
      const inside = !!p && inZone(p);
      if (inside) {
        if (mode !== 'on') {
          from = level;
          tripAt = t;
          sweepU.uProg.value = 0;
          onMotion?.(true, source);
        }
        mode = 'on';
        lastSeen = t;
      } else if (mode === 'on' && t - lastSeen > HOLD) {
        mode = 'decay';
        decayAt = t;
        from = level;
        onMotion?.(false, source);
      }
      if (mode === 'on') {
        const k = t - tripAt;
        if (from > 0.5) level = Math.min(1, from + k * 12);
        else {
          level = 1;
          for (let i = 1; i < FLICK.length; i++) {
            if (k < FLICK[i][0]) {
              const [t0, v0] = FLICK[i - 1];
              const a = (k - t0) / (FLICK[i][0] - t0);
              level = MathUtils.lerp(i === 1 ? from : v0, FLICK[i][1], a);
              break;
            }
          }
        }
      } else if (mode === 'decay') {
        const k = (t - decayAt) / DECAY;
        level = k >= 1 ? 0 : from * (1 - decayEase(k));
        if (k >= 1) mode = 'off';
      }
      sweepU.uProg.value = Math.min(1, sweepU.uProg.value + dt / 1.1);

      // CCTV: follow while the light is on and the target is in view
      const tracking = mode === 'on' && p && inTrack(p);
      if (tracking) setAim(v3.copy(p).setY(1.0), dt, 5);
      else if (mode !== 'on') setAim(rest, dt, 1.4);

      body.visible = !!(p && inTrack(p) && level > 0.02);
      if (body.visible) body.position.set(p.x, 0.88, p.z);
      info.box = null;
      if (tracking) {
        const [bx, by] = project(p);
        const [, ty] = project(v3.copy(p).setY(1.75));
        const h = Math.max(24, by - ty);
        boxOut.w = h * 0.46;
        boxOut.h = h;
        boxOut.x = bx - boxOut.w / 2;
        boxOut.y = ty;
        info.box = boxOut;
      }

      // Bell-box strobe: double blink every 2.5s
      const ph = t % 2.5;
      const blink = ph < 0.07 || (ph > 0.17 && ph < 0.24) ? 1 : 0;
      led += (blink - led) * (1 - Math.exp(-dt * 45));
    } else {
      level = 1;
      led = 0.6;
    }

    // Parallax (mouse only) and scroll dolly
    const pk = 1 - Math.exp(-dt * 3);
    if (!poster && pointer.on) par.lerp(ndc.set(pointer.x, pointer.y), pk);
    else par.multiplyScalar(1 - pk);
    scroll.v += (state.scroll - scroll.v) * (poster ? 1 : 1 - Math.exp(-dt * 7));
    const s = MathUtils.smootherstep(scroll.v, 0, 1);
    camera.position.lerpVectors(base.pos, DOLLY, s * 0.38);
    v3.lerpVectors(base.look, DOOR, s * 0.5);
    camera.lookAt(v3);
    // Parallax: the camera drifts (~2° of view) so near things slide past far ones
    camera.translateX(par.x * 0.8);
    camera.translateY(par.y * 0.35);
    camera.rotateX(-s * 0.07);
    camera.updateMatrixWorld();
    sky.position.copy(camera.position);

    // Push state into the scene
    flood.intensity = level * FLOOD_I;
    floodBeam.value = level * 0.55;
    floodHalo.opacity = level;
    rainU.uFlood.value = level;
    rainU.uTime.value = t;
    sky.material.uniforms.uTime.value = t;
    st.lens.material.color.setScalar(0.06 + level * 3.2);
    st.led.material.color.set(COL.strobe).multiplyScalar(0.25 + led * 5);
    strobe.intensity = led * 1.6;
    ledHalo.opacity = led;
    st.camMat.emissiveIntensity = 0.06 + level * 0.3;
    st.ir.material.color.setRGB(0.3 + 0.05 * Math.sin(t * 2), 0.01, 0.01);

    [info.hx, info.hy] = project(HINT);
  }

  // ---------- Loop, visibility, adaptive quality ----------
  let running = false;
  let raf = 0;
  let last = 0;
  let inView = true;
  let frames = 0;
  let acc = 0;
  let tier = 0;
  function tick(now) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min(hq ? 1 : 0.1, (now - last) / 1000);
    last = now;
    update(dt);
    renderer.render(scene, camera);
    onFrame?.(info);
    if (!hq && ++frames > 40) {
      acc += dt;
      if (frames % 90 === 0) {
        if (acc / 50 > 1 / 32 && tier < 3) degrade(++tier);
        acc = 0;
        frames = 40;
      }
    }
  }
  function degrade(n) {
    if (n === 1) dpr = Math.max(1, dpr - 0.5);
    if (n === 2) {
      dpr = 1;
      renderer.shadowMap.enabled = false;
      flood.castShadow = false;
      scene.traverse((o) => o.material && (o.material.needsUpdate = true));
    }
    if (n === 3) rainGeo.setDrawRange(0, 700);
    resize();
  }
  function setRunning() {
    const want = inView && !document.hidden;
    if (want === running) return;
    running = want;
    if (running) {
      last = performance.now();
      raf = requestAnimationFrame(tick);
    } else cancelAnimationFrame(raf);
  }
  const io = new IntersectionObserver(([e]) => {
    inView = e.isIntersecting;
    setRunning();
  });
  const ro = new ResizeObserver(() => resize());
  document.addEventListener('visibilitychange', setRunning);
  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    inView = false;
    setRunning();
    onLost?.();
  });

  resize();
  // Compile off the main thread where the browser can; plain compile elsewhere.
  if (renderer.extensions.has('KHR_parallel_shader_compile')) await renderer.compileAsync(scene, camera);
  else renderer.compile(scene, camera);
  update(0);
  renderer.render(scene, camera);

  if (hq) window.__heroDebug = () => ({ t, mode, level, body: body.visible, at: body.position.toArray(), target: target.toArray(), tier });

  // Poster capture for tools/capture-hero.mjs: deterministic, light on, no UI.
  if (poster) window.__heroCapture = (w, h, q = 0.85) => {
    resize(w, h, 1);
    update(0);
    renderer.render(scene, camera);
    const url = canvas.toDataURL('image/webp', q);
    resize();
    update(0);
    renderer.render(scene, camera);
    return url;
  };

  requestAnimationFrame(() => {
    onReady?.();
    if (poster) {
      window.__heroReady = true;
      return;
    }
    io.observe(root);
    ro.observe(canvas);
    setRunning();
  });
}

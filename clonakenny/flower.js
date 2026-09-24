/* Clonakenny generative flower.
   Raw WebGL2, no library: one instanced draw of petals laid out on the golden-angle
   (phyllotaxis) spiral a real flower head uses. Each petal's shape, tilt and colour come
   from a small set of numbers, so one engine draws a seed spiral, a ranunculus, a cosmos,
   a dahlia or a strawflower, and can morph between them. */
(function () {
  'use strict';

  var GOLDEN = Math.PI * (3 - Math.sqrt(5));
  var MAX_PETALS = 420;
  var SEG_U = 8;   // segments across a petal
  var SEG_V = 14;  // segments along a petal

  var VERT = [
    '#version 300 es',
    'precision highp float;',
    'in vec2 a_uv;',
    'in float a_index;',
    'in vec3 a_rand;',
    'uniform mat4 u_proj, u_view, u_model;',
    'uniform float u_bloom, u_time;',
    'uniform float u_discCount, u_rayCount, u_ring, u_discR, u_dome;',
    'uniform float u_lenIn, u_lenOut, u_lenCurve, u_widIn, u_widOut;',
    'uniform float u_tiltIn, u_tiltOut, u_tiltCurve, u_cup, u_curl, u_tip;',
    'uniform float u_floretLen, u_floretWid, u_floretTilt;',
    'out vec2 v_uv; out vec3 v_normal; out vec3 v_pos; out float v_t; out float v_role; out vec3 v_rand;',
    'const float GOLDEN = ' + GOLDEN.toFixed(8) + ';',
    'vec3 g_base, g_D, g_T, g_N; float g_len, g_wid, g_cup, g_curl, g_tip;',
    'vec3 petalPoint(float u, float v) {',
    '  float body = pow(clamp(v, 0.0, 1.0), 0.42);',
    '  float tipShape = pow(max(1.0 - pow(clamp(v, 0.0, 1.0), g_tip), 0.0), 1.0 / g_tip);',
    '  float w = g_wid * (0.42 + 0.58 * body) * tipShape;',
    '  float z = g_cup * g_wid * u * u * (1.0 - 0.72 * v) + g_curl * g_len * v * v;',
    '  return g_base + g_D * (v * g_len) + g_T * (u * w) + g_N * z;',
    '}',
    'void main() {',
    '  float i = a_index;',
    '  float total = u_discCount + u_rayCount;',
    '  float win = clamp(u_rayCount * 0.03, 0.02, 5.0);',
    '  float role = smoothstep(u_discCount - 0.5 - win, u_discCount - 0.5 + win, i);',
    '  float visible = 1.0 - smoothstep(total - 0.5 - win, total - 0.5 + win, i);',
    '  float tG = clamp(i / max(total, 1.0), 0.0, 1.0);',
    '  float tD = clamp(i / max(u_discCount, 1.0), 0.0, 1.0);',
    '  float k = max(i - floor(u_discCount + 0.5), 0.0);',
    '  float tR = clamp(k / max(u_rayCount - 1.0, 1.0), 0.0, 1.0);',
    '  float angRing = 6.2831853 * k / max(u_rayCount, 1.0) + (a_rand.x - 0.5) * 0.1;',
    '  float ang = mix(i * GOLDEN, angRing, u_ring * role) + (a_rand.y - 0.5) * 0.05;',
    '  float rF = u_discR * sqrt(mix(tG, tD, u_ring));',
    '  float rR = mix(u_discR * sqrt(tG), u_discR * 0.98, u_ring);',
    '  float r = mix(rF, rR, role);',
    '  float rn = r / max(u_discR, 0.001);',
    '  g_base = vec3(cos(ang) * r, sin(ang) * r, u_dome * u_discR * (1.0 - rn * rn) * 0.7);',
    '  float open = clamp((u_bloom - (1.0 - tR) * 0.55) / 0.45, 0.0, 1.0);',
    '  open = open * open * (3.0 - 2.0 * open);',
    '  float tiltRay = mix(u_tiltIn, u_tiltOut, pow(tR, u_tiltCurve)) + (a_rand.z - 0.5) * 0.14;',
    '  tiltRay = mix(0.06, tiltRay, open) + sin(u_time * 0.9 + i * 0.37) * 0.018 * open;',
    '  float tilt = mix(u_floretTilt, tiltRay, role);',
    '  float lenRay = mix(u_lenIn, u_lenOut, pow(tR, u_lenCurve)) * (0.9 + 0.2 * a_rand.y) * mix(0.42, 1.0, open);',
    '  float widRay = mix(u_widIn, u_widOut, tR) * (0.88 + 0.24 * a_rand.z) * mix(0.7, 1.0, open);',
    '  g_len = mix(u_floretLen * (0.8 + 0.4 * a_rand.y), lenRay, role) * visible;',
    '  g_wid = mix(u_floretWid, widRay, role) * visible;',
    '  g_cup = mix(0.8, u_cup, role);',
    '  g_curl = mix(0.0, u_curl, role) * open;',
    '  g_tip = mix(3.0, u_tip, role);',
    '  vec3 R = vec3(cos(ang), sin(ang), 0.0);',
    '  g_T = vec3(-sin(ang), cos(ang), 0.0);',
    '  g_D = cos(tilt) * vec3(0.0, 0.0, 1.0) + sin(tilt) * R;',
    '  g_N = cross(g_D, g_T);',
    '  float roll = (a_rand.x - 0.5) * 0.5 * role;',
    '  vec3 T0 = g_T;',
    '  g_T = cos(roll) * T0 + sin(roll) * g_N;',
    '  g_N = cos(roll) * g_N - sin(roll) * T0;',
    '  float u = a_uv.x, v = a_uv.y;',
    '  vec3 P = petalPoint(u, v);',
    '  vec3 Pu = petalPoint(u + 0.02, v);',
    '  vec3 Pv = petalPoint(u, v + 0.02);',
    '  vec3 n = cross(Pv - P, Pu - P);',
    '  n = length(n) > 1e-8 ? normalize(n) : g_N;',
    '  vec4 world = u_model * vec4(P, 1.0);',
    '  v_pos = world.xyz;',
    '  v_normal = mat3(u_model) * n;',
    '  v_uv = a_uv; v_t = mix(tG, mix(tR, 1.0, u_ring), role); v_role = role; v_rand = a_rand;',
    '  gl_Position = u_proj * u_view * world;',
    '}'
  ].join('\n');

  var FRAG = [
    '#version 300 es',
    'precision highp float;',
    'in vec2 v_uv; in vec3 v_normal; in vec3 v_pos; in float v_t; in float v_role; in vec3 v_rand;',
    'uniform vec3 u_colBase, u_colMid, u_colTip, u_colFloret, u_colFloretTip, u_rimCol;',
    'uniform vec3 u_light, u_eye;',
    'uniform float u_fade;',
    'out vec4 outColor;',
    'void main() {',
    '  vec3 n = normalize(v_normal);',
    '  if (!gl_FrontFacing) n = -n;',
    '  vec3 V = normalize(u_eye - v_pos);',
    '  vec3 L = normalize(u_light);',
    '  float v = v_uv.y;',
    '  vec3 petal = mix(u_colBase, u_colMid, smoothstep(0.0, 0.6, v));',
    '  petal = mix(petal, u_colTip, smoothstep(0.5, 1.0, v));',
    '  petal = mix(petal * vec3(0.8, 0.72, 0.86), petal, smoothstep(0.0, 0.55, v_t));',
    '  petal *= 0.93 + 0.14 * v_rand.x;',
    '  float vein = pow(abs(sin(v_uv.x * 6.5 + v_rand.y * 6.2831)), 14.0);',
    '  petal *= 1.0 - 0.08 * vein * (1.0 - v * 0.6);',
    '  vec3 floret = mix(u_colFloret, u_colFloretTip, v) * (0.85 + 0.3 * v_rand.x);',
    '  vec3 albedo = mix(floret, petal, v_role);',
    '  float ndl = dot(n, L);',
    '  float diff = clamp((ndl + 0.75) / 1.75, 0.0, 1.0);',
    '  float trans = pow(clamp(-ndl, 0.0, 1.0), 1.2) * 0.42;',
    '  float ao = mix(0.3, 1.0, smoothstep(0.0, 0.62, v)) * mix(0.62, 1.0, v_t);',
    '  float rim = pow(1.0 - clamp(abs(dot(n, V)), 0.0, 1.0), 2.5);',
    '  float light = (0.46 + 0.66 * diff) * ao;',
    '  vec3 col = albedo * light;',
    '  col = mix(col * vec3(0.86, 0.72, 1.08), col, clamp(light, 0.0, 1.0));',
    '  col += albedo * trans * vec3(1.06, 0.96, 1.08);',
    '  col += mix(albedo, u_rimCol, 0.25) * rim * 0.12 * smoothstep(0.25, 1.0, v);',
    '  vec3 H = normalize(L + V);',
    '  col += albedo * pow(max(dot(n, H), 0.0), 16.0) * 0.08;',
    '  float lum = dot(col, vec3(0.299, 0.587, 0.114));',
    '  col = mix(vec3(lum), col, 1.18);',
    '  outColor = vec4(col * u_fade, u_fade);',
    '}'
  ].join('\n');

  /* Species. Colours are sRGB 0..1. Counts are floats so presets morph smoothly. */
  var PRESETS = {
    seed: {
      discCount: 360, rayCount: 0, ring: 0, discR: 1.25, dome: 0.15,
      lenIn: 0.2, lenOut: 0.6, lenCurve: 1, widIn: 0.1, widOut: 0.3,
      tiltIn: 0.2, tiltOut: 1.4, tiltCurve: 1, cup: 0.4, curl: 0, tip: 3,
      floretLen: 0.085, floretWid: 0.075, floretTilt: 1.35,
      colBase: [0.8, 0.3, 0.24], colMid: [0.97, 0.6, 0.48], colTip: [1.0, 0.86, 0.77],
      colFloret: [0.24, 0.12, 0.14], colFloretTip: [0.46, 0.28, 0.26], rimCol: [1, 0.92, 0.9]
    },
    ranunculus: {
      discCount: 0, rayCount: 320, ring: 0, discR: 0.26, dome: 0.9,
      lenIn: 0.2, lenOut: 0.92, lenCurve: 0.7, widIn: 0.14, widOut: 0.46,
      tiltIn: 0.05, tiltOut: 1.3, tiltCurve: 2.2, cup: 0.8, curl: 0.34, tip: 2.2,
      floretLen: 0.05, floretWid: 0.04, floretTilt: 1,
      colBase: [0.8, 0.3, 0.24], colMid: [0.97, 0.6, 0.48], colTip: [1.0, 0.86, 0.77],
      colFloret: [0.36, 0.42, 0.2], colFloretTip: [0.62, 0.7, 0.34], rimCol: [1, 0.92, 0.85]
    },
    cosmos: {
      discCount: 120, rayCount: 8, ring: 1, discR: 0.26, dome: 0.5,
      lenIn: 1.3, lenOut: 1.3, lenCurve: 1, widIn: 0.66, widOut: 0.66,
      tiltIn: 1.42, tiltOut: 1.42, tiltCurve: 1, cup: 0.22, curl: -0.06, tip: 2.2,
      floretLen: 0.08, floretWid: 0.05, floretTilt: 0.55,
      colBase: [0.78, 0.25, 0.5], colMid: [0.94, 0.58, 0.76], colTip: [0.99, 0.87, 0.93],
      colFloret: [0.82, 0.55, 0.08], colFloretTip: [0.98, 0.83, 0.3], rimCol: [1, 0.9, 0.95]
    },
    dahlia: {
      discCount: 0, rayCount: 270, ring: 0, discR: 0.34, dome: 0.6,
      lenIn: 0.22, lenOut: 1.24, lenCurve: 0.85, widIn: 0.13, widOut: 0.52,
      tiltIn: 0.1, tiltOut: 1.72, tiltCurve: 1.05, cup: 0.5, curl: -0.2, tip: 3.0,
      floretLen: 0.06, floretWid: 0.05, floretTilt: 1.2,
      colBase: [0.16, 0.01, 0.2], colMid: [0.56, 0.26, 0.7], colTip: [0.94, 0.84, 0.97],
      colFloret: [0.5, 0.3, 0.5], colFloretTip: [0.7, 0.5, 0.7], rimCol: [1, 0.92, 1]
    },
    strawflower: {
      discCount: 70, rayCount: 250, ring: 0, discR: 0.44, dome: 0.55,
      lenIn: 0.22, lenOut: 0.78, lenCurve: 0.8, widIn: 0.1, widOut: 0.27,
      tiltIn: 0.32, tiltOut: 1.38, tiltCurve: 1.2, cup: 0.95, curl: 0.06, tip: 1.1,
      floretLen: 0.07, floretWid: 0.05, floretTilt: 1.1,
      colBase: [0.5, 0.2, 0.12], colMid: [0.78, 0.47, 0.26], colTip: [0.93, 0.8, 0.58],
      colFloret: [0.55, 0.38, 0.12], colFloretTip: [0.85, 0.66, 0.3], rimCol: [1, 0.9, 0.75]
    }
  };

  var SHAPE_KEYS = Object.keys(PRESETS.dahlia);

  /* ---- tiny mat4 helpers (column-major) ---- */
  function perspective(fovy, aspect, near, far) {
    var f = 1 / Math.tan(fovy / 2), nf = 1 / (near - far);
    return [f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0];
  }
  function lookAt(e, c, up) {
    var zx = e[0] - c[0], zy = e[1] - c[1], zz = e[2] - c[2];
    var l = Math.hypot(zx, zy, zz); zx /= l; zy /= l; zz /= l;
    var xx = up[1] * zz - up[2] * zy, xy = up[2] * zx - up[0] * zz, xz = up[0] * zy - up[1] * zx;
    l = Math.hypot(xx, xy, xz); xx /= l; xy /= l; xz /= l;
    var yx = zy * xz - zz * xy, yy = zz * xx - zx * xz, yz = zx * xy - zy * xx;
    return [xx, yx, zx, 0, xy, yy, zy, 0, xz, yz, zz, 0,
      -(xx * e[0] + xy * e[1] + xz * e[2]), -(yx * e[0] + yy * e[1] + yz * e[2]), -(zx * e[0] + zy * e[1] + zz * e[2]), 1];
  }
  function mul(a, b) {
    var o = new Array(16);
    for (var c = 0; c < 4; c++) for (var r = 0; r < 4; r++) {
      o[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3];
    }
    return o;
  }
  function rotX(t) { var c = Math.cos(t), s = Math.sin(t); return [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]; }
  function rotY(t) { var c = Math.cos(t), s = Math.sin(t); return [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]; }
  function rotZ(t) { var c = Math.cos(t), s = Math.sin(t); return [c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]; }

  function lerp(a, b, t) { return a + (b - a) * t; }
  function mixPreset(a, b, t, out) {
    for (var i = 0; i < SHAPE_KEYS.length; i++) {
      var k = SHAPE_KEYS[i], va = a[k], vb = b[k];
      if (Array.isArray(va)) out[k] = [lerp(va[0], vb[0], t), lerp(va[1], vb[1], t), lerp(va[2], vb[2], t)];
      else out[k] = lerp(va, vb, t);
    }
    return out;
  }

  function compile(gl, type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  }

  function seeded(seed) {
    return function () {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };
  }

  function Flower(canvas, opts) {
    opts = opts || {};
    this.canvas = canvas;
    var gl = canvas.getContext('webgl2', { antialias: true, alpha: true, premultipliedAlpha: true, powerPreference: 'high-performance' });
    if (!gl) throw new Error('webgl2-unavailable');
    this.gl = gl;

    var prog = gl.createProgram();
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
    this.prog = prog;

    // Petal grid
    var uv = [], idx = [];
    for (var j = 0; j <= SEG_V; j++) for (var i = 0; i <= SEG_U; i++) uv.push(i / SEG_U * 2 - 1, j / SEG_V);
    for (j = 0; j < SEG_V; j++) for (i = 0; i < SEG_U; i++) {
      var a = j * (SEG_U + 1) + i, b = a + 1, c = a + SEG_U + 1, d = c + 1;
      idx.push(a, b, c, b, d, c);
    }
    this.indexCount = idx.length;

    // Per-petal attributes
    var rnd = seeded(opts.seed || 20200415);
    var inst = new Float32Array(MAX_PETALS * 4);
    for (i = 0; i < MAX_PETALS; i++) {
      inst[i * 4] = i; inst[i * 4 + 1] = rnd(); inst[i * 4 + 2] = rnd(); inst[i * 4 + 3] = rnd();
    }

    var vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    function buffer(data, target) {
      var buf = gl.createBuffer();
      gl.bindBuffer(target || gl.ARRAY_BUFFER, buf);
      gl.bufferData(target || gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      return buf;
    }
    buffer(new Float32Array(uv));
    var locUV = gl.getAttribLocation(prog, 'a_uv');
    gl.enableVertexAttribArray(locUV);
    gl.vertexAttribPointer(locUV, 2, gl.FLOAT, false, 0, 0);

    buffer(inst);
    var locI = gl.getAttribLocation(prog, 'a_index');
    var locR = gl.getAttribLocation(prog, 'a_rand');
    gl.enableVertexAttribArray(locI);
    gl.vertexAttribPointer(locI, 1, gl.FLOAT, false, 16, 0);
    gl.vertexAttribDivisor(locI, 1);
    gl.enableVertexAttribArray(locR);
    gl.vertexAttribPointer(locR, 3, gl.FLOAT, false, 16, 4);
    gl.vertexAttribDivisor(locR, 1);

    buffer(new Uint16Array(idx), gl.ELEMENT_ARRAY_BUFFER);
    gl.bindVertexArray(null);
    this.vao = vao;

    this.u = {};
    var n = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS);
    for (i = 0; i < n; i++) {
      var info = gl.getActiveUniform(prog, i);
      this.u[info.name] = gl.getUniformLocation(prog, info.name);
    }

    this.shape = mixPreset(PRESETS[opts.preset || 'dahlia'], PRESETS[opts.preset || 'dahlia'], 0, {});
    // View state. GSAP tweens these directly.
    this.state = {
      bloom: opts.bloom != null ? opts.bloom : 1,
      dist: 9, fov: 30, offsetX: 0, offsetY: 0,
      tiltX: -0.42, spin: 0, spinSpeed: 0.05, dive: 0, fade: 1
    };
    this.pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    this.time = 0;
    this.running = false;
    this.dpr = Math.min(window.devicePixelRatio || 1, opts.maxDpr || 2);
    this._frame = this._frame.bind(this);
    this.resize();
  }

  Flower.PRESETS = PRESETS;

  Flower.prototype.setPreset = function (name) {
    mixPreset(PRESETS[name], PRESETS[name], 0, this.shape);
  };
  Flower.prototype.mix = function (a, b, t) {
    mixPreset(PRESETS[a], PRESETS[b], t, this.shape);
  };
  Flower.prototype.resize = function () {
    var w = this.canvas.clientWidth, h = this.canvas.clientHeight;
    var pw = Math.max(1, Math.round(w * this.dpr)), ph = Math.max(1, Math.round(h * this.dpr));
    if (this.canvas.width !== pw || this.canvas.height !== ph) {
      this.canvas.width = pw; this.canvas.height = ph;
    }
    this.aspect = w / Math.max(h, 1);
  };
  Flower.prototype.setPointer = function (x, y) { this.pointer.tx = x; this.pointer.ty = y; };

  Flower.prototype.render = function () {
    var gl = this.gl, s = this.state, sh = this.shape, u = this.u;
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    if (s.fade <= 0.001) return;
    gl.enable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    gl.useProgram(this.prog);
    gl.bindVertexArray(this.vao);

    var p = this.pointer;
    p.x += (p.tx - p.x) * 0.05; p.y += (p.ty - p.y) * 0.05;

    // Dive: the camera travels down the flower's axis into its centre.
    var dive = s.dive;
    var dist = lerp(s.dist, 0.32, Math.pow(dive, 1.6));
    var fov = lerp(s.fov, 62, dive) * Math.PI / 180;
    var proj = perspective(fov, this.aspect, 0.03, 60);
    proj[8] = -s.offsetX * (1 - dive);
    proj[9] = -s.offsetY * (1 - dive);
    var eye = [0, 0, dist];
    var view = lookAt(eye, [0, 0, 0], [0, 1, 0]);
    var tilt = lerp(s.tiltX + p.y * 0.16, 0, dive);
    var model = mul(rotY(p.x * 0.22 * (1 - dive)), mul(rotX(tilt), rotZ(s.spin)));

    gl.uniformMatrix4fv(u.u_proj, false, proj);
    gl.uniformMatrix4fv(u.u_view, false, view);
    gl.uniformMatrix4fv(u.u_model, false, model);
    gl.uniform1f(u.u_bloom, s.bloom);
    gl.uniform1f(u.u_time, this.time);
    gl.uniform1f(u.u_fade, s.fade);
    gl.uniform3fv(u.u_light, [-0.45, 0.75, 0.9]);
    gl.uniform3fv(u.u_eye, eye);
    for (var i = 0; i < SHAPE_KEYS.length; i++) {
      var k = SHAPE_KEYS[i], loc = u['u_' + k];
      if (!loc) continue;
      var val = sh[k];
      if (Array.isArray(val)) gl.uniform3fv(loc, val); else gl.uniform1f(loc, val);
    }
    var count = Math.min(MAX_PETALS, Math.ceil(sh.discCount + sh.rayCount + 4));
    gl.drawElementsInstanced(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_SHORT, 0, count);
    gl.bindVertexArray(null);
  };

  Flower.prototype._frame = function (now) {
    if (!this.running) return;
    var dt = this._last ? Math.min((now - this._last) / 1000, 0.05) : 0.016;
    this._last = now;
    this.time += dt;
    this.state.spin += dt * this.state.spinSpeed;
    // onBeforeRender may return false to skip drawing (e.g. while the flower is fully covered).
    if (!this.onBeforeRender || this.onBeforeRender(this, dt) !== false) this.render();
    this._raf = requestAnimationFrame(this._frame);
  };
  Flower.prototype.start = function () {
    if (this.running) return;
    this.running = true;
    this._last = 0;
    this._raf = requestAnimationFrame(this._frame);
  };
  Flower.prototype.stop = function () {
    this.running = false;
    cancelAnimationFrame(this._raf);
  };

  window.ClonakennyFlower = Flower;
})();

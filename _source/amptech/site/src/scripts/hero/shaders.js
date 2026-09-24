// GLSL for the hero scene. Kept as plain strings; three adds the prefixes.

// Overcast Irish night: deep blue zenith, cloud base underlit orange by the
// estate's sodium lamps near the horizon, slow fbm drift. Horizon = fog colour.
export const sky = {
  vertexShader: /* glsl */ `
    varying vec3 vDir;
    void main() {
      vDir = position;
      vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      gl_Position = p.xyww;
    }`,
  fragmentShader: /* glsl */ `
    uniform float uTime;
    uniform vec3 uZenith, uMid, uGlow, uHorizon;
    varying vec3 vDir;
    float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
    float noise(vec2 p) {
      vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
    }
    float fbm(vec2 p) {
      float v = 0.0, a = 0.5;
      for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.03 + vec2(17.1, 9.2); a *= 0.5; }
      return v;
    }
    void main() {
      vec3 d = normalize(vDir);
      float h = max(d.y, 0.0);
      vec3 col = mix(uHorizon, uGlow, smoothstep(0.0, 0.07, h));
      col = mix(col, uMid, smoothstep(0.05, 0.3, h));
      col = mix(col, uZenith, smoothstep(0.26, 0.75, h));
      vec2 p = d.xz / (h + 0.16) * 1.3 + vec2(uTime * 0.02, uTime * 0.007);
      float c = fbm(p);
      float under = exp(-h * 11.0);
      vec3 cloud = mix(uMid * 1.3, uGlow * 1.3, under);
      float amt = smoothstep(0.4, 0.78, c) * smoothstep(0.0, 0.04, h);
      col = mix(col, cloud, amt * 0.9);
      col *= 0.9 + 0.1 * smoothstep(0.25, 0.6, c);
      gl_FragColor = vec4(col, 1.0);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`,
};

// A soft beam of light in drizzle: bright near the lamp, gone before the
// ground so it never shows a hard intersection line.
export const cone = {
  vertexShader: /* glsl */ `
    uniform float uLen;
    varying vec3 vN, vW;
    varying float vT;
    void main() {
      vT = -position.y / uLen;
      vec4 w = modelMatrix * vec4(position, 1.0);
      vW = w.xyz;
      vN = normalize(mat3(modelMatrix) * normal);
      gl_Position = projectionMatrix * viewMatrix * w;
    }`,
  fragmentShader: /* glsl */ `
    uniform vec3 uColor;
    uniform float uLevel;
    varying vec3 vN, vW;
    varying float vT;
    void main() {
      vec3 v = normalize(cameraPosition - vW);
      float edge = pow(abs(dot(normalize(vN), v)), 2.2);
      float along = pow(1.0 - vT, 1.7) * smoothstep(0.0, 0.1, vT);
      gl_FragColor = vec4(uColor * edge * along * uLevel, 1.0);
    }`,
};

// Drizzle: points drawn as thin slanted streaks, only where a lamp lights them.
export const rain = {
  vertexShader: /* glsl */ `
    attribute vec3 aFall; // box floor, box height, speed
    uniform float uTime, uScale, uFlood;
    uniform vec3 uFloodPos, uFloodDir, uStreetPos, uStreetDir, uFloodCol, uStreetCol;
    uniform vec2 uCos; // flood, street cone cosines
    varying vec3 vCol;
    float lit(vec3 p, vec3 a, vec3 dir, float c0, float range) {
      vec3 v = p - a;
      float d = dot(v, dir);
      if (d <= 0.0) return 0.0;
      float c = d / length(v);
      return smoothstep(c0, mix(c0, 1.0, 0.55), c) * (1.0 - smoothstep(range * 0.45, range, d));
    }
    void main() {
      vec3 p = position;
      p.y = aFall.x + mod(position.y - uTime * aFall.z, aFall.y);
      p.x += sin(uTime * 0.7 + position.z) * 0.08;
      float f = lit(p, uFloodPos, uFloodDir, uCos.x, 8.5) * uFlood;
      float s = lit(p, uStreetPos, uStreetDir, uCos.y, 9.5);
      vCol = uFloodCol * f + uStreetCol * s * 0.8;
      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      gl_Position = projectionMatrix * mv;
      gl_PointSize = (f + s) > 0.01 ? uScale / -mv.z : 0.0;
    }`,
  fragmentShader: /* glsl */ `
    varying vec3 vCol;
    void main() {
      vec2 q = gl_PointCoord - 0.5;
      float w = abs(q.x + q.y * 0.16);
      float a = (1.0 - smoothstep(0.0, 0.032, w)) * (1.0 - smoothstep(0.15, 0.5, abs(q.y)));
      gl_FragColor = vec4(vCol * a * 0.85, 1.0);
    }`,
};

// PIR detection: an arc sweeps out across the ground from the sensor on trip.
export const sweep = {
  vertexShader: /* glsl */ `
    uniform float uRadius;
    varying float vR;
    varying vec3 vW;
    void main() {
      vR = length(position.xz) / uRadius;
      vec4 w = modelMatrix * vec4(position, 1.0);
      vW = w.xyz;
      gl_Position = projectionMatrix * viewMatrix * w;
    }`,
  fragmentShader: /* glsl */ `
    uniform float uProg;
    uniform vec3 uColor;
    uniform vec4 uRect;
    varying float vR;
    varying vec3 vW;
    void main() {
      if (vW.x < uRect.x || vW.z < uRect.y || vW.x > uRect.z || vW.z > uRect.w) discard;
      float band = 1.0 - smoothstep(0.0, 0.07, abs(vR - uProg));
      float trail = smoothstep(0.0, uProg, vR) * step(vR, uProg) * 0.18;
      float a = (band + trail) * (1.0 - smoothstep(0.55, 1.0, uProg));
      gl_FragColor = vec4(uColor * a, 1.0);
    }`,
};

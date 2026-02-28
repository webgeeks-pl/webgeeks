"use client";

import { useEffect, useRef } from "react";
// @ts-ignore - ogl types may be missing in this workspace
import { Camera, Geometry, Mesh, Program, Renderer, RenderTarget } from "ogl";
import { useIsMobile } from "../hooks/use-mobile";

interface DitherOGLProps {
  waveSpeed?: number;
  waveFrequency?: number;
  waveAmplitude?: number;
  waveColor?: [number, number, number];
  colorNum?: number;
  pixelSize?: number;
  disableAnimation?: boolean;
  enableMouseInteraction?: boolean;
}

const vertex = `
attribute vec3 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const waveFragment = `
precision mediump float;
varying vec2 vUv;
uniform vec2 resolution;
uniform float time;
uniform float waveSpeed;
uniform float waveFrequency;
uniform float waveAmplitude;
uniform vec3 waveColor;
uniform vec2 mousePos;
uniform int enableMouseInteraction;
uniform float mouseRadius;

// Simple noise / fbm (a lighter version than original for portability)
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f*f*(3.0-2.0*f);
  return mix(a, b, u.x) + (c - a)*u.y*(1.0-u.x) + (d - b)*u.x*u.y;
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= waveFrequency;
    a *= waveAmplitude;
  }
  return v;
}

void main() {
  vec2 uv = vUv - 0.5;
  uv.x *= resolution.x / resolution.y;
  float f = fbm(uv - time * waveSpeed);
  if (enableMouseInteraction == 1) {
    vec2 mouseN = (mousePos / resolution - 0.5) * vec2(1.0, -1.0);
    mouseN.x *= resolution.x / resolution.y;
    float dist = length(uv - mouseN);
    float effect = 1.0 - smoothstep(0.0, mouseRadius, dist);
    f -= 0.5 * effect;
  }
  vec3 col = mix(vec3(0.0), waveColor, f);
  gl_FragColor = vec4(col, 1.0);
}
`;

const ditherFragment = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uTexture;
uniform float colorNum;
uniform float pixelSize;
uniform vec2 resolution;

// 8x8 Bayer
const float bayer[64] = float[64](
  0.0/64.0,48.0/64.0,12.0/64.0,60.0/64.0,3.0/64.0,51.0/64.0,15.0/64.0,63.0/64.0,
  32.0/64.0,16.0/64.0,44.0/64.0,28.0/64.0,35.0/64.0,19.0/64.0,47.0/64.0,31.0/64.0,
  8.0/64.0,56.0/64.0,4.0/64.0,52.0/64.0,11.0/64.0,59.0/64.0,7.0/64.0,55.0/64.0,
  40.0/64.0,24.0/64.0,36.0/64.0,20.0/64.0,43.0/64.0,27.0/64.0,39.0/64.0,23.0/64.0,
  2.0/64.0,50.0/64.0,14.0/64.0,62.0/64.0,1.0/64.0,49.0/64.0,13.0/64.0,61.0/64.0,
  34.0/64.0,18.0/64.0,46.0/64.0,30.0/64.0,33.0/64.0,17.0/64.0,45.0/64.0,29.0/64.0,
  10.0/64.0,58.0/64.0,6.0/64.0,54.0/64.0,9.0/64.0,57.0/64.0,5.0/64.0,53.0/64.0,
  42.0/64.0,26.0/64.0,38.0/64.0,22.0/64.0,41.0/64.0,25.0/64.0,37.0/64.0,21.0/64.0
);

void main() {
  vec2 px = pixelSize / resolution;
  vec2 uvp = px * floor(vUv / px);
  vec4 color = texture2D(uTexture, uvp);
  float x = mod(floor(vUv.x * resolution.x / pixelSize), 8.0);
  float y = mod(floor(vUv.y * resolution.y / pixelSize), 8.0);
  int xi = int(x);
  int yi = int(y);
  float th = bayer[yi * 8 + xi] - 0.25;
  float stepv = 1.0 / (colorNum - 1.0);
  color.rgb += th * stepv;
  float bias = 0.2;
  color.rgb = clamp(color.rgb - bias, 0.0, 1.0);
  color.rgb = floor(color.rgb * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);
  gl_FragColor = color;
}
`;

export default function DitherOGL({
  waveSpeed = 0.05,
  waveFrequency = 3,
  waveAmplitude = 0.3,
  waveColor = [0.5, 0.5, 0.5],
  colorNum = 4,
  pixelSize = 2,
  disableAnimation = false,
  enableMouseInteraction = true,
}: DitherOGLProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!containerRef.current) return;

    const dpr = isMobile ? Math.max(0.5, window.devicePixelRatio * 0.75) : window.devicePixelRatio || 1;

    const renderer = new Renderer({ dpr, antialias: !isMobile });
    const gl = renderer.gl;
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(gl.canvas as HTMLCanvasElement);

    const camera = new Camera(gl, { fov: 45 });
    camera.position.z = 1;

    // Fullscreen quad geometry
    const geometry = new Geometry(gl, {
      position: { size: 3, data: new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]) },
      uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
    });

    // Main program (render to texture)
    const mainProgram = new Program(gl, {
      vertex,
      fragment: waveFragment,
      uniforms: {
        time: { value: 0 },
        resolution: { value: [gl.canvas.width, gl.canvas.height] },
        waveSpeed: { value: waveSpeed },
        waveFrequency: { value: waveFrequency },
        waveAmplitude: { value: waveAmplitude },
        waveColor: { value: waveColor },
        mousePos: { value: [0, 0] },
        enableMouseInteraction: { value: enableMouseInteraction && !isMobile ? 1 : 0 },
        mouseRadius: { value: 1.0 },
      },
    });

    const mainMesh = new Mesh(gl, { geometry, program: mainProgram });

    const target = new RenderTarget(gl, { width: gl.canvas.width, height: gl.canvas.height });

    // Postprocess program
    const postProgram = new Program(gl, {
      vertex,
      fragment: ditherFragment,
      uniforms: {
        uTexture: { value: target.texture },
        colorNum: { value: isMobile ? Math.max(2, colorNum) : colorNum },
        pixelSize: { value: isMobile ? Math.max(2, pixelSize * 2) : pixelSize },
        resolution: { value: [gl.canvas.width, gl.canvas.height] },
      },
    });

    const postMesh = new Mesh(gl, { geometry, program: postProgram });

    let mouse = [0, 0];
    const handlePointer = (e: PointerEvent) => {
      if (!enableMouseInteraction || isMobile) return;
      const rect = gl.canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * dpr;
      const y = (e.clientY - rect.top) * dpr;
      mouse = [x, y];
      mainProgram.uniforms.mousePos.value = mouse;
    };

    gl.canvas.addEventListener("pointermove", handlePointer);

    let rafId: number | null = null;
    const start = performance.now();

    function resize() {
      const w = containerRef.current?.clientWidth || 300;
      const h = containerRef.current?.clientHeight || 150;
      renderer.setSize(w, h);
      target.setSize(w, h);
      mainProgram.uniforms.resolution.value = [gl.canvas.width, gl.canvas.height];
      postProgram.uniforms.resolution.value = [gl.canvas.width, gl.canvas.height];
    }

    resize();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    function update() {
      const now = (performance.now() - start) / 1000;
      if (!disableAnimation && !isMobile) mainProgram.uniforms.time.value = now;

      mainProgram.uniforms.waveSpeed.value = waveSpeed;
      mainProgram.uniforms.waveFrequency.value = waveFrequency;
      mainProgram.uniforms.waveAmplitude.value = waveAmplitude;

      // render main pass to target then postprocess to screen
      renderer.render({ scene: mainMesh, camera, target });
      renderer.render({ scene: postMesh, camera });

      rafId = requestAnimationFrame(update);
    }

    rafId = requestAnimationFrame(update);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      gl.canvas.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("resize", onResize);
      renderer.gl.canvas && containerRef.current && containerRef.current.removeChild(renderer.gl.canvas);
      (target as any).dispose && (target as any).dispose();
      (mainProgram as any).dispose && (mainProgram as any).dispose();
      (postProgram as any).dispose && (postProgram as any).dispose();
      (geometry as any).dispose && (geometry as any).dispose();
      (renderer as any).dispose && (renderer as any).dispose();
    };
  }, [isMobile, waveSpeed, waveFrequency, waveAmplitude, waveColor, colorNum, pixelSize, disableAnimation, enableMouseInteraction]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}

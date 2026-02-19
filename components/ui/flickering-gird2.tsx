"use client";

import { Mesh, Program, Renderer, Triangle } from "ogl";
import { useEffect, useRef } from "react";

export function FlickeringGridOGL() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        // ---- Renderer ----
        const renderer = new Renderer({
            alpha: true,
            antialias: false,
            dpr: Math.min(2, window.devicePixelRatio),
        });

        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);
        ref.current.appendChild(gl.canvas);

        // ---- Fullscreen triangle ----
        const geometry = new Triangle(gl);

        // ---- Shader ----
        const program = new Program(gl, {
            vertex: `
        attribute vec2 position;
        attribute vec2 uv;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `,
            fragment: `
precision mediump float;

uniform float uTime;
uniform vec2  uResolution;

varying vec2 vUv;

// fast hash
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

void main() {
  vec2 pixel = vUv * uResolution;

  float squareSize = 4.0;
  float gap = 6.0;
  float maxOpacity = 0.7;
  float flickerSpeed = 10.0; // speed of fade in/out

  float cellSize = squareSize + gap;
  vec2 grid = floor(pixel / cellSize);
  vec2 local = mod(pixel, cellSize);

  // mask inside square
  float mask = step(local.x, squareSize) * step(local.y, squareSize);

  // stable per-cell base opacity
  float base = hash(grid) * maxOpacity;

  // unique phase per cell
  float phase = hash(grid * 12.34) * 6.28318; // 0 → 2π

  // smooth flicker, shifted up so opacity is mostly high
  float alpha = base * 0.7 + base * 0.7 * (0.7 + 0.7 * sin(uTime * flickerSpeed + phase));

  // apply mask
  alpha *= mask;

  gl_FragColor = vec4(vec3(0.0), alpha);
}


      `,
            uniforms: {
                uTime: { value: 0 },
                uResolution: { value: [1, 1] },
            },
            depthTest: false,
            depthWrite: false,
            transparent: true,
        });

        const mesh = new Mesh(gl, { geometry, program });

        // ---- Resize ----
        const resize = () => {
            const w = ref.current!.clientWidth;
            const h = ref.current!.clientHeight;
            renderer.setSize(w, h);
            program.uniforms.uResolution.value = [w, h];
        };

        resize();
        window.addEventListener("resize", resize);

        // ---- Render loop ----
        let frame: number;
        const update = (t: number) => {
            frame = requestAnimationFrame(update);
            program.uniforms.uTime.value = t * 0.0001 * 2;
            renderer.render({ scene: mesh });
        };

        frame = requestAnimationFrame(update);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("resize", resize);
            ref.current?.removeChild(gl.canvas);
            gl.getExtension("WEBGL_lose_context")?.loseContext();
        };
    }, []);

    return <div ref={ref} className="pointer-events-none h-full w-full" />;
}

"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 vUv;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 5; ++i) {
        v += a * snoise(x);
        x = rot * x * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    vec2 mouse = u_mouse.xy;
    
    // Add mouse interaction displacement
    float mouseDist = distance(st, mouse);
    vec2 q = vec2(0.);
    q.x = fbm( st + 0.00 * u_time);
    q.y = fbm( st + vec2(1.0));

    vec2 r = vec2(0.);
    r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.15*u_time );
    r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.126*u_time);

    // Water ripple waves emanating from mouse
    float ripple = sin(mouseDist * 18.0 - u_time * 4.0) * exp(-mouseDist * 2.5) * 0.25;
    vec2 rippleDir = mouseDist > 0.001 ? normalize(st - mouse) : vec2(0.0);
    r += rippleDir * ripple;

    // Strong base displacement toward/away from cursor
    r += rippleDir * smoothstep(1.2, 0.0, mouseDist) * 0.55;

    float f = fbm(st+r);

    // Deep dark colors mimicking liquid metal/dark water
    vec3 color = mix(vec3(0.01, 0.01, 0.02),
                vec3(0.02, 0.05, 0.1),
                clamp((f*f)*4.0,0.0,1.0));

    color = mix(color,
                vec3(0.05, 0.15, 0.25),
                clamp(length(q),0.0,1.0));

    color = mix(color,
                vec3(0.1, 0.3, 0.5),
                clamp(length(r.x),0.0,1.0));

    // Specular highlight / Fresnel-like glow on edges
    float spec = smoothstep(0.4, 0.6, f);
    color += vec3(0.1, 0.4, 0.6) * spec * 0.5;

    gl_FragColor = vec4((f*f*f+.6*f*f+.5*f)*color, 1.0);
}
`;

interface FluidBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export function FluidBackground({ children, className }: FluidBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Setup scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Shader Material
    const uniforms = {
      u_time: { value: 0.0 },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) }
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    // Full screen plane
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse tracking
    let targetMouse = new THREE.Vector2(0.5, 0.5);
    const updateMouse = (x: number, y: number) => {
      targetMouse.x = (x / window.innerWidth) * (window.innerWidth / window.innerHeight);
      targetMouse.y = 1.0 - y / window.innerHeight;
    };
    const onMouseMove = (e: MouseEvent) => updateMouse(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      updateMouse(t.clientX, t.clientY);
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // Resize handler
    const onWindowResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      uniforms.u_resolution.value.set(width, height);
    };
    window.addEventListener('resize', onWindowResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const render = () => {
      uniforms.u_time.value = clock.getElapsedTime();
      
      // Smoothly interpolate mouse position for a fluid feel
      uniforms.u_mouse.value.lerp(targetMouse, 0.09);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    // Cleanup
    return () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      cancelAnimationFrame(animationFrameId);
      
      if (mountRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        mountRef.current.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-black", className)}>
      <div ref={mountRef} className="absolute inset-0 w-full h-full block" />
      
      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full pointer-events-none">
        {children}
      </div>
    </div>
  );
}

export default FluidBackground;

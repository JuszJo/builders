/*
 Special thanks to Seva Dolgopolov for creating the framework for this canvas background
 Link to the article: https://tympanus.net/codrops/2025/07/30/interactive-webgl-backgrounds-a-quick-guide-to-bayer-dithering/
*/

import * as THREE from 'three';

type CustomWebGlContext = WebGLRenderingContext | undefined;

export default function CanvasIntro(canvas: HTMLCanvasElement) {
  const vertexShader = `void main() {
    gl_Position = vec4(position, 1.0);
  }
  `

  const fragmentShader = `
  uniform vec2 uResolution;
  uniform vec4 uMouse;
  uniform float uTime;
  
  const float PIXEL_SIZE = 4.0; // Size of each pixel in the Bayer matrix
  const float CELL_PIXEL_SIZE = 8.0 * PIXEL_SIZE; // 8x8 Bayer matrix
  
  out vec4 fragColor;
  
  
  // ─────────────────────────────────────────────────────────────
  // Bayer matrix helpers (ordered dithering thresholds)
  // ─────────────────────────────────────────────────────────────
  float Bayer2(vec2 a) {
      a = floor(a);
      return fract(a.x / 2. + a.y * a.y * .75);
  }
  
  #define Bayer4(a) (Bayer2(.5*(a))*0.25 + Bayer2(a))
  #define Bayer8(a) (Bayer4(.5*(a))*0.25 + Bayer2(a))
  
  
  #define FBM_OCTAVES     5
  #define FBM_LACUNARITY  1.25
  #define FBM_GAIN        1.
  #define FBM_SCALE       4.0          // master scale for uv
  
  /*-------------------------------------------------------------
    1-D hash and 3-D value-noise helpers (unchanged)
  -------------------------------------------------------------*/
  float hash11(float n) { return fract(sin(n)*43758.5453); }
  
  float vnoise(vec3 p)
  {
      vec3 ip = floor(p);
      vec3 fp = fract(p);
  
      float n000 = hash11(dot(ip + vec3(0.0,0.0,0.0), vec3(1.0,57.0,113.0)));
      float n100 = hash11(dot(ip + vec3(1.0,0.0,0.0), vec3(1.0,57.0,113.0)));
      float n010 = hash11(dot(ip + vec3(0.0,1.0,0.0), vec3(1.0,57.0,113.0)));
      float n110 = hash11(dot(ip + vec3(1.0,1.0,0.0), vec3(1.0,57.0,113.0)));
      float n001 = hash11(dot(ip + vec3(0.0,0.0,1.0), vec3(1.0,57.0,113.0)));
      float n101 = hash11(dot(ip + vec3(1.0,0.0,1.0), vec3(1.0,57.0,113.0)));
      float n011 = hash11(dot(ip + vec3(0.0,1.0,1.0), vec3(1.0,57.0,113.0)));
      float n111 = hash11(dot(ip + vec3(1.0,1.0,1.0), vec3(1.0,57.0,113.0)));
  
      vec3 w = fp*fp*fp*(fp*(fp*6.0-15.0)+10.0);   // smootherstep
  
      float x00 = mix(n000, n100, w.x);
      float x10 = mix(n010, n110, w.x);
      float x01 = mix(n001, n101, w.x);
      float x11 = mix(n011, n111, w.x);
  
      float y0  = mix(x00, x10, w.y);
      float y1  = mix(x01, x11, w.y);
  
      return mix(y0, y1, w.z) * 2.0 - 1.0;         // [-1,1]
  }
  
  /*-------------------------------------------------------------
    Stable fBm - no default args, loop fully static
  -------------------------------------------------------------*/
  float fbm2(vec2 uv, float t)
  {
      vec3 p   = vec3(uv * FBM_SCALE, t);
      float amp  = 1.;
      float freq = 1.;
      float sum  = 1.;
  
      for (int i = 0; i < FBM_OCTAVES; ++i)
      {
          sum  += amp * vnoise(p * freq);
          freq *= FBM_LACUNARITY;
          amp  *= FBM_GAIN;
      }
      
      return sum * 0.5 + 0.5;   // [0,1]
  }
  
  
  
  
  
  void main() {
  
      float pixelSize = PIXEL_SIZE; // Size of each pixel in the Bayer matri
      vec2 fragCoord = gl_FragCoord.xy - uResolution * .5;
  
      // Calculate the UV coordinates for the grid
      float aspectRatio = uResolution.x / uResolution.y;
  
      vec2 pixelId = floor(fragCoord / pixelSize); // integer Bayer cell
      vec2 pixelUV = fract(fragCoord / pixelSize); 
  
      float cellPixelSize =  8. * pixelSize; // 8x8 Bayer matrix
      vec2 cellId = floor(fragCoord / cellPixelSize); // integer Bayer cell
      
      vec2 cellCoord = cellId * cellPixelSize;
      
      
      vec2 uv = ((cellCoord / (uResolution) )) * vec2(aspectRatio, 1.0);
  
      float feed = fbm2(uv, uTime * 0.1);
          
      float brightness = -.65;
      float contrast = .5;
      feed = feed * contrast + brightness; // Apply contrast and brightness adjustments
  
  
      float bayerValue = Bayer8(fragCoord / pixelSize) - .5;
      
  
      float bw = step(0.5, feed + bayerValue);
      // float bw = feed + bayerValue;

      // If dot = 1 → color = blue (0.0, 0.0, 1.0)
      // If dot = 0 → color = black
      vec3 blue = vec3(0.0, 0.0, 1.0);
      vec3 sky_blue = vec3(0.290, 0.643, 0.725);
      vec3 color = mix(vec3(0.0), sky_blue, bw);
  
      // fragColor = vec4(vec3(bw), 0.1);
      fragColor = vec4(color, 0.2);
      
  }
  `

  // Use WebGL 2 so the fragment shader can stay `#version 300 es`
  const gl = canvas.getContext('webgl2');
  if (!gl) return;
  const renderer = new THREE.WebGLRenderer({ canvas, context: gl as CustomWebGlContext });
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  // ---------- scene & camera ----------
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  // ---------- uniforms ----------
  const uniforms = {
    uResolution: { value: new THREE.Vector2() },
    uTime: { value: 0 },
  };


  const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms,
    glslVersion: THREE.GLSL3
  });

  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  scene.add(quad);

  // ---------- resize ----------
  function resize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    renderer.setSize(width, height, false);   // `false` = don’t clear canvas
    uniforms.uResolution.value.set(width, height);
  }
  window.addEventListener('resize', resize);
  resize();   // initial size

  // ---------- render loop ----------
  const clock = new THREE.Clock();

  let frameId: number;

  function render() {
    uniforms.uTime.value = clock.getElapsedTime();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();

  function cleanup() {
    cancelAnimationFrame(frameId);
    window.removeEventListener('resize', resize);
    material.dispose();
    quad.geometry.dispose();
    renderer.dispose();
    clock.stop();
    scene.clear();
  }

  return cleanup;
}
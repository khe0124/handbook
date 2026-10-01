# Creative Graphics content audit and improvement plan

## Scope and diagnosis

- Target: `public/handbook/interactive-creative-graphics-handbook.html` and its generated app module.
- Before revision: seven sections; the two learning sections were generic “learning layer” tables.
- Severe gaps: renderer names were listed without explaining retained versus immediate rendering, CPU/GPU boundaries, rasterization, coordinate spaces, or resource lifecycles.
- Three.js and shaders appeared as vocabulary lists, so a reader could not connect a visual requirement to geometry, texture sampling, render passes, accessibility, or measured cost.

## Quality bar

Each renderer must explain its scene model, browser/GPU mechanism, suitable scale, interaction and accessibility implications, failure modes, and the evidence required to choose it. Three.js and shader concepts must build directly on the WebGL pipeline rather than appear as isolated APIs.

## Implemented structure

1. Compare DOM, SVG, Canvas 2D, WebGL, and WebGPU as different ownership models.
2. Explain CPU/GPU pipeline, coordinate transformations, buffers, texture and shader stages.
3. Define object, draw-call, geometry, fill-rate, overdraw, memory, and shader costs.
4. Extend the model into Three.js scene/resource management and shader thinking.
5. Add hybrid semantic layers, accessibility and progressive fallbacks.
6. Apply the choices to charts, campaign heroes, configurators and particle scenes.
7. Protect the authored depth with deterministic content tests.

declare module '*.png' {
  const source: string;
  export default source;
}
declare module '*.glsl' {
  const source: string;
  export default source;
}

declare module '*.jpg' {
  const source: string;
  export default source;
}

declare module '*.glb' {
  const source: string;
  export default source;
}

declare module '*.gltf' {
  const source: string;
  export default source;
}

declare module '*.mp3' {
  const source: string;
  export default source;
}

declare global {
  interface Window {
    clientWidth: number;
    offsetWidth: number;
  }
}

// Ambient declarations for side-effect stylesheet imports (e.g. `import "./globals.css"`).
// Fixes TS2882: "Cannot find module or type declarations for side-effect import".
declare module '*.css';
declare module '*.scss';
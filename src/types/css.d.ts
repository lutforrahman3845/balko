/**
 * Ambient declarations for plain stylesheet imports.
 *
 * Next.js declares `*.module.css` (CSS Modules) but not plain `*.css`, because
 * TypeScript does not normally check side-effect-only imports. Under
 * `noUncheckedSideEffectImports` it does, and `import "./globals.css"` fails
 * with TS2307. Declaring the patterns here keeps the project valid under that
 * flag without anyone having to relax their editor or tsconfig settings.
 *
 * The more specific `*.module.css` pattern in Next's own types still wins for
 * CSS Modules, so their `classes` typing is unaffected.
 */

declare module "*.css";
declare module "*.scss";
declare module "*.sass";

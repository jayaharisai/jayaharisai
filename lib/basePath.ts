/**
 * Returns the runtime base path for public assets.
 *
 * - In local development (`pnpm dev`), `basePath` is NOT applied by Next.js,
 *   so assets are served from `/` and we return "".
 * - In production builds (static export to GitHub Pages), `basePath` IS applied
 *   and assets must be prefixed with `/jayaharisai`.
 *
 * This helper ensures `<img src=...>`, `<a href=...>`, etc. work in BOTH
 * environments without you having to remember to toggle anything.
 *
 * `process.env.NODE_ENV` is statically replaced at build time by Next.js,
 * so the dead branch is tree-shaken out of the production bundle.
 */
export const BASE_PATH: string =
  process.env.NODE_ENV === "production" ? "/jayaharisai" : "";

/**
 * Prefix a public asset path with the current base path.
 *
 * @example
 *   asset("/myimage.jpg")        // dev: "/myimage.jpg"
 *   asset("/myimage.jpg")        // prod: "/jayaharisai/myimage.jpg"
 */
export const asset = (path: string): string => {
  if (!path) return path;
  // External URLs are passed through unchanged
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("//")
  ) {
    return path;
  }
  // Guard against double-prefixing
  if (BASE_PATH && path.startsWith(BASE_PATH + "/")) return path;
  // Ensure exactly one slash between BASE_PATH and path
  const trimmed = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${trimmed}`;
};

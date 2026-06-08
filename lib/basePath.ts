/**
 * Centralised base path / asset helper.
 *
 * Current deployment: GitHub User Site at the root
 *   → site is served at https://jayaharisai.github.io/
 *   → no prefix is needed
 *
 * If you ever move to a subpath (project site) or a custom domain with
 * a base path, just change this one constant and all components will
 * pick it up automatically.
 *
 * Example: to deploy under `/portfolio`, set it to "/portfolio".
 */
export const BASE_PATH: string = "";

/**
 * Prefix a public asset path with the current base path.
 *
 * @example
 *   asset("/myimage.jpg")  // returns "/myimage.jpg"
 *   asset("https://...")   // returned untouched (external URL)
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

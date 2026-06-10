/**
 * Editor Keys Configuration
 * 
 * Each key maps to an author identity.
 * Add more keys here to grant editor access to others.
 */
export interface EditorIdentity {
  key: string;
  name: string;
  email: string;
}

export const EDITOR_KEYS: EditorIdentity[] = [
  {
    key: "jayaharisai",
    name: "Jayaharisai",
    email: "jayaharisai1212@gmail.com",
  },
];

/**
 * Look up an editor identity by key.
 * Returns the identity if found, or null if invalid.
 */
export function getIdentityByKey(key: string): EditorIdentity | null {
  return EDITOR_KEYS.find(
    (e) => e.key === key || e.email === key
  ) ?? null;
}
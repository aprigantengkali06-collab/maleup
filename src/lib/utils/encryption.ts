function toBase64(bytes: Uint8Array) {
  if (typeof Buffer !== 'undefined') return Buffer.from(bytes).toString('base64');
  let binary = '';
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

function fromBase64(value: string) {
  if (typeof Buffer !== 'undefined') return new Uint8Array(Buffer.from(value, 'base64'));
  const binary = atob(value);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

/**
 * Derives AES-256-GCM key using PBKDF2.
 * Key material = NEXT_PUBLIC_ENCRYPTION_KEY env var.
 * Salt = userId → each user gets a unique derived key.
 * Without the env secret, data cannot be decrypted.
 *
 * SECURITY NOTE:
 * Encryption key uses NEXT_PUBLIC_ prefix because encrypt/decrypt happens
 * in the browser (client-side). This means the key IS visible in the client bundle.
 *
 * For this personal-use app this is ACCEPTABLE because:
 *   1. Data is encrypted at-rest in the database
 *   2. Supabase RLS already limits access per-user
 *   3. The app is single-user / personal
 *
 * For a multi-user production app, consider:
 *   - Server-side encryption via Supabase Edge Functions
 *   - Per-user key derivation from the user's own password
 *   - Hardware security module (HSM)
 */
export async function deriveKey(userId: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const secret = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
  if (!secret) {
    throw new Error(
      'NEXT_PUBLIC_ENCRYPTION_KEY is not configured. ' +
      'Set this environment variable before using encryption features.'
    );
  }
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    'PBKDF2',
    false,
    ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: enc.encode(userId),
      iterations: 100_000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encrypt(plaintext: string, userId: string): Promise<string> {
  const key = await deriveKey(userId);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(plaintext);
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);
  return `${toBase64(iv)}.${toBase64(new Uint8Array(encrypted))}`;
}

export async function decrypt(ciphertext: string, userId: string): Promise<string> {
  const [ivString, encryptedString] = ciphertext.split('.');
  if (!ivString || !encryptedString) return '';
  const key = await deriveKey(userId);
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: fromBase64(ivString) },
    key,
    fromBase64(encryptedString)
  );
  return new TextDecoder().decode(decrypted);
}

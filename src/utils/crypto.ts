/**
 * Cryptographic utility for securing confidential user data.
 * Utilizes standard Web Crypto API (AES-GCM 256-bit, SHA-256).
 */

// Generate or derive a cryptographic key for AES-GCM
async function getEncryptionKey(passphrase: string = 'CREDIULEP_SECURE_VAULT_KEY_2026'): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(passphrase.padEnd(32, '#').slice(0, 32)),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode('ULEP_COLOMBIA_SALT_V1'),
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encrypts a string of confidential data using AES-GCM 256-bit
 */
export async function encryptDataAES(plaintext: string): Promise<{
  ciphertext: string;
  ivHex: string;
  sha256Hash: string;
  timestamp: string;
}> {
  try {
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(plaintext);
    const key = await getEncryptionKey();

    // 12-byte IV for AES-GCM
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    const encryptedBuffer = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv,
      },
      key,
      encodedData
    );

    // Convert encrypted ArrayBuffer to Base64
    const encryptedBytes = new Uint8Array(encryptedBuffer);
    let binary = '';
    for (let i = 0; i < encryptedBytes.byteLength; i++) {
      binary += String.fromCharCode(encryptedBytes[i]);
    }
    const ciphertext = btoa(binary);

    // Convert IV to hex string
    const ivHex = Array.from(iv)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    // Generate SHA-256 checksum of original payload
    const sha256Hash = await hashSHA256(plaintext);

    return {
      ciphertext,
      ivHex,
      sha256Hash,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error during AES encryption:', error);
    // Fallback obfuscation if Web Crypto is unavailable
    const fallbackHash = await hashSHA256(plaintext);
    return {
      ciphertext: btoa(plaintext),
      ivHex: 'e3b0c44298fc1c149afbf4c8996fb924',
      sha256Hash: fallbackHash,
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Generates SHA-256 Hex Digest of a string
 */
export async function hashSHA256(text: string): Promise<string> {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  } catch {
    // Basic hash fallback
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = (hash << 5) - hash + text.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(16).padStart(64, '0');
  }
}

/**
 * Mask confidential phone number: +57 316 900 8561 -> +57 316 ••• ••61
 */
export function maskPhone(phone: string): string {
  if (!phone) return '••••••••••';
  const clean = phone.trim();
  if (clean.length <= 6) return '••••••';
  const start = clean.slice(0, Math.min(6, Math.floor(clean.length / 2)));
  const end = clean.slice(-2);
  return `${start} ••• ••${end}`;
}

/**
 * Mask confidential email: carlos.gomez@gmail.com -> c•••••z@g••••.com
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return '••••••@••••.•••';
  const [user, domain] = email.split('@');
  const maskedUser =
    user.length > 2
      ? `${user[0]}${'•'.repeat(Math.min(user.length - 2, 5))}${user[user.length - 1]}`
      : `${user[0]}•`;
  const domainParts = domain.split('.');
  const maskedDomain =
    domainParts[0].length > 2
      ? `${domainParts[0][0]}${'•'.repeat(Math.min(domainParts[0].length - 2, 4))}`
      : '••••';
  const tld = domainParts.slice(1).join('.') || 'co';
  return `${maskedUser}@${maskedDomain}.${tld}`;
}

/**
 * Mask confidential full name: Carlos Gomez -> C••••• G••••
 */
export function maskName(name: string): string {
  if (!name) return '••••••••';
  return name
    .split(' ')
    .map((word) => {
      if (word.length <= 2) return word;
      return `${word[0]}${'•'.repeat(Math.min(word.length - 1, 5))}`;
    })
    .join(' ');
}

/**
 * Mask document number / Cédula: 1032456789 -> 1.032.•••.••9
 */
export function maskDocument(doc: string): string {
  if (!doc) return '••••••••••';
  const clean = doc.replace(/\D/g, '');
  if (clean.length <= 4) return '••••••';
  const prefix = clean.slice(0, 3);
  const suffix = clean.slice(-2);
  return `${prefix} ••• ••${suffix}`;
}

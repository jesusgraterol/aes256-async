import { Buffer } from 'node:buffer';
import crypto from 'node:crypto';
import { CIPHER_ALGORITHM, HASHING_ALGORITHM } from '../shared/constants.js';

/* ************************************************************************************************
 *                                            HASHING                                             *
 ************************************************************************************************ */

/**
 * Hashes the provided secret using the SHA-256 algorithm.
 * @param secret
 * @returns Promise<Buffer>
 */
const __hashSecret = (secret: string): Promise<Buffer> => new Promise((resolve, reject) => {
  const hash = crypto.createHash(HASHING_ALGORITHM);
  hash.on('readable', () => {
    const data = hash.read();
    if (data) {
      resolve(data);
    }
  });
  hash.on('error', (err) => reject(err));
  hash.write(secret);
  hash.end();
});

/**
 * Hashes the provided secret using the SHA-256 algorithm.
 * @param secret
 * @returns Buffer
 */
const __hashSecretSync = (secret: string): Buffer => {
  const sha256 = crypto.createHash(HASHING_ALGORITHM);
  sha256.update(secret);
  return sha256.digest();
};





/* ************************************************************************************************
 *                                             CIPHER                                             *
 ************************************************************************************************ */

/**
 * Creates the cipher with random initialization vectors and returns the encrypted data.
 * @param secret
 * @param data
 * @returns string
 */
const encryptDataSync = (secret: string, data: string): string => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(CIPHER_ALGORITHM, __hashSecretSync(secret), iv);

  const buffer = Buffer.from(data);

  const ciphertext = cipher.update(buffer);
  return Buffer.concat([iv, ciphertext, cipher.final()]).toString('base64');
};





/* ************************************************************************************************
 *                                            DECIPHER                                            *
 ************************************************************************************************ */

/**
 * Creates the decipher and returns the result of the decryption.
 * @param secret
 * @param encryptedData
 * @returns string
 */
const decryptDataSync = (secret: string, encryptedData: Buffer): string => {
  const iv = encryptedData.subarray(0, 16);
  const decipher = crypto.createDecipheriv(CIPHER_ALGORITHM, __hashSecretSync(secret), iv);

  const ciphertext = encryptedData.subarray(16);

  return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString();
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  // hashing
  __hashSecret,
  __hashSecretSync,

  // cipher
  encryptDataSync,

  // decipher
  decryptDataSync,
};

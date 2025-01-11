import crypto from 'node:crypto';
import { HASHING_ALGORITHM } from '../shared/constants.js';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Hashes the provided secret using the SHA-256 algorithm.
 * @param secret
 * @returns Promise<Buffer>
 */
const hashSecret = (secret: string): Promise<Buffer> => new Promise((resolve, reject) => {
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
const hashSecretSync = (secret: string): Buffer => {
  const sha256 = crypto.createHash(HASHING_ALGORITHM);
  sha256.update(secret);
  return sha256.digest();
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  hashSecret,
  hashSecretSync,
};

import crypto from 'node:crypto';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Hashes the provided secret using the SHA-256 algorithm.
 * @param secret
 * @returns Buffer
 */
const hashSecret = (secret: string): Buffer => {
  const sha256 = crypto.createHash('sha256');
  sha256.update(secret);
  return sha256.digest();
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  hashSecret,
};

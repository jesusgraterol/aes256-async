import crypto from 'node:crypto';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/* const hashSecretAsync = (secret: string): Promise<Buffer> => new Promise((resolve, reject) => {
  const hash = crypto.createHash('sha256');
  hash.on('readable', () => {
    const data = hash.read();
    if (data) {
      resolve(data);
    }
  });
  hash.on('error', (err) => reject(err));
  hash.write(secret);
  hash.end();
}); */

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
  hashSecretAsync,
  hashSecret,
};

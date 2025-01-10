import crypto from 'node:crypto';
import { promisify } from 'node:util';
import { CIPHER_ALGORITHM } from './shared/constants.js';
import { validateInput, validateEncryptionResult } from './validations/index.js';

/* ************************************************************************************************
 *                                          ASYNCHRONOUS                                          *
 ************************************************************************************************ */





/* ************************************************************************************************
 *                                          SYNCHRONOUS                                           *
 ************************************************************************************************ */

/**
 * Decrypts an encrypted message back to readable text.
 * @param secret
 * @param encryptedData
 * @returns string
 * @throws
 * - INVALID_OR_EMPTY_DATA: if the data is not a string or is an empty string.
 * - INVALID_SECRET: if the secret is not a string or is an empty string.
 */
const decryptSync = (secret: string, encryptedData: string): string => {
  validateInput(secret, encryptedData);
  return '';
};

/**
 * Encrypts a message to a piece of text that cannot be read unless it is decrypted with the secret
 * that was used to encrypt it.
 * @param secret
 * @param data
 * @returns string
 * @throws
 * - INVALID_OR_EMPTY_DATA: if the data is not a string or is an empty string.
 * - INVALID_SECRET: if the secret is not a string or is an empty string.
 */
const encryptSync = (secret: string, data: string): string => {
  // validate the input
  validateInput(secret, data);

  // encrypt the data
  const sha256 = crypto.createHash('sha256');
  sha256.update(secret);

  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(CIPHER_ALGORITHM, sha256.digest(), iv);

  const buffer = Buffer.from(data);

  const ciphertext = Buffer.concat([cipher.update(buffer), cipher.final()]);
  const encrypted = Buffer.concat([iv, ciphertext, cipher.final()]);
  const encryptedString = encrypted.toString('base64');

  // ensure the data can be recovered
  validateEncryptionResult(data, decryptSync(secret, encryptedString));

  // finally, return the encrypted message
  return encryptedString;
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  // async functions

  // sync functions
  decryptSync,
  encryptSync,
};

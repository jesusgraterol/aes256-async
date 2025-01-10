import crypto from 'node:crypto';
import { promisify } from 'node:util';
import { CIPHER_ALGORITHM } from './shared/constants.js';
import { hashSecret } from './utils/index.js';
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
  // validate the input
  validateInput(secret, encryptedData);

  // finally, return the decrypted message
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
 * - CORRUPTED_DATA: if the decrypted data does not match the original data.
 */
const encryptSync = (secret: string, data: string): string => {
  // validate the input
  validateInput(secret, data);

  // encrypt the data
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(CIPHER_ALGORITHM, hashSecret(secret), iv);

  const buffer = Buffer.from(data);

  const ciphertext = cipher.update(buffer);
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

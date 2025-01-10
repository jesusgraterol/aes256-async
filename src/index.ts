
import { validate } from './validations/index.js';

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
  validate(secret, encryptedData);
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
  validate(secret, data);
  return '';
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

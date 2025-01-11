import { Buffer } from 'node:buffer';
import crypto from 'node:crypto';
import { CIPHER_ALGORITHM } from './shared/constants.js';
import { hashSecretSync } from './utils/index.js';
import {
  validateInput,
  validateEncryptedBuffer,
  validateDecryptedData,
  validateEncryptionResult,
} from './validations/index.js';

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
 * - INVALID_ENCRYPTED_DATA: if the encrypted data decrypts to an invalid or empty string.
 */
const decryptSync = (secret: string, encryptedData: string): string => {
  // validate the input
  validateInput(secret, encryptedData);

  // decrypt the data
  const input = Buffer.from(encryptedData, 'base64');
  validateEncryptedBuffer(input);

  const iv = input.subarray(0, 16);
  const decipher = crypto.createDecipheriv(CIPHER_ALGORITHM, hashSecretSync(secret), iv);

  const ciphertext = input.subarray(16);

  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString();

  // ensure the decrypted data is valid
  validateDecryptedData(decrypted);

  // finally, return the decrypted message
  return decrypted;
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
  const cipher = crypto.createCipheriv(CIPHER_ALGORITHM, hashSecretSync(secret), iv);

  const buffer = Buffer.from(data);

  const ciphertext = cipher.update(buffer);
  const encrypted = Buffer.concat([iv, ciphertext, cipher.final()]).toString('base64');

  // ensure the data can be recovered
  validateEncryptionResult(data, decryptSync(secret, encrypted));

  // finally, return the encrypted message
  return encrypted;
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

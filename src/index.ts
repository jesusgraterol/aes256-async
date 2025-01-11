import { Buffer } from 'node:buffer';
import {
  decryptData,
  encryptData,
  decryptDataSync,
  encryptDataSync,
} from './utils/index.js';
import {
  validateInput,
  validateEncryptedBuffer,
  validateDecryptedData,
  validateEncryptionResult,
} from './validations/index.js';

/* ************************************************************************************************
 *                                          ASYNCHRONOUS                                          *
 ************************************************************************************************ */

/**
 * Decrypts an encrypted message back to readable text.
 * @param secret
 * @param encryptedData
 * @returns Promise<string>
 * @throws
 * - INVALID_OR_EMPTY_DATA: if the data is not a string or is an empty string.
 * - INVALID_SECRET: if the secret is not a string or is an empty string.
 * - INVALID_ENCRYPTED_DATA: if the encrypted data decrypts to an invalid or empty string.
 * - WRONG_SECRET: if the data cannot be decrypted.
 */
const decrypt = async (secret: string, encryptedData: string): Promise<string> => {
  // validate the input
  validateInput(secret, encryptedData);

  // decrypt the data
  const input = Buffer.from(encryptedData, 'base64');
  validateEncryptedBuffer(input);
  const decrypted = await decryptData(secret, input);

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
 * @returns Promise<string>
 * @throws
 * - INVALID_OR_EMPTY_DATA: if the data is not a string or is an empty string.
 * - INVALID_SECRET: if the secret is not a string or is an empty string.
 * - CORRUPTED_DATA: if the decrypted data does not match the original data.
 */
const encrypt = async (secret: string, data: string): Promise<string> => {
  // validate the input
  validateInput(secret, data);

  // encrypt the data
  const encrypted = await encryptData(secret, data);

  // ensure the data can be recovered
  validateEncryptionResult(data, await decrypt(secret, encrypted));

  // finally, return the encrypted message
  return encrypted;
};





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
 * - WRONG_SECRET: if the data cannot be decrypted.
 */
const decryptSync = (secret: string, encryptedData: string): string => {
  // validate the input
  validateInput(secret, encryptedData);

  // decrypt the data
  const input = Buffer.from(encryptedData, 'base64');
  validateEncryptedBuffer(input);
  const decrypted = decryptDataSync(secret, input);

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
  const encrypted = encryptDataSync(secret, data);

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
  decrypt,
  encrypt,

  // sync functions
  decryptSync,
  encryptSync,
};

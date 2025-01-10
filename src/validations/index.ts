import { Buffer } from 'node:buffer';
import { encodeError } from 'error-message-utils';
import { ILLEGAL_CHARACTER } from '../shared/constants.js';
import { ERRORS } from '../shared/errors.js';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Ensures the provided secret is a valid string that will be used to encrypt and/or decrypt data.
 * @param data
 * @throws
 * - INVALID_SECRET: if the secret is not a string or is an empty string.
 */
const __validateSecret = (secret: string): void => {
  if (typeof secret !== 'string' || secret.length === 0) {
    throw new Error(encodeError('The provided secret is invalid, please make sure to provide a non-empty string.', ERRORS.INVALID_SECRET));
  }
};

/**
 * Ensures the provided data is a valid string to be encrypted or decrypted.
 * @param data
 * @throws
 * - INVALID_OR_EMPTY_DATA: if the data is not a string or is an empty string.
 */
const __validateData = (data: string): void => {
  if (typeof data !== 'string' || data.length === 0 || data.includes(ILLEGAL_CHARACTER)) {
    throw new Error(encodeError('The provided data is invalid, please make sure to provide a non-empty string that only contains UTF-8 character encoding.', ERRORS.INVALID_OR_EMPTY_DATA));
  }
};

/**
 * Ensures the data and the secret are valid strings.
 * @param secret
 * @param data
 * @throws
 * - INVALID_OR_EMPTY_DATA: if the data is not a string or is an empty string.
 * - INVALID_SECRET: if the secret is not a string or is an empty string.
 */
const validateInput = (secret: string, data: string): void => {
  __validateSecret(secret);
  __validateData(data);
};

/**
 * Ensures the encrypted data is a valid string.
 * @param input
 * @throws
 * - INVALID_ENCRYPTED_DATA: if the encrypted data decrypts to an invalid or empty string.
 */
const validateEncryptedBuffer = (input: Buffer): void => {
  if (input.length < 17) {
    throw new Error(encodeError('The provided encrypted data must decrypt to a non-empty string.', ERRORS.INVALID_ENCRYPTED_DATA));
  }
};

/**
 * Ensures the decrypted data is valid. So far, whenever an incorrect secret is provided, Node.js
 * returns a string containing characters like �.
 * @param data
 * @throws
 * - WRONG_SECRET: if the data cannot be decrypted.
 */
const validateDecryptedData = (data: string): void => {
  if (typeof data !== 'string' || data.length === 0 || data.includes(ILLEGAL_CHARACTER)) {
    throw new Error(encodeError('Failed to decrypt the data with the provided secret.', ERRORS.WRONG_SECRET));
  }
};

/**
 * Compares the original data with the decrypted data to ensure the data was and can be decrypted
 * correctly in the future.
 * @param data
 * @param decryptedData
 * @throws
 * - CORRUPTED_DATA: if the decrypted data does not match the original data.
 */
const validateEncryptionResult = (data: string, decryptedData: string): void => {
  if (data !== decryptedData) {
    throw new Error(encodeError('The data could not be decrypted correctly.', ERRORS.CORRUPTED_DATA));
  }
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  validateInput,
  validateEncryptedBuffer,
  validateDecryptedData,
  validateEncryptionResult,
};

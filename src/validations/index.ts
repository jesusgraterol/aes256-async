import { encodeError } from 'error-message-utils';
import { ERRORS } from '../shared/errors.js';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Ensures the provided data is a valid string to be encrypted or decrypted.
 * @param data
 * @throws
 * - INVALID_OR_EMPTY_DATA: if the data is not a string or is an empty string.
 */
const __validateData = (data: string): void => {
  if (typeof data !== 'string' || data.length === 0) {
    throw new Error(encodeError('The provided data is invalid, please make sure to provide a non-empty string.', ERRORS.INVALID_OR_EMPTY_DATA));
  }
};

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
 * Ensures the data and the secret are valid strings.
 * @param data
 * @param secret
 * @throws
 * - INVALID_OR_EMPTY_DATA: if the data is not a string or is an empty string.
 * - INVALID_SECRET: if the secret is not a string or is an empty string.
 */
const validate = (data: string, secret: string): void => {
  __validateData(data);
  __validateSecret(secret);
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  validate,
};

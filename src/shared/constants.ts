

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

// the encryption algorithm (cipher) type to be used
const CIPHER_ALGORITHM = 'aes-256-ctr';

// the algorithm that will be used to hash secrets
const HASHING_ALGORITHM = 'sha256';

/**
 * Illegal Character
 * Many web pages and other document formats use UTF-8. This is the default character encoding.
 * When decoding a Buffer into a string that does not exclusively contain valid UTF-8 data, the
 * Unicode replacement character U+FFFD � will be used to represent those errors.
 * https://nodejs.org/docs/latest/api/buffer.html#buffers-and-character-encodings
 */
const ILLEGAL_CHARACTER = '�';





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  CIPHER_ALGORITHM,
  HASHING_ALGORITHM,
  ILLEGAL_CHARACTER,
};

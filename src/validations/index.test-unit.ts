import { describe, test, expect } from 'vitest';
import { ILLEGAL_CHARACTER } from '../shared/constants.js';
import { ERRORS } from '../shared/errors.js';
import { validateInput, validateEncryptionResult, validateDecryptedData } from './index.js';
import { decryptDataSync, encryptDataSync } from '../utils/index.js';

/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('validateInput', () => {
  test.each<Array<any>>([
    ['Some Valid Secret', ''],
    ['Some Valid Secret', `Some String with ${ILLEGAL_CHARACTER}`],
    ['Some Valid Secret', 1],
    ['Some Valid Secret', null],
    ['Some Valid Secret', undefined],
    ['Some Valid Secret', {}],
    ['Some Valid Secret', []],
  ])('validateInput(%s, %s)', (secret, data) => {
    expect(() => validateInput(secret, data)).toThrowError(ERRORS.INVALID_OR_EMPTY_DATA);
  });

  test.each<Array<any>>([
    ['', 'Some Valid Data :)'],
    [1, 'Some Valid Data :)'],
    [null, 'Some Valid Data :)'],
    [undefined, 'Some Valid Data :)'],
    [{}, 'Some Valid Data :)'],
    [[], 'Some Valid Data :)'],
  ])('validateInput(%s, %s)', (secret, data) => {
    expect(() => validateInput(secret, data)).toThrowError(ERRORS.INVALID_SECRET);
  });

  test('validateDecryptedData', () => {
    const enc = encryptDataSync('SomeCoolSecret', 'Hello World!');
    expect(
      () => validateDecryptedData(decryptDataSync('SomeWrongSecret', Buffer.from(enc))),
    ).toThrowError(ERRORS.WRONG_SECRET);
  });

  test('validateEncryptionResult', () => {
    expect(() => validateEncryptionResult('Hello!', 'Hello!')).not.toThrowError();
    expect(() => validateEncryptionResult('Hello!', 'hello!')).toThrowError(ERRORS.CORRUPTED_DATA);
  });
});

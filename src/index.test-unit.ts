import { describe, test, expect } from 'vitest';
import { encryptSync, decryptSync } from './index.js';
import * as td from './index.test-data.js';

/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('Synchronous Implementation', () => {
  test.each([
    ['My$Shor.tT96@Se6rTe', 'Hello world!'],
    [td.SHORT_SECRET, td.SHORT_MSG],
    [td.SHORT_SECRET, td.MEDIUM_MSG],
    [td.SHORT_SECRET, td.LONG_MSG],
    [td.SHORT_SECRET, td.VERY_LONG_MESSAGE],
    [td.MEDIUM_SECRET, td.SHORT_MSG],
    [td.MEDIUM_SECRET, td.MEDIUM_MSG],
    [td.MEDIUM_SECRET, td.LONG_MSG],
    [td.MEDIUM_SECRET, td.VERY_LONG_MESSAGE],
    [td.LONG_SECRET, td.SHORT_MSG],
    [td.LONG_SECRET, td.MEDIUM_MSG],
    [td.LONG_SECRET, td.LONG_MSG],
    [td.LONG_SECRET, td.VERY_LONG_MESSAGE],
    [td.VERY_LONG_SECRET, td.SHORT_MSG],
    [td.VERY_LONG_SECRET, td.MEDIUM_MSG],
    [td.VERY_LONG_SECRET, td.LONG_MSG],
    [td.VERY_LONG_SECRET, td.VERY_LONG_MESSAGE],
  ])('encryptSync(...)', (secret, data) => {
    expect(() => encryptSync(secret, data)).not.toThrowError();
  });

  test('can encrypt and decrypt a message', () => {
    const secret = 'My$Shor.tT96@Se6rTe';
    const msg = 'Hello world!';
    const enc = encryptSync(secret, msg);
    expect(decryptSync(secret, enc)).toBe(msg);
  });
});

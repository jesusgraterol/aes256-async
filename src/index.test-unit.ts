import { describe, test, expect } from 'vitest';
import { encryptSync, decryptSync } from './index.js';

/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('Synchronous Implementation', () => {
  test.each([
    ['My$Shor.tT96@Se6rTe', 'Hello world!'],
  ])('encryptSync', (secret, data) => {
    expect(() => encryptSync(secret, data)).not.toThrowError();
    const enc = encryptSync(secret, data);
    console.log(enc);
    console.log(decryptSync(secret, enc));
  });
});

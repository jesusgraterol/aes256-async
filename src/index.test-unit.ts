import { describe, test, expect } from 'vitest';
import { encryptSync } from './index.js';

/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe.skip('Synchronous Implementation', () => {
  test.each([
    ['My$Shor.tT96@Se6rTe', 'Hello world!'],
  ])('encryptSync', (secret, data) => {
    expect(() => encryptSync(secret, data)).not.toThrowError();
  });
});

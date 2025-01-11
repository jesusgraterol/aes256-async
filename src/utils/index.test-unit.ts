import { Buffer } from 'node:buffer';
import { describe, test, expect } from 'vitest';
import { hashSecret } from './index.js';

/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('hashSecret', () => {
  test('can hash a secret with SHA-256 synchronously', () => {
    const secret = 'My.$ecreT';
    const hash = hashSecret(secret);
    expect(Buffer.isBuffer(hash)).toBe(true);
    const hash2 = hashSecret(secret);
    expect(Buffer.isBuffer(hash2)).toBe(true);
    expect(hash.equals(hash2)).toBe(true);
  });
});

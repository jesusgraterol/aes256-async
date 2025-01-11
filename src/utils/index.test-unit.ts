import { Buffer } from 'node:buffer';
import { describe, test, expect } from 'vitest';
import { __hashSecret, __hashSecretSync } from './index.js';

/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('__hashSecret', () => {
  test('can hash a secret with SHA-256 asynchronously', async () => {
    const secret = 'My.$ecreT';
    const hash = await __hashSecret(secret);
    expect(Buffer.isBuffer(hash)).toBe(true);
    const hash2 = await __hashSecret(secret);
    expect(Buffer.isBuffer(hash2)).toBe(true);
    expect(hash.equals(hash2)).toBe(true);

    // ensure it matches the sync func
    const syncHash = __hashSecretSync(secret);
    expect(hash.equals(syncHash)).toBe(true);
  });
});

describe('__hashSecretSync', () => {
  test('can hash a secret with SHA-256 synchronously', () => {
    const secret = 'My.$ecreT';
    const hash = __hashSecretSync(secret);
    expect(Buffer.isBuffer(hash)).toBe(true);
    const hash2 = __hashSecretSync(secret);
    expect(Buffer.isBuffer(hash2)).toBe(true);
    expect(hash.equals(hash2)).toBe(true);
  });
});

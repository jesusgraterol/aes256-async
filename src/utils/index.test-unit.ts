import { Buffer } from 'node:buffer';
import { describe, test, expect } from 'vitest';
import { hashSecret, hashSecretSync } from './index.js';

/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('hashSecret', () => {
  test('can hash a secret with SHA-256 asynchronously', async () => {
    const secret = 'My.$ecreT';
    const hash = await hashSecret(secret);
    expect(Buffer.isBuffer(hash)).toBe(true);
    const hash2 = await hashSecret(secret);
    expect(Buffer.isBuffer(hash2)).toBe(true);
    expect(hash.equals(hash2)).toBe(true);

    // ensure it matches the sync func
    const syncHash = hashSecretSync(secret);
    expect(hash.equals(syncHash)).toBe(true);
  });
});

describe('hashSecretSync', () => {
  test('can hash a secret with SHA-256 synchronously', () => {
    const secret = 'My.$ecreT';
    const hash = hashSecretSync(secret);
    expect(Buffer.isBuffer(hash)).toBe(true);
    const hash2 = hashSecretSync(secret);
    expect(Buffer.isBuffer(hash2)).toBe(true);
    expect(hash.equals(hash2)).toBe(true);
  });
});

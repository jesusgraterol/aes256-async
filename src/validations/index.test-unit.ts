import { describe, test, expect } from 'vitest';
import { ERRORS } from '../shared/errors.js';
import { validate } from './index.js';

/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('validate', () => {
  test.each<Array<any>>([
    ['Some Valid Secret', ''],
    ['Some Valid Secret', 1],
    ['Some Valid Secret', null],
    ['Some Valid Secret', undefined],
    ['Some Valid Secret', {}],
    ['Some Valid Secret', []],
  ])('validate(%s, %s)', (secret, data) => {
    expect(() => validate(secret, data)).toThrowError(ERRORS.INVALID_OR_EMPTY_DATA);
  });

  test.each<Array<any>>([
    ['', 'Some Valid Data :)'],
    [1, 'Some Valid Data :)'],
    [null, 'Some Valid Data :)'],
    [undefined, 'Some Valid Data :)'],
    [{}, 'Some Valid Data :)'],
    [[], 'Some Valid Data :)'],
  ])('validate(%s, %s)', (secret, data) => {
    expect(() => validate(secret, data)).toThrowError(ERRORS.INVALID_SECRET);
  });
});

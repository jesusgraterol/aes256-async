

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */
type IErrors = 'INVALID_OR_EMPTY_DATA' | 'INVALID_SECRET' | 'CORRUPTED_DATA';
const ERRORS: { [key in IErrors]: IErrors } = {
  INVALID_OR_EMPTY_DATA: 'INVALID_OR_EMPTY_DATA',
  INVALID_SECRET: 'INVALID_SECRET',
  CORRUPTED_DATA: 'CORRUPTED_DATA',
};




/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  ERRORS,
};

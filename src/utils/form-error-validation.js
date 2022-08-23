import { get } from 'lodash';

const getError = (field, errors) => get(errors, field);
const getTouched = (field, touched) => get(touched, field);
const isFieldError = (field, errors, touched) =>
  Boolean(getTouched(field, touched) && getError(field, errors));

export { isFieldError, getError };

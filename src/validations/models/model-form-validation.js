import * as Yup from 'yup';
import { config } from '../../configs';

const { NO_STRING_TYPE_MESSAGE } = config.modelErrorMessages;

const { MIN_LENGTH_MESSAGE, ERROR_MESSAGE, UA_NAME_MESSAGE, EN_NAME_MESSAGE } =
  config.commonErrorMessages;

export const modelValidationSchema = Yup.object().shape({
  enDescription: Yup.string()
    .typeError(NO_STRING_TYPE_MESSAGE)
    .min(9, MIN_LENGTH_MESSAGE)
    .required(ERROR_MESSAGE),
  enName: Yup.string()
    .typeError(NO_STRING_TYPE_MESSAGE)
    .matches(config.formRegExp.enNameCreation, EN_NAME_MESSAGE)
    .min(2, MIN_LENGTH_MESSAGE)
    .required(ERROR_MESSAGE),
  uaDescription: Yup.string()
    .typeError(NO_STRING_TYPE_MESSAGE)
    .min(9, MIN_LENGTH_MESSAGE)
    .required(ERROR_MESSAGE),
  uaName: Yup.string()
    .typeError(NO_STRING_TYPE_MESSAGE)
    .matches(config.formRegExp.uaNameCreation, UA_NAME_MESSAGE)
    .min(2, MIN_LENGTH_MESSAGE)
    .required(ERROR_MESSAGE),
  priority: Yup.number().required(ERROR_MESSAGE),
  category: Yup.string().required(ERROR_MESSAGE)
  // sizes: Yup.string().required(ERROR_MESSAGE)
});

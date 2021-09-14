import * as Yup from 'yup';
import { config } from '../../configs';

const {
  MODEL_VALIDATION_ERROR,
  MODEL_ERROR_MESSAGE,
  NOT_EN_NAME_MESSAGE,
  NOT_UA_NAME_MESSAGE,
  NOT_EN_DESCRIPTION_MESSAGE,
  NOT_UA_DESCRIPTION_MESSAGE,
  NO_STRING_TYPE_MESSAGE
} = config.modelErrorMessages;

export const modelValidationSchema = Yup.object().shape({
  enDescription: Yup.string()
    .typeError(NO_STRING_TYPE_MESSAGE)
    .matches(config.formRegExp.enDescription, NOT_EN_DESCRIPTION_MESSAGE)
    .min(2, MODEL_VALIDATION_ERROR)
    .required(MODEL_ERROR_MESSAGE),
  enName: Yup.string()
    .typeError(NO_STRING_TYPE_MESSAGE)
    .matches(config.formRegExp.enNameCreation, NOT_EN_NAME_MESSAGE)
    .min(2, MODEL_VALIDATION_ERROR)
    .required(MODEL_ERROR_MESSAGE),
  uaDescription: Yup.string()
    .typeError(NO_STRING_TYPE_MESSAGE)
    .matches(config.formRegExp.uaRegex, NOT_UA_DESCRIPTION_MESSAGE)
    .min(2, MODEL_VALIDATION_ERROR)
    .required(MODEL_ERROR_MESSAGE),
  uaName: Yup.string()
    .typeError(NO_STRING_TYPE_MESSAGE)
    .matches(config.formRegExp.uaNameCreation, NOT_UA_NAME_MESSAGE)
    .min(2, MODEL_VALIDATION_ERROR)
    .required(MODEL_ERROR_MESSAGE),
  priority: Yup.number().required(MODEL_ERROR_MESSAGE),
  category: Yup.string().required(MODEL_ERROR_MESSAGE),
  sizes: Yup.string().required(MODEL_ERROR_MESSAGE)
});

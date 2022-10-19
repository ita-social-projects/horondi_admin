import * as Yup from 'yup';
import { config } from '../../configs';

const {
  NO_STRING_TYPE_MESSAGE,
  ENTER_TITLE_ERROR_MESSAGE,
  REQUIRED_IMG_MESSAGE
} = config.aboutUsPageErrorMessages;
const { UA_NAME_MESSAGE, ERROR_MESSAGE, EN_NAME_MESSAGE, MIN_LENGTH_MESSAGE } =
  config.commonErrorMessages;

export const titleEditValidationSchema = Yup.object().shape({
  uaTitle: Yup.string()
    .min(2, MIN_LENGTH_MESSAGE)
    .matches(config.formRegExp.uaNameCreation, UA_NAME_MESSAGE)
    .required(ENTER_TITLE_ERROR_MESSAGE),
  enTitle: Yup.string()
    .min(2, MIN_LENGTH_MESSAGE)
    .matches(config.formRegExp.enNameCreation, EN_NAME_MESSAGE)
    .required(ENTER_TITLE_ERROR_MESSAGE)
});

export const sectionValidationSchema = Yup.object().shape({
  uaTitle: Yup.string().matches(
    config.formRegExp.uaNameCreation,
    UA_NAME_MESSAGE
  ),
  enTitle: Yup.string().matches(
    config.formRegExp.enNameCreation,
    EN_NAME_MESSAGE
  ),
  uaText: Yup.string()
    .typeError(NO_STRING_TYPE_MESSAGE)
    .required(ERROR_MESSAGE),
  enText: Yup.string()
    .typeError(NO_STRING_TYPE_MESSAGE)
    .required(ERROR_MESSAGE),
  img: Yup.string().min(1, REQUIRED_IMG_MESSAGE).nullable()
});

export const footerImgEditValidationSchema = Yup.object().shape({
  img: Yup.string()
});

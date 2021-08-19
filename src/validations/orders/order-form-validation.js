import * as Yup from 'yup';
import { phoneNumberRegex, userNameRegex } from '../../configs/regexes';
import { inputName } from '../../utils/order';
import config from '../../configs/orders';

const { deliveryTypes } = config;

const postValidation = (type) =>
  Yup.object().when(inputName.sentBy, {
    is: type,
    then: Yup.object().shape({
      city: Yup.string().trim().required(),
      courierOffice: Yup.string().trim().required()
    })
  });

export const validationSchema = Yup.object().shape({
  status: Yup.string().required(),
  paymentMethod: Yup.string().required(),
  isPaid: Yup.bool().required(),
  recipient: Yup.object().shape({
    firstName: Yup.string().trim().matches(userNameRegex).required(),
    lastName: Yup.string().trim().matches(userNameRegex).required(),
    email: Yup.string().trim().email().required(),
    phoneNumber: Yup.string().trim().matches(phoneNumberRegex).required()
  }),
  userComment: Yup.string().min(2).max(500),
  items: Yup.array().required(),
  delivery: Yup.object().shape({
    sentBy: Yup.string().trim().required(),
    courier: Yup.object().when(inputName.sentBy, {
      is: (val) =>
        val === deliveryTypes.ukrPostCourier ||
        val === deliveryTypes.novaPostCourier,
      then: Yup.object().shape({
        city: Yup.string().trim().required(),
        street: Yup.string().trim().required(),
        house: Yup.string().trim().required(),
        flat: Yup.string().trim().required()
      })
    }),
    novaPost: postValidation(deliveryTypes.novaPost),
    ukrPost: postValidation(deliveryTypes.ukrPost)
  })
});

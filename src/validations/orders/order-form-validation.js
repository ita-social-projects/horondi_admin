import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  status: Yup.string().required(),
  paymentMethod: Yup.string().required(),
  isPaid: Yup.bool().required(),
  user: Yup.object().shape({
    firstName: Yup.string().trim().required(),
    lastName: Yup.string().trim().required(),
    email: Yup.string().trim().email().required(),
    phoneNumber: Yup.string().required()
  }),
  userComment: Yup.string().max(100)
});

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

import { useFormik } from 'formik';

import * as Yup from 'yup';

import LoadingBar from '../../../components/loading-bar';
import { config } from '../../../configs';

import {
  getContact,
  updateContact
} from '../../../redux/contact/contact.actions';

import ContactsForm from '../../../components/contacts-form';

const { languages } = config;
const {
  PHONE_NUMBER_LENGTH_MESSAGE,
  PHONE_NUMBER_TYPE_MESSAGE,
  ENTER_PHONE_NUMBER_MESSAGE,
  INPUT_LENGTH_MESSAGE,
  ENTER_SCHEDULE_MESSAGE,
  ENTER_ADDRESS_MESSAGE,
  IMAGE_FORMAT_MESSAGE,
  ENTER_LINK_MESSAGE
} = config.contactErrorMessages;
const {
  INVALID_EMAIL_MESSAGE,
  ENTER_EMAIL_MESSAGE
} = config.loginErrorMessages;

const ContactsEdit = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, contact } = useSelector(({ Contact }) => ({
    loading: Contact.contactsLoading,
    contact: Contact.contact
  }));

  const [contactFormValues, setContactFormValues] = useState({
    phoneNumber: '',
    ukSchedule: '',
    enSchedule: '',
    ukAddress: '',
    enAddress: '',
    email: '',
    ukCartImage: '',
    enCartImage: '',
    cartLink: ''
  });

  const { id } = match.params;

  useEffect(() => {
    dispatch(getContact(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (contact !== null) {
      setContactFormValues({
        phoneNumber: contact.phoneNumber,
        ukSchedule: contact.openHours[0].value,
        enSchedule: contact.openHours[1].value,
        ukAddress: contact.address[0].value,
        enAddress: contact.address[1].value,
        email: contact.email,
        ukCartImage: contact.images[0].value.medium,
        enCartImage: contact.images[1].value.medium,
        cartLink: contact.link
      });
    }
  }, [
    contact,
    setContactFormValues,
    contactFormValues.phoneNumber,
    contactFormValues.ukSchedule,
    contactFormValues.enSchedule,
    contactFormValues.ukAddress,
    contactFormValues.enAddress,
    contactFormValues.email,
    contactFormValues.ukCartImage,
    contactFormValues.enCartImage,
    contactFormValues.cartLink
  ]);

  const contactSaveHandler = async ({
    phoneNumber,
    ukSchedule,
    enSchedule,
    ukAddress,
    enAddress,
    email,
    ukCartImage,
    enCartImage,
    cartLink
  }) => {
    const updatedContact = {
      phoneNumber,
      openHours: [
        { lang: languages[0], value: ukSchedule },
        { lang: languages[1], value: enSchedule }
      ],
      address: [
        { lang: languages[0], value: ukAddress },
        { lang: languages[1], value: enAddress }
      ],
      email,
      images: [
        { lang: languages[0], value: { medium: ukCartImage } },
        { lang: languages[1], value: { medium: enCartImage } }
      ],
      link: cartLink
    };
    dispatch(updateContact({ id, updatedContact }));
  };

  const formSchema = Yup.object().shape({
    phoneNumber: Yup.number()
      .min(12, PHONE_NUMBER_LENGTH_MESSAGE)
      .typeError(PHONE_NUMBER_TYPE_MESSAGE)
      .required(ENTER_PHONE_NUMBER_MESSAGE),
    ukSchedule: Yup.string()
      .min(10, INPUT_LENGTH_MESSAGE)
      .required(ENTER_SCHEDULE_MESSAGE),
    enSchedule: Yup.string()
      .min(10, INPUT_LENGTH_MESSAGE)
      .required(ENTER_SCHEDULE_MESSAGE),
    ukAddress: Yup.string()
      .min(8, INPUT_LENGTH_MESSAGE)
      .required(ENTER_ADDRESS_MESSAGE),
    enAddress: Yup.string()
      .min(8, INPUT_LENGTH_MESSAGE)
      .required(ENTER_ADDRESS_MESSAGE),
    email: Yup.string()
      .email(INVALID_EMAIL_MESSAGE)
      .required(ENTER_EMAIL_MESSAGE),
    cartLink: Yup.string()
      .url(IMAGE_FORMAT_MESSAGE)
      .min(10, INPUT_LENGTH_MESSAGE)
      .required(ENTER_LINK_MESSAGE)
  });

  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: contactFormValues,
    enableReinitialize: true,

    validationSchema: formSchema,
    validateOnBlur: true,

    onSubmit: (values) => {
      contactSaveHandler(values);
    }
  });

  if (loading) {
    return <LoadingBar />;
  }
  return (
    <ContactsForm
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      values={values}
      touched={touched}
      errors={errors}
    />
  );
};

ContactsEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired
};

export default ContactsEdit;

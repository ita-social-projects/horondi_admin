import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { config } from '../../../configs';

import { addContact } from '../../../redux/contact/contact.actions';

import ContactsForm from '../../../components/forms/contacts-form';

const { languages } = config;

const ContactsAdd = () => {
  const dispatch = useDispatch();

  const [contactFormValues] = useState({
    phoneNumber: '',
    uaSchedule: '',
    enSchedule: '',
    uaAddress: '',
    enAddress: '',
    email: '',
    cartLink: {}
  });

  const contactSaveHandler = async ({
    phoneNumber,
    uaSchedule,
    enSchedule,
    uaAddress,
    enAddress,
    cartLink,
    email
  }) => {
    const newContact = {
      phoneNumber,
      openHours: [
        { lang: languages[0], value: uaSchedule },
        { lang: languages[1], value: enSchedule }
      ],
      address: [
        { lang: languages[0], value: uaAddress },
        { lang: languages[1], value: enAddress }
      ],
      email,
      link: cartLink
    };

    dispatch(addContact(newContact));
  };

  return (
    <ContactsForm
      contactSaveHandler={contactSaveHandler}
      initialValues={contactFormValues}
    />
  );
};

export default ContactsAdd;

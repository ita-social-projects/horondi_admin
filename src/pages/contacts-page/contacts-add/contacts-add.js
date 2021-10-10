import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoadingBar from '../../../components/loading-bar';
import { config } from '../../../configs';

import {
  addContact,
  getContacts
} from '../../../redux/contact/contact.actions';
import { contactLoading } from '../../../redux/selectors/contacts.selectors';

import ContactsForm from '../../../components/forms/contacts-form';
// import { selectContact } from '../../../../contact.reducer';

const { languages } = config;

const ContactsAdd = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const { loading } = useSelector(contactLoading);

  const [contactFormValues] = useState({
    phoneNumber: '',
    uaSchedule: '',
    enSchedule: '',
    uaAddress: '',
    enAddress: '',
    email: '',
    uaCartImage: null,
    enCartImage: null,
    cartLink: ''
  });

  const contactSaveHandler = ({
    phoneNumber,
    uaSchedule,
    enSchedule,
    uaAddress,
    enAddress,
    uaCartImage,
    enCartImage,
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

    const mapImages =
      !!uaCartImage && !!enCartImage
        ? [
            {
              lang: languages[0],
              image: uaCartImage
            },
            {
              lang: languages[1],
              image: enCartImage
            }
          ]
        : [];

    dispatch(addContact(newContact, mapImages));
  };

  if (loading) {
    return <LoadingBar />;
  }
  return (
    <ContactsForm
      contactSaveHandler={contactSaveHandler}
      initialValues={contactFormValues}
    />
  );
};

export default ContactsAdd;

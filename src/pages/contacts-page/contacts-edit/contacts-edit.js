import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

import LoadingBar from '../../../components/loading-bar';
import { config } from '../../../configs';

import {
  getContact,
  updateContact
} from '../../../redux/contact/contact.actions';

import ContactsForm from '../../../components/forms/contacts-form';
import { contactSelector } from '../../../redux/selectors/contacts.selectors';

const { languages } = config;

const ContactsEdit = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, contact } = useSelector(contactSelector);

  const [contactFormValues, setContactFormValues] = useState({
    phoneNumber: '',
    uaSchedule: '',
    enSchedule: '',
    uaAddress: '',
    enAddress: '',
    email: '',
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
        uaSchedule: contact.openHours[0].value,
        enSchedule: contact.openHours[1].value,
        uaAddress: contact.address[0].value,
        enAddress: contact.address[1].value,
        email: contact.email,
        cartLink: contact.link
      });
    }
  }, [
    contact,
    setContactFormValues,
    contactFormValues.phoneNumber,
    contactFormValues.uaSchedule,
    contactFormValues.enSchedule,
    contactFormValues.uaAddress,
    contactFormValues.enAddress,
    contactFormValues.email,
    contactFormValues.cartLink
  ]);

  const contactSaveHandler = async ({
    phoneNumber,
    uaSchedule,
    enSchedule,
    uaAddress,
    enAddress,
    email,
    cartLink
  }) => {
    const updatedContact = {
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

    dispatch(updateContact({ id, updatedContact }));
  };

  if (loading) {
    return <LoadingBar />;
  }
  return (
    contactFormValues.email && (
      <ContactsForm
        contactSaveHandler={contactSaveHandler}
        initialValues={contactFormValues}
      />
    )
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

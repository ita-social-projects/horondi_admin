import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

import LoadingBar from '../../../components/loading-bar';
import { config } from '../../../configs';

import {
  getContact,
  updateContact
} from '../../../redux/contact/contact.actions';

import ContactsForm from '../../../components/contacts-form';

const { languages } = config;

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
        ukCartImage: contact.images[0].value.thumbnail
          ? `${config.imagePrefix}${contact.images[0].value.thumbnail}`
          : '',
        enCartImage: contact.images[1].value.thumbnail
          ? `${config.imagePrefix}${contact.images[1].value.thumbnail}`
          : '',
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
        { lang: languages[0], value: { thumbnail: '' } },
        { lang: languages[1], value: { thumbnail: '' } }
      ],
      link: cartLink
    };

    const mapImages =
      ukCartImage.name && enCartImage.name
        ? [
          {
            lang: languages[0],
            image: ukCartImage
          },
          {
            lang: languages[1],
            image: enCartImage
          }
        ]
        : [];

    dispatch(updateContact({ id, updatedContact, mapImages }));
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

ContactsEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired
};

export default ContactsEdit;

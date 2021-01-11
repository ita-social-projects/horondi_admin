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
import { selectContact } from '../../../redux/selectors/contacts.selectors';

const { languages } = config;

const ContactsEdit = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, contact } = useSelector(selectContact);

  const [contactFormValues, setContactFormValues] = useState({
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
        uaCartImage:
          contact.images.length && contact.images[0].value.thumbnail
            ? `${config.imagePrefix}${contact.images[0].value.thumbnail}`
            : '',
        enCartImage:
          contact.images.length && contact.images[1].value.thumbnail
            ? `${config.imagePrefix}${contact.images[1].value.thumbnail}`
            : '',
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
    contactFormValues.uaCartImage,
    contactFormValues.enCartImage,
    contactFormValues.cartLink
  ]);

  const contactSaveHandler = async ({
    phoneNumber,
    uaSchedule,
    enSchedule,
    uaAddress,
    enAddress,
    email,
    uaCartImage,
    enCartImage,
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

    const mapImages =
      uaCartImage.name && enCartImage.name
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

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';

import { useSelector, useDispatch } from 'react-redux';

import { Button } from '@material-ui/core';

import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';
import { config } from '../../configs';
import LoadingBar from '../../components/loading-bar';
import TableContainerGenerator from '../../components/table-container-generator';
import TableContainerRow from '../../components/table-container-row';
import { useStyles } from './contacts-page.style';

import {
  getContacts,
  setContactsCurrentPage
} from '../../redux/contact/contact.actions';
import { deleteContact } from '../../redux/contact/contact.operations';

const { REMOVE_MESSAGE } = config.messages;
const { REMOVE_TITLE } = config.buttonTitles;

const ContactsPage = () => {
  const classes = useStyles();
  const {
    contacts,
    loading,
    contactPagesCount,
    contactsCurrentPage,
    contactsPerPage
  } = useSelector(({ Contact }) => ({
    contacts: Contact.list,
    loading: Contact.ContactLoading,
    contactPagesCount: Contact.pagination.pagesCount,
    contactsCurrentPage: Contact.pagination.currentPage,
    contactsPerPage: Contact.pagination.contactsPerPage
  }));
  const { routes } = config.app;

  const { CREATE_CONTACT_TITLE } = config.buttonTitles;

  const pathToAddContactPage = routes.pathToAddContact;
  const tableTitles = config.tableHeadRowTitles.news;

  const dispatch = useDispatch();

  const contactDeleteHandler = (id) => {
    const removeContact = () => {
      dispatch(closeDialog());
      dispatch(deleteContact(id));
    };

    openSuccessSnackbar(
      removeContact,
      REMOVE_TITLE,
      REMOVE_MESSAGE,
      REMOVE_TITLE
    );
  };

  useEffect(() => {
    dispatch(
      getContacts({
        limit: contactsPerPage,
        skip: contactsCurrentPage * contactsPerPage,
        contactsPerPage
      })
    );
  }, [dispatch, contactsPerPage, contactsCurrentPage]);

  const contactItems =
    contacts !== undefined
      ? contacts.map((contact, index) => (
          <TableContainerRow
            key={index}
            id={contact.id}
            author={contact.author.name[0].value}
            title={contact.title[0].value}
            deleteHandler={() => contactDeleteHandler(contact._id)}
            editHandler={() => {
              dispatch(push(`/contacts/${contact._id}`));
            }}
          />
        ))
      : null;

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.tableNav}>
        <Button
          id='add-contact'
          component={Link}
          to={pathToAddContactPage}
          variant='contained'
          color='primary'
        >
          {CREATE_CONTACT_TITLE}
        </Button>
      </div>
      <div className={classes.tableContainer}>
        <TableContainerGenerator
          id='contactTable'
          tableTitles={tableTitles}
          tableItems={contactItems}
        />
      </div>
    </div>
  );
};

export default ContactsPage;

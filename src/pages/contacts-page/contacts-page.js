import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';

import { useSelector, useDispatch } from 'react-redux';

import { Button, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import { config } from '../../configs';
import LoadingBar from '../../components/loading-bar';
import { formatPhoneNumber } from '../../utils/format-phone-number';
import TableContainerGenerator from '../../components/table-container-generator';
import TableContainerRow from '../../components/table-container-row';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import { useStyles } from './contacts-page.style';

import {
  getContacts,
  setContactsCurrentPage,
  deleteContact
} from '../../redux/contact/contact.actions';

const { REMOVE_CONTACT_MESSAGE } = config.messages;
const { REMOVE_CONTACT_TITLE } = config.buttonTitles;

const ContactsPage = () => {
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const classes = useStyles();
  const {
    contacts,
    loading,
    contactPagesCount,
    contactsCurrentPage,
    contactsPerPage
  } = useSelector(({ Contact }) => ({
    contacts: Contact.contacts,
    loading: Contact.ContactLoading,
    contactPagesCount: Contact.pagination.contactPagesCount,
    contactsCurrentPage: Contact.pagination.contactsCurrentPage,
    contactsPerPage: Contact.pagination.contactsPerPage
  }));
  const { routes } = config.app;
  const { formRegExp } = config;

  const { CREATE_CONTACT_TITLE } = config.buttonTitles;

  const pathToAddContactPage = routes.pathToAddContact;
  const tableTitles = config.tableHeadRowTitles.contacts;

  const dispatch = useDispatch();

  const contactDeleteHandler = (id) => {
    const removeContact = () => {
      dispatch(closeDialog());
      dispatch(deleteContact(id));
    };

    openSuccessSnackbar(
      removeContact,
      REMOVE_CONTACT_TITLE,
      REMOVE_CONTACT_MESSAGE,
      REMOVE_CONTACT_TITLE
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

  const changePageHandler = (e, pageIndex) => {
    dispatch(setContactsCurrentPage(pageIndex));
  };
  const contactItems = contacts
    ? contacts.map((contact) => (
      <TableContainerRow
        key={contact.id}
        id={contact.id}
        phone={formatPhoneNumber(contact.phoneNumber)}
        email={contact.email}
        address={contact.address[0].value.replace(formRegExp.unwrapHtml, ' ')}
        showAvatar={false}
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
        <Typography variant='h1' className={classes.contactsTitle}>
          Контактна інформація
        </Typography>
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
      <div className={classes.paginationContainer}>
        <Pagination
          count={contactPagesCount}
          variant='outlined'
          shape='rounded'
          page={contactsCurrentPage + 1}
          onChange={changePageHandler}
        />
      </div>
    </div>
  );
};

export default ContactsPage;

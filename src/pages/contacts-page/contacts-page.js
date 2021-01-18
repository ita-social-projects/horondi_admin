import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';

import { useSelector, useDispatch } from 'react-redux';

import { Button, Typography } from '@material-ui/core';

import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import LoadingBar from '../../components/loading-bar';
import { formatPhoneNumber } from '../../utils/format-phone-number';
import TableContainerGenerator from '../../containers/table-container-generator';
import TableContainerRow from '../../containers/table-container-row';
import useSuccessSnackbar from '../../utils/use-success-snackbar';

import { useCommonStyles } from '../common.styles';
import { config } from '../../configs';

import {
  getContacts,
  deleteContact
} from '../../redux/contact/contact.actions';
import { contactSelectorWithPagination } from '../../redux/selectors/contacts.selectors';

const { REMOVE_CONTACT_MESSAGE } = config.messages;
const { CREATE_CONTACT_TITLE } = config.buttonTitles;

const pathToAddContactPage = config.routes.pathToAddContact;
const tableTitles = config.tableHeadRowTitles.contacts;

const ContactsPage = () => {
  const commonStyles = useCommonStyles();

  const { openSuccessSnackbar } = useSuccessSnackbar();

  const {
    contacts,
    loading,
    itemsCount,
    currentPage,
    rowsPerPage
  } = useSelector(contactSelectorWithPagination);

  const dispatch = useDispatch();

  const contactDeleteHandler = (id) => {
    const removeContact = () => {
      dispatch(closeDialog());
      dispatch(deleteContact(id));
    };

    openSuccessSnackbar(removeContact, REMOVE_CONTACT_MESSAGE);
  };

  useEffect(() => {
    dispatch(
      getContacts({
        limit: rowsPerPage,
        skip: currentPage * rowsPerPage,
        rowsPerPage
      })
    );
  }, [dispatch, rowsPerPage, currentPage]);

  const contactItems = contacts
    ? contacts.map((contact, index) => (
      <TableContainerRow
        key={`${contact.id}${index}`}
        id={contact.id}
        phone={formatPhoneNumber(contact.phoneNumber)}
        email={contact.email}
        address={contact.address[0].value.replace(
          config.formRegExp.unwrapHtml,
          ' '
        )}
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
    <div className={commonStyles.container}>
      <div className={commonStyles.adminHeader}>
        <Typography variant='h1' className={commonStyles.materialTitle}>
          {config.titles.contactsPageTitles.mainPageTitle}
        </Typography>
        <Button
          id='add-contact'
          component={Link}
          to={pathToAddContactPage}
          variant='contained'
          color='primary'
          data-cy='add-contact'
        >
          {CREATE_CONTACT_TITLE}
        </Button>
      </div>
      <TableContainerGenerator
        pagination
        count={itemsCount}
        id='contactTable'
        tableTitles={tableTitles}
        tableItems={contactItems}
      />
    </div>
  );
};

export default ContactsPage;

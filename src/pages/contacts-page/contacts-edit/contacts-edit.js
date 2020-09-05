import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

import { Paper, TextField, FormControl, Grid } from '@material-ui/core';

import { SaveButton } from '../../../components/buttons';

import { useStyles } from './contacts-edit.style';
import useContactHandlers from '../../../utils/use-contact-handlers';
import { config } from '../../../configs';

import {
  getContact,
  updateContact
} from '../../../redux/contact/contact.actions';
import LoadingBar from '../../../components/loading-bar';

const { languages } = config;

const ContactsEdit = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, contact } = useSelector(({ Contact }) => ({
    loading: Contact.contactsLoading,
    contact: Contact.contact
  }));
  const classes = useStyles();

  // const { id } = route.params;

  // useEffect(() => {

  // }, [dispatch, id]);

  const {
    phone,
    ukSchedule,
    enSchedule,
    ukAddress,
    enAddress,
    email,
    ukCartImage,
    enCartImage,
    cartLink,
    setPhone,
    ukSetSchedule,
    enSetSchedule,
    ukSetAddress,
    enSetAddress,
    setEmail,
    ukSetCartImage,
    enSetCartImage,
    setCartLink
  } = useContactHandlers();

  const { id } = match.params;

  useEffect(() => {
    dispatch(getContact(id));
  }, [dispatch, id]);

  useEffect(() => {
    console.log(contact);
    if (contact !== null) {
      setPhone(contact.phoneNumber);

      ukSetSchedule(contact.openHours[0].value);
      enSetSchedule(contact.openHours[1].value);

      ukSetAddress(contact.address[0].value);
      enSetAddress(contact.address[1].value);

      setEmail(contact.email);

      ukSetCartImage(contact.images[0].value.medium);
      enSetCartImage(contact.images[1].value.medium);

      setCartLink(contact.link);
    }
  }, [
    contact,
    setPhone,
    ukSetSchedule,
    enSetSchedule,
    ukSetAddress,
    enSetAddress,
    setEmail,
    ukSetCartImage,
    enSetCartImage,
    setCartLink
  ]);

  const contactSaveHandler = async (e) => {
    e.preventDefault();

    const updatedContact = {
      phoneNumber: phone,
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

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={classes.detailsContainer}>
      <form className={classes.form} onSubmit={contactSaveHandler}>
        <FormControl className={classes.contactDetails}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Paper className={classes.contactItemUpdate}>
                <TextField
                  id='ukCartImage'
                  className={classes.textField}
                  variant='outlined'
                  label='Фото карти (укр.)'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={ukCartImage}
                  onChange={(e) => ukSetCartImage(e.target.value)}
                  required
                />
                <TextField
                  id='enCartImage'
                  className={classes.textField}
                  variant='outlined'
                  label='Фото карти (англ.)'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={enCartImage}
                  onChange={(e) => enSetCartImage(e.target.value)}
                  required
                />
                <TextField
                  id='cartLink'
                  className={classes.textField}
                  variant='outlined'
                  label='Google maps посилання'
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={cartLink}
                  onChange={(e) => setCartLink(e.target.value)}
                  required
                />
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper className={classes.contactItemUpdate}>
                <TextField
                  id='phone'
                  className={classes.textField}
                  variant='outlined'
                  label='Контактний номер'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <TextField
                  id='ukSchedule'
                  className={classes.textField}
                  variant='outlined'
                  label='Розклад (укр.)'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={ukSchedule}
                  onChange={(e) => ukSetSchedule(e.target.value)}
                  required
                />
                <TextField
                  id='enSchedule'
                  className={classes.textField}
                  variant='outlined'
                  label='Розклад (англ.)'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={enSchedule}
                  onChange={(e) => enSetSchedule(e.target.value)}
                  required
                />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.contactItemUpdate}>
                <TextField
                  id='ukAddress'
                  className={classes.textField}
                  variant='outlined'
                  label='Адреса (укр.)'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={ukAddress}
                  onChange={(e) => ukSetAddress(e.target.value)}
                  required
                />
                <TextField
                  id='enAddress'
                  className={classes.textField}
                  variant='outlined'
                  label='Адреса (англ.)'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={enAddress}
                  onChange={(e) => enSetAddress(e.target.value)}
                  required
                />
                <TextField
                  id='email'
                  className={classes.textField}
                  variant='outlined'
                  label='Email'
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Paper>
            </Grid>
          </Grid>
        </FormControl>
        <SaveButton
          id='save'
          type='submit'
          title='Зберегти'
          className={classes.saveButton}
        />
      </form>
    </div>
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

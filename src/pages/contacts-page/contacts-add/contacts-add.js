import React from 'react';
import { FormControl, Paper, TextField, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './contacts-add.style';
import { SaveButton } from '../../../components/buttons';
import LoadingBar from '../../../components/loading-bar';
import { config } from '../../../configs';
import useContactHandlers from '../../../utils/use-contact-handlers';

const { languages } = config;

const ContactsAdd = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector(({ News }) => News.newsLoading);

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

  const contactSaveHandler = async (e) => {
    e.preventDefault();

    const newContact = {
      phoneNumber: phone,
      openHours: [
        { lang: languages[0], value: ukSchedule },
        { lang: languages[1], value: enSchedule }
      ],
      address: [
        { lang: languages[0], value: ukAddress },
        { lang: languages[1], value: enAddress }
      ],
      email: email,
      images: [
        { lang: languages[0], medium: ukCartImage },
        { lang: languages[1], medium: enCartImage }
      ],
      link: cartLink
    };
    // dispatch(addContact({ id, newContact }));
  };

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={classes.detailsContainer}>
      <form className={classes.form} onSubmit={contactSaveHandler}>
        <FormControl className={classes.newsDetails}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Paper className={classes.newsItemUpdate}>
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
              <Paper className={classes.newsItemUpdate}>
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
              <Paper className={classes.newsItemUpdate}>
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

export default ContactsAdd;

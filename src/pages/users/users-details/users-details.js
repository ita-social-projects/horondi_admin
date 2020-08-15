import React from 'react';
import { FormControl, Grid, Paper, TextField } from '@material-ui/core';
import { useStyles } from './users-details.styles';

const UsersDetails = (props) => {
  const styles = useStyles();

  return (
    <div className={styles.detailsContainer}>
      <form>
        <FormControl className={styles.userDetails}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Paper className={styles.userBlock}>
                <TextField
                  id='firstName'
                  className={styles.textField}
                  variant='outlined'
                  label="Ім'я"
                  InputLabelProps={{
                    classes: {
                      root: styles.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  multiline
                  disabled
                />
                <TextField
                  id='lastName'
                  className={styles.textField}
                  variant='outlined'
                  label='Прізвище'
                  InputLabelProps={{
                    classes: {
                      root: styles.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  multiline
                  disabled
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={styles.userBlock}>
                <TextField
                  id='country'
                  className={styles.textField}
                  variant='outlined'
                  label='Країна'
                  InputLabelProps={{
                    classes: {
                      root: styles.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  multiline
                  disabled
                />
                <TextField
                  id='city'
                  className={styles.textField}
                  variant='outlined'
                  label='Місто'
                  InputLabelProps={{
                    classes: {
                      root: styles.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  multiline
                  disabled
                />
                <TextField
                  id='adress'
                  className={styles.textField}
                  variant='outlined'
                  label='Адреса'
                  InputLabelProps={{
                    classes: {
                      root: styles.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  multiline
                  disabled
                />
                <TextField
                  id='postalCode'
                  className={styles.textField}
                  variant='outlined'
                  label='Поштовий код'
                  InputLabelProps={{
                    classes: {
                      root: styles.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  multiline
                  disabled
                />
              </Paper>
            </Grid>
          </Grid>
        </FormControl>
      </form>
    </div>
  );
};

export default UsersDetails;

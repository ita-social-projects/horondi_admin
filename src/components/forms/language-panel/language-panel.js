import React from 'react';
import { Paper, TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useStyles } from './language-panel.styles';

const LanguagePanel = ({ lang, inputOptions }) => {
  const styles = useStyles();

  const { values, touched, errors, inputs, handleChange } = inputOptions;

  return (
    <div className={styles.languagePanel}>
      <Typography className={styles.title} component='h1' variant='h5'>
        {lang.toUpperCase()}
      </Typography>
      <Paper className={styles.inputPanel}>
        {inputs.map((input) => {
          const inputName = lang + _.capitalize(input.name);

          return (
            <>
              <TextField
                data-cy={`${lang}-${input.name}`}
                id={inputName}
                className={styles.textField}
                variant='outlined'
                label={input.label}
                error={touched[inputName] && !!errors[inputName]}
                multiline
                value={values[inputName]}
                onChange={handleChange}
              />
              {touched[inputName] && errors[inputName] && (
                <div
                  data-cy={`${lang}-${input.name}-error`}
                  className={styles.error}
                >
                  {errors[inputName]}
                </div>
              )}
            </>
          );
        })}
      </Paper>
    </div>
  );
};

export default LanguagePanel;

LanguagePanel.propTypes = {
  lang: PropTypes.string,
  inputOptions: [
    {
      name: PropTypes.string,
      label: PropTypes.string
    }
  ]
};
LanguagePanel.defaultProps = {
  lang: '',
  inputOptions: [
    {
      name: '',
      label: ''
    }
  ]
};

import React from 'react';
import { Paper, TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import capitalize from 'lodash/capitalize';
import { useStyles } from './language-panel.styles';
import Editor from '../../editor';

const LanguagePanel = ({ lang, inputOptions }) => {
  const styles = useStyles();

  const { values, touched, errors, inputs, handleChange } = inputOptions;
  const inputsTextfields = inputs.filter((input) => !input.isEditor);
  const inputsEditor = inputs.filter((input) => input.isEditor);
  return (
    <>
      <div className={styles.languagePanel}>
        <Typography className={styles.title} component='h1' variant='h5'>
          {lang.toUpperCase()}
        </Typography>
        <Paper className={styles.inputPanel}>
          {inputsTextfields.length
            ? inputsTextfields.map((input) => {
              const inputName = lang + capitalize(input.name);

              return (
                <React.Fragment key={input.name}>
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
                </React.Fragment>
              );
            })
            : ''}
          {inputsEditor.length
            ? inputsEditor.map((input) => (
              <Editor
                value=''
                placeholder={input.label}
                onChange={handleChange}
                onEditorChange={input.onEditorChange}
                setFiles={input.setFiles}
                data-cy={`${lang}-${input.name}`}
                label={lang}
                id={`${lang}-${input.name}`}
                key={lang}
              />
            ))
            : ''}
        </Paper>
      </div>
    </>
  );
};

export default LanguagePanel;

LanguagePanel.propTypes = {
  lang: PropTypes.string,
  inputOptions: [
    {
      name: PropTypes.string,
      label: PropTypes.string,
      isEditor: PropTypes.string
    }
  ]
};

LanguagePanel.defaultProps = {
  lang: '',
  inputOptions: {
    inputs: [
      {
        name: '',
        label: '',
        isEditor: false
      }
    ]
  }
};

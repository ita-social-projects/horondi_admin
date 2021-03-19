import React from 'react';
import { Paper, TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { upperFirst } from 'lodash';
import { useStyles } from './language-panel.styles';
import Editor from '../../editor';

const LanguagePanel = ({ lang, inputOptions }) => {
  const styles = useStyles();

  const {
    values,
    touched,
    errors,
    inputs,
    handleChange,
    handleBlur
  } = inputOptions;
  const inputsTextfields = inputs.filter((input) => !input.isEditor);
  const inputsEditor = inputs.filter((input) => input.isEditor);
  return (
    <>
      <div className={styles.languagePanel}>
        <Typography className={styles.title} component='h1' variant='h5'>
          {lang.toUpperCase()}
        </Typography>
        <Paper className={styles.inputPanel}>
          {map(inputsTextfields, (input) => {
            const inputName = lang + upperFirst(input.name);
            return (
              <React.Fragment key={input.name}>
                <TextField
                  data-cy={`${lang}-${input.name}`}
                  id={inputName}
                  className={styles.textField}
                  variant='outlined'
                  label={input.label[lang]}
                  error={touched[inputName] && !!errors[inputName]}
                  multiline
                  value={values[inputName]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  {...input.props}
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
          })}
          {map(inputsEditor, (input) => {
            const inputName = lang + upperFirst(input.name);
            const setEditorValue = (value) => {
              values[inputName] = value;
            };
            return (
              <Editor
                value={values[inputName]}
                placeholder={input.label[lang]}
                onChange={handleChange}
                onEditorChange={(value) => setEditorValue(value)}
                setFiles={input.setFiles}
                data-cy={`${lang}-${input.name}`}
                label={lang}
                id={`${lang}-${input.name}`}
                key={lang}
              />
            );
          })}
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

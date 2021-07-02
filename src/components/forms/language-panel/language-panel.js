import React from 'react';
import { Paper, TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { upperFirst, noop } from 'lodash';
import { useStyles } from './language-panel.styles';
import Editor from '../../editor';

const LanguagePanel = ({ lang, inputOptions }) => {
  const styles = useStyles();

  const { values, touched, errors, inputs, handleChange, handleBlur } =
    inputOptions;
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
                  // label={input.label[lang]}
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
                onBlur={handleBlur}
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
  inputOptions: PropTypes.shape({
    values: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.bool,
        PropTypes.array,
        PropTypes.object
      ])
    ),
    touched: PropTypes.objectOf(PropTypes.string),
    errors: PropTypes.objectOf(PropTypes.string),
    inputs: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.shape({
          ua: PropTypes.string,
          en: PropTypes.string
        }),
        name: PropTypes.string,
        required: PropTypes.bool,
        isEditor: PropTypes.bool
      })
    ),
    handleChange: PropTypes.func,
    handleBlur: PropTypes.func
  })
};

LanguagePanel.defaultProps = {
  lang: '',
  inputOptions: PropTypes.shape({
    values: {},
    touched: {},
    errors: {},
    inputs: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.shape({
          ua: '',
          en: ''
        }),
        name: '',
        required: false,
        isEditor: false
      })
    ),
    handleChange: noop,
    handleBlur: noop
  })
};

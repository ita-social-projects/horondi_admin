import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import * as Yup from 'yup';

import usePositionHandlers from '../../../utils/use-position-handlers';
import { useStyles } from './position-form.styles';
import { BackButton, SaveButton } from '../../buttons';
import { config } from '../../../configs';
import {
  addPosition,
  updatePosition
} from '../../../redux/position/position.actions';
import LanguagePanel from '../language-panel';
import { getPositionInitialValues } from '../../../utils/position-form';
import CheckboxOptions from '../../checkbox-options';
import { useUnsavedChangesHandler } from '../../../hooks/form-dialog/use-unsaved-changes-handler';
import useChangedValuesChecker from '../../../hooks/forms/use-changed-values-checker';

const labels = config.labels.positionPageLabel;

const {
  POSITION_MAX_LENGTH_MESSAGE,
  POSITION_MIN_LENGTH_MESSAGE,
  POSITION_ERROR_MESSAGE,
  POSITION_UA_NAME_MESSAGE,
  POSITION_EN_NAME_MESSAGE
} = config.positionErrorMessages;

const { SAVE_TITLE } = config.buttonTitles;
const { languages } = config;
const { enNameCreation, uaNameCreation } = config.formRegExp;

const PositionForm = ({ position, id, edit }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { createPosition } = usePositionHandlers();
  const { pathToPosition } = config.routes;

  const positionValidationSchema = Yup.object().shape({
    uaName: Yup.string()
      .min(2, POSITION_MIN_LENGTH_MESSAGE)
      .max(50, POSITION_MAX_LENGTH_MESSAGE)
      .required(POSITION_ERROR_MESSAGE)
      .matches(uaNameCreation, POSITION_UA_NAME_MESSAGE),
    enName: Yup.string()
      .min(2, POSITION_MIN_LENGTH_MESSAGE)
      .max(50, POSITION_MAX_LENGTH_MESSAGE)
      .required(POSITION_ERROR_MESSAGE)
      .matches(enNameCreation, POSITION_EN_NAME_MESSAGE)
  });

  const {
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue
  } = useFormik({
    validationSchema: positionValidationSchema,
    initialValues: getPositionInitialValues(edit, position),
    onSubmit: (data) => {
      const newPosition = createPosition(data);

      if (id) {
        dispatch(
          updatePosition({
            id,
            position: newPosition
          })
        );
        return;
      }
      dispatch(addPosition({ position: newPosition }));
    }
  });

  const changed = useChangedValuesChecker(values, id);
  useUnsavedChangesHandler(values);

  const checkboxes = [
    {
      id: 'position',
      dataCy: 'position',
      value: values.available,
      checked: values.available,
      color: 'primary',
      label: labels.available,
      handler: () => setFieldValue('available', !values.available)
    }
  ];

  const inputs = [{ label: labels.positionName, name: 'name' }];

  const inputOptions = {
    errors,
    touched,
    handleChange,
    handleBlur,
    values,
    inputs
  };

  const eventPreventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={(e) => eventPreventHandler(e)}>
        <div className={styles.buttonContainer}>
          <Grid container spacing={2} className={styles.fixedButtons}>
            <Grid item className={styles.button}>
              <BackButton
                className={styles.returnButton}
                pathBack={pathToPosition}
              />
            </Grid>
            <Grid item className={styles.button}>
              <SaveButton
                className={styles.saveButton}
                data-cy='save'
                type='submit'
                title={SAVE_TITLE}
                values={values}
                errors={errors}
                onClickHandler={handleSubmit}
                disabled={!changed}
              />
            </Grid>
          </Grid>
        </div>
        <div>
          <CheckboxOptions options={checkboxes} />
        </div>
        {languages.map((lang) => (
          <LanguagePanel lang={lang} inputOptions={inputOptions} key={lang} />
        ))}
      </form>
    </div>
  );
};

PositionForm.propTypes = {
  id: PropTypes.string,
  position: PropTypes.objectOf(PropTypes.object),
  values: PropTypes.shape({
    uaName: PropTypes.string,
    enName: PropTypes.string,
    available: PropTypes.bool
  }),
  errors: PropTypes.shape({
    uaName: PropTypes.string,
    enName: PropTypes.string,
    available: PropTypes.bool
  }),
  touched: PropTypes.shape({
    uaName: PropTypes.string,
    enName: PropTypes.string,
    available: PropTypes.bool
  }),
  edit: PropTypes.bool
};

PositionForm.defaultProps = {
  id: '',
  values: {},
  errors: {},
  touched: {},
  position: {
    _id: '',
    name: [
      {
        lang: '',
        value: ''
      },
      {
        lang: '',
        value: ''
      }
    ],
    available: false
  },
  edit: false
};

export default PositionForm;

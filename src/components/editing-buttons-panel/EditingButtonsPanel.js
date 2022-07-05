import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { BackButton, SaveButton } from '../buttons';
import { useStyles } from './EditingButtonsPanel.styles';
import { useUnsavedChangesHandler } from '../../hooks/form-dialog/use-unsaved-changes-handler';
import { config } from '../../configs';

const { materialUiConstants } = config;
const { SAVE_TITLE } = config.buttonTitles;

const EditingButtonsPanel = ({
  pathBack,
  submitForm,
  values,
  errors,
  dirty,
  isValid
}) => {
  const styles = useStyles();
  const unblock = useUnsavedChangesHandler(values);

  return (
    <div className={styles.buttonContainer}>
      <Grid container spacing={2} className={styles.fixedButtons}>
        <Grid item className={styles.button}>
          <BackButton pathBack={pathBack} />
        </Grid>
        <Grid item className={styles.button}>
          <SaveButton
            data-cy={materialUiConstants.save}
            type={materialUiConstants.types.submit}
            title={SAVE_TITLE}
            onClickHandler={submitForm}
            values={values}
            errors={errors}
            unblockFunction={unblock}
            disabled={!dirty || !isValid}
          />
        </Grid>
      </Grid>
    </div>
  );
};

EditingButtonsPanel.propTypes = {
  pathBack: PropTypes.string.isRequired,
  submitForm: PropTypes.func.isRequired,
  values: PropTypes.objectOf(PropTypes.string).isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired
};

export default EditingButtonsPanel;

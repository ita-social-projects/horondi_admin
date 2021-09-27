import React from 'react';
import { useHistory } from 'react-router-dom';

import PropTypes from 'prop-types';
import { noop } from 'lodash';

import { Grid } from '@material-ui/core';
import { useStyles } from './control-panel.styles';

import buttonTitles from '../../../../configs/button-titles';
import materialUiConstants from '../../../../configs/material-ui-constants';

import { BackButton, SaveButton } from '../../../buttons';

export const ControlPanelButtonsList = {
  SAVE: 'SAVE',
  BACK: 'BACK'
};

export const SaveButtonControl = ({
  isSaveDisabled,
  blockFunction,
  values,
  handleSubmit,
  ...props
}) => {
  const classes = useStyles();

  return (
    <Grid item className={classes.button}>
      <SaveButton
        type={materialUiConstants.types.submit}
        title={buttonTitles.SAVE_TITLE}
        onClickHandler={handleSubmit}
        values={values}
        disabled={isSaveDisabled}
        unblockFunction={blockFunction}
        {...props}
      />
    </Grid>
  );
};

export const BackButtonControl = ({ pathBack, isInitial, ...props }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid item className={classes.button}>
      <BackButton
        initial={isInitial}
        pathBack={pathBack}
        onClick={pathBack ? undefined : () => history.goBack()}
        {...props}
      />
    </Grid>
  );
};

const ControlPanel = ({ isSaveDisabled, buttonsList }) => {
  const classes = useStyles();

  return (
    <div className={classes.controlsBlock}>
      <div className={classes.buttonContainer}>
        <Grid container spacing={2} className={classes.fixedButtons}>
          {buttonsList.includes(ControlPanelButtonsList.BACK) && (
            <BackButtonControl />
          )}
          {buttonsList.includes(ControlPanelButtonsList.BACK) && (
            <SaveButtonControl isSaveDisabled={isSaveDisabled} />
          )}
        </Grid>
      </div>
    </div>
  );
};

SaveButtonControl.propTypes = {
  isSaveDisabled: PropTypes.bool,
  blockFunction: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  values: PropTypes.objectOf(PropTypes.object).isRequired
};

SaveButtonControl.defaultProps = {
  blockFunction: noop,
  isSaveDisabled: noop
};

BackButtonControl.propTypes = {
  pathBack: PropTypes.string,
  isInitial: PropTypes.bool
};

BackButtonControl.defaultProps = {
  isInitial: false,
  pathBack: ''
};

ControlPanel.propTypes = {
  buttonsList: PropTypes.arrayOf(PropTypes.string),
  isSaveDisabled: PropTypes.bool
};

ControlPanel.defaultProps = {
  buttonsList: Object.values(ControlPanelButtonsList),
  isSaveDisabled: noop
};

export default ControlPanel;

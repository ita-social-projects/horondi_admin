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
  unblockFunction,
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
        // disabled={isSaveDisabled}
        // disabled={isSaveDisabled}
        // unblockFunction={unblockFunction}
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

const ControlPanel = ({
  handleSubmit,
  isSaveDisabled,
  buttonsList,
  values,
  unblockFunction
}) => {
  const classes = useStyles();

  return (
    <div className={classes.controlsBlock}>
      <div className={classes.buttonContainer}>
        <Grid container spacing={2} className={classes.fixedButtons}>
          {buttonsList.includes(ControlPanelButtonsList.BACK) && (
            <BackButtonControl />
          )}
          {buttonsList.includes(ControlPanelButtonsList.SAVE) && (
            <SaveButtonControl
              isSaveDisabled={isSaveDisabled}
              values={values}
              unblockFunction={unblockFunction}
              handleSubmit={handleSubmit}
            />
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
  values: PropTypes.objectOf(PropTypes.object).isRequired,
  unblockFunction: PropTypes.func
};

SaveButtonControl.defaultProps = {
  blockFunction: noop,
  isSaveDisabled: noop,
  unblockFunction: noop
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
  handleSubmit: PropTypes.func.isRequired,
  buttonsList: PropTypes.arrayOf(PropTypes.string),
  isSaveDisabled: PropTypes.bool,
  values: PropTypes.objectOf(PropTypes.object),
  unblockFunction: PropTypes.func
};

ControlPanel.defaultProps = {
  buttonsList: Object.values(ControlPanelButtonsList),
  isSaveDisabled: noop,
  values: {},
  unblockFunction: noop
};

export default ControlPanel;

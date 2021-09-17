import React from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { noop } from 'lodash';
import { useStyles } from './email-questions-operations-buttons.styles';
import { config } from '../../../configs/index';
import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';
import {
  moveEmailQuestionsToSpam,
  deleteEmailQuestions
} from '../../../redux/email-questions/email-questions.actions';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';
import buttonTitles from '../../../configs/button-titles';

const {
  EMAIL_QUESTIONS_MOVE_TO_SPAM_MESSAGE,
  EMAIL_QUESTIONS_MOVE_TO_DELETE_MESSAGE
} = config.messages;

const EmailQuestionsOperationsButtons = ({
  questionsToOperate,
  setQuestionsToOperate
}) => {
  const adminId = useSelector(({ Auth }) => Auth.adminId);
  const dispatch = useDispatch();
  const styles = useStyles();
  const { openSuccessSnackbar } = useSuccessSnackbar();

  const moveQuestionsToSpam = () => {
    const moveToSpam = () => {
      dispatch(closeDialog());
      dispatch(
        moveEmailQuestionsToSpam({
          questionsToSpam: questionsToOperate,
          adminId
        })
      );
      setQuestionsToOperate([]);
    };
    openSuccessSnackbar(
      moveToSpam,
      EMAIL_QUESTIONS_MOVE_TO_SPAM_MESSAGE,
      buttonTitles.TO_SPAM
    );
  };

  const deleteMany = () => {
    const deleteQuestions = () => {
      dispatch(closeDialog());
      dispatch(deleteEmailQuestions(questionsToOperate));
      setQuestionsToOperate([]);
    };
    openSuccessSnackbar(
      deleteQuestions,
      EMAIL_QUESTIONS_MOVE_TO_DELETE_MESSAGE
    );
  };

  return (
    <>
      <Button
        className={styles.spamBtn}
        variant='contained'
        color='primary'
        onClick={moveQuestionsToSpam}
        disabled={!questionsToOperate.length}
      >
        {buttonTitles.MOVE_ALL_TO_SPAM}
      </Button>
      <Button
        className={styles.spamBtn}
        variant='contained'
        color='primary'
        onClick={deleteMany}
        disabled={!questionsToOperate.length}
      >
        {buttonTitles.DELETE_TITLE}
      </Button>
    </>
  );
};

EmailQuestionsOperationsButtons.propTypes = {
  questionsToOperate: PropTypes.arrayOf(String),
  setQuestionsToOperate: PropTypes.func
};

EmailQuestionsOperationsButtons.defaultProps = {
  questionsToOperate: [],
  setQuestionsToOperate: noop
};

export default EmailQuestionsOperationsButtons;

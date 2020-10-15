import React from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { useStyles } from './email-questions-operations-buttons.styles';
import { config } from '../../../configs/index';
import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';
import {
  moveEmailQuestionsToSpam,
  deleteEmailQuestions
} from '../../../redux/email-questions/email-questions.actions';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';

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
      '',
      'У СПАМ'
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
      EMAIL_QUESTIONS_MOVE_TO_DELETE_MESSAGE,
      '',
      'Видалити'
    );
  };

  return (
    <>
      <Button
        className={styles.spamBtn}
        variant='contained'
        onClick={moveQuestionsToSpam}
        disabled={!questionsToOperate.length}
      >
        Перемістити у СПАМ
      </Button>
      <Button
        className={styles.spamBtn}
        variant='contained'
        onClick={deleteMany}
        disabled={!questionsToOperate.length}
      >
        Видалити вибрані
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
  setQuestionsToOperate: () => {}
};

export default EmailQuestionsOperationsButtons;

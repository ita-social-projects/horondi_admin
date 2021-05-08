import React, { useState } from 'react';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Divider,
  FormControlLabel,
  TextField,
  Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import getTime from '../../../utils/getTime';
import { CustomizedDeleteIcon } from '../../../components/icons';
import buttonTitles from '../../../configs/button-titles';
import { answerTextHandler } from '../../../utils/email-question-list';
import { useStyles } from './email-questions-item.styles';
import { config, inputTypes } from '../../../configs';
import { answerToEmailQuestion } from '../../../redux/email-questions/email-questions.actions';
import routes from '../../../configs/routes';
import { SaveButton } from '../../../components/buttons';

const EmailQuestionItem = ({
  question,
  checkboxChangeHandler,
  deleteHandler
}) => {
  const classes = useStyles();
  const { answer } = question;

  const questionToShow = `<b>Q:</b> ${question.text}`;
  const answerToShow = answerTextHandler(answer);
  const iconSize = config.iconSizes.DEFAULT_SIZE;

  const dispatch = useDispatch();

  const { adminId } = useSelector(({ Auth }) => ({
    adminId: Auth.adminId
  }));

  const [answerValue, setAnswerValue] = useState('');
  const [shouldValidate, setShouldValidate] = useState(false);

  const onAnsweringQuestion = () => {
    console.log('answering//');
    debugger;
    if (answerValue) {
      dispatch(
        answerToEmailQuestion({
          questionId: question._id,
          adminId,
          text: answerValue
        })
      );
      dispatch(push(routes.pathToEmailQuestions));
    } else {
      setShouldValidate(true);
    }
  };

  return (
    <div className={classes.root} id={question._id}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1c-content'
          id='panel1c-header'
        >
          <FormControlLabel
            aria-label='Acknowledge'
            onClick={(e) => checkboxChangeHandler(e, question._id)}
            control={<Checkbox />}
            label=''
          />
          <div className={classes.column}>
            <Typography className={classes.heading}>
              {question.senderName}
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.heading}>
              {question.email}
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.heading}>
              {ReactHtmlParser(questionToShow + answerToShow)}
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.heading}>
              {ReactHtmlParser(getTime(question.date, true))}
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.heading}>
              {config.labels.emailQuestionsLabels.ua[question.status]}
            </Typography>
          </div>
          <div className={classes.column}>
            <CustomizedDeleteIcon
              size={iconSize}
              onClickHandler={deleteHandler}
            />
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <TextField
            className={classes.input}
            placeholder={config.labels.emailQuestionsLabels.placeholder}
            rows={6}
            multiline
            aria-label='dsd'
            value={answerValue}
            onChange={({ target: { value } }) => setAnswerValue(value)}
            error={!answerValue && shouldValidate}
          />
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <SaveButton
            id='save'
            type={inputTypes.submit}
            title={buttonTitles.ANSWER}
            onClickHandler={onAnsweringQuestion}
          />
        </AccordionActions>
      </Accordion>
    </div>
  );
};

EmailQuestionItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  question: PropTypes.object,
  checkboxChangeHandler: PropTypes.func,
  deleteHandler: PropTypes.func
};

EmailQuestionItem.defaultProps = {
  question: {},
  checkboxChangeHandler: {},
  deleteHandler: {}
};

export default EmailQuestionItem;

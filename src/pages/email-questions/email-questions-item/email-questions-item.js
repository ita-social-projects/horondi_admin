import React from 'react';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReactHtmlParser from 'react-html-parser';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import getTime from '../../../utils/getTime';
import { CustomizedDeleteIcon } from '../../../components/icons';
import buttonTitles from '../../../configs/button-titles';
import { answerTextHandler } from '../../../utils/email-question-list';
import { useStyles } from './email-questions-item.styles';
import { config } from '../../../configs';

const EmailQuestionItem = ({
  key,
  question,
  checkboxChangeHandler,
  deleteHandler
}) => {
  const classes = useStyles();
  const { answer } = question;

  const questionToShow = `<b>Q:</b> ${question.text}`;
  const answerToShow = answerTextHandler(answer);
  const iconSize = config.iconSizes.DEFAULT_SIZE;

  return (
    <div className={classes.root} key={key} id={question._id}>
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
              onClickHandler={() => deleteHandler}
            />
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <input
            type='text'
            placeholder='Відповідь'
            className={classes.input}
          />
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size='small'>{buttonTitles.CANCEL}</Button>
          <Button size='small' color='primary'>
            {buttonTitles.ANSWER}
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
};

EmailQuestionItem.propTypes = {
  key: PropTypes.string,
  question: PropTypes.func,
  checkboxChangeHandler: PropTypes.func,
  deleteHandler: PropTypes.func
};

EmailQuestionItem.defaultProps = {
  key: 'someKey',
  question: {},
  checkboxChangeHandler: {},
  deleteHandler: {}
};

export default EmailQuestionItem;

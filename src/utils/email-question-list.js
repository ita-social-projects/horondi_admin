import { config } from '../configs';

const { labels } = config;

export const answerTextHandler = (answer) =>
  answer && answer.text
    ? `<br><b>${labels.emailQuestionsLabels.rowPlaceholder.answer}:</b> ${answer.text}`
    : '';

export const answerShowHandler = (answer) =>
  answer && answer.text ? answer.text : '';

export const questionShowHandler = (question) =>
  `<b>${labels.emailQuestionsLabels.rowPlaceholder.question}:</b> ${question.text}`;

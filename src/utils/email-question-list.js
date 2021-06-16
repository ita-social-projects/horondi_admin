export const answerTextHandler = (answer) =>
  answer && answer.text ? `<br> <b>Відповідь:</b> ${answer.text}` : '';
export const answerShowHandler = (answer) =>
  answer && answer.text ? answer.text : '';

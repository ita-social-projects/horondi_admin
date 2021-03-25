export const answerTextHandler = (answer) =>
  answer && answer.text ? `<br> <b>A:</b> ${answer.text}` : '';

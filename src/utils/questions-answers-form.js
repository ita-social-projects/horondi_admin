export const uaSetQuestionsHandler = (condition, questionsAnswers) =>
  condition ? questionsAnswers.question[0].value : '';

export const uaSetAnswersHandler = (condition, questionsAnswers) =>
  condition ? questionsAnswers.answer[0].value : '';

export const enSetQuestionsHandler = (condition, questionsAnswers) =>
  condition ? questionsAnswers.question[1].value : '';

export const enSetAnswersHandler = (condition, questionsAnswers) =>
  condition ? questionsAnswers.answer[1].value : '';

export const questionsAnswersDispatchHandler = (
  mode,
  dispatch,
  update,
  add,
  updatePayload,
  addPayload
) => {
  if (mode) {
    return dispatch(update(updatePayload));
  }
  return dispatch(add(addPayload));
};

export const indexFinder = (i, filesArr, name, size) =>
  i === filesArr.findIndex((obj) => obj.name === name && obj.size === size);

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

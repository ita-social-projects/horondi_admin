export const onSubmitCategoryHandler = (
  condition,
  dispatch,
  action,
  payload
) => {
  if (condition) {
    return dispatch(action(payload));
  }
};

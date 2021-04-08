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

export const getCategoryInitialValues = (edit, IMG_URL, category) => ({
  categoryImage: edit ? IMG_URL + category.images.thumbnail : '',
  uaName: category.name[0].value || '',
  enName: category.name[1].value || '',
  code: category.code || ''
});

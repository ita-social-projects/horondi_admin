export const useFormikInitialValues = (model, category, fn, isEdit) => ({
  availableForConstructor: model.availableForConstructor || false,
  category: category || '',
  enName: model.name[1].value || '',
  enDescription: model.description[1].value || '',
  modelImage: model.images.thumbnail || '',
  priority: model.priority || 1,
  show: model.show || false,
  sizes: fn(isEdit) || [],
  uaDescription: model.description[0].value || '',
  uaName: model.name[0].value || ''
});

export const modelFormOnSubmit = (
  condition,
  dispatch,
  updateAction,
  addAction,
  updateActionPayload,
  addActionPayload
) => {
  if (condition) {
    dispatch(updateAction(updateActionPayload));
    return;
  }
  dispatch(addAction(addActionPayload));
};

export const updateModelHandler = (condition, dispatch, updateFn, payload) => {
  if (condition) {
    dispatch(updateFn(payload));
  }
};

export const loadHelper = (targetFiles, targetFilesZero) =>
  targetFiles && targetFilesZero;

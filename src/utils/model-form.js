export const useFormikInitialValues = (model, category, fn, isEdit) => ({
  modelImage: model.images.thumbnail || '',
  uaName: model.name[0].value || '',
  enName: model.name[1].value || '',
  uaDescription: model.description[0].value || '',
  enDescription: model.description[1].value || '',
  priority: model.priority || 1,
  category: category || '',
  sizes: fn(isEdit) || [],
  show: model.show || false,
  availableForConstructor: model.availableForConstructor || false
});

export const modelFormOnSubmit = (
  upload,
  isEdit,
  dispatch,
  updateAction,
  updateActionPayload,
  secondUpdateActionPayload
) => {
  if (isEdit && upload instanceof File) {
    return dispatch(updateAction(updateActionPayload));
  }
  if (isEdit) {
    return dispatch(updateAction(secondUpdateActionPayload));
  }
};

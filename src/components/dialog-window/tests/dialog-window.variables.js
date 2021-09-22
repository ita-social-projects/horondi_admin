export const propsWithCancelButton = {
  isOpen: true,
  dialogTitle: 'some title',
  dialogContent: 'some content',
  showCancelButton: true
};
export const propsWithoutCancelButton = {
  ...propsWithCancelButton,
  showCancelButton: false
};

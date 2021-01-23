const colorId = '0c3c7929dd85de268bed4fe8';

const oneColor = {
  _id: colorId,
  colorHex: '#b0c4de',
  simpleName: []
};

const colorsArr = [oneColor];

const error = { message: 'COLOR_ERROR', statusCode: 400 };

const boundMaterials = {
  material: 'bound'
};

const mockColorsState = {
  list: [],
  color: null,
  showColorDialogWindow: false,
  showBoundMaterialsWindow: false,
  boundMaterials: null,
  colorLoading: false,
  colorError: null
};

const statuses = {
  SUCCESS_ADD_STATUS: 'Успішно додано!',
  SUCCESS_DELETE_STATUS: 'Успішно видалено!'
};

const materials = {
  items: []
};

const mockError = {
  message: 'error'
};

module.exports = {
  colorId,
  colorsArr,
  oneColor,
  error,
  boundMaterials,
  mockColorsState,
  statuses,
  materials,
  mockError
};

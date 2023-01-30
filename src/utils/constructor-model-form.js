import * as Yup from 'yup';

import { getBottoms } from '../redux/bottom/bottom.actions.js';
import { getAllBasics } from '../redux/basics/basics.actions.js';
import { getPatterns } from '../redux/pattern/pattern.actions.js';
import { getBacks } from '../redux/back/back.actions.js';
import { getAllStraps } from '../redux/straps/straps.actions.js';
import { getAllClosures } from '../redux/closures/closures.actions.js';
import { getAllPockets } from '../redux/pockets/pockets.actions.js';

import { bottomSelectorWithPagination } from '../redux/selectors/bottom.selectors.js';
import { basicsSelectorWithPagination } from '../redux/selectors/basics.selectors.js';
import { patternSelectorWithPagination } from '../redux/selectors/pattern.selectors.js';
import { backSelectorWithPagination } from '../redux/selectors/back.selectors.js';
import { strapsSelectorWithPagination } from '../redux/selectors/straps.selectors.js';
import { closuresSelectorWithPagination } from '../redux/selectors/closures.selectors.js';
import { pocketsSelectorWithPagination } from '../redux/selectors/pockets.selectors.js';

import { config } from '../configs/index.js';

const { constructorKeys, constructorLabels } = config.constructorModelForm;
const { PRICE_REQUIRED, ITEMS_REQUIRED, NOT_NULL } =
  config.constructorErrorMessages;

const constructorActions = [
  getBacks,
  getAllBasics,
  getBottoms,
  getAllClosures,
  getPatterns,
  getAllPockets,
  getAllStraps
];

const constructorSelectors = [
  backSelectorWithPagination,
  basicsSelectorWithPagination,
  bottomSelectorWithPagination,
  closuresSelectorWithPagination,
  patternSelectorWithPagination,
  pocketsSelectorWithPagination,
  strapsSelectorWithPagination
];

export const getInitialValues = (constructor) => {
  const getItemsId = (items) => items.map((item) => item._id);

  return {
    backs: getItemsId(constructor.backs),
    basics: getItemsId(constructor.basics),
    bottoms: getItemsId(constructor.bottoms),
    closures: getItemsId(constructor.closures),
    patterns: getItemsId(constructor.patterns),
    pockets: getItemsId(constructor.pockets),
    straps: getItemsId(constructor.straps),
    basePrice: constructor.basePrice,
    name: constructor.name,
    model: constructor.model._id
  };
};

export const getDefaultConstructor = (model) => ({
  bottoms: [],
  basics: [],
  patterns: [],
  backs: [],
  straps: [],
  closures: [],
  pockets: [],
  basePrice: '',
  model: model._id,
  name: model.name
});

export const getConstructorOptions = (values, setFieldValue, errors) => {
  const constructorOptions = [];
  constructorKeys.forEach((key, index) => {
    constructorOptions.push({
      optionName: key,
      label: constructorLabels[index],
      getItems: constructorActions[index],
      selector: constructorSelectors[index],
      optionToAdd: values[key],
      setOptionToAdd: setFieldValue,
      error: errors[key]
    });
  });

  return constructorOptions;
};

export const validationSchema = Yup.object().shape({
  basics: Yup.array().required(ITEMS_REQUIRED),
  bottoms: Yup.array().required(ITEMS_REQUIRED),
  patterns: Yup.array().required(ITEMS_REQUIRED),
  basePrice: Yup.number().positive(NOT_NULL).required(PRICE_REQUIRED)
});

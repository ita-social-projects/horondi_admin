import { useState, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { config } from '../../configs';
import {
  AdditionsSelector,
  OptionsSelector
} from '../../redux/selectors/use-product-handlers.selectors';
import useProductSpecies from './use-product-species';

const {
  languages,
  labels: {
    product: { optionsValues }
  }
} = config;

const useProductHandlers = () => {
  const { filterData, productOptions, modelsForSelectedCategory } = useSelector(
    ({ Products }) => ({
      filterData: Products.filterData,
      productOptions: Products.productOptions,
      modelsForSelectedCategory:
        Products.productSpecies.modelsForSelectedCategory
    })
  );

  const [selectedOptions, setOptions] = useState(optionsValues);
  const [primaryImage, setPrimaryImage] = useState('');
  const [additionalImages, setAdditionalImages] = useState([]);

  const { bottomMaterials: materials, sizes } = productOptions;

  const {
    categoriesNames,
    categories,
    colorsNames,
    colors,
    modelNames,
    models,
    patternsNames,
    patterns
  } = useProductSpecies();

  const additions = useMemo(
    () =>
      filterData.length
        ? filterData.find(OptionsSelector).options.find(AdditionsSelector)
          .additions
        : null,
    [filterData]
  );

  const sizeOptions = useMemo(
    () =>
      selectedOptions.sizes.map((size) =>
        sizes.find(({ name }) => name === size)
      ),
    [selectedOptions.sizes, sizes]
  );

  const materialsOptions = useMemo(
    () =>
      selectedOptions.bottomMaterials.map((item) =>
        materials.find(({ name }) => item === name[0].value)
      ),
    [selectedOptions.bottomMaterials, materials]
  );

  const options = useMemo(() => {
    const sizeObj = {
      items: sizeOptions,
      name: 'size'
    };
    const materialsObj = {
      items: materialsOptions,
      name: 'bottomMaterial'
    };
    let objToMap;
    let objToAggregate;

    if (sizeOptions.length > materialsOptions.length) {
      objToMap = sizeObj;
      objToAggregate = materialsObj;
    } else {
      objToMap = materialsObj;
      objToAggregate = sizeObj;
    }

    return objToMap.items.map((item, idx) => {
      const { name: mappedName } = objToMap;
      const { name: aggregatedName } = objToAggregate;
      const aggregatedItem = objToAggregate.items[idx]
        ? { [aggregatedName]: objToAggregate.items[idx]._id }
        : {};
      const additionsToSend = selectedOptions.additions ? { additions } : [];

      return {
        [mappedName]: !!item && item._id,
        ...aggregatedItem,
        ...additionsToSend
      };
    });
  }, [sizeOptions, materialsOptions, additions, selectedOptions.additions]);

  const getColorsToSend = (color) =>
    colors.find((item) => item[0].simpleName[0].value === color);

  const getPatternToSend = (pattern) =>
    patterns.find((item) => pattern === item[0].value);

  const getModelToSend = (model) =>
    modelsForSelectedCategory.find(({ name }) => name[0].value === model);

  const createProductInfo = (values) => ({
    name: [
      { lang: languages[0], value: values['uk-name'] },
      { lang: languages[1], value: values['en-name'] }
    ],
    mainMaterial: [
      { lang: languages[0], value: values['uk-mainMaterial'] },
      { lang: languages[1], value: values['en-mainMaterial'] }
    ],
    innerMaterial: [
      { lang: languages[0], value: values['uk-innerMaterial'] },
      { lang: languages[1], value: values['en-innerMaterial'] }
    ],
    closure: [
      { lang: languages[0], value: values['uk-closure'] },
      { lang: languages[1], value: values['en-closure'] }
    ],
    description: [
      { lang: languages[0], value: values['uk-description'] },
      { lang: languages[1], value: values['en-description'] }
    ],
    strapLengthInCm: values.strapLengthInCm
      ? values.strapLengthInCm
      : Number(values.strapLengthInCm)
  });

  const getSelectedCategory = useCallback(
    (category) => categories.find(({ _id }) => category === _id),
    [categories]
  );

  return {
    models,
    modelNames,
    colors,
    colorsNames,
    categories,
    categoriesNames,
    patterns,
    patternsNames,
    selectedOptions,
    setOptions,
    additions,
    options,
    primaryImage,
    setPrimaryImage,
    additionalImages,
    setAdditionalImages,
    createProductInfo,
    getColorsToSend,
    getModelToSend,
    getPatternToSend,
    getSelectedCategory
  };
};

export default useProductHandlers;

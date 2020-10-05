import { useState, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { config } from '../configs';

const {
  selectedLanguages,
  languages,
  product: { optionsValues }
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

  const [preferedLanguages, setPreferedLanguages] = useState(selectedLanguages);
  const [selectedOptions, setOptions] = useState(optionsValues);
  const [primaryImage, setPrimaryImage] = useState('');
  const [additionalImages, setAdditionalImages] = useState([]);

  const { bottomMaterials: materials, sizes } = productOptions;

  const checkedLanguages = useMemo(
    () => Object.values(preferedLanguages).filter(({ checked }) => checked),
    [preferedLanguages]
  );

  const categoriesNames = useMemo(
    () => [
      ...new Set(filterData.map(({ category }) => category.name[0].value))
    ],
    [filterData]
  );

  const categories = useMemo(
    () =>
      categoriesNames.map(
        (category) =>
          filterData.find(
            ({ category: { name } }) => category === name[0].value
          ).category
      ),
    [filterData, categoriesNames]
  );

  const colorsNames = useMemo(
    () => [
      ...new Set(filterData.map(({ colors }) => colors[0].simpleName[0].value))
    ],
    [filterData]
  );

  const colors = useMemo(
    () =>
      colorsNames.map(
        (color) =>
          filterData.find(
            ({ colors }) => colors[0].simpleName[0].value === color
          ).colors
      ),
    [filterData, colorsNames]
  );

  const patternsNames = useMemo(
    () => [...new Set(filterData.map(({ pattern }) => pattern[0].value))],
    [filterData]
  );

  const patterns = useMemo(
    () =>
      patternsNames.map(
        (item) =>
          filterData.find(({ pattern }) => pattern[0].value === item).pattern
      ),
    [filterData, patternsNames]
  );

  const modelNames = useMemo(
    () => [...new Set(filterData.map(({ model }) => model[0].value))],
    [filterData]
  );

  const models = useMemo(
    () =>
      modelNames.map(
        (item) => filterData.find(({ model }) => model[0].value === item).model
      ),
    [filterData, modelNames]
  );

  const additions = useMemo(
    () =>
      filterData.length
        ? filterData
          .find(({ options }) =>
            options.find(({ additions }) => additions.length)
          )
          .options.find(({ additions }) => additions.length).additions
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
    ]
  });

  const getSelectedCategory = useCallback(
    (category) => categories.find(({ _id }) => category === _id),
    [categories]
  );

  return {
    preferedLanguages,
    setPreferedLanguages,
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
    getSelectedCategory,
    checkedLanguages
  };
};

export default useProductHandlers;

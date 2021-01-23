import { useState, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { config } from '../../configs';
import useProductSpecies from './use-product-species';

const selectAdditionsLength = ({ additions }) => additions.length;

const selectOptionsLength = ({ options }) =>
  options.find(selectAdditionsLength);

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
    modelNames,
    models,
    patternsNames,
    patterns
  } = useProductSpecies();

  const additions = useMemo(
    () =>
      filterData.length
        ? filterData
          .find(selectOptionsLength)
          ?.options?.find(selectAdditionsLength)?.additions
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

  const getPatternToSend = (pattern) =>
    patterns.find((item) => pattern === item.name[0].value);

  const getModelToSend = (model) =>
    modelsForSelectedCategory.find(({ name }) => name[0].value === model);

  const createProductInfo = (values) => ({
    name: [
      { lang: languages[0], value: values['ua-name'] },
      { lang: languages[1], value: values['en-name'] }
    ],
    description: [
      { lang: languages[0], value: values['ua-description'] },
      { lang: languages[1], value: values['en-description'] }
    ]
  });

  const getSelectedCategory = useCallback(
    (category) => categories.find(({ _id }) => category === _id),
    [categories]
  );

  return {
    models,
    modelNames,
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
    getModelToSend,
    getPatternToSend,
    getSelectedCategory
  };
};

export default useProductHandlers;

import { useState, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { config } from '../../configs';
import useProductSpecies from './use-product-species';

const selectAdditionsLength = ({ additions }) => additions.length;

const { languages } = config;

const useProductHandlers = () => {
  const { filterData, modelsForSelectedCategory } = useSelector(
    ({ Products }) => ({
      filterData: Products.filterData,
      modelsForSelectedCategory:
        Products.productSpecies.modelsForSelectedCategory
    })
  );

  const [primaryImage, setPrimaryImage] = useState('');
  const [additionalImages, setAdditionalImages] = useState([]);

  const {
    categoriesNames,
    categories,
    modelNames,
    models,
    patternsNames,
    patterns
  } = useProductSpecies();
  const getPatternToSend = (pattern) =>
    patterns.find((item) => pattern === item.name[0].value);

  const getModelToSend = (model) =>
    modelsForSelectedCategory.find(({ name }) => name[0].value === model);

  const createProductInfo = (values) => ({
    name: [
      { lang: languages[0], value: values.uaName },
      { lang: languages[1], value: values.enName }
    ],
    description: [
      { lang: languages[0], value: values.uaDescription },
      { lang: languages[1], value: values.enDescription }
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

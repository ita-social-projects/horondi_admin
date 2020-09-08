import { useState, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { config } from '../configs';

const { productInfoInputs, selectedLanguages, productSpeciesSelects } = config;

const useProductHandler = () => {
  const { filterData } = useSelector(({ Products }) => ({
    filterData: Products.filterData
  }));

  const [productInputs, setProductInputs] = useState(productInfoInputs);
  const [productSelects, setProductSelects] = useState(productSpeciesSelects);
  const [preferedLanguages, setPreferedLanguages] = useState(selectedLanguages);

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

  const modelsForSelectedCategory = useMemo(
    () => [
      ...new Set(
        filterData
          .filter(({ category }) => category._id === productSelects.category)
          .map(({ model }) => model[0].value)
      )
    ],
    [filterData, productSelects.category]
  );

  const getModels = useCallback(
    (names) =>
      names.map(
        (item) => filterData.find(({ model }) => model[0].value === item).model
      ),
    [filterData]
  );

  const models = useMemo(() => getModels(modelNames), [modelNames, getModels]);

  return {
    productInputs,
    setProductInputs,
    preferedLanguages,
    setPreferedLanguages,
    productSelects,
    setProductSelects,
    models,
    modelNames,
    colors,
    colorsNames,
    categories,
    categoriesNames,
    patterns,
    patternsNames,
    modelsForSelectedCategory,
    getModels
  };
};

export default useProductHandler;

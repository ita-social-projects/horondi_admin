import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export default function useProductSpecies() {
  const filterData = useSelector(({ Products }) => Products.filterData);

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

  const patternsNames = useMemo(
    () => [...new Set(filterData.map(({ pattern }) => pattern.name[0].value))],
    [filterData]
  );

  const patterns = useMemo(
    () =>
      patternsNames.map(
        (item) =>
          filterData.find(({ pattern }) => pattern.name[0].value === item)
            .pattern
      ),
    [filterData, patternsNames]
  );

  const modelNames = useMemo(
    () => [...new Set(filterData.map(({ model }) => model.name[0].value))],
    [filterData]
  );

  const models = useMemo(
    () =>
      modelNames.map(
        (item) =>
          filterData.find(({ model }) => model.name[0].value === item).model
      ),
    [filterData, modelNames]
  );

  return {
    categories,
    categoriesNames,
    models,
    modelNames,
    patterns,
    patternsNames
  };
}

import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { config } from '../configs';

const {
  selectedLanguages,
  productOptionsValues,
  productImagesValues,
  languages
} = config;

const useProductHandler = () => {
  const { filterData, productOptions } = useSelector(({ Products }) => ({
    filterData: Products.filterData,
    productOptions: Products.productOptions
  }));

  const [preferedLanguages, setPreferedLanguages] = useState(selectedLanguages);
  const [productImages, setProductImages] = useState(productImagesValues);
  const [selectedOptions, setOptions] = useState(productOptionsValues);

  const { bottomMaterials: materials, sizes } = productOptions;

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
        ? filterData[1].options.find(({ additions }) => additions.length)
          .additions
        : null,
    [filterData]
  );

  const sizeOptions = useMemo(
    () =>
      selectedOptions.sizes
        ? selectedOptions.sizes.map(
          (size) => sizes.find(({ name }) => name === size)._id
        )
        : [],
    [selectedOptions.sizes, sizes]
  );

  const materialsOptions = useMemo(
    () =>
      selectedOptions.bottomMaterials
        ? selectedOptions.bottomMaterials.map(
          (item) => materials.find(({ name }) => item === name[0].value)._id
        )
        : [],
    [selectedOptions.bottomMaterials, materials]
  );

  const options = useMemo(() => {
    const sizeObj = {
      arr: sizeOptions,
      name: 'size'
    };
    const materialsObj = {
      arr: materialsOptions,
      name: 'bottomMaterial'
    };
    let objToMap; let objToAggregate;

    if (sizeOptions.length > materialsOptions.length) {
      objToMap = sizeObj;
      objToAggregate = materialsObj;
    } else {
      objToMap = materialsObj;
      objToAggregate = sizeObj;
    }

    return objToMap.arr.map((item, idx) => {
      const { name: mappedName } = objToMap;
      const { name: aggregatedName } = objToAggregate;
      const aggregatedItem = objToAggregate.arr[idx]
        ? { [aggregatedName]: objToAggregate.arr[idx] }
        : {};
      const additionsToSend = selectedOptions.additions ? { additions } : [];

      return {
        [mappedName]: item,
        ...aggregatedItem,
        ...additionsToSend
      };
    });
  }, [sizeOptions, materialsOptions, additions, selectedOptions.additions]);

  const createProductInfo = ({
    ukProductName,
    enProductName,
    ukMainMaterial,
    enMainMaterial,
    ukInnerMaterial,
    enInnerMaterial,
    ukClosure,
    enClosure,
    ukDescription,
    enDescription
  }) => ({
    name: [
      { lang: languages[0], value: ukProductName || null },
      { lang: languages[1], value: enProductName || null }
    ],
    mainMaterial: [
      { lang: languages[0], value: ukMainMaterial || null },
      { lang: languages[1], value: enMainMaterial || null }
    ],
    innerMaterial: [
      { lang: languages[0], value: ukInnerMaterial || null },
      { lang: languages[1], value: enInnerMaterial || null }
    ],
    closure: [
      { lang: languages[0], value: ukClosure || null },
      { lang: languages[1], value: enClosure || null }
    ],
    description: [
      { lang: languages[0], value: ukDescription || null },
      { lang: languages[1], value: enDescription || null }
    ]
  });

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
    productImages,
    setProductImages,
    createProductInfo
  };
};

export default useProductHandler;

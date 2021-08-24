export const onSubmitDispatchHandler = (
  id,
  dispatch,
  updateAction,
  addAction,
  payload
) => {
  if (id) {
    dispatch(
      updateAction({
        id,
        material: { ...payload }
      })
    );
    return;
  }
  dispatch(
    addAction({
      material: { ...payload }
    })
  );
};

export const descriptionAndNameHandler = (condition, styles) =>
  condition ? styles.errorTab : styles.tabs;

export const appBarRenderHandler = (languages, appBar) =>
  languages.length > 0 ? appBar : null;

const getMaterialFormInitValues = (material, purposeEnum) => ({
  uaName: material.name[0].value || '',
  enName: material.name[1].value || '',
  uaDescription: material.description[0].value || '',
  enDescription: material.description[1].value || '',
  purpose: material.purpose || purposeEnum.MAIN,
  available: material.available || false,
  // additionalPrice: +material.additionalPrice[0].value / 100 || 0,
  colors: (material.colors && material.colors.map((color) => color._id)) || [],
  additionalPrice: getAdditionalPriceValue(material),
  additionalPriceType: material.additionalPriceType || 'ABSOLUTE_INDICATOR'
});

const getAdditionalPriceValue = (material) => {
  const { type } = material?.additionalPrice[0] || {};
  if (type === 'ABSOLUTE_INDICATOR') {
    return material?.additionalPrice[1]?.value || '';
  }
  return material?.additionalPrice[0]?.value || '';
};

export default getMaterialFormInitValues;

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

export const descriptionAndNameHandler = (condition, styles) => {
  if (condition) {
    return styles.errorTab;
  }
  return styles.tabs;
};

export const appBarRenderHandler = (languages, appBar) => {
  if (languages.length > 0) {
    return appBar;
  }
  return null;
};

export const getMaterialFormInitValues = (material, purposeEnum) => ({
  uaName: material.name[0].value || '',
  enName: material.name[1].value || '',
  uaDescription: material.description[0].value || '',
  enDescription: material.description[1].value || '',
  purpose: material.purpose || purposeEnum.MAIN,
  available: material.available || false,

  additionalPrice: +material.additionalPrice[0].value / 100 || 0,
  colors: (material.colors && material.colors.map((color) => color._id)) || []
});

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

export const descriptionAndNameHandler = (condition, styles) =>
  condition ? styles.errorTab : styles.tabs;

export const appBarRenderHandler = (languages, appBar) =>
  languages.length > 0 ? appBar : null;

const getMaterialFormInitValues = (material, purposeEnum) => ({
  uaName: material.name[0].value || '',
  enName: material.name[1].value || '',
  uaDescription: material.description[0].value || '',
  enDescription: material.description[1].value || '',
  purpose: material.purpose || purposeEnum.basic.en,
  available: material.available || false,
  colors: (material.colors && material.colors.map((color) => color._id)) || [],
  additionalPriceType: material.relativePrice ? 'RELATIVE' : 'ABSOLUTE',
  additionalPrice: material.absolutePrice
    ? material.absolutePrice
    : material.relativePrice
});

export default getMaterialFormInitValues;

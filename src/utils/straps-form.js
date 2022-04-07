export const getStrapsInitialValues = (edit, IMG_URL, strap) => ({
  strapImage: IMG_URL + strap.image,
  uaName: strap.name[0].value || '',
  enName: strap.name[1].value || '',
  additionalPrice: strap.additionalPrice.value || '',
  available: strap.available,
  additionalPriceType: strap.additionalPrice.type || 'ABSOLUTE_INDICATOR',
  color: strap.features.color._id
});

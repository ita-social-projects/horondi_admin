export const getStrapsInitialValues = (edit, IMG_URL, strap) => ({
  strapImage: IMG_URL + strap.image,
  uaName: strap.name[0].value || '',
  enName: strap.name[1].value || '',
  additionalPrice: getAdditionalPriceValue(strap) || '',
  available: strap.available,
  additionalPriceType: strap.additionalPriceType || 'ABSOLUTE_INDICATOR',
  color: strap.features.color._id
});

const getAdditionalPriceValue = (strap) => {
  const { type } = strap?.additionalPrice?.[0] || {};
  if (type === 'ABSOLUTE_INDICATOR') {
    return strap?.additionalPrice?.[1]?.value || '';
  }
  return strap?.additionalPrice?.[0]?.value || '';
};

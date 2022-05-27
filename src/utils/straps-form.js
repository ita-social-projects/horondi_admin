export const getStrapsInitialValues = (IMG_URL, strap) => ({
  strapImage: IMG_URL + strap.image,
  uaName: strap.name[0].value || '',
  enName: strap.name[1].value || '',
  available: strap.available,
  additionalPrice: strap?.absolutePrice || '',
  additionalPriceType: 'ABSOLUTE',
  color: strap.features.color._id
});

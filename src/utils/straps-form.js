export const getStrapsInitialValues = (IMG_URL, strap) => ({
  strapImage: IMG_URL + strap.image,
  uaName: strap.name[0].value || '',
  enName: strap.name[1].value || '',
  available: strap.available,
  additionalPriceType: strap.absolutePrice ? 'ABSOLUTE' : 'RELATIVE',
  additionalPrice: strap.absolutePrice
    ? strap.absolutePrice
    : strap.relativePrice,
  color: strap.features.color._id
});

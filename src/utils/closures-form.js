export const getClosuresInitialValues = (edit, IMG_URL, closure) => ({
  closureImage: edit ? IMG_URL + closure.images.thumbnail : '',
  uaName: closure?.name[0].value || '',
  enName: closure?.name[1].value || '',
  additionalPriceType: closure.absolutePrice ? 'ABSOLUTE' : 'RELATIVE',
  additionalPrice: closure.absolutePrice
    ? closure.absolutePrice
    : closure.relativePrice,
  available: closure?.available || false
});

export const closureDefaultProps = {
  additionalPrice: 0
};

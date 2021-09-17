const getAdditionalPriceValue = (closure) => {
  const { type } = closure?.additionalPrice[0] || {};
  if (type === 'ABSOLUTE_INDICATOR') {
    return closure?.additionalPrice[1]?.value || '';
  }
  return closure?.additionalPrice[0]?.value || '';
};

export const getClosuresInitialValues = (edit, IMG_URL, closure) => ({
  closureImage: edit ? IMG_URL + closure.images.thumbnail : '',
  uaName: closure?.name[0].value || '',
  enName: closure?.name[1].value || '',
  additionalPrice: getAdditionalPriceValue(closure) || '',
  // additionalPriceType:
  //   closure?.additionalPrice[0]?.type || 'ABSOLUTE_INDICATOR',
  additionalPriceType: closure?.additionalPriceType || 'ABSOLUTE_INDICATOR',
  available: closure?.available || false
});

export const closureDefaultProps = {
  additionalPrice: 0
};

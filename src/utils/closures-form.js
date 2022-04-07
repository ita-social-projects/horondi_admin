export const getClosuresInitialValues = (edit, IMG_URL, closure) => ({
  closureImage: edit ? IMG_URL + closure.images.thumbnail : '',
  uaName: closure?.name[0].value || '',
  enName: closure?.name[1].value || '',
  additionalPrice: closure?.additionalPrice?.value || '',
  additionalPriceType: closure?.additionalPrice?.type || 'ABSOLUTE_INDICATOR',
  available: closure?.available || false
});

export const closureDefaultProps = {
  additionalPrice: 0
};

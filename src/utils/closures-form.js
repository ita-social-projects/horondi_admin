export const getClosuresInitialValues = (edit, IMG_URL, closure) => ({
  closureImage: edit ? IMG_URL + closure.images.thumbnail : '',
  uaName: closure.name[0].value || '',
  enName: closure.name[1].value || '',
  additionalPrice: edit ? closure.additionalPrice[1].value / 100 : null,
  available: closure?.available || false
});

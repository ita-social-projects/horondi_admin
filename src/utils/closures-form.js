export const getClosuresInitialValues = (edit, IMG_URL, closure) => ({
  closureImage: edit ? IMG_URL + closure.images.thumbnail : '',
  uaName: closure.name[0].value || '',
  enName: closure.name[1].value || '',
  additionalPrice: edit ? closure.additionalPrice[1].value / 100 : null,
  color: closure.features?.color._id || '6043a9cc3e06ad3edcdb7b0e',
  material: closure.features?.material._id || '6043c2d13e06ad3edcdb7b33',
  available: closure?.available || false,
  customizable: closure?.customizable || false
  // restriction: closure?.restriction || false,
});

export const getStrapsInitialValues = (edit, IMG_URL, strap, fn) => ({
  strapImage: edit ? IMG_URL + strap.images.thumbnail : '',
  uaName: strap.name[0].value || '',
  enName: strap.name[1].value || '',
  additionalPrice: edit ? strap.additionalPrice[1].value / 100 : null,
  restriction: strap.restriction || false,
  positions: edit ? fn(edit) : []
});

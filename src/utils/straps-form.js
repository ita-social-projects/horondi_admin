export const getStrapsInitialValues = (edit, IMG_URL, strap) => ({
  strapImage: edit ? IMG_URL + strap.image : '',
  uaName: strap.name[0].value || '',
  enName: strap.name[1].value || '',
  additionalPrice: edit ? strap.additionalPrice[1].value / 100 : null,
  available: strap.available,
  color: strap.features.color._id
});

export const getPositionInitialValues = (edit, position) => ({
  // pocketImage: edit ? IMG_URL + pocket.images.thumbnail : '',
  uaName: position.name[0].value || '',
  enName: position.name[1].value || '',
  // additionalPrice: pocket.additionalPrice[1].value / 100 || null,
  avaliable: position.avaliable || false
});

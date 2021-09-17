export const getPocketsInitialValues = (edit, IMG_URL, pocket, fn) => ({
  pocketImage: edit ? IMG_URL + pocket.images.thumbnail : '',
  uaName: pocket.name[0].value || '',
  enName: pocket.name[1].value || '',
  additionalPrice: edit ? pocket.additionalPrice[1].value / 100 : null,
  restriction: pocket.restriction || false,
  positions: edit ? fn(edit) : []
});

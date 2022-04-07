export const getPocketsInitialValues = (edit, IMG_URL, pocket, fn) => ({
  pocketImage: edit ? IMG_URL + pocket.images.thumbnail : '',
  uaName: pocket.name[0].value || '',
  enName: pocket.name[1].value || '',
  additionalPrice: pocket?.additionalPrice?.value || '',
  additionalPriceType: pocket?.additionalPrice?.type || 'ABSOLUTE_INDICATOR',
  restriction: pocket.restriction || false,
  positions: edit ? fn(edit) : []
});

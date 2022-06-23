export const constructorListItemImage = (IMG_URL, listItem) =>
  listItem.image ? `${IMG_URL}${listItem.image}` : '';
export const patternListItemImages = (IMG_URL, listItem) =>
  listItem.images ? `${IMG_URL}${listItem.images.thumbnail}` : '';
export const isListItemAvailable = (listItem, showEnable, showDisable) =>
  listItem.available ? showEnable : showDisable;

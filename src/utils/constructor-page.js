export const listItemImages = (IMG_URL, listItem) =>
  listItem.images ? `${IMG_URL}${listItem.images.thumbnail}` : '';
export const isListItemAvailable = (listItem, showEnable, showDisable) =>
  listItem.available ? showEnable : showDisable;

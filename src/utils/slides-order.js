export const TranslAvailabilityHandler = (group, slidesTranslations) => {
  if (group.title === 'available') {
    return slidesTranslations.available;
  }
  return slidesTranslations.nonAvailable;
};

export const isDraggableHandler = (
  draggable,
  CANCEL_SLIDE_ORDER,
  OPEN_SLIDE_EDIT
) => {
  if (draggable) {
    return CANCEL_SLIDE_ORDER;
  }
  return OPEN_SLIDE_EDIT;
};

export const onDragEnterHandler = (
  dragging,
  group,
  fn,
  groupIndex,
  itemIndex
) => {
  if (dragging && !group.items.length) {
    return (e) => fn(e, { groupIndex, itemIndex });
  }
  return null;
};

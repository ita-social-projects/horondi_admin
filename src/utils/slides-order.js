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

export const paperClassNameHandler = (dragging, getStylesFn, props, styles) =>
  dragging ? getStylesFn(props) : styles.dndItem;

export const handleDragEnter = (e, targetItem, node, setListFn, dragItem) => {
  if (node.current !== e.target) {
    setListFn((oldList) => {
      const newList = JSON.parse(JSON.stringify(oldList));
      newList[targetItem.groupIndex].items.splice(
        targetItem.itemIndex,
        0,
        newList[dragItem.current.groupIndex].items.splice(
          dragItem.current.itemIndex,
          1
        )[0]
      );
      dragItem.current = targetItem;
      return newList;
    });
  }
};

export const getStyles = ({ item, dragItem, styles }) => {
  if (
    dragItem.current.groupIndex === item.groupIndex &&
    dragItem.current.itemIndex === item.itemIndex
  ) {
    return `${styles.dndItem} ${styles.current}`;
  }
  return styles.dndItem;
};

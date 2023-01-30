import { config } from '../configs';
import constructorItemPrice from './constructorItemPrice';

export const getTableRowProps = (item, deleteHandler, editHandler) => {
  const { optionType } = item;
  const { imagePrefix } = config;
  let props = {
    key: item._id,
    name: item.name[0].value
  };

  switch (optionType) {
    case 'BOTTOM':
    case 'BASIC':
    case 'BACK':
    case 'STRAP':
      props.material = item.features.material.name[0].value;
      props.color = item.features.color.name[0].value;
      break;

    default:
      break;
  }

  if (optionType !== 'POSITION') {
    props.image = item.images.thumbnail
      ? `${imagePrefix}${item.images.thumbnail}`
      : '';

    props.additionalPrice = constructorItemPrice(item);
  }

  if (optionType === 'POSITION') {
    props.showAvatar = false;
  }

  props = {
    ...props,
    available: item.available ? 'Так' : 'Ні',
    deleteHandler,
    editHandler
  };

  return props;
};

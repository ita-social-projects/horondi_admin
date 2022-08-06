import { config } from '../configs';

const { languages } = config;

export const getNewPartItem = (values) => {
  const partItem = {
    name: [
      {
        lang: languages[0],
        value: values.uaName
      },
      {
        lang: languages[1],
        value: values.enName
      }
    ],
    available: values.available,
    optionType: values.optionType
  };

  switch (values.optionType) {
    case 'POCKET':
      const positions = values.positions.map((position) => position._id);
      partItem.positions = positions;
      break;

    case 'BOTTOM':
    case 'BASIC':
    case 'BACK':
    case 'STRAP':
      partItem.features = {
        material: values.material,
        color: values.color
      };
      break;

    default:
      break;
  }

  if (values.optionType !== 'POSITION') {
    partItem.absolutePrice =
      values.additionalPriceType === 'ABSOLUTE'
        ? +values.additionalPrice
        : null;
    partItem.relativePrice =
      values.additionalPriceType === 'RELATIVE'
        ? +values.additionalPrice
        : null;
  }

  return partItem;
};

export const getPartItemInitialValues = (edit, IMG_URL, partItem) => {
  const initialValues = {
    uaName: partItem.name[0].value,
    enName: partItem.name[1].value,
    available: partItem.available,
    optionType: partItem.optionType
  };

  switch (partItem.optionType) {
    case 'POCKET':
      initialValues.positions = partItem.positions;
      break;

    case 'BOTTOM':
    case 'BASIC':
    case 'BACK':
    case 'STRAP':
      initialValues.color = partItem.features.color._id;
      initialValues.material = partItem.features.material._id;
      break;

    default:
      break;
  }

  if (partItem.optionType !== 'POSITION') {
    initialValues.image = edit ? IMG_URL + partItem.images.thumbnail : '';
    initialValues.additionalPriceType = partItem.absolutePrice
      ? 'ABSOLUTE'
      : 'RELATIVE';
    initialValues.additionalPrice = partItem.absolutePrice
      ? partItem.absolutePrice
      : partItem.relativePrice;
  }

  return initialValues;
};

export const getCheckboxOptions = (values, label, handler) => [
  {
    id: 'available',
    dataCy: 'available',
    value: values.available,
    checked: values.available,
    color: 'primary',
    label,
    handler: () => handler('available', !values.available)
  }
];

export const getDefaultPartItem = (partKey) => {
  const optionType = partKey.toUpperCase();

  const constructorObject = {
    _id: '',
    name: [
      {
        value: ''
      },
      {
        value: ''
      }
    ],
    optionType,
    available: true
  };

  switch (partKey) {
    case 'pocket':
      constructorObject.positions = [];
      break;

    case 'bottom':
    case 'basic':
    case 'back':
    case 'strap':
      constructorObject.features = {
        material: {
          _id: '',
          name: [
            {
              value: ''
            },
            {
              value: ''
            }
          ]
        },
        color: {
          _id: '',
          name: [
            {
              value: ''
            },
            {
              value: ''
            }
          ]
        }
      };
      break;

    default:
      break;
  }

  if (partKey !== 'position') {
    constructorObject.images = {
      thumbnail: ''
    };
    constructorObject.absolutePrice = ' ';
    constructorObject.relativePrice = null;
  }

  return constructorObject;
};

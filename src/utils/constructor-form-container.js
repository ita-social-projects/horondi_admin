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
    absolutePrice:
      values.additionalPriceType === 'ABSOLUTE'
        ? +values.additionalPrice
        : null,
    relativePrice:
      values.additionalPriceType === 'RELATIVE'
        ? +values.additionalPrice
        : null,
    optionType: values.optionType
  };

  switch (values.optionType) {
    case 'CLOSURES':
    case 'POCKETS':
      partItem.features = {
        color: values.color
      };
      break;

    case 'bottom':
    case 'basic':
    case 'back':
    case 'strap':
      partItem.features = {
        material: values.material,
        color: values.color
      };
      break;

    default:
      break;
  }

  return partItem;
};

export const getPartItemInitialValues = (edit, IMG_URL, partItem) => {
  const initialValues = {
    image: edit ? IMG_URL + partItem.images.thumbnail : '',
    uaName: partItem.name[0].value,
    enName: partItem.name[1].value,
    additionalPriceType: partItem.absolutePrice ? 'ABSOLUTE' : 'RELATIVE',
    additionalPrice: partItem.absolutePrice
      ? partItem.absolutePrice
      : partItem.relativePrice,
    available: partItem.available,
    optionType: partItem.optionType
  };

  switch (partItem.optionType) {
    case 'CLOSURES':
    case 'POCKETS':
      initialValues.color = partItem.features.color;
      break;

    case 'bottom':
    case 'basic':
    case 'back':
    case 'strap':
      initialValues.color = partItem.features.color._id;
      initialValues.material = partItem.features.material._id;
      break;

    default:
      break;
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
  const optionType = partKey;

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
    images: {
      thumbnail: ''
    },
    absolutePrice: ' ',
    relativePrice: null,
    available: false
  };

  switch (partKey) {
    case 'straps':
    case 'closures':
    case 'pockets':
      constructorObject.features = {
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

  return constructorObject;
};

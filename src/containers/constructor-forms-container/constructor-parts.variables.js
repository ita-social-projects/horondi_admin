import PropTypes from 'prop-types';

export const getDefaultPart = (optionType) => {
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

  switch (optionType) {
    case 'STRAPS':
    case 'CLOSURES':
    case 'POCKETS':
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

    case 'BOTTOM':
    case 'BASICS':
    case 'BACKS':
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

const valueShape = PropTypes.shape({
  value: PropTypes.string
});

export const constructorObjectPropsTypes = {
  element: PropTypes.shape({
    _id: PropTypes.string,
    available: PropTypes.bool,
    customizable: PropTypes.bool,
    features: PropTypes.shape({
      material: PropTypes.string,
      color: PropTypes.string
    }),
    images: PropTypes.shape({
      thumbnail: PropTypes.string
    }),
    name: PropTypes.arrayOf(valueShape)
  })
};

export const defaultPropTypes = {
  id: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
  edit: PropTypes.bool
};

export const valuesPropTypes = {
  values: PropTypes.shape({
    material: PropTypes.string,
    color: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string
  }),
  errors: PropTypes.shape({
    material: PropTypes,
    color: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string
  }),
  touched: PropTypes.shape({
    material: PropTypes.string,
    color: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string
  })
};

export const imagePropTypes = PropTypes.string;

export const defaultProps = {
  id: '',
  match: {},
  values: {},
  errors: {},
  touched: {},
  edit: false
};

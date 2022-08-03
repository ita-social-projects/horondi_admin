import PropTypes from 'prop-types';

export const imagePreviewId = 'imagePreviewContainerId';

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
      id: PropTypes.string
    })
  }),
  edit: PropTypes.bool,
  partKey: PropTypes.string
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
  edit: false,
  partKey: ''
};

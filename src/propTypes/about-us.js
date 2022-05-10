import PropTypes from 'prop-types';

export const sectionShape = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  img: PropTypes.shape({
    name: PropTypes.string,
    src: PropTypes.string
  })
});
export const languageStringShape = PropTypes.shape({
  lang: PropTypes.string,
  value: PropTypes.string
});
export const languageArrShape = PropTypes.shape({
  lang: PropTypes.string,
  value: PropTypes.arrayOf(sectionShape)
});
export const businessPageShape = PropTypes.shape({
  _id: PropTypes.string,
  code: PropTypes.string,
  title: PropTypes.arrayOf(languageStringShape),
  text: PropTypes.arrayOf(languageStringShape),
  sections: PropTypes.arrayOf(languageArrShape),
  languages: PropTypes.arrayOf(PropTypes.string)
});

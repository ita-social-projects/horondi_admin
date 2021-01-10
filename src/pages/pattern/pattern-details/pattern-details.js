import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { useStyles } from './pattern-details.styles';
import LoadingBar from '../../../components/loading-bar';
import PatternForm from '../../../components/pattern-form';
import { getPattern } from '../../../redux/pattern/pattern.actions';
import { selectPattern } from '../../../redux/selectors/pattern.selectors';

const PatternDetails = ({ match }) => {
  const { id } = match.params;

  const dispatch = useDispatch();
  const { loading, pattern } = useSelector(selectPattern);
  const styles = useStyles();

  useEffect(() => {
    dispatch(getPattern(id));
  }, [dispatch, id]);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={styles.detailsContainer}>
      {pattern !== null ? (
        <PatternForm id={id} pattern={pattern} isEdit />
      ) : null}
    </div>
  );
};

const valueShape = PropTypes.shape({
  value: PropTypes.string
});
PatternDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired,
  pattern: PropTypes.shape({
    _id: PropTypes.string,
    available: PropTypes.bool,
    description: PropTypes.arrayOf(valueShape),
    handmade: PropTypes.bool,
    images: PropTypes.shape({
      thumbnail: PropTypes.string
    }),
    material: PropTypes.string,
    name: PropTypes.arrayOf(valueShape)
  })
};

PatternDetails.defaultProps = {
  pattern: {}
};

export default withRouter(PatternDetails);

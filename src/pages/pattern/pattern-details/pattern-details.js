import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { useStyles } from './pattern-details.styles';
import LoadingBar from '../../../components/loading-bar';
import PatternForm from '../../../components/pattern-form';
import { getPattern } from '../../../redux/pattern/pattern.actions';

const PatternDetails = ({ match }) => {
  const { id } = match.params;

  const dispatch = useDispatch();
  const { loading, pattern } = useSelector(({ Pattern }) => ({
    loading: Pattern.patternLoading,
    pattern: Pattern.pattern
  }));
  const styles = useStyles();

  useEffect(() => {
    dispatch(getPattern(id));
  }, [dispatch, id]);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={styles.detailsContainer}>
      {pattern !== null ? <PatternForm id={id} pattern={pattern} /> : null}
    </div>
  );
};

PatternDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
  pattern: PropTypes.shape({
    name: PropTypes.arrayOf().isRequired
  })
};

PatternDetails.defaultProps = {
  match: {},
  pattern: {}
};

export default withRouter(PatternDetails);

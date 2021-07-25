import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { useStyles } from './closures-edit.styles';
import LoadingBar from '../../../components/loading-bar';
// import ClosuresForm from '../../../components/forms/closures-form/closures-form';
import { getClosure } from '../../../redux/closures/closures.actions';
import { closuresSelector } from '../../../redux/selectors/closures.selectors';

const ClosuresEdit = ({ match }) => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const { loading, closure } = useSelector(closuresSelector);

  const { id } = match.params;

  useEffect(() => {
    dispatch(getClosure(id));
  }, [dispatch, id]);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={styles.container}>
      {/* {closure !== null ? <ClosuresForm id={id} edit closure={closure} /> : null} */}
    </div>
  );
};

ClosuresEdit.propTypes = {
  id: PropTypes.string,
  match: PropTypes.objectOf(PropTypes.object)
};

ClosuresEdit.defaultProps = {
  id: '',
  match: {}
};

export default ClosuresEdit;

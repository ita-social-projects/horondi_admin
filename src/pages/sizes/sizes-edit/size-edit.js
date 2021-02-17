import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { useStyles } from './size-edit.styles';
import LoadingBar from '../../../components/loading-bar';
import SizeForm from '../../../components/forms/size-form/size-form';
import { getSize } from '../../../redux/sizes/sizes.actions';
import { sizeSelector } from '../../../redux/selectors/sizes.selector';

const SizeEdit = ({ id }) => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const { loading, size } = useSelector(sizeSelector);

  useEffect(() => {
    dispatch(getSize(id));
  }, [dispatch, id]);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={styles.container}>
      {size !== null ? <SizeForm id={id} size={size} /> : null}
    </div>
  );
};

SizeEdit.propTypes = {
  id: PropTypes.string
};

SizeEdit.defaultProps = {
  id: ''
};

export default SizeEdit;

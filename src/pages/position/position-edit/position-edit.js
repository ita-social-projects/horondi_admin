import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import PositionForm from '../../../components/forms/position-form/position-form';
import { useCommonStyles } from '../../common.styles';
import { positionsSelector } from '../../../redux/selectors/position.selectors';
import LoadingBar from '../../../components/loading-bar';
import { getPosition } from '../../../redux/position/position.actions';

const PositionEdit = ({ match }) => {
  const dispatch = useDispatch();
  const commonStyles = useCommonStyles();
  const { loading, position } = useSelector(positionsSelector);

  const { id } = match.params;

  useEffect(() => {
    dispatch(getPosition(id));
  }, [dispatch, id]);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={commonStyles.container}>
      {position !== null ? (
        <PositionForm id={id} edit position={position} />
      ) : null}
    </div>
  );
};

PositionEdit.propTypes = {
  id: PropTypes.string,
  match: PropTypes.objectOf(PropTypes.object)
};

PositionEdit.defaultProps = {
  id: '',
  match: {}
};

export default PositionEdit;

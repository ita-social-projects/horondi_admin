import React from 'react';
import { useSelector } from 'react-redux';

import PositionForm from '../../../components/forms/position-form/position-form';
import { useCommonStyles } from '../../common.styles';
import { positionsSelector } from '../../../redux/selectors/position.selectors';
import LoadingBar from '../../../components/loading-bar';

const PositionAdd = () => {
  const commonStyles = useCommonStyles();
  const { loading } = useSelector(positionsSelector);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={commonStyles.container}>
      <PositionForm />
    </div>
  );
};

export default PositionAdd;

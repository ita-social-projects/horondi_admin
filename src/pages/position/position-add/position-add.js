import React from 'react';
// import { useSelector } from 'react-redux';

import PositionForm from '../../../components/forms/position-form/position-form';
// import { useStyles } from './position-add.styles';
import { useCommonStyles } from '../../common.styles';
// import { pocketsSelector } from '../../../redux/selectors/pockets.selectors';
// import LoadingBar from '../../../components/loading-bar';

const PositionAdd = () => {
  //   const styles = useStyles();
  const commonStyles = useCommonStyles();
  //   const { loading } = useSelector(pocketsSelector);

  //   if (loading) {
  //     return <LoadingBar />;
  //   }

  return (
    <div className={commonStyles.container}>
      <PositionForm />
    </div>
  );
};

export default PositionAdd;

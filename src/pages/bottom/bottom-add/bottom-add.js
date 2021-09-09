import React from 'react';
import { useSelector } from 'react-redux';
import BottomForm from '../../../components/forms/bottom-form';
import LoadingBar from '../../../components/loading-bar';
import { bottomSelector } from '../../../redux/selectors/bottom.selectors';
import { useCommonStyles } from '../../common.styles';

const BottomAdd = () => {
  const common = useCommonStyles();
  const { loading } = useSelector(bottomSelector);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={common.detailsContainer}>
      <BottomForm />
    </div>
  );
};

export default BottomAdd;

import React from 'react';
import { useSelector } from 'react-redux';
import ConstructorFormsContainer from '../../../containers/constructor-forms-container/constructor-forms-container';
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
      <ConstructorFormsContainer />
    </div>
  );
};

export default BottomAdd;

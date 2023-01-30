import React from 'react';
import { useSelector } from 'react-redux';
import ConstructorFormContainer from '../../../containers/constructor-form-container/constructor-form-container';
import LoadingBar from '../../../components/loading-bar';
import { bottomSelector } from '../../../redux/selectors/bottom.selectors';
import { useCommonStyles } from '../../common.styles';
import { config } from '../../../configs';
import { addBottom } from '../../../redux/bottom/bottom.actions';

const BottomAdd = () => {
  const common = useCommonStyles();
  const { loading } = useSelector(bottomSelector);
  const { pathToBottoms } = config.routes;
  const { constructorItemsKeys } = config;
  const partItemKey = constructorItemsKeys.bottom;

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={common.detailsContainer}>
      <ConstructorFormContainer
        partItemKey={partItemKey}
        pathBack={pathToBottoms}
        dispatchAction={addBottom}
      />
    </div>
  );
};

export default BottomAdd;

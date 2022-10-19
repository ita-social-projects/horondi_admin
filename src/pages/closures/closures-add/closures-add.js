import React from 'react';
import { useSelector } from 'react-redux';
import ConstructorFormContainer from '../../../containers/constructor-form-container/constructor-form-container';
import LoadingBar from '../../../components/loading-bar';
import { closuresSelector } from '../../../redux/selectors/closures.selectors';
import { useCommonStyles } from '../../common.styles';
import { config } from '../../../configs';
import { addClosures } from '../../../redux/closures/closures.actions';

const ClosuresAdd = () => {
  const common = useCommonStyles();
  const { loading } = useSelector(closuresSelector);
  const { pathToClosures } = config.routes;
  const { constructorItemsKeys } = config;
  const partItemKey = constructorItemsKeys.closure;

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={common.detailsContainer}>
      <ConstructorFormContainer
        partItemKey={partItemKey}
        pathBack={pathToClosures}
        dispatchAction={addClosures}
      />
    </div>
  );
};

export default ClosuresAdd;

import React from 'react';
import { useSelector } from 'react-redux';
import ConstructorFormContainer from '../../../containers/constructor-form-container/constructor-form-container';
import LoadingBar from '../../../components/loading-bar';
import { backSelector } from '../../../redux/selectors/back.selectors';
import { useCommonStyles } from '../../common.styles';
import { config } from '../../../configs';
import { addBack } from '../../../redux/back/back.actions';

const BackAdd = () => {
  const common = useCommonStyles();
  const { loading } = useSelector(backSelector);
  const { pathToBacks } = config.routes;
  const { constructorItemsKeys } = config;
  const partItemKey = constructorItemsKeys.back;

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={common.detailsContainer}>
      <ConstructorFormContainer
        partItemKey={partItemKey}
        pathBack={pathToBacks}
        dispatchAction={addBack}
      />
    </div>
  );
};

export default BackAdd;

import React from 'react';
import { useSelector } from 'react-redux';
import ConstructorFormContainer from '../../../containers/constructor-form-container/constructor-form-container';
import LoadingBar from '../../../components/loading-bar';
import { pocketsSelector } from '../../../redux/selectors/pockets.selectors';
import { useCommonStyles } from '../../common.styles';
import { config } from '../../../configs';
import { addPockets } from '../../../redux/pockets/pockets.actions';

const PocketsAdd = () => {
  const common = useCommonStyles();
  const { loading } = useSelector(pocketsSelector);
  const { pathToPockets } = config.routes;
  const { constructorItemsKeys } = config;
  const partItemKey = constructorItemsKeys.pocket;

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={common.detailsContainer}>
      <ConstructorFormContainer
        partItemKey={partItemKey}
        pathBack={pathToPockets}
        dispatchAction={addPockets}
      />
    </div>
  );
};

export default PocketsAdd;

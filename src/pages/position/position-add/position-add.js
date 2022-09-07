import React from 'react';
import { useSelector } from 'react-redux';
import ConstructorFormContainer from '../../../containers/constructor-form-container/constructor-form-container';
import LoadingBar from '../../../components/loading-bar';
import { positionsSelector } from '../../../redux/selectors/position.selectors';
import { useCommonStyles } from '../../common.styles';
import { config } from '../../../configs';
import { addPosition } from '../../../redux/position/position.actions';

const PositionAdd = () => {
  const common = useCommonStyles();
  const { loading } = useSelector(positionsSelector);
  const { pathToPosition } = config.routes;
  const { constructorItemsKeys } = config;
  const partItemKey = constructorItemsKeys.position;

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={common.detailsContainer}>
      <ConstructorFormContainer
        partItemKey={partItemKey}
        pathBack={pathToPosition}
        dispatchAction={addPosition}
        withoutImg
        withoutPrice
      />
    </div>
  );
};

export default PositionAdd;

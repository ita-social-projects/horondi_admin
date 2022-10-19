import React from 'react';
import { useSelector } from 'react-redux';
import ConstructorFormContainer from '../../../containers/constructor-form-container/constructor-form-container';
import LoadingBar from '../../../components/loading-bar';
import { basicsSelector } from '../../../redux/selectors/basics.selectors';
import { useCommonStyles } from '../../common.styles';
import { config } from '../../../configs';
import { addBasic } from '../../../redux/basics/basics.actions';

const BasicAdd = () => {
  const common = useCommonStyles();
  const { loading } = useSelector(basicsSelector);
  const { pathToBasics } = config.routes;
  const { constructorItemsKeys } = config;
  const partItemKey = constructorItemsKeys.basic;

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={common.detailsContainer}>
      <ConstructorFormContainer
        partItemKey={partItemKey}
        pathBack={pathToBasics}
        dispatchAction={addBasic}
      />
    </div>
  );
};

export default BasicAdd;

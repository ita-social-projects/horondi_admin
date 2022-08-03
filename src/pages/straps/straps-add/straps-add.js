import React from 'react';
import { useSelector } from 'react-redux';
import ConstructorFormContainer from '../../../containers/constructor-form-container/constructor-form-container';
import LoadingBar from '../../../components/loading-bar';
import { strapsSelector } from '../../../redux/selectors/straps.selectors';
import { useCommonStyles } from '../../common.styles';
import { config } from '../../../configs';
import { addStraps } from '../../../redux/straps/straps.actions';

const StrapAdd = () => {
  const common = useCommonStyles();
  const { loading } = useSelector(strapsSelector);
  const { pathToStraps } = config.routes;
  const { constructorItemsKeys } = config;
  const partItemKey = constructorItemsKeys.strap;

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={common.detailsContainer}>
      <ConstructorFormContainer
        partItemKey={partItemKey}
        pathBack={pathToStraps}
        dispatchAction={addStraps}
      />
    </div>
  );
};

export default StrapAdd;

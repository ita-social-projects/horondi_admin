import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import ConstructorFormContainer from '../../../containers/constructor-form-container/constructor-form-container';
import { getBasic, updateBasic } from '../../../redux/basics/basics.actions';
import { useCommonStyles } from '../../common.styles';
import { basicsSelector } from '../../../redux/selectors/basics.selectors';
import LoadingBar from '../../../components/loading-bar';
import { config } from '../../../configs';

const BasicEdit = ({ match }) => {
  const { id } = match.params;

  const common = useCommonStyles();
  const dispatch = useDispatch();
  const { basic, loading } = useSelector(basicsSelector);

  const { pathToBasics } = config.routes;
  const { constructorItemsKeys } = config;
  const partItemKey = constructorItemsKeys.basic;

  useEffect(() => {
    dispatch(getBasic(id));
  }, [dispatch, id]);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={common.detailsContainer}>
      {basic ? (
        <ConstructorFormContainer
          id={id}
          edit
          part={basic}
          partItemKey={partItemKey}
          pathBack={pathToBasics}
          dispatchAction={updateBasic}
        />
      ) : null}
    </div>
  );
};

BasicEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired
};

export default withRouter(BasicEdit);

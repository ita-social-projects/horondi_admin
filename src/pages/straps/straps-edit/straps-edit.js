import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import ConstructorFormContainer from '../../../containers/constructor-form-container/constructor-form-container';
import { getStrap, updateStrap } from '../../../redux/straps/straps.actions';
import { useCommonStyles } from '../../common.styles';
import { strapsSelector } from '../../../redux/selectors/straps.selectors';
import LoadingBar from '../../../components/loading-bar';
import { config } from '../../../configs';

const StrapEdit = ({ match }) => {
  const { id } = match.params;

  const common = useCommonStyles();
  const dispatch = useDispatch();
  const { strap, loading } = useSelector(strapsSelector);

  const { pathToStraps } = config.routes;
  const { constructorItemsKeys } = config;
  const partItemKey = constructorItemsKeys.strap;

  useEffect(() => {
    dispatch(getStrap(id));
  }, [dispatch, id]);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={common.detailsContainer}>
      {strap ? (
        <ConstructorFormContainer
          id={id}
          edit
          part={strap}
          partItemKey={partItemKey}
          pathBack={pathToStraps}
          dispatchAction={updateStrap}
        />
      ) : null}
    </div>
  );
};

StrapEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired
};

export default withRouter(StrapEdit);

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import ConstructorFormContainer from '../../../containers/constructor-form-container/constructor-form-container';
import {
  getPocket,
  updatePocket
} from '../../../redux/pockets/pockets.actions';
import { useCommonStyles } from '../../common.styles';
import { pocketsSelector } from '../../../redux/selectors/pockets.selectors';
import LoadingBar from '../../../components/loading-bar';
import { config } from '../../../configs';

const PocketsEdit = ({ match }) => {
  const { id } = match.params;

  const common = useCommonStyles();
  const dispatch = useDispatch();
  const { pocket, loading } = useSelector(pocketsSelector);

  const { pathToPockets } = config.routes;
  const { constructorItemsKeys } = config;
  const partItemKey = constructorItemsKeys.pocket;

  useEffect(() => {
    dispatch(getPocket(id));
  }, [dispatch, id]);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={common.detailsContainer}>
      {pocket ? (
        <ConstructorFormContainer
          id={id}
          edit
          part={pocket}
          partItemKey={partItemKey}
          pathBack={pathToPockets}
          dispatchAction={updatePocket}
        />
      ) : null}
    </div>
  );
};

PocketsEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired
};

export default withRouter(PocketsEdit);

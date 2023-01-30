import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import ConstructorFormContainer from '../../../containers/constructor-form-container/constructor-form-container';
import {
  getPosition,
  updatePosition
} from '../../../redux/position/position.actions';
import { useCommonStyles } from '../../common.styles';
import { positionsSelector } from '../../../redux/selectors/position.selectors';
import LoadingBar from '../../../components/loading-bar';
import { config } from '../../../configs';

const PositionEdit = ({ match }) => {
  const { id } = match.params;

  const common = useCommonStyles();
  const dispatch = useDispatch();
  const { position, loading } = useSelector(positionsSelector);

  const { pathToPosition } = config.routes;
  const { constructorItemsKeys } = config;
  const partItemKey = constructorItemsKeys.position;

  useEffect(() => {
    dispatch(getPosition(id));
  }, [dispatch, id]);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={common.detailsContainer}>
      {position ? (
        <ConstructorFormContainer
          id={id}
          edit
          part={position}
          partItemKey={partItemKey}
          pathBack={pathToPosition}
          dispatchAction={updatePosition}
          withoutImg
          withoutPrice
        />
      ) : null}
    </div>
  );
};

PositionEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired
};

export default withRouter(PositionEdit);

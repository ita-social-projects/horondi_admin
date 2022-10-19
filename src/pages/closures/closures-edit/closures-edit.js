import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import ConstructorFormContainer from '../../../containers/constructor-form-container/constructor-form-container';
import {
  getClosure,
  updateClosure
} from '../../../redux/closures/closures.actions';
import { useCommonStyles } from '../../common.styles';
import { closuresSelector } from '../../../redux/selectors/closures.selectors';
import LoadingBar from '../../../components/loading-bar';
import { config } from '../../../configs';

const ClosuresEdit = ({ match }) => {
  const { id } = match.params;

  const common = useCommonStyles();
  const dispatch = useDispatch();
  const { closure, loading } = useSelector(closuresSelector);
  const { pathToClosures } = config.routes;
  const { constructorItemsKeys } = config;
  const partItemKey = constructorItemsKeys.closure;

  useEffect(() => {
    dispatch(getClosure(id));
  }, [dispatch, id]);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={common.detailsContainer}>
      {closure ? (
        <ConstructorFormContainer
          id={id}
          edit
          part={closure}
          partItemKey={partItemKey}
          pathBack={pathToClosures}
          dispatchAction={updateClosure}
        />
      ) : null}
    </div>
  );
};

ClosuresEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired
};

export default withRouter(ClosuresEdit);

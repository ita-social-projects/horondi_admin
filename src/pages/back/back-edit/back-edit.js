import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import ConstructorFormContainer from '../../../containers/constructor-form-container/constructor-form-container';
import { getBack, updateBack } from '../../../redux/back/back.actions';
import { useCommonStyles } from '../../common.styles';
import { backSelector } from '../../../redux/selectors/back.selectors';
import LoadingBar from '../../../components/loading-bar';
import { config } from '../../../configs';

const BackEdit = ({ match }) => {
  const { id } = match.params;

  const common = useCommonStyles();
  const dispatch = useDispatch();
  const { back, loading } = useSelector(backSelector);

  const { pathToBacks } = config.routes;
  const { constructorItemsKeys } = config;
  const partItemKey = constructorItemsKeys.back;

  useEffect(() => {
    dispatch(getBack(id));
  }, [dispatch, id]);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={common.detailsContainer}>
      {back ? (
        <ConstructorFormContainer
          id={id}
          edit
          part={back}
          partItemKey={partItemKey}
          pathBack={pathToBacks}
          dispatchAction={updateBack}
        />
      ) : null}
    </div>
  );
};

BackEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired
};

export default withRouter(BackEdit);

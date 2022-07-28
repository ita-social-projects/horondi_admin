import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import ConstructorFormContainer from '../../../containers/constructor-form-container/constructor-form-container';
import { getBottom , updateBottom } from '../../../redux/bottom/bottom.actions';
import { useCommonStyles } from '../../common.styles';
import { bottomSelector } from '../../../redux/selectors/bottom.selectors';
import LoadingBar from '../../../components/loading-bar';
import { config } from '../../../configs';

const BottomEdit = ({ match }) => {
  const { id } = match.params;

  const common = useCommonStyles();
  const dispatch = useDispatch();
  const { bottom, loading } = useSelector(bottomSelector);

  const { pathToBottoms } = config.routes;
  const partKey = 'bottom';

  useEffect(() => {
    dispatch(getBottom(id));
  }, [dispatch, id]);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={common.detailsContainer}>
      {bottom !== null ? (
        <ConstructorFormContainer
          id={id}
          edit
          part={bottom}
          partItemKey={partKey}
          pathBack={pathToBottoms}
          dispatchAction={updateBottom}
        />
      ) : null}
    </div>
  );
};

BottomEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired
};

export default withRouter(BottomEdit);

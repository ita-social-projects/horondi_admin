import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import ConstructorFormsContainer from '../../../containers/constructor-forms-container/constructor-forms-container';
import { getBottom } from '../../../redux/bottom/bottom.actions';
import { useCommonStyles } from '../../common.styles';
import { bottomSelector } from '../../../redux/selectors/bottom.selectors';
import LoadingBar from '../../../components/loading-bar';

const BottomEdit = ({ match }) => {
  const { id } = match.params;

  const common = useCommonStyles();

  const dispatch = useDispatch();
  const { bottom, loading } = useSelector(bottomSelector);

  useEffect(() => {
    dispatch(getBottom(id));
  }, [dispatch, id]);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={common.detailsContainer}>
      {bottom !== null ? (
        <ConstructorFormsContainer id={id} edit part={bottom} />
      ) : null}
    </div>
  );
};

const valueShape = PropTypes.shape({
  value: PropTypes.string
});
BottomEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired,
  bottom: PropTypes.shape({
    _id: PropTypes.string,
    available: PropTypes.bool,
    images: PropTypes.shape({
      thumbnail: PropTypes.string
    }),
    material: PropTypes.string,
    name: PropTypes.arrayOf(valueShape)
  })
};

BottomEdit.defaultProps = {
  bottom: {}
};

export default withRouter(BottomEdit);

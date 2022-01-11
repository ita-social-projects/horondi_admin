import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { useStyles } from './constructor-details.styles';
import LoadingBar from '../../../components/loading-bar';
import { getModel } from '../../../redux/model/model.actions';
import { selectModel } from '../../../redux/model/model.reducer';
import ConstructorModelForm from '../../../components/forms/constructor-form/constructor-model-form.js';

const ConstructorModelDetails = ({ match }) => {
  const { id } = match.params;

  const dispatch = useDispatch();
  const { loading, model } = useSelector(selectModel);
  const styles = useStyles();

  useEffect(() => {
    dispatch(getModel(id));
  }, [dispatch, id]);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={styles.detailsContainer}>
      {model !== null ? <ConstructorModelForm id={id} model={model} /> : null}
    </div>
  );
};

const valueShape = PropTypes.shape({
  value: PropTypes.string
});
ConstructorModelDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired,
  model: PropTypes.shape({
    _id: PropTypes.string,
    available: PropTypes.bool,
    description: PropTypes.arrayOf(valueShape),
    handmade: PropTypes.bool,
    images: PropTypes.shape({
      thumbnail: PropTypes.string
    }),
    material: PropTypes.string,
    name: PropTypes.arrayOf(valueShape)
  })
};

ConstructorModelDetails.defaultProps = {
  model: {}
};

export default withRouter(ConstructorModelDetails);

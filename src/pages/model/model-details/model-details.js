import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { useStyles } from './model-details.styles';
import LoadingBar from '../../../components/loading-bar';
import ModelForm from '../../../components/forms/model-form';
import { getModel } from '../../../redux/model/model.actions';

const ModelDetails = ({ match }) => {
  const { id } = match.params;

  const dispatch = useDispatch();
  const { loading, model } = useSelector(({ Model }) => ({
    loading: Model.modelLoading,
    model: Model.model
  }));
  const styles = useStyles();

  useEffect(() => {
    dispatch(getModel(id));
  }, [dispatch, id]);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={styles.detailsContainer}>
      {model !== null ? <ModelForm id={id} model={model} isEdit /> : null}
    </div>
  );
};

const valueShape = PropTypes.shape({
  value: PropTypes.string
});
ModelDetails.propTypes = {
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

ModelDetails.defaultProps = {
  model: {}
};

export default withRouter(ModelDetails);

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { useStyles } from '../constructor-details/constructor-details.styles';
import ConstructorModelForm from '../../../components/forms/constructor-form/constructor-model-form';
import { getConstructor } from '../../../redux/constructor/constructor.actions';

const ConstructorEdit = ({ match }) => {
  const { id } = match.params;

  const styles = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConstructor(id));
  }, [dispatch, id]);

  return (
    <div className={styles.detailsContainer}>
      <ConstructorModelForm id={id} isEdit />
    </div>
  );
};

ConstructorEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired
};

export default withRouter(ConstructorEdit);

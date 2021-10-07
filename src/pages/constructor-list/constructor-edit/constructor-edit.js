import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import ConstructorModelForm from '../../../components/forms/constructor-form/constructor-model-form';
import { useCommonStyles } from '../../common.styles';
import { getConstructor } from '../../../redux/constructor/constructor.actions';
import { constructorSelector } from '../../../redux/selectors/constructor.selectors';

const ConstructorEdit = ({ match }) => {
  const { id } = match.params;

  const common = useCommonStyles();

  const { constructor } = useSelector(constructorSelector);
  console.log(constructor);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConstructor(id));
  }, [dispatch, id]);

  return (
    <div className={common.detailsContainer}>
      {constructor !== null ? <ConstructorModelForm id={id} isEdit /> : null}
    </div>
  );
};

const valueShape = PropTypes.shape({
  value: PropTypes.string
});
ConstructorEdit.propTypes = {
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

ConstructorEdit.defaultProps = {
  bottom: {}
};

export default withRouter(ConstructorEdit);

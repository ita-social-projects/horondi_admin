import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { useStyles } from './basic-details.styles';
import BasicsForm from '../../../components/forms/basics-form';
import { basicsSelector } from '../../../redux/selectors/basics.selectors';
import { getBasic } from '../../../redux/basics/basics.actions';

const BasicDetails = ({ match }) => {
  const { id } = match.params;

  const dispatch = useDispatch();
  const { basic } = useSelector(basicsSelector);
  const styles = useStyles();
  useEffect(() => {
    dispatch(getBasic(id));
  }, [dispatch, id]);

  return (
    <div className={styles.detailsContainer}>
      {basic !== null ? <BasicsForm id={id} edit basic={basic} /> : null}
    </div>
  );
};

const valueShape = PropTypes.shape({
  value: PropTypes.string
});
BasicDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired,
  basic: PropTypes.shape({
    _id: PropTypes.string,
    available: PropTypes.bool,
    images: PropTypes.shape({
      thumbnail: PropTypes.string
    }),
    material: PropTypes.string,
    color: PropTypes.string,
    name: PropTypes.arrayOf(valueShape)
  })
};

BasicDetails.defaultProps = {
  basic: {}
};

export default withRouter(BasicDetails);

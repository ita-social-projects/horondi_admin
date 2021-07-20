import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { useStyles } from './back-details.styles';
import BackForm from '../../../components/forms/back-form';
import { getBack } from '../../../redux/back/back.actions';
import { backSelector } from '../../../redux/selectors/back.selectors';

const BackDetails = ({ match }) => {
  const { id } = match.params;

  const dispatch = useDispatch();
  const { back } = useSelector(backSelector);
  const styles = useStyles();

  useEffect(() => {
    dispatch(getBack(id));
  }, [dispatch, id]);

  return (
    <div className={styles.detailsContainer}>
      {back !== null ? <BackForm id={id} edit back={back} /> : null}
    </div>
  );
};

const valueShape = PropTypes.shape({
  value: PropTypes.string
});
BackDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired,
  back: PropTypes.shape({
    _id: PropTypes.string,
    available: PropTypes.bool,
    images: PropTypes.shape({
      thumbnail: PropTypes.string
    }),
    material: PropTypes.string,
    name: PropTypes.arrayOf(valueShape)
  })
};

BackDetails.defaultProps = {
  back: {}
};

export default withRouter(BackDetails);

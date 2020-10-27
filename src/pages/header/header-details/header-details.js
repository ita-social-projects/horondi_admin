import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { useStyles } from './header-details.styles';
import LoadingBar from '../../../components/loading-bar';
import HeaderForm from '../../../components/header-form';
import { getHeader } from '../../../redux/header/header.actions';

const HeaderDetails = ({ match }) => {
  const { id } = match.params;

  const dispatch = useDispatch();
  const { loading, header } = useSelector(({ Header }) => ({
    loading: Header.headerLoading,
    header: Header.header
  }));
  const styles = useStyles();

  useEffect(() => {
    dispatch(getHeader(id));
  }, [dispatch, id]);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={styles.detailsContainer}>
      {header !== null ? <HeaderForm id={id} header={header} /> : null}
    </div>
  );
};

const valueShape = PropTypes.shape({
  value: PropTypes.string
});
HeaderDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired,
  header: PropTypes.shape({
    _id: PropTypes.string,
    priority: PropTypes.number,
    link: PropTypes.string,
    name: PropTypes.arrayOf(valueShape)
  })
};

HeaderDetails.defaultProps = {
  header: {}
};

export default withRouter(HeaderDetails);

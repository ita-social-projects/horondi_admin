import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useStyles } from './user-details.styles';
import UserForm from '../../../../components/forms/user-form';
import { getUser } from '../../../../redux/users/users.actions';

const UserDetails = ({ match }) => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const { user } = useSelector(({ Users }) => ({
    user: Users.user
  }));

  const { id } = match.params;

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

  return (
    <div className={styles.container}>
      {user !== null ? <UserForm id={id} edit user={user} /> : null}
    </div>
  );
};

UserDetails.propTypes = {
  id: PropTypes.string,
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.objectOf(PropTypes.string),
    path: PropTypes.string,
    url: PropTypes.string
  })
};

UserDetails.defaultProps = {
  id: '',
  match: {}
};

export default UserDetails;

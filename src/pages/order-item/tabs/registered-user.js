import React, { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from '../order-item.styles';
import { config } from '../../../configs';
import { getUsers, getUser } from '../../../redux/users/users.actions';
import configs from '../../../configs/orders';
import { inputName, registeredUserPropTypes } from '../../../utils/order';

const RegisteredUser = ({ userId, setFieldValue }) => {
  const classes = useStyles();
  const { materialUiConstants } = config;
  const { userAdditionalInfo } = configs;
  const dispatch = useDispatch();
  const [id, setId] = useState(userId);

  useEffect(() => {
    dispatch(getUsers({}));
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId));
    }
  }, [id]);

  const regUsers = useSelector(({ Users }) => ({
    list: Users.list,
    user: Users.user,
    loading: Users.userLoading
  }));

  const onUserChange = (e, user) => {
    setFieldValue(inputName.userId, user?._id);
    setId(user?._id);
  };

  const noUser = () => {
    if (regUsers.loading) {
      return '';
    }
    return inputName.noUser;
  };

  if (regUsers.loading) {
    regUsers.user = null;
  }

  const sortedUsers = regUsers.list?.filter((option) => option?.firstName);

  if (userId) {
    sortedUsers.unshift({ firstName: noUser(), lastName: '', _id: null });
  }

  return (
    <div className={classes.registeredUser}>
      <div>
        <Autocomplete
          value={userId ? regUsers.user : null}
          noOptionsText={userAdditionalInfo.noOneUser}
          options={sortedUsers}
          getOptionLabel={(option) =>
            `${option?.firstName} ${option?.lastName}`
          }
          onChange={onUserChange}
          getOptionSelected={(option, value) =>
            option.lastName === value.lastName
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant={materialUiConstants.outlined}
              placeholder={noUser()}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {regUsers.loading && <CircularProgress size={20} />}
                    {params.InputProps.endAdornment}
                  </>
                )
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

RegisteredUser.defaultProps = {
  data: {}
};

RegisteredUser.propTypes = registeredUserPropTypes;

export default RegisteredUser;

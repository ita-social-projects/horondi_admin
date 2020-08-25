import {
  GET_USERS,
  SET_USERS,
  GET_USER,
  SET_USER,
  SET_USERS_ERROR,
  SET_USERS_LOADING,
  DELETE_USER,
  UPDATE_USER_STATUS,
  DELETE_USER_LOCALLY,
  UPDATE_USER_LOCALLY
} from './users.types';

const getUsers = () => ({ type: GET_USERS });

const setUsers = (users) => ({
  type: SET_USERS,
  payload: users
});

const setUsersLoading = (loading) => ({
  type: SET_USERS_LOADING,
  payload: loading
});

const setUser = (payload) => ({
  type: SET_USER,
  payload
});

const getUser = (payload) => ({
  type: GET_USER,
  payload
});

const deleteUser = (payload) => ({
  type: DELETE_USER,
  payload
});
const updateUserStatus = (payload) => ({
  type: UPDATE_USER_STATUS,
  payload
});

const setUserError = (error) => ({
  type: SET_USERS_ERROR,
  payload: error
});

const updateUserLocally = (id) => ({
  type: UPDATE_USER_LOCALLY,
  payload: id
});

const deleteUserLocally = (id) => ({
  type: DELETE_USER_LOCALLY,
  payload: id
});
export {
  getUsers,
  setUsers,
  setUser,
  getUser,
  deleteUser,
  updateUserStatus,
  setUserError,
  setUsersLoading,
  updateUserLocally,
  deleteUserLocally
};

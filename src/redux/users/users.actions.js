import { GET_USERS, SET_USERS } from './users.types';

const getUsers = () => ({ type: GET_USERS });

const setUsers = (users) => ({
  type: SET_USERS,
  payload: users
});

export { getUsers, setUsers };

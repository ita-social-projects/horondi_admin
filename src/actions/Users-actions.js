const setUsers = (users) => ({
  type: 'SET_USERS',
  payload: users
});

const setUser = (user) => ({
  type: 'SET_USER',
  payload: user
});

const userLoadingStatus = () => ({
  type: 'LOADING_STATUS'
});

export { setUsers, setUser, userLoadingStatus };

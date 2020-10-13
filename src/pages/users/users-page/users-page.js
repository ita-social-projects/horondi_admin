import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { useStyles } from './users-page.styles';
import { deleteUser } from '../../../redux/users/users.actions';
import TabPanel from './components/tab-panel';
import { config, buttonTitles, messages } from '../../../configs';
import LoadingBar from '../../../components/loading-bar';
import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';
import AdminTab from './components/admin-tab';
import UserTab from './components/user-tab';
import useUsersFiltering from '../../../hooks/user/use-users-filtering';

const { REMOVE_USER_TITLE } = buttonTitles;
const { REMOVE_USER_MESSAGE } = messages;
const userTabNames = config.tabNames.users;

const UsersPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const styles = useStyles();
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const { loading, list } = useSelector(({ Users }) => ({
    list: Users.list,
    loading: Users.userLoading
  }));
  const dispatch = useDispatch();

  const userDeleteHandler = (id) => {
    const removeUser = () => {
      dispatch(closeDialog());
      dispatch(deleteUser(id));
    };
    openSuccessSnackbar(
      removeUser,
      REMOVE_USER_TITLE,
      REMOVE_USER_MESSAGE,
      REMOVE_USER_TITLE
    );
  };

  useUsersFiltering(tabValue);

  const handleTabChange = (event, nextValue) => {
    setTabValue(nextValue);
  };

  if (loading) {
    return <LoadingBar />;
  }

  const userTabs = userTabNames.map((name) => <Tab key={name} label={name} />);

  return (
    <div className={styles.container}>
      <AppBar position='static' color='primary'>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          className={styles.tabs}
          variant='fullWidth'
        >
          {userTabs}
        </Tabs>
      </AppBar>
      <TabPanel value={tabValue} index={0}>
        <UserTab list={list} onDelete={userDeleteHandler} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <AdminTab list={list} onDelete={userDeleteHandler} />
      </TabPanel>
    </div>
  );
};

export default UsersPage;

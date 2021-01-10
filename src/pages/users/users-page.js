import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Tabs, Tab, Typography } from '@material-ui/core';
import { useCommonStyles } from '../common.styles';
import { deleteUser, getUsers } from '../../redux/users/users.actions';
import TabPanel from '../../components/tab-panel';
import { config } from '../../configs';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import AdminTab from './components/admin-tab';
import UserTab from './components/user-tab';
import useUsersTabs from '../../../hooks/user/use-users-tabs';
import { selectUsersAndTable } from '../../../redux/selectors/users.selectors';

const { REMOVE_USER_MESSAGE } = config.messages;
const userTabNames = config.tabNames.users;

const UsersPage = () => {
  const common = useCommonStyles();

  const { openSuccessSnackbar } = useSuccessSnackbar();
  const { list, filter, sort, currentPage, rowsPerPage } = useSelector(
    selectUsersAndTable
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getUsers({
        filter,
        pagination: {
          skip: currentPage * rowsPerPage,
          limit: rowsPerPage
        },
        sort
      })
    );
  }, [dispatch, filter, sort, currentPage, rowsPerPage]);

  const userDeleteHandler = (id) => {
    const removeUser = () => {
      dispatch(closeDialog());
      dispatch(deleteUser(id));
    };
    openSuccessSnackbar(removeUser, REMOVE_USER_MESSAGE);
  };

  const { tab, handleTabChange } = useUsersTabs();

  const userTabs = userTabNames.map((name) => <Tab key={name} label={name} />);

  return (
    <div className={common.container}>
      <div className={common.adminHeader}>
        <Typography variant='h1' className={common.materialTitle}>
          {config.titles.usersPageTitles.mainPageTitle}
        </Typography>
      </div>
      <AppBar position='static' color='primary'>
        <Tabs
          value={tab}
          className={common.tabs}
          onChange={(_, nextTab) => handleTabChange(nextTab)}
          variant='fullWidth'
        >
          {userTabs}
        </Tabs>
      </AppBar>
      <TabPanel value={tab} index={0}>
        <UserTab list={list} onDelete={userDeleteHandler} />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <AdminTab list={list} onDelete={userDeleteHandler} />
      </TabPanel>
    </div>
  );
};

export default UsersPage;

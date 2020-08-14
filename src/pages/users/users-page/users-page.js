import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './users-page.styles';
import { getUsers } from '../../../redux/users/users.actions';
import TableContainerRow from '../../../components/table-container-row';
import TableContainerGenerator from '../../../components/table-container-generator';
import { config } from '../../../configs';

const tableHeaders = config.tableHeadRowTitles.users;

const UsersPage = (props) => {
  const classes = useStyles();
  const { list } = useSelector(({ Users }) => ({
    list: Users.list
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const usersItems =
    list !== undefined
      ? list.map((userItem, index) => (
        <TableContainerRow
          key={index}
          id={userItem.id}
          name={`${userItem.firstName } ${ userItem.lastName}`}
          mobile={userItem.phoneNumber}
          email={userItem.email}
          banned={userItem.banned ? 'Неактивний' : 'Активний'}
          deleteHandler={() => console.log('delete')}
          editHandler={() => console.log('edit')}
        />
      ))
      : null;

  return (
    <div className={classes.container}>
      <div className={classes.tableNav}>
        <h1>Hek</h1>
      </div>
      <TableContainerGenerator
        id='usersTable'
        tableTitles={tableHeaders}
        tableItems={usersItems}
      />
    </div>
  );
};

export default UsersPage;

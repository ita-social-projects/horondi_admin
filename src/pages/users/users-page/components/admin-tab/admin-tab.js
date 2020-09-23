import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { useStyles } from './admin-tab.styles';
import TableContainerGenerator from '../../../../../containers/table-container-generator';
import TableContainerRow from '../../../../../containers/table-container-row';
import { userRoleTranslations } from '../../../../../translations/user.translations';
import { config } from '../../../../../configs';

const { routes } = config.app;

const pathToRegisterAdminPage = routes.pathToRegisterAdmin;

const tableHeaders = config.tableHeadRowTitles.users.adminTab;
const { CREATE_SPECIAL_USER } = config.buttonTitles;

const AdminTab = (props) => {
  const { list, onDelete } = props;
  const styles = useStyles();
  const dispatch = useDispatch();

  const adminItems = list.map((userItem, index) => (
    <TableContainerRow
      key={index}
      id={userItem._id}
      name={`${userItem.firstName} ${userItem.lastName}`}
      role={userRoleTranslations[userItem.role]}
      deleteHandler={() => onDelete(userItem._id)}
      editHandler={() => {}}
    />
  ));

  return (
    <>
      <div className={styles.tableNav}>
        <div className={styles.buttonsPanel}>
          <Button
            id='add-user-admin'
            onClick={() => dispatch(push(pathToRegisterAdminPage))}
            variant='contained'
            color='primary'
          >
            {CREATE_SPECIAL_USER}
          </Button>
        </div>
      </div>
      <TableContainerGenerator
        id='usersTable'
        tableTitles={tableHeaders}
        tableItems={adminItems}
      />
    </>
  );
};

AdminTab.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired
};

export default AdminTab;

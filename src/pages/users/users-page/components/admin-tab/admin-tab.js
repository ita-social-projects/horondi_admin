import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useStyles } from './admin-tab.styles';
import TableContainerGenerator from '../../../../../containers/table-container-generator';
import TableContainerRow from '../../../../../containers/table-container-row';
import { userRoleTranslations } from '../../../../../translations/user.translations';
import { config } from '../../../../../configs';
import RegisterDialog from '../register-dialog';
import useFormDialog from '../../../../../hooks/form-dialog/use-form-dialog';
import LoadingBar from '../../../../../components/loading-bar';

const tableHeaders = config.tableHeadRowTitles.users.adminTab;
const { CREATE_SPECIAL_USER } = config.buttonTitles;
const { REGISTER_ADMIN } = config.dialogFormTitles;
const { unknownAdmin } = config.labels.user;
const { forbiddenRolesFromDeleting } = config;

const AdminTab = (props) => {
  const { list, onDelete } = props;
  const userLoading = useSelector(({ Users }) => Users.userLoading);

  const {
    isRegisterDialogOpen,
    handleRegisterDialogOpen,
    handleRegisterDialogClose
  } = useFormDialog(false, ({ open, handleOpen, handleClose }) => ({
    isRegisterDialogOpen: open,
    handleRegisterDialogOpen: handleOpen,
    handleRegisterDialogClose: handleClose
  }));

  const styles = useStyles();

  const adminItems = list.map((userItem) => (
    <TableContainerRow
      key={userItem._id}
      id={userItem._id}
      name={
        userItem.firstName || userItem.lastName
          ? `${userItem.firstName || ''} ${userItem.lastName || ''}`
          : unknownAdmin
      }
      email={userItem.email || ''}
      role={userRoleTranslations[userItem.role]}
      deleteHandler={() => onDelete(userItem._id)}
      showEdit={false}
      showDelete={!forbiddenRolesFromDeleting.includes(userItem.role)}
    />
  ));

  return (
    <>
      <div className={styles.tableNav}>
        <div className={styles.buttonsPanel}>
          <Button
            id='add-user-admin-button'
            data-cy='add-user-admin-button'
            onClick={handleRegisterDialogOpen}
            variant='contained'
            color='primary'
          >
            {CREATE_SPECIAL_USER}
          </Button>
        </div>
      </div>
      {userLoading ? (
        <LoadingBar />
      ) : (
        <TableContainerGenerator
          pagination
          id='adminsTable'
          tableTitles={tableHeaders}
          tableItems={adminItems}
        />
      )}
      <RegisterDialog
        data-cy='register-dialog'
        isOpen={isRegisterDialogOpen}
        handleClose={handleRegisterDialogClose}
        title={REGISTER_ADMIN}
      />
    </>
  );
};

AdminTab.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired
};

export default AdminTab;

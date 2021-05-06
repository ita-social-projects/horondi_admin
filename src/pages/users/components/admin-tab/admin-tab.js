import React from 'react';
import PropTypes from 'prop-types';
import {Button} from '@material-ui/core';
import {useSelector, useDispatch} from 'react-redux';
import {push} from 'connected-react-router';
import {useStyles} from './admin-tab.styles';
import TableContainerGenerator from '../../../../containers/table-container-generator';
import TableContainerRow from '../../../../containers/table-container-row';
import {userRoleTranslations} from '../../../../translations/user.translations';
import {config} from '../../../../configs';
import RegisterDialog from '../register-dialog';
import useFormDialog from '../../../../hooks/form-dialog/use-form-dialog';
import LoadingBar from '../../../../components/loading-bar';
import {selectUserLoadAndItemsCount} from '../../../../redux/selectors/users.selectors';
import {UserBlockPeriod} from '../../../../consts/user-block-status';
import {formatPhoneNumber} from '../../../../utils/format-phone-number';
import useUsersFilters from "../../../../hooks/filters/use-users-filters";
import FilterNavbar from "../../../../components/filter-search-sort";

const tableHeaders = config.tableHeadRowTitles.users.userTab;
const {CREATE_SPECIAL_USER} = config.buttonTitles;
const {REGISTER_ADMIN} = config.dialogFormTitles;
const {unknownAdmin} = config.labels.user;
const {forbiddenRolesFromDeleting} = config;
const {USER_ACTIVE_STATUS, USER_INACTIVE_STATUS} = config.statuses;

const AdminTab = (props) => {
    const dispatch = useDispatch();
    const {list, onDelete} = props;
    const {userLoading, itemsCount} = useSelector(selectUserLoadAndItemsCount);
    const usersFilters = useUsersFilters();

    const {
        isRegisterDialogOpen,
        handleRegisterDialogOpen,
        handleRegisterDialogClose
    } = useFormDialog(false, ({open, handleOpen, handleClose}) => ({
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
            mobile={formatPhoneNumber(userItem.phoneNumber) || ''}
            email={userItem.email || ''}
            role={userRoleTranslations[userItem.role]}
            banned={
                userItem.banned.blockPeriod === UserBlockPeriod.UNLOCKED
                    ? USER_ACTIVE_STATUS
                    : USER_INACTIVE_STATUS
            }
            deleteHandler={() => onDelete(userItem._id)}
            editHandler={() => dispatch(push(`/users/${userItem._id}`))}
            showDelete={!forbiddenRolesFromDeleting.includes(userItem.role)}
        />
    ));

    return (
        <>
            <div className={styles.filters}>
                <FilterNavbar options={usersFilters || {}}/>
            </div>
            <div className={styles.tableNav}>
                <div className={styles.button}>
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
                <LoadingBar/>
            ) : (
                <TableContainerGenerator
                    pagination
                    count={itemsCount}
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

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';

import TableContainerRow from '../table-container-row';
import TableContainerGenerator from '../table-container-generator';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import LoadingBar from '../../components/loading-bar';
import FilterNavbar from '../../components/filter-search-sort';
import useConstructorPageFilter from '../../hooks/filters/use-constructor-page-filter';
import { getTableRowProps } from '../../utils/constructor-page-container';
import { useCommonStyles } from '../../pages/common.styles';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import { config } from '../../configs';
import { getConstructorParts } from '../../redux/constructor/constructor.actions';
import { constructorSelector } from '../../redux/selectors/constructor.selectors';

const ConstructorPageContainer = ({
  itemKey,
  getItemsAction,
  deleteItemAction,
  itemSelectorAction,
  itemAddPath,
  setFilterAction,
  clearFilterAction
}) => {
  const common = useCommonStyles();
  const filterOptions = useConstructorPageFilter(
    itemKey,
    setFilterAction,
    clearFilterAction
  );
  const dispatch = useDispatch();
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const { items, loading, currentPage, rowsPerPage, itemsCount, filter } =
    useSelector(itemSelectorAction);
  const { items: constructors } = useSelector(constructorSelector);

  const { materialUiConstants } = config;
  const { ITEM_REMOVE_MESSAGE, NO_ITEMS_MESSAGE } =
    config.messages.constructorPageMessages[itemKey];
  const { IS_IN_CONSTRUCTOR_MESSAGE } = config.messages.constructorPageMessages;
  const createItemTitle =
    config.buttonTitles.createConstructorItemTitle[itemKey];
  const mainPageTitle = config.titles.constructorMainPageTitles[itemKey];
  const tableTitles = config.tableHeadRowTitles[itemKey];

  useEffect(() => {
    dispatch(
      getItemsAction({
        limit: rowsPerPage,
        skip: currentPage * rowsPerPage,
        filter
      })
    );
  }, [dispatch, currentPage, rowsPerPage, filter, getItemsAction]);

  useEffect(() => {
    dispatch(getConstructorParts());
  }, [dispatch]);

  const isInConstructor = (id) => {
    let modelsName = '';

    constructors.forEach((constructor) => {
      if (constructor[`${itemKey}s`].some((item) => item._id === id)) {
        const [uaName] = constructor.name;
        modelsName += `${uaName.value}, `;
      }
    });

    return modelsName.slice(0, -2);
  };

  const itemDeleteHandler = (id) => {
    const modelsName = isInConstructor(id);
    const skipParam = undefined;

    if (modelsName.length) {
      openSuccessSnackbar(
        skipParam,
        IS_IN_CONSTRUCTOR_MESSAGE(modelsName),
        skipParam,
        true,
        false,
        skipParam
      );

      return;
    }

    const deleteItem = () => {
      dispatch(closeDialog());
      dispatch(deleteItemAction(id));
    };

    openSuccessSnackbar(deleteItem, ITEM_REMOVE_MESSAGE);
  };

  const constructorItems = items.map((item) => {
    const id = item._id;
    const deleteHandler = () => itemDeleteHandler(id);
    const editHandler = () => dispatch(push(`/${itemKey}s/${id}`));

    const props = getTableRowProps(item, deleteHandler, editHandler);

    return <TableContainerRow key={id} {...props} />;
  });

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={common.container}>
      <div className={common.adminHeader}>
        <Typography variant='h1' className={common.materialTitle}>
          {mainPageTitle}
        </Typography>
        <Button
          data-testid={`add-${itemKey}`}
          component={Link}
          to={itemAddPath}
          variant={materialUiConstants.contained}
          color={materialUiConstants.primary}
        >
          {createItemTitle}
        </Button>
      </div>
      <div>
        <FilterNavbar options={filterOptions} />
      </div>
      {constructorItems.length ? (
        <TableContainerGenerator
          pagination
          count={itemsCount}
          tableTitles={tableTitles}
          tableItems={constructorItems}
        />
      ) : (
        <p className={common.noRecords}>{NO_ITEMS_MESSAGE}</p>
      )}
    </div>
  );
};

ConstructorPageContainer.propTypes = {
  itemKey: PropTypes.string.isRequired,
  getItemsAction: PropTypes.func.isRequired,
  deleteItemAction: PropTypes.func.isRequired,
  itemSelectorAction: PropTypes.func.isRequired,
  itemAddPath: PropTypes.string.isRequired,
  setFilterAction: PropTypes.func.isRequired,
  clearFilterAction: PropTypes.func.isRequired
};

export default ConstructorPageContainer;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Avatar, Button, Tab, Tabs, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { Image } from '@material-ui/icons';
import { useStyles } from './constructor-page.styles';
import { useCommonStyles } from '../../../common.styles';
import { config } from '../../../../configs';
import TabPanel from '../../../../components/tab-panel';
import { BackButton } from '../../../../components/buttons';
import TableContainerRow from '../../../../containers/table-container-row';
import TableContainerGenerator from '../../../../containers/table-container-generator';
import {
  addConstructorBasic,
  addConstructorBottom,
  addConstructorFrontPocket, addConstructorPattern,
  deleteConstructorBasic,
  deleteConstructorBottom,
  deleteConstructorFrontPocket, deleteConstructorPattern,
  setConstructorElementMethod, setConstructorTabs,
  setEditableConstructorElement,
  updateConstructorBasic,
  updateConstructorBottom,
  updateConstructorFrontPocket
} from '../../../../redux/constructor/constructor.actions';
import ColorCircle from '../../../../components/color-circle';
import { closeDialog } from '../../../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../../../utils/use-success-snackbar';
import { selectConstructorMethodAndMaterials } from '../../../../redux/selectors/constructor.selectors';
import { getPatterns } from '../../../../redux/pattern/pattern.actions';
import { getMaterials } from '../../../../redux/material/material.actions';
import LoadingBar from '../../../../components/loading-bar';

const map = require('lodash/map');

const {
  constructorBasic,
  constructorBottom,
  constructorPattern,
  constructorFrontPocket,
  availablePatternsForConstructor,
  showEnable,
  showDisable
} = config.labels.model;
const { imagePrefix, IMG_URL } = config;
const constructorTitles = config.tableHeadRowTitles.constructor;
const { DEFAULT_CIRCLE } = config.colorCircleSizes;
const { REMOVE_CONSTRUCTOR_MESSAGE } = config.messages;
const {
  CREATE_PATTERN_TITLE,
  CREATE_CONSTRUCTOR_BASIC_TITLE,
  CREATE_CONSTRUCTOR_BOTTOM_TITLE,
  CREATE_CONSTRUCTOR_FRONT_POCKET_TITLE
} = config.buttonTitles;

const ConstructorPage = ({ match }) => {
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const dispatch = useDispatch();
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const { id } = match.params;
  const [openDialog, setOpenDialog] = useState(false);
  const {
    model,
    constructorTabs,
    patternList,
    filter,
    loading
  } = useSelector(selectConstructorMethodAndMaterials);

  useEffect(() => {
    dispatch(
      getMaterials({
        filter
      })
    );
  }, [dispatch]);

  const constructorElementDeleteHandler = (constructorElementID, action, modelID) => {
    const removeConstructorElement = () => {
      dispatch(closeDialog());
      dispatch(action({ id: modelID, constructorElementID }));
    };
    openSuccessSnackbar(removeConstructorElement, REMOVE_CONSTRUCTOR_MESSAGE);
  };
  const handleConstructorOptions = (method) => {
    dispatch(push(`/constructor/${id}/add`));
    dispatch(setConstructorElementMethod(method));
    dispatch(setEditableConstructorElement(''));
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleListItemClick = (modelID, pattern) => {
    setOpenDialog(false);
    dispatch(addConstructorPattern({ id: modelID, pattern }));
  };
  const handleUpdateConstructor = (method, elementId, element) => {
    dispatch(push(`/constructor/${id}/${elementId}`));
    dispatch(setConstructorElementMethod(method));
    dispatch(setEditableConstructorElement(element));
  };

  const constructorItems = (list, deleteAction, editAction) => map(list, listItem => (
    <TableContainerRow
      image={
        listItem.images
          ? `${IMG_URL}${listItem.images.thumbnail}`
          : ''
      }
      showAvatar={listItem.label === constructorPattern}
      color={
        <ColorCircle
          color={listItem.color.colorHex}
          size={DEFAULT_CIRCLE}
        />
      }
      key={listItem._id}
      id={listItem._id}
      name={listItem.name[0].value}
      material={listItem.material.name[0].value}
      show={
        listItem.available
          ? showEnable
          : showDisable
      }
      deleteHandler={() => constructorElementDeleteHandler(listItem._id, deleteAction, id)}
      editHandler={() => handleUpdateConstructor(editAction, listItem._id, listItem)}
    />
  ));

  const patternItems = (list, deleteAction) => map(list, listItem => (
    <TableContainerRow
      image={
        listItem.images
          ? `${IMG_URL}${listItem.images.thumbnail}`
          : ''
      }
      key={listItem._id}
      id={listItem._id}
      name={listItem.name[0].value}
      material={listItem.material.name[0].value}
      show={
        listItem.available
          ? showEnable
          : showDisable
      }
      deleteHandler={() => constructorElementDeleteHandler(listItem._id, deleteAction, id)}
      showEdit={false}
    />
  ));

  const constructorOptions = {
    constructorBasic: {
      list: model.constructorBasic,
      label: constructorBasic,
      buttonTitle: CREATE_CONSTRUCTOR_BASIC_TITLE,
      createConstructorElement: addConstructorBasic,
      deleteConstructorElement: deleteConstructorBasic,
      updateConstructorElement: updateConstructorBasic
    },
    constructorPattern: {
      list: model.constructorPattern,
      label: constructorPattern,
      buttonTitle: CREATE_PATTERN_TITLE,
      deleteConstructorElement: deleteConstructorPattern
    },
    constructorFrontPocket: {
      list: model.constructorFrontPocket,
      label: constructorFrontPocket,
      buttonTitle: CREATE_CONSTRUCTOR_FRONT_POCKET_TITLE,
      createConstructorElement: addConstructorFrontPocket,
      deleteConstructorElement: deleteConstructorFrontPocket,
      updateConstructorElement: updateConstructorFrontPocket
    },
    constructorBottom: {
      list: model.constructorBottom,
      label: constructorBottom,
      buttonTitle: CREATE_CONSTRUCTOR_BOTTOM_TITLE,
      createConstructorElement: addConstructorBottom,
      deleteConstructorElement: deleteConstructorBottom,
      updateConstructorElement: updateConstructorBottom
    }
  };

  const handleTabsChange = (event, newValue) => {
    dispatch(setConstructorTabs(newValue));
    if (!constructorTabs) {
      dispatch(getPatterns({
        skip: 0
      }));
    }
  };

  const constructorTabsValue = Object.values(
    constructorOptions
  ).map(({ label }) => <Tab label={label} key={label} />);

  const constructorTables = Object.values(
    constructorOptions
  ).map(
    ({
      label,
      list,
      buttonTitle,
      createConstructorElement,
      deleteConstructorElement,
      updateConstructorElement
    }, index) => (
      <TabPanel key={label} value={constructorTabs} index={index}>
        <div className={commonStyles.adminHeader}>
          <Typography variant='h1' className={commonStyles.materialTitle}>
            {label}
          </Typography>
          <Button
            data-cy='add-constructor-element'
            onClick={() => label === constructorPattern ?
              handleOpenDialog() :
              handleConstructorOptions(createConstructorElement)}
            variant='contained'
            color='primary'
          >
            {buttonTitle}
          </Button>
        </div>
        <TableContainerGenerator
          data-cy='constructorTable'
          tableTitles={constructorTitles}
          tableItems={label === constructorPattern ? patternItems(list, deleteConstructorElement) :
            constructorItems(list, deleteConstructorElement, updateConstructorElement)}
        />
      </TabPanel>
    )
  );
  if (loading) {
    return <LoadingBar />;
  }
  return (
    <div className={commonStyles.container}>
      <div className={styles.backButton}>
        <BackButton />
      </div>
      <AppBar position='static'>
        <Tabs
          className={styles.tabs}
          value={constructorTabs}
          onChange={handleTabsChange}
        >
          {constructorTabsValue}
        </Tabs>
      </AppBar>
      {constructorTables}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle className={styles.dialogTitle}>{availablePatternsForConstructor}</DialogTitle>
        <List>
          {map(patternList.filter(el => el.constructorImg), pattern => (
            <ListItem button
              onClick={() => handleListItemClick(id, pattern)}
              key={pattern._id}>
              <ListItemAvatar>
                <Avatar src={`${imagePrefix}${pattern.images.thumbnail}`}>
                  <Image />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={pattern.name[0].value} />
              <Avatar src={pattern.constructorImg} variant='rounded' className={styles.avatar}>
                <Image />
              </Avatar>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </div>
  );
};

const valueShape = PropTypes.shape({
  value: PropTypes.string
});
ConstructorPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired,
  model: PropTypes.shape({
    _id: PropTypes.string,
    available: PropTypes.bool,
    description: PropTypes.arrayOf(valueShape),
    handmade: PropTypes.bool,
    images: PropTypes.shape({
      thumbnail: PropTypes.string
    }),
    material: PropTypes.string,
    name: PropTypes.arrayOf(valueShape)
  })
};

ConstructorPage.defaultProps = {
  model: {}
};
export default ConstructorPage;

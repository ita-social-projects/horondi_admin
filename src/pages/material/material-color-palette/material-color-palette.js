import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Typography } from '@material-ui/core';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import TableContainerRow from '../../../containers/table-container-row';
import LoadingBar from '../../../components/loading-bar';
import { materialTranslations } from '../../../translations/material.translations';
import { config } from '../../../configs';
import TableContainerGenerator from '../../../containers/table-container-generator';
import { useStyles } from './material-color-palette-style';
import { SaveButton } from '../../../components/buttons';
import {
  getMaterialColor,
  getMaterialColors,
  removeMaterialColor,
  setEditMaterialId,
  showColorDialogWindow
} from '../../../redux/material/material.actions';
import CreateColor from '../create-color';
import DialogWindowWrapper from '../../../components/dialog-window-wrapper';
import useMaterialHandlers from '../../../utils/use-material-handlers';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';
import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';

const tableTitles = config.tableHeadRowTitles.materialColors;
const { REMOVE_MATERIAL_COLOR_MESSAGE } = config.messages;
const { REMOVE_COLOR_TITLE } = config.buttonTitles;
const MaterialColorPalette = ({ match }) => {
  const { id } = match.params;
  const styles = useStyles();
  const dispatch = useDispatch();
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const { colors, loading } = useSelector(({ Material }) => ({
    colors: Material.materialColors,
    loading: Material.materialLoading
  }));
  const {
    colorImagesToUpload,
    setColorImagesToUpload,
    colorImages,
    addNewColorImages
  } = useMaterialHandlers();

  useEffect(() => {
    dispatch(getMaterialColors(id));
  }, [dispatch, id]);

  const colorDeleteHandler = (id, code) => {
    const removeColor = () => {
      dispatch(closeDialog());
      dispatch(
        removeMaterialColor({
          id,
          code
        })
      );
    };

    openSuccessSnackbar(
      removeColor,
      REMOVE_COLOR_TITLE,
      REMOVE_MATERIAL_COLOR_MESSAGE,
      REMOVE_COLOR_TITLE,
      'danger'
    );
  };
  const colorEditHandler = (code) => {
    dispatch(getMaterialColor(code));
    dispatch(showColorDialogWindow(true));
  };
  const colorClickHandler = () => {
    dispatch(showColorDialogWindow(true));
    dispatch(setEditMaterialId(id));
  };
  const colorPaletteClickHandler = () => {
    dispatch(push(`/materials/${id}`));
  };
  const materialColorItems = colors
    ? colors.colors.map((colorItem) => (
      <TableContainerRow
        key={colorItem.code}
        showAvatar
        showEdit={false}
        image={
          colorItem.images.thumbnail
            ? `${config.IMG_URL}${colorItem.images.thumbnail}`
            : ''
        }
        id={colorItem.code}
        name={colorItem.name[0].value}
        simpleName={colorItem.simpleName[0].value}
        available={
          colorItem.available
            ? materialTranslations.YES
            : materialTranslations.NO
        }
        deleteHandler={() => colorDeleteHandler(id, colorItem.code)}
        editHandler={() => {
          colorEditHandler(colorItem.code);
        }}
      />
    ))
    : null;
  if (loading) {
    return <LoadingBar />;
  }
  return (
    <div className={styles.container}>
      <Typography variant='h1' className={styles.materialTitle}>
        {config.titles.materialColorPaletteTitle.mainPageTitle}
      </Typography>
      <div className={styles.tableNav}>
        <SaveButton
          className={styles.returnButton}
          data-cy='go-to-material'
          type='button'
          color='secondary'
          title={config.buttonTitles.GO_BACK_TITLE}
          onClickHandler={colorPaletteClickHandler}
        />
        <SaveButton
          className={styles.saveButton}
          data-cy='open-dialog'
          type='button'
          color='secondary'
          title={config.buttonTitles.CREATE_COLOR_TITLE}
          onClickHandler={colorClickHandler}
        />
      </div>
      <div>
        <TableContainerGenerator
          tableTitles={tableTitles}
          tableItems={materialColorItems}
        />
      </div>
      <DialogWindowWrapper
        buttonType='submit'
        buttonTitle={config.buttonTitles.CLOSE_DIALOG_TITLE}
        dialogTitle={config.titles.colorTitles.createColorTitle}
        component={
          <CreateColor
            colorImages={colorImages}
            addNewColorImages={addNewColorImages}
            imagesToUpload={colorImagesToUpload}
            setImagesToUpload={setColorImagesToUpload}
            id={id}
          />
        }
      />
    </div>
  );
};

MaterialColorPalette.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired,
  material: PropTypes.shape({
    _id: PropTypes.string,
    images: PropTypes.shape({
      thumbnail: PropTypes.string
    }),
    purpose: PropTypes.string,
    available: PropTypes.bool
  })
};

MaterialColorPalette.defaultProps = {
  material: {}
};
export default withRouter(MaterialColorPalette);

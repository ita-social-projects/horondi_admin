import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { TextField, Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { push } from 'connected-react-router';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {
  getColors,
  deleteColor,
  showColorDialogWindow,
  showBoundMaterialsWindow
} from '../../redux/color/color.actions';
import DialogWindowWrapper from '../dialog-window-wrapper';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import { useStyles } from './color-bar.styles';
import ColorCircle from '../color-circle';
import CreateColor from '../create-color';
import { CustomizedDeleteIcon } from '../icons';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import { config } from '../../configs';

const { SMALL_SIZE } = config.iconSizes;
const { DEFAULT_CIRCLE, SMALL_CIRCLE } = config.colorCircleSizes;
const { REMOVE_COLOR_MESSAGE } = config.messages;
const { CREATE_COLOR_TITLE } = config.buttonTitles;
const { createColorTitle } = config.titles.colorTitles;

function ColorsBar({ onColorChange, color }) {
  const dispatch = useDispatch();
  const { colors, boundMaterials, showBound, showCreateColor } = useSelector(
    ({ Color }) => ({
      colors: Color.list,
      boundMaterials: Color.boundMaterials,
      showBound: Color.showBoundMaterialsWindow,
      showCreateColor: Color.showColorDialogWindow
    })
  );
  const styles = useStyles();
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const [selectedColor, setSelectedColor] = useState(color);

  useEffect(() => {
    dispatch(getColors());
  }, [dispatch]);

  const colorDeleteHandler = (id) => {
    const removeColor = () => {
      dispatch(closeDialog());
      dispatch(deleteColor(id));
    };
    openSuccessSnackbar(removeColor, REMOVE_COLOR_MESSAGE, 'danger');
  };

  return (
    <>
      <div className={styles.colorBar}>
        <ColorCircle
          color={selectedColor ? selectedColor.colorHex : ''}
          colorName={selectedColor && selectedColor.name[0].value}
          size={DEFAULT_CIRCLE}
        />
        <Autocomplete
          className={styles.root}
          options={colors}
          disableCloseOnSelect
          value={selectedColor}
          getOptionSelected={(option, value) => option._id === value._id}
          getOptionLabel={(option) => option.name[0].value}
          onChange={(e, value) => {
            setSelectedColor(value);
            onColorChange(value);
          }}
          renderOption={(option) => (
            <div className={styles.selectOptionRow}>
              <div>
                <ColorCircle color={option.colorHex} size={SMALL_CIRCLE} />
                {option.name[0].value}
              </div>
              <CustomizedDeleteIcon
                size={SMALL_SIZE}
                onClickHandler={(e) => {
                  e.stopPropagation();
                  colorDeleteHandler(option._id);
                }}
              />
            </div>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              variant='outlined'
              label='Кольори'
              placeholder='Назва кольору'
            />
          )}
        />
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            dispatch(showColorDialogWindow(true));
          }}
        >
          {CREATE_COLOR_TITLE}
        </Button>
      </div>
      <DialogWindowWrapper
        isOpen={showCreateColor}
        title={createColorTitle}
        handleClose={() => {
          dispatch(showColorDialogWindow(false));
        }}
      >
        <CreateColor />
      </DialogWindowWrapper>
      <DialogWindowWrapper
        isOpen={showBound}
        title='Колір вже використовується'
        handleClose={() => {
          dispatch(showBoundMaterialsWindow(false));
        }}
      >
        {boundMaterials &&
          boundMaterials.map((material) => (
            <div
              className={styles.materialItem}
              key={material._id}
              onClick={() => {
                dispatch(showBoundMaterialsWindow(false));
                dispatch(push(`/materials/${material._id}`));
              }}
            >
              <span className={styles.materialName}>
                {material.name[0].value}
              </span>
              <ArrowForwardIosIcon fontSize='small' />
            </div>
          ))}
      </DialogWindowWrapper>
    </>
  );
}

ColorsBar.propTypes = {
  onColorChange: PropTypes.func.isRequired,
  color: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        lang: PropTypes.string
      })
    ),
    simpleName: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        lang: PropTypes.string
      })
    ),
    colorHex: PropTypes.string
  }).isRequired
};

export default ColorCircle;

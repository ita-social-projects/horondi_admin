import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { push } from 'connected-react-router';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { noop } from 'lodash';
import {
  getColors,
  deleteColor,
  showColorDialogWindow,
  showBoundMaterialsWindow
} from '../../redux/color/color.actions';
import DialogWindowWrapper from '../dialog-window-wrapper';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import { useStyles } from './colors-bar.styles';
import CreateColor from '../create-color';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import { config } from '../../configs';
import { selectColors } from '../../redux/selectors/color.selectors';
import ColorsAutocomplete from '../colors-autocomplete';

const { SMALL_SIZE } = config.iconSizes;
const { REMOVE_COLOR_MESSAGE } = config.messages;
const { REMOVE_COLOR_DIALOG_TITLE } = config.messages;
const { CREATE_COLOR_TITLE } = config.buttonTitles;
const { createColorTitle, alreadyUse } = config.titles.colorTitles;
const { pathToMaterials } = config.routes;

function ColorsBar({ onColorChange, colors, onColorBlur, name, id }) {
  const dispatch = useDispatch();
  const {
    colors: colorsSet,
    boundMaterials,
    showBound,
    showCreateColor
  } = useSelector(selectColors);
  const styles = useStyles();
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const [selectedColor, setSelectedColor] = useState(colors);

  useEffect(() => {
    dispatch(getColors());
  }, [dispatch]);

  const colorDeleteHandler = (idColor) => {
    const removeColor = () => {
      dispatch(closeDialog());
      dispatch(deleteColor(idColor));
    };
    openSuccessSnackbar(
      removeColor,
      REMOVE_COLOR_MESSAGE,
      REMOVE_COLOR_DIALOG_TITLE
    );
  };

  return (
    <>
      <div className={styles.colorBar}>
        <ColorsAutocomplete
          name={name}
          id={id}
          colorsSet={colorsSet}
          selectedColors={selectedColor}
          handleChange={(value) => {
            setSelectedColor(value);
            onColorChange(value);
          }}
          handleBlur={onColorBlur}
          deleteHandler={colorDeleteHandler}
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
        title={alreadyUse}
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
                dispatch(push(`${pathToMaterials}/${material._id}`));
              }}
            >
              <span className={styles.materialName}>
                {material.name[0].value}
              </span>
              <ArrowForwardIosIcon fontSize={SMALL_SIZE} />
            </div>
          ))}
      </DialogWindowWrapper>
    </>
  );
}

ColorsBar.propTypes = {
  onColorChange: PropTypes.func.isRequired,
  onColorBlur: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.string,
  colors: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  )
};

ColorsBar.defaultProps = {
  colors: [],
  name: '',
  id: '',
  onColorBlur: noop
};

export default ColorsBar;

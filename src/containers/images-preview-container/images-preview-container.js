import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography
} from '@material-ui/core';
import { Button } from 'rsuite';
import { Delete } from '@material-ui/icons';
import { useStyles } from './images-preview-container.styles';
import { utils } from '../../utils/image-upload';
import preview from '../../assets/images/preview.png';
import { config } from '../../configs';

const { materialUiConstants } = config;

const ImagesPreviewContainer = ({ src, labels, multiple, imageHandler }) => {
  const style = useStyles();
  const [primaryImageIndex, setPrimaryImageIndex] = useState(0);
  const [arrItems, setArrItems] = useState([]);
  useEffect(() => {
    setArrItems(Array(8).fill({ src: preview, checked: false }));
    !!src.length &&
      src.forEach((item, index) => {
        const image = item?.src?.large
          ? {
              ...item,
              src: config.imagePrefix + item.src.large
            }
          : item;
        setArrItems((prev) => {
          const clone = [...prev];
          clone.splice(index, 1, { ...image, index });
          return clone;
        });
        if (item?.primary) setPrimaryImageIndex(index);
      });
  }, [src]);

  const checkedList = useMemo(() => arrItems.filter((item) => item.checked === true), [arrItems]);

  const disabledPrimary = checkedList.length !== 1;

  const handleChange = (e) => {
    setArrItems((prev) => {
      const clone = [...prev];
      clone[e.target.name] = {
        ...prev[e.target.name],
        checked: e.target.checked
      };
      return clone;
    });
  };

  const handlePrimaryImage = () => {
    imageHandler((prev) => {
      const clone = [...prev];
      clone[primaryImageIndex] = {
        ...clone[primaryImageIndex],
        primary: false
      };
      clone[checkedList[0].index] = {
        ...clone[checkedList[0].index],
        primary: true
      };
      return clone;
    });
  };

  const handleDelete = () => {
    imageHandler((prev) => {
      const newArr = [...prev].filter((item, idx) => {
        const check = checkedList.filter(({ index }) => index === idx);
        return item.src.preview !== check[0]?.src;
      });
      checkedList.forEach((item) => {
        if (item.primary && prev.length !== 1) newArr[0].primary = true;
      });
      return newArr;
    });
  };

  const handlePreviewPage = () => {
    // handler for preview product page
  };

  const list = Array.isArray(src)
    ? arrItems.map((file, index) => (
        <Grid item className={style.item} key={index}>
          <div className={style.thumb}>
            <div className={style.thumbInner}>
              <img
                src={file.src}
                className={style.img}
                alt={utils.alt.preview}
              />
            </div>
          </div>
          <div className={style.checkbox}>
            <Checkbox
              checked={arrItems[index]?.checked || false}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
              disabled={file.src === preview}
              name={file.index}
            />
          </div>
        </Grid>
      ))
    : null;

  if (src.length === 0) return null;

  return (
    <>
      <Grid container spacing={4}>
        <Grid item margin={10}>
          <Typography variant='h4'>{labels.primary}</Typography>
          <Box className={style.primary} data-cy={utils.dataCy.preview}>
            <div className={style.imagePrimary}>
              <div className={style.imagePrimaryInner}>
                <img
                  src={arrItems[primaryImageIndex]?.src}
                  className={style.img}
                  alt={utils.alt.preview}
                />
              </div>
            </div>
          </Box>
        </Grid>
        <Grid item margin={10}>
          <Typography variant='h4'>{labels.additional}</Typography>
          <Box className={style.listContainer}>{multiple && list}</Box>
        </Grid>
      </Grid>
      <Box className={style.buttonContainer}>
        <Box className={style.buttonGroup}>
          <FormControlLabel
            className={style.deleteLabel}
            control={<Delete color='error' />}
            onClick={handleDelete}
            label='Видалити'
          />
          <FormControlLabel
            control={
              <Checkbox
                name='primary'
                onChange={handlePrimaryImage}
                checked={
                  (checkedList.length &&
                    arrItems[checkedList[0].index]?.primary) ||
                  false
                }
                disabled={disabledPrimary}
              />
            }
            label='Встановити як основне фото продукту'
          />
        </Box>
        <Box>
          <Button
            variant={materialUiConstants.contained}
            color={materialUiConstants.primary}
            onClick={handlePreviewPage}
            size='medium'
            disabled
          >
            Попередній перегляд
          </Button>
        </Box>
      </Box>
    </>
  );
};

ImagesPreviewContainer.propTypes = {
  src: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.object()])
    )
  ).isRequired,
  labels: PropTypes.objectOf(PropTypes.string).isRequired,
  imageHandler: PropTypes.func.isRequired,
  multiple: PropTypes.bool
};

ImagesPreviewContainer.defaultProps = {
  multiple: false
};

export default ImagesPreviewContainer;

import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import { Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './slides-order.styles';
import { config } from '../../../configs';
import { StandardButton } from '../../../components/buttons';
import { slidesTranslations } from '../../../translations/home-page-slides.translations';
import {
  setSlides,
  updateSlidesOrder
} from '../../../redux/home-page-slides/home-page-slides.actions';
import { useCommonStyles } from '../../common.styles';
import {
  TranslAvailabilityHandler,
  isDraggableHandler,
  onDragEnterHandler,
  paperClassNameHandler,
  handleDragEnter,
  getStyles
} from '../../../utils/slides-order';

const SlidesOrder = (props) => {
  const styles = useStyles();
  const commonStyles = useCommonStyles();

  const dispatch = useDispatch();

  const { drugAndDropList } = props;
  const [list, setList] = useState(drugAndDropList);
  const [dragging, setDragging] = useState(false);
  const [draggable, setDraggable] = useState(false);
  const { IMG_URL } = config;
  const { discoverMoreTitle, slideOrderTitle, discoverMoreSymbol } =
    config.titles.homePageSliderTitle;
  const { OPEN_SLIDE_EDIT, SAVE_SLIDE_ORDER, CANCEL_SLIDE_ORDER } =
    config.buttonTitles;

  const { rowsPerPage } = useSelector(({ Table }) => ({
    rowsPerPage: Table.pagination.rowsPerPage
  }));

  const dragItem = useRef();
  const dragItemNode = useRef();

  const handlerDragStart = (e, item) => {
    dragItemNode.current = e.target;
    dragItemNode.current.addEventListener('dragend', handleDragEnd);
    dragItem.current = item;
    setDragging(true);
  };

  const handleDragEnd = () => {
    setDragging(false);
    dragItem.current = null;
    dragItemNode.current.removeEventListener('dragend', handleDragEnd);
    dragItemNode.current = null;
  };

  const changeHandler = () => {
    if (draggable) {
      setDraggable(false);
      setList(drugAndDropList);
      return;
    }
    setDraggable(true);
  };

  const saveHandler = () => {
    const available = [];
    const nonAvailable = [];
    list.forEach((el) => {
      if (el.title === 'available') {
        el.items.forEach((availableSlide, index) => {
          available.push({
            id: availableSlide._id,
            slide: { order: +index + 1, show: true, ...availableSlide }
          });
        });
      }
      if (el.title === 'nonAvailable') {
        el.items.forEach((nonAvailableSlide) => {
          nonAvailable.push({
            id: nonAvailableSlide._id,
            slide: { order: 0, show: false, ...nonAvailableSlide }
          });
        });
      }
    });
    const newSlideItems = [...available, ...nonAvailable];
    newSlideItems.forEach((item) =>
      dispatch(
        updateSlidesOrder({
          id: item.id,
          slide: { order: item.slide.order, show: item.slide.show }
        })
      )
    );
    const arrayToStore = newSlideItems.map((el) => el.slide);
    arrayToStore.length = rowsPerPage;
    dispatch(setSlides(arrayToStore));
    setDraggable(false);
  };
  const drugAndDropContainer = drugAndDropList.length
    ? list.map((group, groupIndex) => (
        <Card
          key={group.title}
          elevation={2}
          onDragEnter={onDragEnterHandler(
            dragging,
            group,
            handleDragEnter,
            groupIndex,
            0
          )}
          className={styles.dndGroup}
        >
          <Typography variant='h1' className={styles.slideTitle}>
            {TranslAvailabilityHandler(group, slidesTranslations)}
          </Typography>
          {group.items.map((item, itemIndex) => (
            <Paper
              draggable={draggable}
              elevation={5}
              onDragStart={(e) =>
                handlerDragStart(e, { groupIndex, itemIndex })
              }
              onDragEnter={
                dragging
                  ? (e) => {
                      handleDragEnter(
                        e,
                        { groupIndex, itemIndex },
                        dragItemNode,
                        setList,
                        dragItem
                      );
                    }
                  : null
              }
              className={paperClassNameHandler(
                dragging,
                getStyles,
                { groupIndex, itemIndex },
                styles
              )}
              key={item._id}
            >
              <Avatar
                variant='square'
                className={styles.square}
                src={`${IMG_URL}${item.images.small}`}
                color='primary'
              >
                <ImageIcon />
              </Avatar>
              <div className={styles.slideContent}>
                <div>
                  <h3>{item.title[0].value}</h3>
                  <p>{item.description[0].value}</p>
                </div>
                <p className={styles.discoverMore}>
                  {' '}
                  {discoverMoreTitle}
                  <span>{discoverMoreSymbol}</span>
                </p>
              </div>
            </Paper>
          ))}
        </Card>
      ))
    : null;
  return (
    <Paper elevation={3}>
      <div className={commonStyles.container}>
        <div className={commonStyles.adminHeader}>
          <Typography variant='h1' className={commonStyles.materialTitle}>
            {slideOrderTitle}
          </Typography>
          <div>
            <StandardButton
              className={styles.saveButton}
              color='secondary'
              data-cy='save'
              title={isDraggableHandler(
                draggable,
                CANCEL_SLIDE_ORDER,
                OPEN_SLIDE_EDIT
              )}
              onClickHandler={changeHandler}
              type='button'
            />
            <StandardButton
              className={styles.saveButton}
              data-cy='save'
              onClickHandler={saveHandler}
              title={SAVE_SLIDE_ORDER}
              disabled={!draggable}
              type='button'
            />
          </div>
        </div>
        <div className={styles.dndContainer}>{drugAndDropContainer}</div>
      </div>
    </Paper>
  );
};

const valueShape = PropTypes.shape({
  title: PropTypes.string
});

SlidesOrder.propTypes = {
  drugAndDropList: PropTypes.arrayOf(valueShape)
};
SlidesOrder.defaultProps = {
  drugAndDropList: []
};
export default SlidesOrder;

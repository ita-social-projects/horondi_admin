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
import { SaveButton } from '../../../components/buttons';
import { slidesTranslations } from '../../../translations/home-page-slides.translations';
import {
  setSlides,
  updateSlidesOrder
} from '../../../redux/home-page-slides/home-page-slides.actions';
import { useCommonStyles } from '../../common.styles';

const SlidesOrder = (props) => {
  const styles = useStyles();
  const commonStyles = useCommonStyles();

  const dispatch = useDispatch();

  const { drugAndDropList } = props;
  const [list, setList] = useState(drugAndDropList);
  const [dragging, setDragging] = useState(false);
  const [draggable, setDraggable] = useState(false);
  const { IMG_URL } = config;
  const {
    discoverMoreTitle,
    slideOrderTitle,
    discoverMoreSymbol
  } = config.titles.homePageSliderTitle;
  const {
    OPEN_SLIDE_EDIT,
    SAVE_SLIDE_ORDER,
    CANCEL_SLIDE_ORDER
  } = config.buttonTitles;

  const { slidesPerPage } = useSelector(({ Slides }) => ({
    slidesPerPage: Slides.pagination.slidesPerPage
  }));

  const dragItem = useRef();
  const dragItemNode = useRef();

  const handlerDragStart = (e, item) => {
    dragItemNode.current = e.target;
    dragItemNode.current.addEventListener('dragend', handleDragEnd);
    dragItem.current = item;
    setDragging(true);
  };

  const handleDragEnter = (e, targetItem) => {
    if (dragItemNode.current !== e.target) {
      setList((oldList) => {
        const newList = JSON.parse(JSON.stringify(oldList));
        newList[targetItem.groupIndex].items.splice(
          targetItem.itemIndex,
          0,
          newList[dragItem.current.groupIndex].items.splice(
            dragItem.current.itemIndex,
            1
          )[0]
        );
        dragItem.current = targetItem;
        return newList;
      });
    }
  };

  const handleDragEnd = () => {
    setDragging(false);
    dragItem.current = null;
    dragItemNode.current.removeEventListener('dragend', handleDragEnd);
    dragItemNode.current = null;
  };

  const getStyles = (item) => {
    if (
      dragItem.current.groupIndex === item.groupIndex &&
      dragItem.current.itemIndex === item.itemIndex
    ) {
      return `${styles.dndItem} ${styles.current}`;
    }
    return styles.dndItem;
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
          const { order, show, ...rest } = availableSlide;
          available.push({
            id: availableSlide._id,
            slide: { order: +index + 1, show: true, ...rest }
          });
        });
      }
      if (el.title === 'nonAvailable') {
        el.items.forEach((nonAvailableSlide) => {
          const { order, show, ...rest } = nonAvailableSlide;
          nonAvailable.push({
            id: nonAvailableSlide._id,
            slide: { order: 0, show: false, ...rest }
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
    arrayToStore.length = slidesPerPage;
    dispatch(setSlides(arrayToStore));
    setDraggable(false);
  };
  const drugAndDropContainer = drugAndDropList.length
    ? list.map((group, groupIndex) => (
      <Card
        key={group.title}
        elevation={2}
        onDragEnter={
          dragging && !group.items.length
            ? (e) => handleDragEnter(e, { groupIndex, itemIndex: 0 })
            : null
        }
        className={styles.dndGroup}
      >
        <Typography variant='h1' className={styles.slideTitle}>
          {group.title === 'available'
            ? slidesTranslations.available
            : slidesTranslations.nonAvailable}
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
                  handleDragEnter(e, { groupIndex, itemIndex });
                }
                : null
            }
            className={
              dragging ? getStyles({ groupIndex, itemIndex }) : styles.dndItem
            }
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
            <SaveButton
              className={styles.saveButton}
              color='secondary'
              data-cy='save'
              title={draggable ? CANCEL_SLIDE_ORDER : OPEN_SLIDE_EDIT}
              onClickHandler={changeHandler}
              type='button'
            />
            <SaveButton
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

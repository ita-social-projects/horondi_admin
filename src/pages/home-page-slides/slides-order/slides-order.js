import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import {Typography } from '@material-ui/core';
import { useDispatch} from 'react-redux';
import { useStyles } from './slides-order.styles';
import { config } from '../../../configs';
import { SaveButton } from '../../../components/buttons';
import { slidesTranslations } from '../../../translations/home-page-slides.translations';
import {
  setSlides,
  updateSlidesOrder
} from '../../../redux/home-page-slides/home-page-slides.actions';

const SlidesOrder = (props) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { drugAndDropList } = props;
  const [list, setList] = useState(drugAndDropList);
  const [dragging, setDragging] = useState(false);
  const [draggable, setDraggable] = useState(false);
  const { IMG_URL } = config;
  const {discoverMoreTitle,
    slideOrderTitle} = config.titles.homePageSliderTitle;
  const {OPEN_SLIDE_EDIT,SAVE_SLIDE_ORDER} = config.buttonTitles
  const dragItem = useRef();
  const dragItemNode = useRef();

  const handlerDragStart = (e, item) => {
    dragItemNode.current = e.target;
    dragItemNode.current.addEventListener('dragend', handleDragEnd);
    dragItem.current = item;
    setTimeout(() => {
      setDragging(true);
    }, 100);
  };

  const handleDragEnter = (e, targetItem) => {
    if (dragItemNode.current !== e.target) {
      setList(oldList => {
        const newList = JSON.parse(JSON.stringify(oldList));
        newList[targetItem.grpI].items
          .splice(targetItem.itemI, 0, newList[dragItem.current.grpI]
            .items.splice(dragItem.current.itemI, 1)[0]);
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
    if (dragItem.current.grpI === item.grpI && dragItem.current.itemI === item.itemI) {
      return `${styles.dndItem} ${styles.current}`;
    }
    return styles.dndItem;
  };
  const changeHandler = () => setDraggable(true);
  const saveHandler = ()=>{
    const availableArray = []
    const nonAvailableArray = []
    list.forEach(el=>{

      if(el.title==='available'){
        el.items.map((availableSlide,index) => {
          const {order,show,...rest} = availableSlide
          availableArray.push({id:availableSlide._id,slide:{order:+index+1, show:true, ...rest}})
          return {order,show}
        });
      }
      if(el.title==='nonAvailable'){
        el.items.map((nonAvailableSlide) => {
          const {order,show,...rest} = nonAvailableSlide
          nonAvailableArray.push({id:nonAvailableSlide._id,slide:{order:0, show:false, ...rest}})
          return {order,show}
        });
      }
    });
    const newSlideItems = availableArray.concat(nonAvailableArray)
    newSlideItems.forEach(item=>dispatch(updateSlidesOrder({id:item.id, slide:{order:item.slide.order, show:item.slide.show}})))
    const arrayToStore = []
    newSlideItems.forEach(el=>arrayToStore.push(el.slide))
    dispatch(setSlides(arrayToStore))
    setDraggable(false)
  }
  const dnbContainer = drugAndDropList.length
    ? list.map((grp, grpI) => (
      <Card key={grp.title}
        elevation={2}
        onDragEnter={dragging && !grp.items.length ? (e) => handleDragEnter(e, { grpI, itemI: 0 }) : null}
        className={styles.dndGroup}
      >
        <Typography variant='h1' className={styles.slideTitle}>
          {
            grp.title ==='available'
              ? slidesTranslations.available
              : slidesTranslations.nonAvailable
          }
        </Typography>
        {grp.items.map((item, itemI) => (
          <Paper
            draggable={draggable}
            elevation={5}
            onDragStart={(e) => handlerDragStart(e, { grpI, itemI })}
            onDragEnter={dragging ? (e) => {
              handleDragEnter(e, { grpI, itemI });
            } : null}
            className={dragging ? getStyles({ grpI, itemI }) : styles.dndItem}
            key={item._id}
          >
            <Avatar variant='square'
              className={styles.square}
              src={
                `${IMG_URL}${item.images.small}`
              }
              color='primary'
            >
              <ImageIcon />
            </Avatar>
            <div className={styles.slideContent}>
              <div>
                <h3>{item.title[0].value}</h3>
                <p>{item.description[0].value}</p>
              </div>
              <p className={styles.discoverMore}> {discoverMoreTitle}
                <span>&#8594;</span></p>
            </div>
          </Paper>
        ))}
      </Card>
    ))
    : null;
  return (
    <Paper elevation={3}>
      <div className={styles.container}>
        <Typography variant='h1' className={styles.slideTitle}>
          {slideOrderTitle}
        </Typography>
        <div>
          <div>
            <SaveButton
              color='secondary'
              data-cy='save'
              title={OPEN_SLIDE_EDIT}
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
          <div className={styles.dndContainer}>
            {dnbContainer}
          </div>
        </div>
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

import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './slides-order.styles';
import { config } from '../../../configs';
import { StandardButton } from '../../../components/buttons';
import Column from '../../../components/draganddrop';
import {
  setSlides,
  updateSlidesOrder
} from '../../../redux/home-page-slides/home-page-slides.actions';
import { useCommonStyles } from '../../common.styles';

import { convertSliderData } from '../../../utils/data-helper';

const SlidesOrder = (props) => {
  const styles = useStyles();
  const commonStyles = useCommonStyles();

  const dispatch = useDispatch();

  const { drugAndDropList } = props;
  const [dragged, setDragged] = useState(true);
  const [data, setData] = useState(null);
  const { slideOrderTitle } = config.titles.homePageSliderTitle;
  const { SAVE_SLIDE_ORDER } = config.buttonTitles;

  const { rowsPerPage } = useSelector(({ Table }) => ({
    rowsPerPage: Table.pagination.rowsPerPage
  }));

  useEffect(() => {
    if (drugAndDropList.length) setData(convertSliderData(drugAndDropList));
  }, [drugAndDropList]);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const home = data[source.droppableId];
    const foreign = data[destination.droppableId];
    if (home === foreign) {
      const newTaskIds = Array.from(home.items);
      const [removedItem] = newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, removedItem);

      const newItemObject = {
        ...home,
        items: newTaskIds
      };

      const newObjectState = {
        ...data,
        [newItemObject.title]: newItemObject
      };

      setDragged(false);
      setData(newObjectState);
      return;
    }
    const homeTaskIds = Array.from(home.items);
    const [removed] = homeTaskIds.splice(source.index, 1);
    const newHome = {
      ...home,
      items: homeTaskIds
    };

    const foreignTaskIds = Array.from(foreign.items);
    foreignTaskIds.splice(destination.index, 0, removed);
    const newForeign = {
      ...foreign,
      items: foreignTaskIds
    };

    const newState = {
      ...data,
      [newHome.title]: newHome,
      [newForeign.title]: newForeign
    };
    setDragged(false);
    setData(newState);
  };

  const saveHandler = () => {
    const available = [];
    const nonAvailable = [];
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'available') {
        value.items.forEach((availableSlide, index) => {
          available.push({
            id: availableSlide._id,
            slide: { ...availableSlide, order: +index + 1, show: true }
          });
        });
      }
      if (key === 'nonAvailable') {
        value.items.forEach((nonAvailableSlide) => {
          nonAvailable.push({
            id: nonAvailableSlide._id,
            slide: { ...nonAvailableSlide, order: 0, show: false }
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
  };

  return (
    <Paper elevation={10}>
      <div className={commonStyles.container}>
        <div className={commonStyles.adminHeader}>
          <Typography variant='h1' className={commonStyles.materialTitle}>
            {slideOrderTitle}
          </Typography>
          <div>
            <StandardButton
              className={styles.saveButton}
              data-cy='save'
              onClickHandler={saveHandler}
              title={SAVE_SLIDE_ORDER}
              disabled={dragged}
              type='button'
            />
          </div>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <div style={{}}>
            {data &&
              data.columnData.map((col) => (
                <Column
                  key={data[col].title}
                  column={data[col]}
                  tasks={data[col].items}
                />
              ))}
          </div>
        </DragDropContext>
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

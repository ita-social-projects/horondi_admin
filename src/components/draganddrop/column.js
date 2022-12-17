import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import { Typography, Paper } from '@material-ui/core';
import Slide from './slide';
import { useStyles } from './column.styles';
import { useCommonStyles } from '../../pages/common.styles';

const Column = ({ column }) => {
  const commonStyles = useCommonStyles();
  const styles = useStyles();
  const handleTitle = (title) =>
    title === 'available' ? 'Активні' : 'Неактивні';

  return (
    <Paper elevation={3} className={styles.columnContainer}>
      <Typography variant='h3' style={{ padding: '10px' }}>
        {handleTitle(column.title)}
      </Typography>
      <Droppable droppableId={column.title} direction='horizontal'>
        {(provided, snapshot) => (
          <div
            className={styles.taskListContainer}
            ref={provided.innerRef}
            {...provided.droppableProps}
            isdraggingover={snapshot.isDraggingOver.toString()}
          >
            {column.items.length ? (
              column.items.map((slide, index) => (
                <Slide key={slide._id} slide={slide} index={index} />
              ))
            ) : (
              <div>
                <p className={commonStyles.noRecords}>Слайди відсутні</p>
                <p
                  className={commonStyles.noRecords}
                  style={{ fontSize: 'smaller' }}
                >
                  Перетягніть сюди слайд з іншої колонки
                </p>
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Paper>
  );
};

const valueShape = PropTypes.shape({
  description: PropTypes.arrayOf(
    PropTypes.shape({
      lang: PropTypes.string,
      value: PropTypes.string
    })
  ),
  images: PropTypes.shape({
    thumbnail: PropTypes.string
  }),
  link: PropTypes.string,
  order: PropTypes.number,
  show: PropTypes.bool,
  title: PropTypes.arrayOf(
    PropTypes.shape({
      lang: PropTypes.string,
      value: PropTypes.string
    })
  ),
  _id: PropTypes.string
});

Column.propTypes = {
  column: PropTypes.shape({
    items: PropTypes.arrayOf(valueShape),
    title: PropTypes.string
  }).isRequired
};

export default Column;

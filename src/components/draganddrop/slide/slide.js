import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Container, Paper, Avatar } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import PropTypes from 'prop-types';

import { config } from '../../../configs';
import { useStyles } from './slide.styles';

const Slide = ({ slide, index }) => {
  const styles = useStyles();
  const { IMG_URL } = config;
  return (
    <Draggable
      style={(_isdragging, draggableStyle) => ({
        ...draggableStyle,
        position: 'static'
      })}
      draggableId={slide._id}
      index={index}
    >
      {(provided, snapshot) => (
        <Container
          className={styles.dndDivison}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          innerRef={provided.innerRef}
          isdragging={snapshot.isDragging.toString()}
        >
          <Paper elevation={20} className={styles.dndItem} key={slide._id}>
            <Avatar
              variant='square'
              className={styles.square}
              src={`${IMG_URL}${slide.images.small}`}
              color='primary'
            >
              <ImageIcon />
            </Avatar>
            <div className={styles.slideContent}>
              <div>
                <h3>{slide.title[0].value}</h3>
                <p>{slide.description[0].value}</p>
              </div>
            </div>
          </Paper>
        </Container>
      )}
    </Draggable>
  );
};

Slide.propTypes = {
  slide: PropTypes.shape({
    description: PropTypes.arrayOf(
      PropTypes.shape({
        lang: PropTypes.string,
        value: PropTypes.string
      })
    ),
    images: PropTypes.shape({
      small: PropTypes.string
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
  }),
  index: PropTypes.number
};

Slide.defaultProps = {
  slide: {},
  index: null
};

export default Slide;

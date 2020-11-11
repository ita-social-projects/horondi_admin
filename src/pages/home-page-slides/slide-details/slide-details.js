import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useStyles } from './slide-details.styles';
import HomePageSlideForm from '../../../components/home-page-slide-form';
import { getAvailableSlides, getSlide } from '../../../redux/home-page-slides/home-page-slides.actions';
import LoadingBar from '../../../components/loading-bar';

const SlideDetails = ({ match }) =>{
  const { id } = match.params;
  const styles = useStyles();
  const dispatch = useDispatch();
  const { loading, slide,availableSlides } = useSelector(({ Slides }) => ({
    loading: Slides.slideLoading,
    slide: Slides.slide,
    availableSlides: Slides.availableSlides
  }));

  useEffect(() => {
    dispatch(getSlide(id));
    dispatch(getAvailableSlides())
  }, [dispatch,id]);

  const slideOrder = availableSlides.filter(slideItem=>slideItem.show).length + 1

  if (loading) {
    return <LoadingBar />;
  }
  return(
    <div className={styles.container}>
      {slide? <HomePageSlideForm slide={slide} id={id} slideOrder={slideOrder} />: null}
    </div>
  )
}
const valueShape = PropTypes.shape({
  value: PropTypes.string
});

SlideDetails.propTypes = {
  slide: PropTypes.shape({
    _id: PropTypes.string,
    show: PropTypes.bool,
    description: PropTypes.arrayOf(valueShape),
    images: PropTypes.shape({
      thumbnail: PropTypes.string
    }),
    link: PropTypes.string,
    order: PropTypes.number,
    title: PropTypes.arrayOf(valueShape)
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired
};

SlideDetails.defaultProps = {
  slide: {}
};

export default SlideDetails

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './slide-add.styles';
import HomePageSlideForm from '../../../components/home-page-slide-form';
import { getAvailableSlides, getSlide } from '../../../redux/home-page-slides/home-page-slides.actions';
import LoadingBar from '../../../components/loading-bar';

const SlideAdd = () =>{
  const styles = useStyles();
  const dispatch = useDispatch();
  const { loading, availableSlides } = useSelector(({ Slides }) => ({
    loading: Slides.slideLoading,
    availableSlides: Slides.availableSlides
  }));
  useEffect(() => {
    dispatch(
      getAvailableSlides()
    );
  }, [dispatch]);

  const slideOrder = availableSlides.filter(slide=>slide.show===true).length + 1
  if (loading) {
    return <LoadingBar />;
  }
  return(
    <div className={styles.container}>
      <HomePageSlideForm slideOrder={slideOrder} />
    </div>
  )
}

export default SlideAdd

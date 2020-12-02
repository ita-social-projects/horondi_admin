import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Paper, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';
import { push } from 'connected-react-router';
import { useStyles } from './slides-page.styles';
import { config } from '../../../configs';
import {
  deleteSlide,
  getAvailableSlides,
  getSlides,
  setSlidesCurrentPage
} from '../../../redux/home-page-slides/home-page-slides.actions';
import LoadingBar from '../../../components/loading-bar';
import TableContainerGenerator from '../../../containers/table-container-generator';
import TableContainerRow from '../../../containers/table-container-row';
import { slidesTranslations } from '../../../translations/home-page-slides.translations';
import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';
import SlidesOrder from '../slides-order';
import { useCommonStyles } from '../../common.styles';

const { REMOVE_SLIDE_MESSAGE } = config.messages;
const { DELETE_TITLE, CREATE_SLIDE_TITLE } = config.buttonTitles;
const tableTitles = config.tableHeadRowTitles.homePageSlides;
const { mainPageTitle, slideTitle } = config.titles.homePageSliderTitle;
const { pathToAddHomePageSlide } = config.routes;

const SlidesPage = () => {
  const styles = useStyles();
  const commonStyles = useCommonStyles();

  const dispatch = useDispatch();

  const { openSuccessSnackbar } = useSuccessSnackbar();

  const {
    list,
    loading,
    pagesCount,
    currentPage,
    slidesPerPage,
    drugAndDropList
  } = useSelector(({ Slides }) => ({
    list: Slides.list,
    loading: Slides.slideLoading,
    pagesCount: Slides.pagination.pagesCount,
    currentPage: Slides.pagination.currentPage,
    slidesPerPage: Slides.pagination.slidesPerPage,
    drugAndDropList: Slides.drugAndDropList,
    editStatus: Slides.editStatus
  }));

  useEffect(() => {
    dispatch(getAvailableSlides());
    dispatch(
      getSlides({
        limit: slidesPerPage,
        skip: currentPage * slidesPerPage,
        slidesPerPage
      })
    );
  }, [dispatch, slidesPerPage, currentPage]);

  const slideDeleteHandler = (id) => {
    const removeSlide = () => {
      dispatch(closeDialog());
      dispatch(deleteSlide(id));
    };
    openSuccessSnackbar(
      removeSlide,
      DELETE_TITLE,
      REMOVE_SLIDE_MESSAGE,
      DELETE_TITLE,
      'danger'
    );
  };
  const slidesItems = list.length
    ? list.map((slidesItem) => (
      <TableContainerRow
        key={slidesItem._id}
        showAvatar={false}
        id={slidesItem.id}
        index={slidesItem.order}
        name={slidesItem.title[0].value || slideTitle}
        available={
          slidesItem.show ? slidesTranslations.YES : slidesTranslations.NO
        }
        deleteHandler={() => slideDeleteHandler(slidesItem._id)}
        editHandler={() => {
          dispatch(push(`/home-page-slides/${slidesItem._id}`));
        }}
      />
    ))
    : null;
  const changeHandler = (e, value) => dispatch(setSlidesCurrentPage(value));

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={commonStyles.container}>
      <div className={commonStyles.adminHeader}>
        <Typography variant='h1' className={commonStyles.materialTitle}>
          {mainPageTitle}
        </Typography>
        <Button
          className={styles.createButton}
          data-cy='add-button'
          component={Link}
          to={pathToAddHomePageSlide}
          variant='contained'
          color='primary'
        >
          {CREATE_SLIDE_TITLE}
        </Button>
      </div>
      <div className={styles.tableContainer}>
        <TableContainerGenerator
          tableTitles={tableTitles}
          tableItems={slidesItems}
        />
      </div>
      <div className={commonStyles.pagination}>
        <Pagination
          className={styles.pagination}
          count={pagesCount}
          variant='outlined'
          shape='rounded'
          page={currentPage + 1}
          onChange={changeHandler}
        />
      </div>
      <Paper elevation={3}>
        <SlidesOrder drugAndDropList={drugAndDropList} />
      </Paper>
    </div>
  );
};

export default SlidesPage;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Paper, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
import { useStyles } from './slides-page.styles';
import { config } from '../../configs';
import {
  deleteSlide,
  getAvailableSlides,
  getSlides
} from '../../redux/home-page-slides/home-page-slides.actions';
import LoadingBar from '../../components/loading-bar';
import TableContainerGenerator from '../../containers/table-container-generator';
import TableContainerRow from '../../containers/table-container-row';
import { slidesTranslations } from '../../translations/home-page-slides.translations';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import SlidesOrder from './slides-order';
import { useCommonStyles } from '../common.styles';
import { selectSlidesAndTable } from '../../redux/selectors/home-page-slides.selectors';

const { REMOVE_SLIDE_MESSAGE } = config.messages;
const { CREATE_SLIDE_TITLE } = config.buttonTitles;
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
    drugAndDropList,
    itemsCount,
    rowsPerPage,
    currentPage
  } = useSelector(selectSlidesAndTable);

  useEffect(() => {
    dispatch(getAvailableSlides());
    dispatch(
      getSlides({
        limit: rowsPerPage,
        skip: currentPage * rowsPerPage
      })
    );
  }, [dispatch, rowsPerPage, currentPage]);

  const slideDeleteHandler = (id) => {
    const removeSlide = () => {
      dispatch(closeDialog());
      dispatch(deleteSlide(id));
    };
    openSuccessSnackbar(removeSlide, REMOVE_SLIDE_MESSAGE);
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
          pagination
          count={itemsCount}
          tableTitles={tableTitles}
          tableItems={slidesItems}
        />
      </div>
      <Paper elevation={3}>
        <SlidesOrder drugAndDropList={drugAndDropList} />
      </Paper>
    </div>
  );
};

export default SlidesPage;

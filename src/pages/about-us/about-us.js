import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useStyles } from './about-us.styles';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import materialUiConstants from '../../configs/material-ui-constants';
import { config } from '../../configs';
import LoadingBar from '../../components/loading-bar';
import { getBusinessTextByCode } from './operations/about-us.queries';
import {
  updateBusinessTextByCode,
  deleteFiles
} from '../../components/forms/about-us-forms/operations/about-us.mutation';
import {
  showSuccessSnackbar,
  showErrorSnackbar
} from '../../redux/snackbar/snackbar.actions';
import {
  setVariablesForUpdatingPage,
  getBusinessPageWithoutSection,
  getImageNamesFromSection
} from '../../utils/about-us-helper';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';

const { aboutUsHeaderTitles, aboutUsFooterTitles, aboutUsTitles } =
  config.tableHeadRowTitles;
const { SUCCESS_DELETE_STATUS } = config.statuses;
const { ERROR_BOUNDARY_STATUS } = config.errorStatuses;

const { ADD_ABOUT_US_SECTION } = config.buttonTitles;
const {
  pathToAboutUsAddSection,
  pathToAboutUsFooterImgEdit,
  pathToAboutUsTitleEdit,
  pathToAboutUsSectionEdit
} = config.routes;
const { code, DELETE_SECTION_MESSAGE, DELETE_SECTION_TITLE } =
  config.labels.aboutUs;

const AboutUs = () => {
  const [businessPage, setBusinessPage] = useState();
  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { openSuccessSnackbar } = useSuccessSnackbar();

  const {
    loading: getBusinessTextLoading,
    refetch,
    isRefetching
  } = useQuery(getBusinessTextByCode, {
    fetchPolicy: 'network-only',
    variables: {
      code
    },
    onCompleted: (data) => setBusinessPage(data.getBusinessTextByCode)
  });

  const [updateBusinessPage, { data, loading: updateBusinessTextLoading }] =
    useMutation(updateBusinessTextByCode, {
      onCompleted: (data) => {
        if (data?.updateBusinessText?.message) {
          dispatch(showErrorSnackbar(ERROR_BOUNDARY_STATUS));
        } else {
          refetch();
          dispatch(showSuccessSnackbar(SUCCESS_DELETE_STATUS));
        }
      },
      onError: (_err) => {
        dispatch(showErrorSnackbar(ERROR_BOUNDARY_STATUS));
      }
    });

  useEffect(() => {
    if (data) {
      setBusinessPage(data.updateBusinessText);
    }
  }, [data]);

  const [deleteImg] = useMutation(deleteFiles);

  const editTitleHandler = () => history.push(pathToAboutUsTitleEdit);
  const editSectionHandler = (id) =>
    history.push(pathToAboutUsSectionEdit.replace(':id', id));
  const deleteSectionHandler = (id) => {
    const removeSection = async () => {
      dispatch(closeDialog());
      const imgNames = getImageNamesFromSection(businessPage, id);
      deleteImg({ variables: { fileNames: imgNames } });

      const updatedBusinessPage = getBusinessPageWithoutSection(
        businessPage,
        id
      );
      const variables = setVariablesForUpdatingPage(updatedBusinessPage);
      updateBusinessPage({ variables });
    };
    openSuccessSnackbar(
      removeSection,
      DELETE_SECTION_MESSAGE,
      DELETE_SECTION_TITLE
    );
  };
  const editFooterImgHandler = () => history.push(pathToAboutUsFooterImgEdit);

  const titleItem = businessPage
    ? [
        <TableContainerRow
          showAvatar={false}
          key={businessPage.title[0].value}
          title={businessPage.title[0].value}
          showDelete={false}
          editHandler={editTitleHandler}
        />
      ]
    : [];

  const sectionItems = businessPage
    ? businessPage.sections[0].value.map(({ id, title, text, img }) => (
        <TableContainerRow
          showAvatar={false}
          key={id}
          title={title}
          text={ReactHtmlParser(text)}
          image={img.src}
          editHandler={() => editSectionHandler(id)}
          deleteHandler={() => deleteSectionHandler(id)}
        />
      ))
    : [];

  const footerItem = businessPage
    ? [
        <TableContainerRow
          showAvatar={false}
          key={businessPage.footerImg.name}
          image={businessPage.footerImg.src}
          showDelete={false}
          editHandler={editFooterImgHandler}
        />
      ]
    : [];

  if (getBusinessTextLoading || updateBusinessTextLoading || isRefetching) {
    return <LoadingBar />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.adminHeader}>
        <Typography
          variant={materialUiConstants.typographyVariantH1}
          className={styles.materialTitle}
        >
          {config.titles.aboutUsTitles.mainTitle}
        </Typography>
        <Button
          id='about-us-add'
          component={Link}
          to={pathToAboutUsAddSection}
          variant={materialUiConstants.outlined}
          color={materialUiConstants.primary}
        >
          {ADD_ABOUT_US_SECTION}
        </Button>
      </div>
      <TableContainerGenerator
        className={styles.header}
        id='AboutUsHeaderTable'
        tableTitles={aboutUsHeaderTitles}
        tableItems={titleItem}
      />
      <TableContainerGenerator
        className={styles.items}
        id='AboutUsTable'
        tableTitles={aboutUsTitles}
        tableItems={sectionItems}
      />
      <TableContainerGenerator
        className={styles.footer}
        id='AboutUsFooterTable'
        tableTitles={aboutUsFooterTitles}
        tableItems={footerItem}
      />
    </div>
  );
};

export default AboutUs;

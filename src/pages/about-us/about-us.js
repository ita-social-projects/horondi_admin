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
import { getBusinessTextByCodeWithPopulatedTranslationsKey } from './operations/about-us.queries';
import {
  updateBusinessText,
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
import noImage from '../../assets/images/no-image.png';

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
  const uaTranslations = businessPage ? businessPage.translations.ua : null;

  const {
    loading: getBusinessTextLoading,
    refetch: getBusinessTextRefetch,
    isRefetching
  } = useQuery(getBusinessTextByCodeWithPopulatedTranslationsKey, {
    fetchPolicy: 'network-only',
    variables: {
      code
    },
    onCompleted: (data) =>
      setBusinessPage(data.getBusinessTextByCodeWithPopulatedTranslationsKey)
  });

  const [
    updateBusinessPage,
    { data: updatedData, loading: updateBusinessTextLoading }
  ] = useMutation(updateBusinessText, {
    onCompleted: (data) => {
      if (data?.updateBusinessText?.message) {
        dispatch(showErrorSnackbar(ERROR_BOUNDARY_STATUS));
      } else {
        getBusinessTextRefetch();
        dispatch(showSuccessSnackbar(SUCCESS_DELETE_STATUS));
      }
    },
    onError: () => {
      dispatch(showErrorSnackbar(ERROR_BOUNDARY_STATUS));
    }
  });

  useEffect(() => {
    if (updatedData) {
      setBusinessPage(updatedData.updateBusinessText);
    }
  }, [updatedData]);

  const [deleteImg] = useMutation(deleteFiles);

  const editTitleHandler = () => history.push(pathToAboutUsTitleEdit);
  const editSectionHandler = (id) =>
    history.push(pathToAboutUsSectionEdit.replace(':id', id));

  const deleteSectionHandler = (id) => {
    const removeSection = async () => {
      dispatch(closeDialog());
      const imgNames = getImageNamesFromSection(businessPage, id);
      imgNames && deleteImg({ variables: { fileNames: imgNames } });

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

  if (
    getBusinessTextLoading ||
    updateBusinessTextLoading ||
    isRefetching ||
    !businessPage
  ) {
    return <LoadingBar />;
  }

  if (businessPage) {
    const items = [
      {
        showAvatar: false,
        key: uaTranslations.title,
        title: uaTranslations.title,
        showDelete: false,
        editHandler: editTitleHandler
      },
      {
        showAvatar: false,
        key: businessPage.footerImg.name,
        image: businessPage.footerImg.src,
        showDelete: false,
        editHandler: editFooterImgHandler
      }
    ];

    const titleItemAndFooterItem = items.map((item) => [
      <TableContainerRow
        showAvatar={item.showAvatar}
        key={item.key}
        title={item?.title}
        showDelete={item.showDelete}
        editHandler={item.editHandler}
        image={item?.image}
      />
    ]);

    const sectionItems = uaTranslations.sections.map(
      ({ id, title, text }, idx) => (
        <TableContainerRow
          showAvatar={false}
          key={id}
          title={title}
          text={ReactHtmlParser(text)}
          image={businessPage.sectionsImgs[idx].src || noImage}
          editHandler={() => editSectionHandler(id)}
          deleteHandler={() => deleteSectionHandler(id)}
        />
      )
    );

    const tables = [
      {
        id: 'AboutUsHeaderTable',
        className: styles.header,
        tableTitles: aboutUsHeaderTitles,
        tableItems: titleItemAndFooterItem[0]
      },
      {
        id: 'AboutUsTable',
        className: styles.items,
        tableTitles: aboutUsTitles,
        tableItems: sectionItems
      },
      {
        id: 'AboutUsFooterTable',
        className: styles.footer,
        tableTitles: aboutUsFooterTitles,
        tableItems: titleItemAndFooterItem[1]
      }
    ];

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
        {tables.map((table) => (
          <TableContainerGenerator
            key={table.id}
            id={table.id}
            className={table.className}
            tableTitles={table.tableTitles}
            tableItems={table.tableItems || []}
          />
        ))}
      </div>
    );
  }
};

export default AboutUs;

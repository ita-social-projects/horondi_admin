import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper,
  TextField,
  Grid,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import useBusinessHandlers from '../../../utils/use-business-handlers';
import Editor from '../../../components/editor';
import { useStyles } from './business-page-form.styles';
import { SaveButton, BackButton } from '../../../components/buttons';
import TabPanel from '../../../components/tab-panel';
import LoadingBar from '../../../components/loading-bar';

import {
  addBusinessPage,
  getBusinessPageById,
  updateBusinessPage
} from '../../../redux/business-pages/business-pages.actions';
import { config } from '../../../configs';
import { useCommonStyles } from '../../common.styles';

const BusinessPageForm = ({ id, editMode }) => {
  const dispatch = useDispatch();
  const { loading, businessPage } = useSelector(({ BusinessPages }) => ({
    loading: BusinessPages.loading,
    businessPage: BusinessPages.currentPage
  }));
  const [shouldValidate, setShouldValidate] = useState(false);

  const classes = useStyles();
  const common = useCommonStyles();

  const labels = config.labels.businessPage;

  const {
    tabsValue,
    handleTabsChange,
    createBusinessPage,
    uaSetText,
    enSetText,
    uaSetTitle,
    enSetTitle,
    uaText,
    enText,
    enTitle,
    uaTitle,
    code,
    setCode,
    files,
    setFiles,
    languages
  } = useBusinessHandlers();

  const { editorField } = config.formRegExp;

  useEffect(() => {
    id && dispatch(getBusinessPageById(id));
  }, [dispatch, id]);

  useEffect(() => {
    const isEditingReady = businessPage && editMode;

    setCode(isEditingReady ? businessPage.code : '');
    uaSetTitle(isEditingReady ? businessPage.title[0].value : '');
    uaSetText(isEditingReady ? businessPage.text[0].value : '');
    enSetTitle(isEditingReady ? businessPage.title[1].value : '');
    enSetText(isEditingReady ? businessPage.text[1].value : '');
  }, [
    code,
    setCode,
    editMode,
    businessPage,
    uaSetText,
    uaSetTitle,
    enSetText,
    enSetTitle
  ]);

  const checkValidation = (values) => {
    const requiredValidationArray = [...Object.values(values)];
    const editorFields = [uaText, enText];

    return (
      requiredValidationArray.every((field) => field.trim()) &&
      editorFields.every((field) => !editorField.test(field) || field)
    );
  };

  const formik = useFormik({
    initialValues: {
      code,
      uaTitle,
      enTitle
    },
    onSubmit: async (values) => {
      if (!checkValidation(values)) {
        setShouldValidate(true);
        return;
      }

      const uniqueFiles = files.filter((file, i) => {
        const { name, size } = file;
        return (
          i === files.findIndex((obj) => obj.name === name && obj.size === size)
        );
      });

      const newUaText = uaText.replace(/src="data:image.*?"/g, 'src=""');
      const newEnText = enText.replace(/src="data:image.*?"/g, 'src=""');

      const page = createBusinessPage({
        ...values,
        uaText: newUaText,
        enText: newEnText
      });
      editMode
        ? dispatch(updateBusinessPage({ id, page, files: uniqueFiles }))
        : dispatch(addBusinessPage({ page, files: uniqueFiles }));
    }
  });

  useMemo(() => {
    formik.values.code = code;
    formik.values.uaTitle = uaTitle;
    formik.values.enTitle = enTitle;
  }, [code, uaTitle, enTitle]);

  const languageTabs = languages.map((lang) => (
    <Tab label={lang} key={lang} data-cy={lang} />
  ));

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={common.container}>
      <div className={common.adminHeader}>
        <Typography
          variant='h1'
          className={common.materialTitle}
          data-cy='add-header'
        >
          {config.titles.businessPageTitles.addBusinessPageTitle}
        </Typography>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <Grid item xs={12}>
            <Paper className={classes.businessPageForm}>
              <TextField
                id='code'
                className={classes.textField}
                variant='outlined'
                label='Код сторінки'
                value={formik.values.code}
                onChange={formik.handleChange}
                error={!formik.values.code && shouldValidate}
                helperText={
                  !formik.values.code && shouldValidate
                    ? 'Введіть унікальний ідентифікатор для сторінки'
                    : ''
                }
                data-cy='page-code'
              />
            </Paper>
          </Grid>
          <Paper className={classes.tabField}>
            <Tabs
              className={common.tabs}
              value={tabsValue}
              onChange={handleTabsChange}
              aria-label='simple tabs example'
            >
              {languageTabs}
            </Tabs>
            <TabPanel value={tabsValue} index={0}>
              <Paper className={classes.businessPageForm}>
                <TextField
                  id='uaTitle'
                  className={classes.textField}
                  variant='outlined'
                  label={config.labels.lableTitle.ua}
                  multiline
                  value={formik.values.uaTitle}
                  onChange={formik.handleChange}
                  error={!formik.values.uaTitle && shouldValidate}
                  helperText={
                    !formik.values.uaTitle && shouldValidate
                      ? 'Введіть заголовок'
                      : ''
                  }
                  data-cy='page-header-ua'
                />
                <Editor
                  value={uaText}
                  placeholder='Текст'
                  onEditorChange={(value) => uaSetText(value)}
                  setFiles={setFiles}
                  data-cy='page-editor'
                />
                {(editorField.test(uaText) || !uaText) && shouldValidate && (
                  <div className={classes.errorMessage} data-cy='editor-error'>
                    Введіть текст для сторінки
                  </div>
                )}
              </Paper>
            </TabPanel>
            <TabPanel value={tabsValue} index={1}>
              <Paper className={classes.businessPageForm}>
                <TextField
                  id='enTitle'
                  className={classes.textField}
                  variant='outlined'
                  label={config.labels.lableTitle.en}
                  multiline
                  value={formik.values.enTitle}
                  onChange={formik.handleChange}
                  error={!formik.values.enTitle && shouldValidate}
                  helperText={
                    !formik.values.enTitle && shouldValidate
                      ? labels[0].errorLabel[tabsValue].value
                      : ''
                  }
                  data-cy='page-header-en'
                />
                <Editor
                  value={enText}
                  placeholder={labels[1].label[tabsValue].value}
                  onEditorChange={(value) => enSetText(value)}
                  setFiles={setFiles}
                />
                {(editorField.test(enText) || !enText) && shouldValidate && (
                  <div className={classes.errorMessage} data-cy='editor-error'>
                    {labels[1].errorLabel[tabsValue].value}
                  </div>
                )}
              </Paper>
            </TabPanel>
          </Paper>
        </div>
        <div className={classes.controlsBlock}>
          <BackButton />
          <SaveButton
            className={classes.controlButton}
            id='save'
            type='submit'
            title='Зберегти'
            data-cy='save-btn'
          />
        </div>
      </form>
    </div>
  );
};

BusinessPageForm.propTypes = {
  editMode: PropTypes.bool,
  id: PropTypes.string
};

BusinessPageForm.defaultProps = {
  editMode: false,
  id: null
};

export default withRouter(BusinessPageForm);

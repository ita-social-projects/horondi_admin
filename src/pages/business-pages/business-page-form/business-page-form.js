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
import { Link } from 'react-router-dom';

import useBusinessHandlers from '../../../utils/use-business-handlers';
import Editor from '../../../components/editor';
import { useStyles } from './business-page-form.styles';
import { SaveButton, StandardButton } from '../../../components/buttons';
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

  const {
    tabsValue,
    handleTabsChange,
    createBusinessPage,
    ukSetText,
    enSetText,
    ukSetTitle,
    enSetTitle,
    ukText,
    enText,
    enTitle,
    ukTitle,
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
    ukSetTitle(isEditingReady ? businessPage.title[0].value : '');
    ukSetText(isEditingReady ? businessPage.text[0].value : '');
    enSetTitle(isEditingReady ? businessPage.title[1].value : '');
    enSetText(isEditingReady ? businessPage.text[1].value : '');
  }, [
    code,
    setCode,
    editMode,
    businessPage,
    ukSetText,
    ukSetTitle,
    enSetText,
    enSetTitle
  ]);

  const checkValidation = (values) => {
    const requiredValidationArray = [...Object.values(values)];
    const editorFields = [ukText, enText];

    return (
      requiredValidationArray.every((field) => field.trim()) &&
      editorFields.every((field) => !editorField.test(field) || field)
    );
  };

  const formik = useFormik({
    initialValues: {
      code,
      ukTitle,
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

      const newUkText = ukText.replace(/src="data:image.*?"/g, 'src=""');
      const newEnText = enText.replace(/src="data:image.*?"/g, 'src=""');

      const page = createBusinessPage({
        ...values,
        ukText: newUkText,
        enText: newEnText
      });
      editMode
        ? dispatch(updateBusinessPage({ id, page, files: uniqueFiles }))
        : dispatch(addBusinessPage({ page, files: uniqueFiles }));
    }
  });

  useMemo(() => {
    formik.values.code = code;
    formik.values.ukTitle = ukTitle;
    formik.values.enTitle = enTitle;
  }, [code, ukTitle, enTitle]);

  const languageTabs = languages.map((lang) => (
    <Tab label={lang} key={lang} data-cy={lang} />
  ));

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={common.container}>
      <div className={common.adminHeader}>
        <Typography variant='h1' className={common.materialTitle}>
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
                  id='ukTitle'
                  className={classes.textField}
                  variant='outlined'
                  label='Заголовок uk'
                  multiline
                  value={formik.values.ukTitle}
                  onChange={formik.handleChange}
                  error={!formik.values.ukTitle && shouldValidate}
                  helperText={
                    !formik.values.ukTitle && shouldValidate
                      ? 'Введіть заголовок'
                      : ''
                  }
                />
                <Editor
                  value={ukText}
                  placeholder='Текст'
                  onEditorChange={(value) => ukSetText(value)}
                  setFiles={setFiles}
                />
                {(editorField.test(ukText) || !ukText) && shouldValidate && (
                  <div className={classes.errorMessage}>
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
                  label='Заголовок en'
                  multiline
                  value={formik.values.enTitle}
                  onChange={formik.handleChange}
                  error={!formik.values.enTitle && shouldValidate}
                  helperText={
                    !formik.values.enTitle && shouldValidate
                      ? 'Введіть заголовок'
                      : ''
                  }
                  data-cy='page-header-en'
                />
                <Editor
                  value={enText}
                  placeholder='Текст'
                  onEditorChange={(value) => enSetText(value)}
                  setFiles={setFiles}
                />
                {(editorField.test(enText) || !enText) && shouldValidate && (
                  <div className={classes.errorMessage}>
                    Введіть текст для сторінки
                  </div>
                )}
              </Paper>
            </TabPanel>
          </Paper>
        </div>
        <div className={classes.controlsBlock}>
          <Link to={config.routes.pathToBusinessPages}>
            <StandardButton
              className={classes.controlButton}
              id='back'
              title='Назад'
              variant='outlined'
              onClickHandler={() => {}}
              data-cy='back-btn'
            />
          </Link>
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

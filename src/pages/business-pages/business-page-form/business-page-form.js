import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, TextField, Grid, Tab, AppBar, Tabs } from '@material-ui/core';
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

const BusinessPageForm = ({ id, editMode }) => {
  const dispatch = useDispatch();
  const { loading, businessPage } = useSelector(({ BusinessPages }) => ({
    loading: BusinessPages.loading,
    businessPage: BusinessPages.currentPage
  }));
  const [shouldValidate, setShouldValidate] = useState(false);

  const classes = useStyles();

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

  const languageTabs = languages.map((lang) => <Tab label={lang} key={lang} />);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={classes.container}>
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
              />
            </Paper>
          </Grid>
          <AppBar position='static'>
            <Tabs
              className={classes.tabs}
              value={tabsValue}
              onChange={handleTabsChange}
              aria-label='simple tabs example'
            >
              {languageTabs}
            </Tabs>
          </AppBar>
          <TabPanel value={tabsValue} index={0}>
            <Paper className={classes.businessPageForm}>
              <TextField
                id='uaTitle'
                className={classes.textField}
                variant='outlined'
                label='Заголовок ua'
                multiline
                value={formik.values.uaTitle}
                onChange={formik.handleChange}
                error={!formik.values.uaTitle && shouldValidate}
                helperText={
                  !formik.values.uaTitle && shouldValidate
                    ? 'Введіть заголовок'
                    : ''
                }
              />
              <Editor
                value={uaText}
                placeholder='Текст'
                onEditorChange={(value) => uaSetText(value)}
                setFiles={setFiles}
              />
              {(editorField.test(uaText) || !uaText) && shouldValidate && (
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
        </div>
        <div className={classes.controlsBlock}>
          <Link to={config.routes.pathToBusinessPages}>
            <StandardButton
              className={classes.controlButton}
              id='back'
              title='Назад'
              variant='outlined'
              onClickHandler={() => {}}
            />
          </Link>
          <SaveButton
            className={classes.controlButton}
            id='save'
            type='submit'
            title='Зберегти'
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

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { Paper, TextField, Grid, Tab, AppBar, Tabs } from '@material-ui/core';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

import useBusinessHandlers from '../../../utils/use-business-handlers';
import Editor from '../../../components/editor';
import { useStyles } from './business-details.styles';
import { SaveButton } from '../../../components/buttons';
import TabPanel from '../../../components/tab-panel';
import LoadingBar from '../../../components/loading-bar';

import {
  getBusinessPageById,
  updateBusinessPage
} from '../../../redux/businessPages/businessPages.actions';

import { config } from '../../../configs';

const { languages } = config;

const BusinessPageDetails = ({ match }) => {
  const { id } = match.params;

  const dispatch = useDispatch();
  const { loading, businessPage } = useSelector(({ BusinessPages }) => ({
    loading: BusinessPages.loading,
    businessPage: BusinessPages.currentPage
  }));
  const classes = useStyles();
  const {
    tabsValue,
    checkboxes,
    setCheckboxes,
    preferredLanguages,
    setPreferredLanguages,
    languageCheckboxes,
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
    setCode
  } = useBusinessHandlers();

  useEffect(() => {
    dispatch(getBusinessPageById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (businessPage !== null) {
      setCode(businessPage.code);

      ukSetText(businessPage.text[0].value || '');
      ukSetTitle(businessPage.title[0].value || '');

      enSetText(businessPage.text[1].value || '');
      enSetTitle(businessPage.title[1].value || '');
      setPreferredLanguages(businessPage.languages);

      const checkboxStates = languages.reduce(
        (obj, lang) =>
          businessPage.languages.includes(lang)
            ? { ...obj, [lang]: true }
            : { ...obj, [lang]: false },
        {}
      );
      setCheckboxes(checkboxStates);
    }
  }, [
    setCheckboxes,
    code,
    businessPage,
    ukSetText,
    ukSetTitle,
    enSetText,
    enSetTitle,
    setPreferredLanguages
  ]);

  useEffect(() => {
    const prefLanguages = [];
    Object.keys(checkboxes).forEach((key) => {
      if (checkboxes[key] === true) {
        prefLanguages.push(key);
      }
    });
    setPreferredLanguages(prefLanguages);
  }, [checkboxes, setPreferredLanguages]);

  const LanguageTabs =
    preferredLanguages.length > 0
      ? preferredLanguages.map((lang, index) => (
        <Tab label={lang} key={index} />
      ))
      : null;

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={classes.detailsContainer}>
      {businessPage !== null ? (
        <Formik
          initialValues={{
            code,
            ukText,
            ukTitle,
            enTitle,
            enText
          }}
          onSubmit={(values, actions) => {
            const newPage = createBusinessPage({ ...values, enText, ukText });
            dispatch(updateBusinessPage({ id, newPage }));
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <div className={classes.controlsBlock}>
                <div>{languageCheckboxes}</div>
                <SaveButton
                  className={classes.saveButton}
                  id='save'
                  type='submit'
                  title='Зберегти'
                />
              </div>
              <Grid item xs={12}>
                <Paper className={classes.pageUpdate}>
                  <TextField
                    id='code'
                    className={classes.textField}
                    variant='outlined'
                    label='Код сторінки'
                    value={props.values.code}
                    onChange={props.handleChange}
                    required
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
                  {LanguageTabs}
                </Tabs>
              </AppBar>
              <TabPanel value={tabsValue} index={0}>
                <Paper className={classes.pageUpdate}>
                  <TextField
                    id='ukTitle'
                    className={classes.textField}
                    variant='outlined'
                    label='Заголовок uk'
                    multiline
                    value={props.values.ukTitle}
                    onChange={props.handleChange}
                    required
                  />
                  <Editor
                    value={ukText}
                    placeholder='Текст'
                    onEditorChange={(value) => ukSetText(value)}
                  />
                </Paper>
              </TabPanel>
              <TabPanel value={tabsValue} index={1}>
                <Paper className={classes.pageUpdate}>
                  <TextField
                    id='enTitle'
                    className={classes.textField}
                    variant='outlined'
                    label='Заголовок en'
                    multiline
                    value={props.values.enTitle}
                    onChange={props.handleChange}
                    required
                  />
                  <Editor
                    value={enText}
                    placeholder='Текст'
                    onEditorChange={(value) => enSetText(value)}
                  />
                </Paper>
              </TabPanel>
            </form>
          )}
        </Formik>
      ) : null}
    </div>
  );
};

BusinessPageDetails.propTypes = {
  handleSubmit: PropTypes.func,
  values: PropTypes.shape({
    code: PropTypes.string,
    ukTitle: PropTypes.string,
    enTitle: PropTypes.string
  }),
  handleChange: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired
};

BusinessPageDetails.defaultProps = {
  values: {},
  handleChange: () => {},
  handleSubmit: () => {}
};

export default withRouter(BusinessPageDetails);

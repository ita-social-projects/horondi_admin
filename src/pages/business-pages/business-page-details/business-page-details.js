import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { Paper, TextField, Grid, Tab, AppBar, Tabs } from '@material-ui/core';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

import useBusinessHandlers from '../../../utils/use-business-handlers';
import Editor from '../../../components/editor';
import { useStyles } from './business-page-details.styles';
import { SaveButton } from '../../../components/buttons';
import TabPanel from '../../../components/tab-panel';
import LoadingBar from '../../../components/loading-bar';

import {
  getBusinessPageById,
  updateBusinessPage
} from '../../../redux/business-pages/business-pages.actions';

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

  useEffect(() => {
    dispatch(getBusinessPageById(id));
  }, [dispatch, id]);

  const languageTabs = languages.map((lang) => <Tab label={lang} key={lang} />);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={classes.detailsContainer}>
      <Formik
        initialValues={{
          code,
          ukText,
          ukTitle,
          enTitle,
          enText
        }}
        onSubmit={(values) => {
          const newPage = createBusinessPage({ ...values, enText, ukText });
          dispatch(updateBusinessPage({ id, newPage }));
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <div className={classes.controlsBlock}>
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
                {languageTabs}
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
                  files={files}
                  setFiles={setFiles}
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

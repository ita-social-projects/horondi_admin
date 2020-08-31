import React from 'react';
import { TextField, Paper, Grid, Tabs, Tab, AppBar } from '@material-ui/core';

import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import TabPanel from '../../../components/tab-panel';
import { SaveButton } from '../../../components/buttons';
import LoadingBar from '../../../components/loading-bar';
import usePatternHandlers from '../../../utils/use-pattern-handlers';
import { useStyles } from './pattern-add.styles';
import { addPattern } from '../../../redux/pattern/pattern.actions';
import { config } from '../../../configs';
import CheckboxOptions from '../../../components/checkbox-options';

const { languages } = config;

const PatternAdd = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector(({ Pattern }) => Pattern.patternLoading);
  const {
    patternImage,
    material,
    available,
    setAvailable,
    handmade,
    setHandmade,
    tabsValue,
    handleTabsChange,
    createPattern
  } = usePatternHandlers();

  const langValues = languages.map((lang) => ({
    [`${lang}Name`]: '',
    [`${lang}Description`]: ''
  }));

  const formikValues =
    langValues !== null ? Object.assign(...langValues) : null;
  const formik = useFormik({
    initialValues: {
      ...formikValues,
      patternImage,
      material,
      available,
      handmade
    },
    onSubmit: (values) => {
      const pattern = createPattern(values);
      dispatch(addPattern(pattern));
    }
  });
  const TabPanels =
    languages.length > 0
      ? languages.map((lang, index) => (
        <TabPanel key={index} value={tabsValue} index={index}>
          <Paper className={styles.patternItemAdd}>
            <TextField
              data-cy={`${lang}Name`}
              id={`${lang}Name`}
              className={styles.textfield}
              variant='outlined'
              label={`Назва ${lang}`}
              multiline
              value={formik.values[`${lang}Name`]}
              onChange={formik.handleChange}
              required
            />
            <TextField
              data-cy={`${lang}Description`}
              id={`${lang}Description`}
              className={styles.textfield}
              variant='outlined'
              label={`Опис ${lang}`}
              multiline
              value={formik.values[`${lang}Description`]}
              onChange={formik.handleChange}
              required
            />
          </Paper>
        </TabPanel>
      ))
      : null;

  const languageTabs =
    languages.length > 0
      ? languages.map((lang, index) => <Tab label={lang} key={index} />)
      : null;

  if (loading) {
    return <LoadingBar />;
  }
  const checkboxes = [
    {
      id: 'handmade',
      dataCy: 'handmade',
      value: handmade,
      color: 'primary',
      label: 'зроблений вручну',
      handler: (e) => setHandmade(e.target.checked)
    },
    {
      id: 'available',
      dataCy: 'available',
      value: available,
      color: 'primary',
      label: 'доступний',
      handler: (e) => setAvailable(e.target.checked)
    }
  ];

  return (
    <div className={styles.container}>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.controlsBlock}>
          <div>
            <CheckboxOptions options={checkboxes} />
          </div>
          <SaveButton
            className={styles.saveButton}
            data-cy='save'
            type='submit'
            title='Зберегти'
          />
        </div>
        {languages.length > 0 ? (
          <div>
            <Grid item xs={12}>
              <Paper className={styles.patternItemAdd}>
                <TextField
                  id='patternImage'
                  data-cy='patternImage'
                  className={styles.textfield}
                  variant='outlined'
                  label='Фото гобелена'
                  value={formik.values.patternImage}
                  onChange={formik.handleChange}
                  required
                />
                <TextField
                  id='material'
                  data-cy='material'
                  className={styles.textfield}
                  variant='outlined'
                  label='Матеріал гобелена'
                  value={formik.values.material}
                  onChange={formik.handleChange}
                  required
                />
              </Paper>
            </Grid>
            <AppBar position='static'>
              <Tabs
                className={styles.tabs}
                value={tabsValue}
                onChange={handleTabsChange}
                aria-label='simple tabs example'
              >
                {languageTabs}
              </Tabs>
            </AppBar>
            {TabPanels}
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default PatternAdd;

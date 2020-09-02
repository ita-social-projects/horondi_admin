import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { Paper, TextField, Grid, Tab, AppBar, Tabs } from '@material-ui/core';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import usePatternHandlers from '../../../utils/use-pattern-handlers';
import { useStyles } from './pattern-details.styles';
import { SaveButton } from '../../../components/buttons';
import TabPanel from '../../../components/tab-panel';
import LoadingBar from '../../../components/loading-bar';

import {
  getPattern,
  updatePattern
} from '../../../redux/pattern/pattern.actions';

import { config } from '../../../configs';
import CheckboxOptions from '../../../components/checkbox-options';

const {
  PATTERN_VALIDATION_ERROR,
  PATTERN_ERROR_MESSAGE
} = config.patternErrorMessages;

const { languages } = config;

const PatternDetails = ({ match }) => {
  const { id } = match.params;

  const dispatch = useDispatch();
  const { loading, pattern } = useSelector(({ Pattern }) => ({
    loading: Pattern.patternLoading,
    pattern: Pattern.pattern
  }));
  const styles = useStyles();
  const {
    patternImage,
    setPatternImage,
    ukName,
    setUkName,
    ukDescription,
    setUkDescription,
    enName,
    setEnName,
    enDescription,
    setEnDescription,
    material,
    setMaterial,
    available,
    setAvailable,
    handmade,
    setHandmade,
    tabsValue,
    handleTabsChange,
    createPattern
  } = usePatternHandlers();

  useEffect(() => {
    dispatch(getPattern(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (pattern) {
      setPatternImage(pattern.images.medium);
      setUkName(pattern.name[0].value);
      setEnName(pattern.name[1].value);
      setUkDescription(pattern.description[0].value);
      setEnDescription(pattern.description[1].value);
      setMaterial(pattern.material);
      setAvailable(pattern.available);
      setHandmade(pattern.handmade);
    }
  }, [
    pattern,
    setPatternImage,
    setEnName,
    setUkName,
    setUkDescription,
    setEnDescription,
    setMaterial,
    setAvailable,
    setHandmade
  ]);

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
      checked: handmade,
      color: 'primary',
      label: config.labels.pattern.handmade,
      handler: (e) => setHandmade(e.target.checked)
    },
    {
      id: 'available',
      dataCy: 'available',
      value: available,
      checked: available,
      color: 'primary',
      label: config.labels.pattern.available,
      handler: (e) => setAvailable(e.target.checked)
    }
  ];

  const patternValidationSchema = Yup.object().shape({
    enDescription: Yup.string()
      .min(2, PATTERN_VALIDATION_ERROR)
      .required(PATTERN_ERROR_MESSAGE),
    enName: Yup.string()
      .min(2, PATTERN_VALIDATION_ERROR)
      .required(PATTERN_ERROR_MESSAGE),
    ukDescription: Yup.string()
      .min(2, PATTERN_VALIDATION_ERROR)
      .required(PATTERN_ERROR_MESSAGE),
    ukName: Yup.string()
      .min(2, PATTERN_VALIDATION_ERROR)
      .required(PATTERN_ERROR_MESSAGE),
    material: Yup.string()
      .min(2, PATTERN_VALIDATION_ERROR)
      .required(PATTERN_ERROR_MESSAGE)
  });

  return (
    <div className={styles.detailsContainer}>
      {pattern !== null ? (
        <Formik
          initialValues={{
            setPatternImage,
            ukName,
            ukDescription,
            enName,
            enDescription,
            material,
            patternImage
          }}
          validateOnBlur
          validationSchema={patternValidationSchema}
          onSubmit={(values, actions) => {
            const newPattern = createPattern(values);
            console.log('formik', newPattern);
            dispatch(updatePattern({ id, pattern: newPattern }));
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
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
              <Grid item xs={12}>
                <Paper className={styles.patternItemUpdate}>
                  <TextField
                    id='patternImage'
                    data-cy='patternImage'
                    className={styles.textField}
                    variant='outlined'
                    label={config.labels.pattern.image}
                    value={props.values.patternImage}
                    onChange={props.handleChange}
                    required
                  />
                  <TextField
                    id='material'
                    data-cy='material'
                    className={styles.textField}
                    variant='outlined'
                    label={config.labels.pattern.material}
                    value={props.values.material}
                    onChange={props.handleChange}
                    error={props.touched.material && !!props.errors.material}
                  />
                  {props.touched.material && props.errors.material && (
                    <div className={styles.inputError}>
                      {props.errors.material}
                    </div>
                  )}
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
              {languages.map((lang, index) => (
                <TabPanel key={index} value={tabsValue} index={index}>
                  <Paper className={styles.patternItemUpdate}>
                    <TextField
                      data-cy={`${lang}Name`}
                      id={`${lang}Name`}
                      className={styles.textField}
                      variant='outlined'
                      label={`Назва ${lang}`}
                      multiline
                      value={props.values[`${lang}Name`]}
                      onChange={props.handleChange}
                      error={
                        props.touched[`${lang}Name`] &&
                        !!props.errors[`${lang}Name`]
                      }
                    />
                    {props.touched[`${lang}Name`] &&
                      props.errors[`${lang}Name`] && (
                      <div className={styles.inputError}>
                        {props.errors[`${lang}Name`]}
                      </div>
                    )}
                    <TextField
                      data-cy={`${lang}Description`}
                      id={`${lang}Description`}
                      className={styles.textField}
                      variant='outlined'
                      label={`Опис ${lang}`}
                      multiline
                      value={props.values[`${lang}Description`]}
                      onChange={props.handleChange}
                      error={
                        props.touched[`${lang}Description`] &&
                        !!props.errors[`${lang}Description`]
                      }
                    />
                    {props.touched[`${lang}Description`] &&
                      props.errors[`${lang}Description`] && (
                      <div className={styles.inputError}>
                        {props.errors[`${lang}Description`]}
                      </div>
                    )}
                  </Paper>
                </TabPanel>
              ))}
            </form>
          )}
        </Formik>
      ) : null}
    </div>
  );
};

PatternDetails.propTypes = {
  handleSubmit: PropTypes.func,
  values: PropTypes.shape({
    patternImage: PropTypes.string,
    material: PropTypes.string,
    ukName: PropTypes.string,
    enName: PropTypes.string,
    ukDescription: PropTypes.string,
    enDescription: PropTypes.string
  }),
  errors: PropTypes.shape({
    patternImage: PropTypes.string,
    material: PropTypes.string,
    ukName: PropTypes.string,
    enName: PropTypes.string,
    ukDescription: PropTypes.string,
    enDescription: PropTypes.string
  }),
  touched: PropTypes.shape({
    patternImage: PropTypes.string,
    material: PropTypes.string,
    ukName: PropTypes.string,
    enName: PropTypes.string,
    ukDescription: PropTypes.string,
    enDescription: PropTypes.string
  }),
  handleChange: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired
};

PatternDetails.defaultProps = {
  values: {},
  errors: {},
  touched: {},
  handleChange: () => {},
  handleSubmit: () => {}
};

export default withRouter(PatternDetails);

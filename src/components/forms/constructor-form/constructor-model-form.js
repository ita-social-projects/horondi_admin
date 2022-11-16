import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { useFormik } from 'formik';

import { useStyles } from './constructor-model-form.styles.js';
import { BackButton, SaveButton } from '../../buttons';
import { config } from '../../../configs';
import ConstructorListAccordion from './constructor-list-accordion';
import ConstructorListBasePrice from './constructor-list-base-price/constructor-list-base-price.js';

import {
  getInitialValues,
  getDefaultConstructor,
  getConstructorOptions,
  validationSchema
} from '../../../utils/constructor-model-form.js';

import {
  addConstructor,
  updateConstructor
} from '../../../redux/constructor/constructor.actions.js';

const { materialUiConstants } = config;
const { MODEL_SAVE_TITLE } = config.buttonTitles;
const { pathToConstructorList } = config.routes;
const pageTitle = config.titles.constructorModelTitles.mainPageTitle;

const ConstructorModelForm = ({ constructor, model, id, isEdit }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState('');

  const handleExpanded = (panel) => (_event, isExpanded) => {
    setExpanded(isExpanded ? panel : '');
  };

  const initialValues = useMemo(
    () =>
      isEdit ? getInitialValues(constructor) : getDefaultConstructor(model),
    [constructor, isEdit]
  );

  const { values, handleSubmit, setFieldValue, errors } = useFormik({
    validationSchema,
    initialValues,
    onSubmit: () => {
      if (!isEdit) {
        dispatch(addConstructor({ constructor: values }));
        return;
      }
      dispatch(updateConstructor({ id, constructor: values }));
    }
  });

  const constructorOptions = getConstructorOptions(
    values,
    setFieldValue,
    errors
  );

  const constructorAccordions = constructorOptions.map((option, index) => (
    <ConstructorListAccordion
      isEdit={isEdit}
      option={option}
      key={index}
      handleChange={handleExpanded}
      expanded={expanded}
      errors={errors}
    />
  ));

  const basePriceAccordion = (
    <ConstructorListBasePrice
      handleChange={handleExpanded}
      expanded={expanded}
      basePriceToAdd={values.basePrice}
      setBasePriceToAdd={setFieldValue}
      error={errors.basePrice}
    />
  );

  return (
    <>
      <div>
        <Grid container spacing={2}>
          <Grid item>
            <BackButton pathBack={pathToConstructorList} />
          </Grid>
          <Grid item>
            <SaveButton
              onClickHandler={handleSubmit}
              className={classes.constructorButton}
              data-cy={materialUiConstants.save}
              type={materialUiConstants.types.submit}
              values={values}
              errors={errors}
              title={MODEL_SAVE_TITLE}
            />
          </Grid>
        </Grid>
      </div>
      <div>
        <Typography variant='h1' className={classes.materialTitle}>
          {pageTitle}
        </Typography>
        <div className={classes.root}>
          {constructorAccordions}
          {basePriceAccordion}
        </div>
      </div>
    </>
  );
};

ConstructorModelForm.propTypes = {
  constructor: PropTypes.shape({}),
  model: PropTypes.shape({}),
  id: PropTypes.string.isRequired,
  isEdit: PropTypes.bool
};

ConstructorModelForm.defaultProps = {
  constructor: {},
  model: {},
  isEdit: false
};

export default ConstructorModelForm;

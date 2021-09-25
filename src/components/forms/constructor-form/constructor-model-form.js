import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { useStyles } from './constructor-model-form.styles.js';
import { BackButton, SaveButton } from '../../buttons';
import { config } from '../../../configs';
import { getCategories } from '../../../redux/categories/categories.actions';
import { getSizes } from '../../../redux/sizes/sizes.actions';
import ConstructorListAccordion from './constructor-list-accordion';
import { getBottoms } from '../../../redux/bottom/bottom.actions.js';
import { getAllBasics } from '../../../redux/basics/basics.actions.js';
import { getPatterns } from '../../../redux/pattern/pattern.actions.js';
import { getBacks } from '../../../redux/back/back.actions.js';
import { getAllStraps } from '../../../redux/straps/straps.actions.js';
import { getAllClosures } from '../../../redux/closures/closures.actions.js';
import { bottomSelectorWithPagination } from '../../../redux/selectors/bottom.selectors.js';
import { basicsSelectorWithPagination } from '../../../redux/selectors/basics.selectors.js';
import { patternSelectorWithPagination } from '../../../redux/selectors/pattern.selectors.js';
import { backSelectorWithPagination } from '../../../redux/selectors/back.selectors.js';
import { strapsSelectorWithPagination } from '../../../redux/selectors/straps.selectors.js';
import { closuresSelectorWithPagination } from '../../../redux/selectors/closures.selectors.js';
import { getAllPockets } from '../../../redux/pockets/pockets.actions.js';
import { pocketsSelectorWithPagination } from '../../../redux/selectors/pockets.selectors.js';

const { materialUiConstants } = config;
const { MODEL_SAVE_TITLE } = config.buttonTitles;
const { pathToConstructorList } = config.routes;
const pageTitle = config.titles.constructorModelTitles.mainPageTitle;

const ConstructorModelForm = ({ model, id, isEdit }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState('');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    dispatch(getSizes({ limit: null }));

    dispatch(getCategories({}));
  }, [dispatch]);

  const [basicsToAdd, setBasicsToAdd] = useState([]);
  const [bottomsToAdd, setBottomsToAdd] = useState([]);
  const [patternsToAdd, setPatternsToAdd] = useState([]);
  const [backsToAdd, setBacksToAdd] = useState([]);
  const [strapsToAdd, setStrapsToAdd] = useState([]);
  const [closuresToAdd, setClosuresToAdd] = useState([]);
  const [pocketsToAdd, setPocketsToAdd] = useState([]);

  const onSaveHandler = () => {
    const itemsToSave = [
      basicsToAdd,
      bottomsToAdd,
      patternsToAdd,
      backsToAdd,
      strapsToAdd,
      closuresToAdd,
      pocketsToAdd
    ];
  };

  const constructorOptions = [
    {
      optionName: 'basic',
      label: 'Основи',
      getItems: getAllBasics,
      selector: basicsSelectorWithPagination,
      optionToAdd: basicsToAdd,
      setOptionToAdd: setBasicsToAdd
    },
    {
      optionName: 'bottom',
      label: 'Низи',
      getItems: getBottoms,
      selector: bottomSelectorWithPagination,
      optionToAdd: bottomsToAdd,
      setOptionToAdd: setBottomsToAdd
    },
    {
      optionName: 'pattern',
      label: 'Гобелени',
      getItems: getPatterns,
      selector: patternSelectorWithPagination,
      optionToAdd: patternsToAdd,
      setOptionToAdd: setPatternsToAdd
    },
    {
      optionName: 'back',
      label: 'Спинки',
      getItems: getBacks,
      selector: backSelectorWithPagination,
      optionToAdd: backsToAdd,
      setOptionToAdd: setBacksToAdd
    },
    {
      optionName: 'strap',
      label: 'Ремінці',
      getItems: getAllStraps,
      selector: strapsSelectorWithPagination,
      optionToAdd: strapsToAdd,
      setOptionToAdd: setStrapsToAdd
    },
    {
      optionName: 'closure',
      label: 'Защіпки',
      getItems: getAllClosures,
      selector: closuresSelectorWithPagination,
      optionToAdd: closuresToAdd,
      setOptionToAdd: setClosuresToAdd
    },
    {
      optionName: 'pocket',
      label: 'Кишені',
      getItems: getAllPockets,
      selector: pocketsSelectorWithPagination,
      optionToAdd: pocketsToAdd,
      setOptionToAdd: setPocketsToAdd
    }
  ];

  const constructorAccordions = constructorOptions.map((option, index) => (
    <ConstructorListAccordion
      option={option}
      key={index}
      handleChange={handleChange}
      expanded={expanded}
    />
  ));

  return (
    <>
      <div className={classes.buttonContainer}>
        <Grid container spacing={2} className={classes.fixedButtons}>
          <Grid item className={classes.button}>
            <BackButton pathBack={pathToConstructorList} />
          </Grid>
          <Grid item className={classes.button}>
            <SaveButton
              onClickHandler={onSaveHandler}
              className={classes.constructorButton}
              data-cy={materialUiConstants.save}
              type={materialUiConstants.types.submit}
              title={MODEL_SAVE_TITLE}
            />
          </Grid>
        </Grid>
      </div>
      <div>
        <Typography variant='h1' className={classes.materialTitle}>
          {pageTitle}
        </Typography>
        <div className={classes.root}>{constructorAccordions}</div>
      </div>
    </>
  );
};

const valueShape = PropTypes.shape({
  value: PropTypes.string
});

ConstructorModelForm.propTypes = {
  isEdit: PropTypes.bool,
  model: PropTypes.shape({
    name: PropTypes.arrayOf(valueShape),
    _id: PropTypes.string,
    description: PropTypes.arrayOf(valueShape),
    show: PropTypes.bool,
    priority: PropTypes.number,
    availableForConstructor: PropTypes.bool,
    images: PropTypes.shape({
      thumbnail: PropTypes.string
    }),
    sizes: PropTypes.arrayOf(valueShape),
    category: PropTypes.shape({
      _id: PropTypes.string,
      images: PropTypes.shape({
        thumbnail: PropTypes.string
      }),
      name: PropTypes.arrayOf(valueShape),
      code: PropTypes.string
    })
  }),
  id: PropTypes.string
};

ConstructorModelForm.defaultProps = {
  id: '',
  model: {
    _id: '',
    name: [
      {
        value: ''
      },
      {
        value: ''
      }
    ],
    description: [
      {
        value: ''
      },
      {
        value: ''
      }
    ],
    images: {
      thumbnail: ''
    },
    category: {},
    sizes: [],
    show: false,
    availableForConstructor: false,
    priority: 1
  },
  isEdit: false
};
export default ConstructorModelForm;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import {
  addConstructor,
  updateConstructor
} from '../../../redux/constructor/constructor.actions.js';
import { constructorSelector } from '../../../redux/selectors/constructor.selectors';
import ConstructorListPockets from './constructor-list-pockets/constructor-list-pockets.js';
import ConstructorListBasePrice from './constructor-list-base-price/constructor-list-base-price.js';
import useConstructorHandlers from '../../../utils/use-constructor-handlers.js';

const { materialUiConstants } = config;
const { MODEL_SAVE_TITLE } = config.buttonTitles;
const { pathToConstructorList } = config.routes;
const pageTitle = config.titles.constructorModelTitles.mainPageTitle;

const ConstructorModelForm = ({ model, id, isEdit }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState('');

  const { constructor } = useSelector(constructorSelector);

  const { createConstructor } = useConstructorHandlers();

  const handleChange = (panel) => (_event, isExpanded) => {
    setExpanded(isExpanded ? panel : '');
  };

  useEffect(() => {
    // dispatch(getSizes({ limit: null }));

    dispatch(getCategories({}));
  }, [dispatch]);

  const [basicsToAdd, setBasicsToAdd] = useState([]);
  const [bottomsToAdd, setBottomsToAdd] = useState([]);
  const [patternsToAdd, setPatternsToAdd] = useState([]);
  const [backsToAdd, setBacksToAdd] = useState([]);
  const [strapsToAdd, setStrapsToAdd] = useState([]);
  const [closuresToAdd, setClosuresToAdd] = useState([]);
  const [restrictionsToAdd, setRestrictionsToAdd] = useState([]);
  const [basePriceToAdd, setBasePriceToAdd] = useState(0);

  const onSaveHandler = () => {
    const itemsToSave = {
      model: isEdit ? constructor?.model : model,
      basicsToAdd,
      bottomsToAdd,
      patternsToAdd,
      backsToAdd,
      strapsToAdd,
      closuresToAdd,
      restrictionsToAdd,
      basePriceToAdd
    };
    const constructorToAdd = createConstructor(itemsToSave);

    if (!isEdit) {
      dispatch(addConstructor({ constructor: constructorToAdd }));
      return;
    }
    dispatch(updateConstructor({ id, constructor: constructorToAdd }));
  };

  const values = {
    basicsToAdd,
    bottomsToAdd,
    patternsToAdd,
    backsToAdd,
    strapsToAdd,
    closuresToAdd,
    restrictionsToAdd,
    basePriceToAdd
  };
  const mapElement = (element) => element?.map((item) => item._id);

  useEffect(() => {
    setBasicsToAdd(isEdit ? mapElement(constructor?.basics) : []);
    setBottomsToAdd(isEdit ? mapElement(constructor?.bottoms) : []);
    setPatternsToAdd(isEdit ? mapElement(constructor?.patterns) : []);
    setBacksToAdd(isEdit ? mapElement(constructor?.backs) : []);
    setStrapsToAdd(isEdit ? mapElement(constructor?.straps) : []);
    setClosuresToAdd(isEdit ? mapElement(constructor?.closures) : []);
    setRestrictionsToAdd(isEdit ? constructor?.pocketsWithRestrictions : []);
    setBasePriceToAdd(isEdit ? constructor?.basePrice : 0);
  }, [constructor, isEdit]);

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
    }
  ];

  const constructorAccordions = constructorOptions.map((option, index) => (
    <ConstructorListAccordion
      isEdit={isEdit}
      option={option}
      key={index}
      handleChange={handleChange}
      expanded={expanded}
    />
  ));

  const pocketAccordion = (
    <ConstructorListPockets
      setRestrictionsToAdd={setRestrictionsToAdd}
      restrictionsToAdd={restrictionsToAdd}
      handleChange={handleChange}
      expanded={expanded}
    />
  );

  const basePriceAccordion = (
    <ConstructorListBasePrice
      handleChange={handleChange}
      expanded={expanded}
      basePriceToAdd={basePriceToAdd}
      setBasePriceToAdd={setBasePriceToAdd}
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
              onClickHandler={onSaveHandler}
              className={classes.constructorButton}
              data-cy={materialUiConstants.save}
              type={materialUiConstants.types.submit}
              values={values}
              errors={{}}
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
          {pocketAccordion}
          {basePriceAccordion}
        </div>
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
    }),
    basePrice: PropTypes.number
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
    }
  },
  isEdit: false
};
export default ConstructorModelForm;

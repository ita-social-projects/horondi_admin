import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import { useStyles } from './constructor-model-form.styles.js';
import { BackButton, SaveButton } from '../../buttons';
import { config } from '../../../configs';
import { getCategories } from '../../../redux/categories/categories.actions';
import { getSizes } from '../../../redux/sizes/sizes.actions';

const { materialUiConstants } = config;
const { MODEL_SAVE_TITLE } = config.buttonTitles;
const { pathToModels } = config.routes;
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

  return (
    <div>
      <Typography variant='h1' className={classes.materialTitle}>
        {pageTitle}
      </Typography>

      <div className={classes.root}>
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1bh-content'
            id='panel1bh-header'
          >
            <Typography className={classes.heading}>Основа</Typography>
            <Typography className={classes.secondaryHeading} />
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
              feugiat. Aliquam eget maximus est, id dignissim quam.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel2bh-content'
            id='panel2bh-header'
          >
            <Typography className={classes.heading}>Низ</Typography>
            <Typography className={classes.secondaryHeading} />
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Donec placerat, lectus sed mattis semper, neque lectus feugiat
              lectus, varius pulvinar diam eros in elit. Pellentesque convallis
              laoreet laoreet.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel3'}
          onChange={handleChange('panel3')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel3bh-content'
            id='panel3bh-header'
          >
            <Typography className={classes.heading}>Гобелен</Typography>
            <Typography className={classes.secondaryHeading} />
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
              sit amet egestas eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel4'}
          onChange={handleChange('panel4')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel4bh-content'
            id='panel4bh-header'
          >
            <Typography className={classes.heading}>Спинка</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
              sit amet egestas eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel5'}
          onChange={handleChange('panel5')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1bh-content'
            id='panel5bh-header'
          >
            <Typography className={classes.heading}>Ремінці</Typography>
            <Typography className={classes.secondaryHeading} />
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
              feugiat. Aliquam eget maximus est, id dignissim quam.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel6'}
          onChange={handleChange('panel6')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel6bh-content'
            id='panel6bh-header'
          >
            <Typography className={classes.heading}>Застібки</Typography>
            <Typography className={classes.secondaryHeading} />
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
              feugiat. Aliquam eget maximus est, id dignissim quam.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel7'}
          onChange={handleChange('panel7')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel7bh-content'
            id='panel7bh-header'
          >
            <Typography className={classes.heading}>Обмеження</Typography>
            <Typography className={classes.secondaryHeading} />
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
              feugiat. Aliquam eget maximus est, id dignissim quam.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>

      <BackButton pathBack={pathToModels} />
      <SaveButton
        className={classes.constructorButton}
        data-cy={materialUiConstants.save}
        type={materialUiConstants.types.submit}
        title={MODEL_SAVE_TITLE}
      />
    </div>
  );
};

const valueShape = PropTypes.shape({
  value: PropTypes.string
});

ConstructorModelForm.propTypes = {
  isEdit: PropTypes.bool,
  id: PropTypes.string,
  model: PropTypes.shape({
    _id: PropTypes.string,
    description: PropTypes.arrayOf(valueShape),
    show: PropTypes.bool,
    priority: PropTypes.number,
    availableForConstructor: PropTypes.bool,
    images: PropTypes.shape({
      thumbnail: PropTypes.string
    }),
    category: PropTypes.shape({
      _id: PropTypes.string,
      images: PropTypes.shape({
        thumbnail: PropTypes.string
      }),
      name: PropTypes.arrayOf(valueShape),
      code: PropTypes.string
    }),
    sizes: PropTypes.arrayOf(valueShape),
    name: PropTypes.arrayOf(valueShape)
  })
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

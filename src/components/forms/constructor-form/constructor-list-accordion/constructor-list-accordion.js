import React, { useEffect } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { map } from 'lodash';
import PropTypes from 'prop-types';
import { useStyles } from './constructor-list-accordion.styles';
import { config } from '../../../../configs';
import TableContainerRow from '../../../../containers/table-container-row';
import TableContainerGenerator from '../../../../containers/table-container-generator';

<<<<<<< HEAD
const ConstructorListAccordion = ({
  option,
  expanded,
  handleChange,
  isEdit
}) => {
=======
const ConstructorListAccordion = ({ option, expanded, handleChange }) => {
>>>>>>> a1f7bb7e (added pockets)
  const classes = useStyles();
  const dispatch = useDispatch();

  const { selector, getItems, setOptionToAdd, optionToAdd, label, optionName } =
    option;

  const tableTitles = config.tableHeadRowTitles.constructorElementList;

  const { items, currentPage, rowsPerPage, filter } = useSelector(selector);

  useEffect(() => {
    dispatch(
      getItems({
        pagination: {
          limit: rowsPerPage,
          skip: currentPage * rowsPerPage
        },
        limit: rowsPerPage,
        skip: currentPage * rowsPerPage,
        filter
      })
    );
  }, [dispatch, currentPage, rowsPerPage, filter]);

  const checkboxChangeHandler = (e, id) => {
    e.stopPropagation();

    const possibleItems = optionToAdd.find((item) => item === id);
    if (possibleItems) {
      setOptionToAdd(optionToAdd.filter((item) => item !== id));
    } else {
      setOptionToAdd([...optionToAdd, id]);
    }
  };

  const elementItems = map(items, (item) => (
    <TableContainerRow
      image={
        item.images.thumbnail
          ? `${config.imagePrefix}${item.images.thumbnail}`
          : ''
      }
      key={item._id}
      id={item._id}
      name={item.name[0].value}
      additionalPrice={item.additionalPrice[1]?.value}
      available={item.available ? 'Так' : 'Ні'}
      showEdit={false}
      showDelete={false}
      showCheckbox
<<<<<<< HEAD
      checkBoxValue={optionToAdd}
      checkboxChangeHandler={checkboxChangeHandler}
    />
  ));
=======
      checkboxChangeHandler={checkboxChangeHandler}
    />
  ));

  if (option.isRestrictions) {
    return (
      <Accordion
        expanded={expanded === optionName}
        onChange={handleChange(optionName)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${optionName}bh-content`}
          id={`${optionName}bh-header`}
        >
          <Typography className={classes.heading}>{label}</Typography>
          <Typography className={classes.secondaryHeading} />
        </AccordionSummary>
        <AccordionDetails />
      </Accordion>
    );
  }
>>>>>>> a1f7bb7e (added pockets)

  return (
    <Accordion
      expanded={expanded === optionName}
      onChange={handleChange(optionName)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${optionName}bh-content`}
        id={`${optionName}bh-header`}
      >
        <Typography className={classes.heading}>{label}</Typography>
        <Typography className={classes.secondaryHeading} />
      </AccordionSummary>
      <AccordionDetails className={classes.column}>
        {elementItems.length ? (
          <TableContainerGenerator
            pagination
            data-cy={`${optionName}table`}
            tableTitles={tableTitles}
            tableItems={elementItems}
          />
        ) : (
          <p>Відсутні</p>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

ConstructorListAccordion.propTypes = {
  option: PropTypes.shape({
    selector: PropTypes.func,
    getItems: PropTypes.func,
    setOptionToAdd: PropTypes.func,
    optionToAdd: PropTypes.arrayOf(PropTypes.string),
    label: PropTypes.string,
    optionName: PropTypes.string,
    isRestrictions: PropTypes.bool
  }),
  expanded: PropTypes.string,
  handleChange: PropTypes.func,
  isEdit: PropTypes.bool
};

ConstructorListAccordion.defaultProps = {
  expanded: '',
  option: {
    optionToAdd: [],
    label: '',
    optionName: '',
    isRestrictions: false
  },
  handleChange: '',
  isEdit: false
};

export default ConstructorListAccordion;

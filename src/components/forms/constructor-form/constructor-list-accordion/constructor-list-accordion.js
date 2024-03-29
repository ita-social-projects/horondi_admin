import React, { useEffect, useCallback } from 'react';

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

const ConstructorListAccordion = ({ option, expanded, handleChange }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    selector,
    getItems,
    setOptionToAdd,
    optionToAdd,
    label,
    optionName,
    error
  } = option;
  const tableTitles = config.tableHeadRowTitles.constructorElementList;
  const { items, currentPage, rowsPerPage, filter } = useSelector(selector);
  useEffect(() => {
    dispatch(
      getItems({
        pagination: {
          limit: rowsPerPage,
          skip: currentPage * rowsPerPage
        },
        limit: 20,
        skip: currentPage * rowsPerPage,
        filter
      })
    );
  }, [dispatch, currentPage, rowsPerPage, filter, getItems]);

  const checkboxChangeHandler = (e, id) => {
    e.stopPropagation();

    const possibleItems = optionToAdd.find((item) => item === id);

    if (possibleItems) {
      setOptionToAdd(
        `${optionName}`,
        optionToAdd.filter((item) => item !== id)
      );
    } else {
      setOptionToAdd(`${optionName}`, [...optionToAdd, id]);
    }
  };

  const getItemPrice = useCallback(
    (item) => item.absolutePrice ?? `${item.relativePrice}%`,
    []
  );

  const availableItems = items?.filter((item) => item.available);

  const elementItems = map(availableItems, (item) => (
    <TableContainerRow
      image={
        item.images.thumbnail
          ? `${config.imagePrefix}${item.images.thumbnail}`
          : ''
      }
      key={item._id}
      id={item._id}
      name={item.name[0].value}
      additionalPrice={getItemPrice(item)}
      available={item.available ? 'Так' : 'Ні'}
      showEdit={false}
      showDelete={false}
      showCheckbox
      checkBoxValue={optionToAdd}
      checkboxChangeHandler={checkboxChangeHandler}
    />
  ));

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
        <Typography className={classes.secondaryHeading}>{error}</Typography>
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
    isRestrictions: PropTypes.bool,
    error: PropTypes.string
  }),
  expanded: PropTypes.string,
  handleChange: PropTypes.func
};

ConstructorListAccordion.defaultProps = {
  expanded: '',
  option: {
    optionToAdd: [],
    label: '',
    optionName: '',
    error: ''
  },
  handleChange: ''
};

export default ConstructorListAccordion;

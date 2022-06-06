import React from 'react';
import { PropTypes } from 'prop-types';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  TextField
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStyles } from './constructor-list-base-price.styles';

const ConstructorListBasePrice = ({
  handleChange,
  basePriceToAdd,
  setBasePriceToAdd,
  expanded
}) => {
  const styles = useStyles();

  const priceHandleChange = (event) => {
    const { value } = event.target;
    setBasePriceToAdd(Number(value));
  };

  return (
    <Accordion
      expanded={expanded === 'basePrice'}
      onChange={handleChange('basePrice')}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='basePricebh-content'
        id='basePricebh-header'
      >
        <Typography className={styles.heading}>Базова ціна</Typography>
        <Typography className={styles.secondaryHeading} />
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          data-testid='basePrice'
          variant='outlined'
          className={`${styles.textField} ${styles.materialSelect}`}
          label='Базова ціна (USD)'
          type='number'
          onChange={priceHandleChange}
          value={basePriceToAdd}
        />
      </AccordionDetails>
    </Accordion>
  );
};

ConstructorListBasePrice.propTypes = {
  expanded: PropTypes.string,
  handleChange: PropTypes.func,
  setBasePriceToAdd: PropTypes.func,
  basePriceToAdd: PropTypes.number
};

ConstructorListBasePrice.defaultProps = {
  basePriceToAdd: 0,
  setBasePriceToAdd: '',
  expanded: '',
  handleChange: () => null
};

export default ConstructorListBasePrice;

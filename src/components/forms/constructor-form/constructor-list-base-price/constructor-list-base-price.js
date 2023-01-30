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
  expanded,
  error
}) => {
  const styles = useStyles();

  const basePrice = 'basePrice';

  const priceHandleChange = (event) => {
    const { value } = event.target;
    setBasePriceToAdd(`${basePrice}`, Number(value));
  };

  return (
    <Accordion
      expanded={expanded === basePrice}
      onChange={handleChange(basePrice)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${basePrice}bh-content`}
        id={`${basePrice}bh-header`}
      >
        <Typography className={styles.heading}>Базова ціна</Typography>
        <Typography className={styles.secondaryHeading}>{error}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          data-testid={basePrice}
          variant='outlined'
          className={`${styles.textField}`}
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
  expanded: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  setBasePriceToAdd: PropTypes.func.isRequired,
  basePriceToAdd: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  error: PropTypes.string
};

ConstructorListBasePrice.defaultProps = {
  basePriceToAdd: '',
  error: ''
};

export default ConstructorListBasePrice;

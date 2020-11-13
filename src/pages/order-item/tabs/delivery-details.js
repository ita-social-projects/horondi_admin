import React from 'react';
import {Accordion, AccordionSummary, AccordionDetails,Typography, TextField} from '@material-ui/core'
import {ExpandMoreSharp} from '@material-ui/icons';
import {useStyles} from '../order-item.styles';
import labels from '../../../configs/labels';

const DeliveryDetails = ({address,handleChange}) => {
  const {deliveryDetails} = labels
  const classes = useStyles()
  return (
    <div>
      <Accordion TransitionProps={{ unmountOnExit: true }}>
        <AccordionSummary
          expandIcon={<ExpandMoreSharp />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Деталі доставки</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.deliveryDetails}>
          {Object.keys(address).map(item=>(
            <TextField
              label= {deliveryDetails[item]}
              name={`address.${item}`}
              value={address[item]||''}
              onChange={handleChange}
              variant='outlined'
              key={item}
            />
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default DeliveryDetails;

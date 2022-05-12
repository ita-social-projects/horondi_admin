import React from 'react';
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

import Courier from './delivery-details/courier';
import { useStyles } from '../order-item.styles';
import labels from '../../../configs/labels';
import { deliveryPropTypes, inputName } from '../../../utils/order';
import NovaPost from './delivery-details/nova-post';
import UkrPost from './delivery-details/ukrpost';
import Worldwide from './delivery-details/worldwide';
import config from '../../../configs/orders';

const Delivery = ({ data, handleChange, setFieldValue }) => {
  const { deliveryTypes } = config;
  const classes = useStyles();
  const { deliveryLabels } = labels;
  const radioButtons = Object.entries(deliveryLabels).map((type) => (
    <FormControlLabel
      value={type[0].toUpperCase()}
      control={<Radio color='default' size='small' />}
      label={type[1]}
      key={type[0]}
    />
  ));
  return (
    <div className={classes.delivery}>
      <RadioGroup
        name={inputName.sentByInput}
        value={data.delivery.sentBy}
        onChange={handleChange}
      >
        {radioButtons}
      </RadioGroup>
      {(data.delivery.sentBy === deliveryTypes.ukrPostCourier ||
        data.delivery.sentBy === deliveryTypes.novaPostCourier) && (
        <Courier
          deliveryType={data.delivery.sentBy}
          values={data.delivery.courier}
          handleChange={handleChange}
        />
      )}
      {data.delivery.sentBy === deliveryTypes.novaPost && (
        <NovaPost
          setFieldValue={setFieldValue}
          values={data.delivery.novaPost}
        />
      )}

      {data.delivery.sentBy === deliveryTypes.ukrPost && (
        <UkrPost setFieldValue={setFieldValue} values={data.delivery.ukrPost} />
      )}
      {data.delivery.sentBy === deliveryTypes.worldWide && (
        <Worldwide
          handleChange={handleChange}
          setFieldValue={setFieldValue}
          values={data.delivery.worldWide}
        />
      )}
    </div>
  );
};

Delivery.defaultProps = {
  data: {}
};

Delivery.propTypes = deliveryPropTypes;

export default Delivery;

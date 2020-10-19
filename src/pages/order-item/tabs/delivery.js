import React from 'react';
import DeliveryDetails from './delivery-details';

const Delivery = ({delivery, address}) => {
  return (
    <div>
      Delivery
      <DeliveryDetails />
    </div>
  );
};

export default Delivery;

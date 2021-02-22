import React from 'react';
import NewsForm from '../../../components/forms/news-form';
import { useCommonStyles } from '../../common.styles';

const OrdersAdd = () => {
  const common = useCommonStyles();

  return (
    <div className={common.container}>
      <NewsForm />
    </div>
  );
};

export default OrdersAdd;

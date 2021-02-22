import React, { useState } from 'react';
import { Modal } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useStyles } from '../order-item.styles';
import TableContainerGenerator from '../../../containers/table-container-generator';
import TableContainerRow from '../../../containers/table-container-row';
import tableHeadRowTitles from '../../../configs/table-head-row-titles';

const Products = ({ data, setFieldValue }) => {
  const classes = useStyles();

  const { items } = data;
  const { orderProductTitles } = tableHeadRowTitles;

  const initialItem = {
    additions: [],
    colors: [],
    size: {},
    closureColor: '',
    quantity: 0
  };
  const [selectedItem, setSelectedItem] = useState(initialItem);

  const deleteItemHendler = (indexItem) => {
    setFieldValue(
      'items',
      items.filter((item, index) => index !== indexItem)
    );
  };

  const productItems =
    items &&
    items.map((item, index) => (
      <TableContainerRow
        key={item.product.name[0].value}
        num={index + 1}
        name={item.product.name[0].value}
        quantity={item.quantity}
        price={`${item.product.basePrice[0].value * item.quantity }₴`}
        showAvatar={false}
        deleteHandler={() => deleteItemHendler(index)}
        editHandler={() => setSelectedItem(item)}
      />
    ));

  console.log(selectedItem);
  return (
    <div className={classes.products}>
      <TableContainerGenerator
        id='contactTable'
        tableTitles={orderProductTitles}
        tableItems={productItems}
      />
      <Modal
        open={!!selectedItem?.product}
        onClose={() => setSelectedItem(initialItem)}
      >
        <div className={classes.selectedProduct}>
          <h2 className={classes.productHeading}>
            {selectedItem.product && selectedItem.product.name[0].value}
          </h2>
          <div>Кількість: {selectedItem.quantity}</div>
          <br />
          <div>Розмір: {selectedItem?.options?.size.name}</div>
          <br />
          <div>Ціна: {selectedItem?.product?.basePrice[0].value}</div>
        </div>
      </Modal>
    </div>
  );
};

Products.defaultProps = {
  data: {},
  setFieldValue: () => {}
};

Products.propTypes = {
  data: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.string)
  }),
  setFieldValue: PropTypes.func
};

export default Products;

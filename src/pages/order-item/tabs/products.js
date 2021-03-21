import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '@material-ui/core';
import PropTypes from 'prop-types';

import { useStyles } from '../order-item.styles';
import TableContainerGenerator from '../../../containers/table-container-generator';
import TableContainerRow from '../../../containers/table-container-row';
import tableHeadRowTitles from '../../../configs/table-head-row-titles';
import { inputName } from '../../../utils/order';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';
import { config } from '../../../configs';
import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';
import AddProductForm from './add-product-form/add-product-form';

const Products = ({ data, setFieldValue }) => {
  const classes = useStyles();
  const { items } = data;
  const { orderProductTitles } = tableHeadRowTitles;
  const dispatch = useDispatch();

  const initialItem = {
    additions: [],
    colors: [],
    size: {},
    closureColor: '',
    quantity: 0
  };
  const [selectedItem, setSelectedItem] = useState(initialItem);

  const { openSuccessSnackbar } = useSuccessSnackbar();
  const { REMOVE_ITEM } = config.messages;

  const deleteItemHendler = (indexItem) => {
    const removeItem = () => {
      dispatch(closeDialog());
      setFieldValue(
        inputName.itemsName,
        items.filter((item, index) => index !== indexItem)
      );
    };
    openSuccessSnackbar(removeItem, REMOVE_ITEM);
  };

  const productItems =
    items &&
    items.map((item, index) => (
      <TableContainerRow
        key={item.product._id + item.options.size._id}
        num={index + 1}
        name={item.product.name[0].value}
        quantity={item.quantity}
        price={`${item.product.basePrice[0].value * item.quantity}₴`}
        showAvatar={false}
        deleteHandler={() => deleteItemHendler(index)}
        editHandler={() => setSelectedItem(item)}
      />
    ));

  return (
    <div className={classes.products}>
      <AddProductForm items={items} setFieldValue={setFieldValue} />
      {items.length && (
        <TableContainerGenerator
          id='contactTable'
          tableTitles={orderProductTitles}
          tableItems={productItems}
        />
      )}
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
  data: {}
};

Products.propTypes = {
  data: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.object)
  }),
  setFieldValue: PropTypes.func.isRequired
};

export default Products;

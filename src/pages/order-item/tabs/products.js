import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MenuItem } from '@material-ui/core';
import { useStyles } from '../order-item.styles';
import TableContainerGenerator from '../../../containers/table-container-generator';
import TableContainerRow from '../../../containers/table-container-row';
import tableHeadRowTitles from '../../../configs/table-head-row-titles';
import { inputName, productsPropTypes } from '../../../utils/order';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';
import { config } from '../../../configs';
import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';
import AddProductForm from './add-product-form/add-product-form';
import EditProductForm from './edit-product-form/edit-product-form';

const Products = ({ data, setFieldValue }) => {
  const classes = useStyles();
  const { items } = data;
  const { orderProductTitles } = tableHeadRowTitles;
  const dispatch = useDispatch();

  const [selectedItem, setSelectedItem] = useState(null);

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

  const onCloseHandler = () => {
    setSelectedItem(null);
  };

  const setSizeItems = (sizes) =>
    sizes &&
    sizes.length &&
    sizes.map((item) => (
      <MenuItem key={item.size._id} value={item.size._id}>
        {item.size.name}
      </MenuItem>
    ));

  const productItems =
    items &&
    items.map((item, index) => (
      <TableContainerRow
        key={item.product._id + item.options.size._id}
        num={index + 1}
        name={item.product.name[0].value}
        quantity={item.quantity}
        size={item.options.size.name}
        price={`${item.options.size.price * item.quantity} $`}
        showAvatar={false}
        deleteHandler={() => deleteItemHendler(index)}
        editHandler={() => setSelectedItem(item)}
      />
    ));

  return (
    <div className={classes.products}>
      <AddProductForm
        items={items}
        setFieldValue={setFieldValue}
        setSizeItems={setSizeItems}
      />
      {items.length ? (
        <TableContainerGenerator
          id='contactTable'
          tableTitles={orderProductTitles}
          tableItems={productItems}
        />
      ) : null}
      <EditProductForm
        open={!!selectedItem?.product}
        onCloseHandler={onCloseHandler}
        selectedItem={selectedItem}
        setFieldValue={setFieldValue}
        setSizeItems={setSizeItems}
        items={items}
      />
    </div>
  );
};

Products.defaultProps = {
  data: {}
};

Products.propTypes = productsPropTypes;

export default Products;

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MenuItem } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { useStyles } from '../order-item.styles';
import TableContainerGenerator from '../../../containers/table-container-generator';
import TableContainerRow from '../../../containers/table-container-row';
import tableHeadRowTitles from '../../../configs/table-head-row-titles';
import {
  inputName,
  calculateDiscountsForProducts,
  calculateItemsPriceWithDiscount,
  productsPropTypes
} from '../../../utils/order';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';
import { config } from '../../../configs';
import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';
import AddProductForm from './add-product-form/add-product-form';
import EditProductForm from './edit-product-form/edit-product-form';
import { getPromoCodeById } from '../../promo-code/operations/promo-code.queries';

const Products = ({ data, setFieldValue }) => {
  const classes = useStyles();
  const { items, itemsPriceWithDiscount, promoCodeId, itemsDiscount } = data;
  const { orderProductTitles } = tableHeadRowTitles;
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(null);

  const { openSuccessSnackbar } = useSuccessSnackbar();
  const { REMOVE_ITEM } = config.messages;

  const { data: promoCode } = useQuery(getPromoCodeById, {
    variables: {
      id: promoCodeId
    },
    fetchPolicy: 'no-cache'
  });

  useEffect(() => {
    if (promoCode) {
      setFieldValue(
        inputName.itemsDiscount,
        items.map((item) =>
          calculateDiscountsForProducts(promoCode, item.model.category)
        )
      );
      setFieldValue(
        inputName.itemsPriceWithDiscount,
        items.map((item) =>
          calculateItemsPriceWithDiscount(
            promoCode,
            item.quantity,
            item.model.category,
            item.options.size.price
          )
        )
      );
    }
  }, [promoCode]);

  const deleteItemHendler = (indexItem) => {
    const removeItem = () => {
      const itemValues = [
        { name: 'items', value: items },
        { name: 'itemsPriceWithDiscount', value: itemsPriceWithDiscount },
        { name: 'itemsDiscount', value: itemsDiscount }
      ];
      dispatch(closeDialog());
      itemValues.forEach(({ name, value }) =>
        setFieldValue(
          inputName[name],
          value.filter((_item, index) => index !== indexItem)
        )
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
      <MenuItem
        key={item.size._id}
        value={item.size._id}
        data-testid='size-item'
      >
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
        priceWithDiscount={`${itemsPriceWithDiscount[index]} $`}
        discount={`${itemsDiscount[index]}%`}
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
        itemsPriceWithDiscount={itemsPriceWithDiscount}
        itemsDiscount={itemsDiscount}
        promoCode={promoCode}
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
        itemsPriceWithDiscount={itemsPriceWithDiscount}
        setSizeItems={setSizeItems}
        items={items}
        promoCode={promoCode}
      />
    </div>
  );
};

Products.defaultProps = {
  data: {}
};

Products.propTypes = productsPropTypes;

export default Products;

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import wrapWithAdminService from '../wrappers';

import { config } from '../../config';
import { setProductSizes } from '../../actions';
import LoadingBar from '../loading-bar';

const { productLabels } = config.product;

const inputCapitalize = {
  style: { textTransform: 'capitalize' }
};

const INPUT_VARIANT = 'outlined';

const nativeSelect = {
  native: true
};

const ProductAddItemOptions = ({
  adminService,
  setProductSizes,
  classes,
  onChangeEvent,
  productModel,
  productSizes,
  loading
}) => {
  const { productPropetriesService } = adminService;
  useEffect(() => {
    productPropetriesService
      .getProductOptions()
      .then((res) => setProductSizes(res.productOptions));
  }, [productPropetriesService, setProductSizes]);
  if (loading) {
    return <LoadingBar />;
  }

  const getGroupOptions = (group, label) =>
    group.map((groupOption) => (
      <option key={groupOption[label]} value={groupOption[label]}>
        {groupOption[label]}
      </option>
    ));

  const groupOptions = productSizes.map((group, index) => {
    const label = productLabels[index];
    const options = getGroupOptions(group, label);
    return options;
  });
  const optionsMenu = groupOptions.map((option, index) => {
    const label = productLabels[index];

    return (
      <TextField
        required
        key={label}
        select
        className={classes.textfield}
        label={label}
        name={label}
        value={productModel[label]}
        onChange={onChangeEvent}
        SelectProps={nativeSelect}
        inputProps={inputCapitalize}
        variant={INPUT_VARIANT}
        id={label}
      >
        <option value='' />
        {option}
      </TextField>
    );
  });

  return optionsMenu;
};

const mapStateToProps = ({
  productModelState: { productModel, productSizes, loading }
}) => ({
  productModel,
  productSizes,
  loading
});

const mapDispatchToProps = {
  setProductSizes
};

export default wrapWithAdminService()(
  connect(mapStateToProps, mapDispatchToProps)(ProductAddItemOptions)
);

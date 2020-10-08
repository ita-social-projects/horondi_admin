import { useSelector } from 'react-redux';
import {
  Badge,
  Box,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Tooltip
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import useStyles from './product-options-container.styles';
import { config } from '../../configs';
import { productsTranslations } from '../../translations/product.translations';

const { optionsLabels, sizeCardsLabels, materialsLabels } = config.product;

const { DELETE_PRODUCT_BTN, ADDITIONAL_PRICE } = productsTranslations;

const badgePosition = {
  vertical: 'top',
  horizontal: 'left'
};

const ProductOptionsContainer = ({
  selectedOptions,
  setOptions,
  additions,
  toggleFieldsChanged
}) => {
  const styles = useStyles();
  const productOptions = useSelector(({ Products }) => Products.productOptions);
  const { sizes, bottomMaterials } = productOptions;

  const handleOptionChange = (event, name) => {
    toggleFieldsChanged(true);
    setOptions({ ...selectedOptions, [name]: event.target.value });
  };

  const handleAdditionChange = (event) => {
    toggleFieldsChanged(true);
    const { name, checked } = event.target;
    setOptions({ ...selectedOptions, [name]: checked });
  };

  const handleDeleteOption = (option, name) => {
    toggleFieldsChanged(true);
    const currentOption = selectedOptions[option];
    const sizeToRemove = currentOption.indexOf(name);
    setOptions({
      ...selectedOptions,
      [option]: [
        ...currentOption.slice(0, sizeToRemove),
        ...currentOption.slice(sizeToRemove + 1)
      ]
    });
  };

  const getCardItems = (items, option, labels) =>
    items
      .filter(({ name }) =>
        selectedOptions[option].some((item) => item === name)
      )
      .map((item) => {
        const cardContent = labels.map(({ label, name }) => (
          <Typography key={name}>
            {label}: {item[name]}
          </Typography>
        ));
        const priceDetail = (
          <Typography>
            {ADDITIONAL_PRICE}: {item.additionalPrice[0].value / 100}
          </Typography>
        );

        return (
          <Grid item key={item.name}>
            <Card>
              <CardContent>
                <Grid container justify='flex-end'>
                  <Tooltip title={DELETE_PRODUCT_BTN} placement='top'>
                    <IconButton
                      className={styles.removeIcon}
                      onClick={() => handleDeleteOption(option, item.name)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
                {cardContent}
                {priceDetail}
              </CardContent>
            </Card>
          </Grid>
        );
      });

  const getOptions = (name, _id) => (
    <MenuItem value={name} key={_id}>
      {name}
    </MenuItem>
  );

  const sortSizes = (a, b) => {
    if (a.name > b.name) {
      return -1;
    }
    if (b.name > a.name) {
      return 1;
    }
    return 0;
  };

  const sizesOptions = useMemo(
    () =>
      sizes
        .slice()
        .sort(sortSizes)
        .map(({ name, _id }) => getOptions(name, _id)),
    [sizes]
  );

  const bottomMaterialsOptions = useMemo(
    () =>
      bottomMaterials.map(({ name, _id }) => getOptions(name[0].value, _id)),
    [bottomMaterials]
  );

  const formattedMaterials = useMemo(
    () =>
      bottomMaterials.map((item) => ({ ...item, name: item.name[0].value })),
    [bottomMaterials]
  );

  const optionsToMap = useMemo(() => [sizesOptions, bottomMaterialsOptions], [
    sizesOptions,
    bottomMaterialsOptions
  ]);
  const cardLabels = useMemo(() => [sizeCardsLabels, materialsLabels], []);
  const cardOptions = useMemo(() => [sizes, formattedMaterials], [
    sizes,
    formattedMaterials
  ]);

  return (
    <div>
      {optionsLabels.map(({ label, name }, idx) => (
        <div key={name}>
          {selectedOptions[name].length ? <Box mt={2.5} /> : null}
          <Grid container className={styles.select}>
            <Grid item>
              <Badge
                color='error'
                anchorOrigin={badgePosition}
                badgeContent={selectedOptions[name].length}
              >
                <FormControl className={styles.formControl}>
                  <InputLabel id='multiple-checkbox-label'>{label}</InputLabel>
                  <Select
                    required
                    labelId='multiple-checkbox-label'
                    id='multiple-checkbox'
                    multiple
                    value={selectedOptions[name]}
                    onChange={(e) => handleOptionChange(e, name)}
                    input={<Input />}
                  >
                    {optionsToMap[idx]}
                  </Select>
                </FormControl>
              </Badge>
            </Grid>
            <Grid item container spacing={2} className={styles.gridContainer}>
              {getCardItems(cardOptions[idx], name, cardLabels[idx])}
            </Grid>
          </Grid>
        </div>
      ))}
      <Grid container className={styles.checkbox}>
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedOptions.additions}
              onChange={handleAdditionChange}
              name='additions'
              color='primary'
            />
          }
          label={
            additions && additions.length ? (
              <>
                {additions[0].name[0].value}
                <span>
                  (
                  <span className={styles.additionalPrice}>
                    +{additions[0].additionalPrice[0].value / 100} грн
                  </span>
                  )
                </span>
              </>
            ) : null
          }
        />
      </Grid>
    </div>
  );
};

ProductOptionsContainer.propTypes = {
  selectedOptions: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.array, PropTypes.bool])
  ).isRequired,
  setOptions: PropTypes.func.isRequired,
  additions: PropTypes.arrayOf(PropTypes.object),
  toggleFieldsChanged: PropTypes.func
};

ProductOptionsContainer.defaultProps = {
  additions: [],
  toggleFieldsChanged: () => {}
};

export default ProductOptionsContainer;

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  FormControl,
  InputLabel,
  Select,
  Input,
  MenuItem,
  Grid,
  Badge,
  Typography,
  Card,
  CardContent,
  Button,
  CardActions,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import { useStyles } from './product-add-options.styles';
import { config } from '../../../../configs';
import StepperButtons from '../product-add-stepper/stepper-buttons/stepper-buttons';

const {
  productOptionsLabels,
  productSizeCardsLabels,
  productMaterialsLabels
} = config;

const badgePosition = {
  vertical: 'top',
  horizontal: 'left'
};

const ProductAddOptions = ({
  selectedOptions,
  setOptions,
  additions,
  activeStep,
  handleNext,
  handleBack
}) => {
  const styles = useStyles();
  const productOptions = useSelector(({ Products }) => Products.productOptions);
  const { sizes, bottomMaterials } = productOptions;

  const handleOptionChange = (event, name) => {
    setOptions({ ...selectedOptions, [name]: event.target.value });
  };

  const handleAdditionChange = (event) => {
    const { name, checked } = event.target;
    setOptions({ ...selectedOptions, [name]: checked });
  };

  const handleDeleteOption = (option, name) => {
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
            Додаткова ціна(грн): {item.additionalPrice[0].value / 100}
          </Typography>
        );

        return (
          <Grid item key={item.name}>
            <Card>
              <CardContent>
                {cardContent}
                {priceDetail}
              </CardContent>
              <CardActions>
                <Button onClick={() => handleDeleteOption(option, item.name)}>
                  Видалити
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      });

  const getOptions = (name, _id) => (
    <MenuItem value={name} key={_id}>
      {name}
    </MenuItem>
  );

  const sizesOptions = useMemo(
    () =>
      sizes
        .slice()
        .sort((a, b) => a.name < b.name)
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

  const options = [sizesOptions, bottomMaterialsOptions];
  const cardLabels = [productSizeCardsLabels, productMaterialsLabels];
  const cardOptions = [sizes, formattedMaterials];

  return (
    <div>
      {productOptionsLabels.map(({ label, name }, idx) => (
        <Grid container key={name} className={styles.select}>
          <Grid item>
            <Badge
              color='error'
              anchorOrigin={badgePosition}
              badgeContent={selectedOptions[name].length}
            >
              <FormControl className={styles.formControl}>
                <InputLabel id='mutiple-checkbox-label'>{label}</InputLabel>
                <Select
                  required
                  labelId='mutiple-checkbox-label'
                  id='mutiple-checkbox'
                  multiple
                  value={selectedOptions[name]}
                  onChange={(e) => handleOptionChange(e, name)}
                  input={<Input />}
                >
                  {options[idx]}
                </Select>
              </FormControl>
            </Badge>
          </Grid>
          <Grid item container spacing={2}>
            {getCardItems(cardOptions[idx], name, cardLabels[idx])}
          </Grid>
        </Grid>
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
            additions && additions.length
              ? `${additions[0].name[0].value}(${
                additions[0].additionalPrice[0].value / 100
              } грн)`
              : null
          }
        />
      </Grid>
      <StepperButtons
        activeStep={activeStep}
        handleNext={handleNext}
        handleBack={handleBack}
      />
    </div>
  );
};

ProductAddOptions.propTypes = {
  selectedOptions: PropTypes.objectOf(PropTypes.object).isRequired,
  setOptions: PropTypes.func.isRequired,
  additions: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeStep: PropTypes.bool.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired
};

export default ProductAddOptions;

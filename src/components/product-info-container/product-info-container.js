import React, { useState } from 'react';

import {
    TextField,
    FormControlLabel,
    Checkbox,
    AppBar,
    Tabs,
    Tab,
    Typography,
    Grid
} from '@material-ui/core';
import useStyles from './product-info-container.styles';

import TabPanel from "../tab-panel";
import {config} from "../../configs";

const { productInfoLabels } = config;

const ProductInfoContainer = ({
  preferedLanguages,
  setPreferedLanguages,
  checkedLanguages, variant, values, errors, touched, handleChange, handleBlur, handleSubmit
}) => {
    const styles = useStyles();

    const [tabValue, setTabValue] = useState(0);

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setPreferedLanguages({
            ...preferedLanguages,
            [name]: { name, checked }
        });
    };

    const handleTabsChange = (e, newValue) => {
        setTabValue(newValue);
    };

    const langCheckboxes = Object.values(
        preferedLanguages
    ).map(({ name, checked }, idx) => (
        <FormControlLabel
            key={idx}
            control={
                <Checkbox
                    checked={checked}
                    onChange={handleCheckboxChange}
                    name={name}
                    color='primary'
                />
            }
            label={name}
        />
    ));

    const languageTabs = checkedLanguages.map(({ name }, idx) => (
        <Tab label={name} key={idx} />
    ));

    return (
        <form onSubmit={handleSubmit}>
            <Grid container alignItems='center' spacing={2}>
                <Grid item>
                    <Typography className={styles.title}>Оберіть мови:</Typography>
                </Grid>
                <Grid item>{langCheckboxes}</Grid>
            </Grid>
            {languageTabs.length ? (
                <AppBar position='static'>
                    <Tabs onChange={handleTabsChange} value={tabValue} aria-label='tabs'>
                        {languageTabs}
                    </Tabs>
                </AppBar>
            ) : null}
            {checkedLanguages.map((lang, idx) => (
                <TabPanel index={idx} value={tabValue} key={idx}>
                    {productInfoLabels.map(({ label, name }) => (
                        <TextField
                            key={name}
                            name={`${lang.name}${name}`}
                            className={styles.textfield}
                            id={name}
                            label={`${label}*`}
                            error={touched[`${lang.name}${name}`] && !!errors[`${lang.name}${name}`]}
                            helperText={touched[`${lang.name}${name}`] && errors[`${lang.name}${name}`]}
                            value={values[`${lang.name}${name}`]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            variant={variant}
                        />
                    ))}
                </TabPanel>
            ))}
        </form>
    );

};

ProductInfoContainer.propTypes = {

};

export default ProductInfoContainer;
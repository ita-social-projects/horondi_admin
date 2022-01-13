import React, { useState, useEffect, useMemo } from 'react';
import { DatePicker } from 'rsuite';
import { Grid, Button, Typography, TextField } from '@material-ui/core';
import { useStyles } from './create-certificate.styles';
import { BackButton } from '../../../components/buttons';
import materialUiConstants from '../../../configs/material-ui-constants';
import { useCommonStyles } from '../../common.styles';
import CheckBoxes from '../checkBoxes';
import formRegExp from '../../../configs/form-regexp';
import CertificatesTable from '../certificatesTable';
import { loginErrorMessages } from '../../../configs/error-messages';
import buttonTitles from '../../../configs/button-titles';
import titles from '../../../configs/titles';
import routes from '../../../configs/routes';

const { certificatesTitles } = titles;

const CreateCertificate = () => {
  const commonStyles = useCommonStyles();
  const styles = useStyles();

  const [checkBoxes, setCheckBoxes] = useState([
    { checked: false, quantity: 1, name: certificatesTitles[500] },
    { checked: false, quantity: 1, name: certificatesTitles[1000] },
    { checked: false, quantity: 1, name: certificatesTitles[1500] }
  ]);

  const [date, setDate] = useState(new Date());
  const [email, setEmail] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    let check = false;
    checkBoxes.forEach((item) => {
      if (item.checked) {
        check = true;
      }
    });

    if (!isInvalid && date && email && check) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [isInvalid, date, checkBoxes, email]);

  const expireDate = useMemo(() => {
    if (date === null) {
      return null;
    }

    let newDate = new Date(date);
    newDate = newDate.setFullYear(newDate.getFullYear() + 1);
    return new Date(newDate);
  }, [date]);

  const disabledDate = (pickedDate) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return pickedDate < yesterday;
  };

  const createData = (id, name, dateFrom, dateTo) => ({
    id,
    name,
    dateFrom,
    dateTo
  });

  const generateCertificates = () => {
    const newArr = [];
    checkBoxes.forEach((certificate) => {
      if (certificate.checked && !isInvalid) {
        for (let i = 0; i < certificate.quantity; i++) {
          newArr.push(createData('#', certificate.name, date, expireDate));
        }
      }
    });
    setCertificates(newArr);
  };

  const emailOnBlur = (e, regExp) => {
    setIsInvalid(true);
    const input = e.target.value;
    input.match(regExp) ? setIsInvalid(false) : setIsInvalid(true);
  };

  const emailHandler = (e) => {
    setIsInvalid(true);
    setEmail(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Grid container spacing={2} className={styles.fixedButtons}>
          <Grid item className={styles.button}>
            <BackButton pathBack={routes.pathToAboutCertificate} />
          </Grid>
          <Grid item className={styles.button}>
            <Button
              variant={materialUiConstants.contained}
              color={materialUiConstants.primary}
              disabled={disabled}
            >
              {buttonTitles.MODEL_SAVE_TITLE}
            </Button>
          </Grid>
        </Grid>
      </div>
      <div className={styles.title}>
        <Typography
          variant={materialUiConstants.typographyVariantH1}
          className={commonStyles.materialTitle}
        >
          {certificatesTitles.mainPageTitle}
        </Typography>
      </div>
      <div className={styles.section}>
        <Typography className={styles.heading}>
          {certificatesTitles.validity}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <label className={styles.label}>
              {certificatesTitles.validFrom}
            </label>
            <DatePicker
              className={styles.datePicker}
              oneTap
              size='lg'
              format='D/MM/YYYY'
              value={date}
              disabledDate={disabledDate}
              onChange={(newValue) => {
                setDate(newValue);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <label className={styles.label}>
              {certificatesTitles.validUntil}
            </label>
            <DatePicker
              className={styles.datePicker}
              disabled
              size='lg'
              format='D/MM/YYYY'
              value={expireDate}
            />
          </Grid>
        </Grid>
      </div>
      <div className={styles.section}>
        <Typography className={styles.heading}>
          {certificatesTitles.cost}
        </Typography>
        <CheckBoxes options={checkBoxes} handler={setCheckBoxes} />
      </div>
      <div className={styles.section}>
        <Grid container spacing={2} className={styles.generate}>
          <Grid item xs={6}>
            <TextField
              error={isInvalid}
              className={styles.textField}
              variant={materialUiConstants.outlined}
              label='Email'
              value={email}
              helperText={isInvalid && loginErrorMessages.INVALID_EMAIL_MESSAGE}
              onChange={(e) => emailHandler(e)}
              onBlur={(e) => emailOnBlur(e, formRegExp.email)}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              data-testid='generate'
              variant={materialUiConstants.contained}
              color={materialUiConstants.primary}
              onClick={generateCertificates}
              disabled={disabled}
            >
              {buttonTitles.GENERATE_CERTIFICATE}
            </Button>
          </Grid>
        </Grid>
      </div>
      {certificates.length ? (
        <div className={styles.section} data-testid='table'>
          <CertificatesTable certificates={certificates} />
        </div>
      ) : null}
    </div>
  );
};

export default CreateCertificate;

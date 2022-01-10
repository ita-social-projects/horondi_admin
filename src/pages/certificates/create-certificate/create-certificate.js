import React, { useState } from 'react';
import moment from 'moment';
import { Grid, Button, Typography } from '@material-ui/core';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ukLocale from 'date-fns/locale/uk';

import { useStyles } from './create-certificate.styles';
import { BackButton } from '../../../components/buttons';
import materialUiConstants from '../../../configs/material-ui-constants';
import { useCommonStyles } from '../../common.styles';
import CheckBoxes from './checkBoxes';
import formRegExp from '../../../configs/form-regexp';
import CertificatesTable from './certificatesTable';
import { loginErrorMessages } from '../../../configs/error-messages';
import buttonTitles from '../../../configs/button-titles';
import titles from '../../../configs/titles';

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
  const [isInvalid, setIsInvalid] = useState(true);
  const [certificates, setCertificates] = useState([]);

  let newDate = new Date(date);
  newDate = newDate.setFullYear(newDate.getFullYear() + 1);

  const createData = (id, name, expired) => ({ id, name, expired });

  const formatDate = (date, newDate) => `${moment(date).format('DD/MM/YYYY')} - ${moment(newDate).format(
      'DD/MM/YYYY'
    )}`;

  const generateCertificates = () => {
    setCertificates([]);
    const newArr = [];
    checkBoxes.forEach((certificate) => {
      if (certificate.checked && !isInvalid) {
        for (let i = 0; i < certificate.quantity; i++) {
          newArr.push(
            createData('#', certificate.name, formatDate(date, newDate))
          );
        }
      }
    });
    setCertificates(newArr);
  };

  const handleChange = (e, regExp) => {
    setEmail(e.target.value);
    const input = e.target.value;
    input.match(regExp) ? setIsInvalid(false) : setIsInvalid(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Grid container spacing={2} className={styles.fixedButtons}>
          <Grid item className={styles.button}>
            <BackButton />
          </Grid>
          <Grid item className={styles.button}>
            <Button
              variant={materialUiConstants.contained}
              color={materialUiConstants.primary}
              disabled={isInvalid}
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
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ukLocale}>
          <Stack direction='row' spacing={3}>
            <DesktopDatePicker
              label={certificatesTitles.validFrom}
              value={date}
              inputFormat='dd/MM/yyyy'
              minDate={new Date()}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <DesktopDatePicker
              label={certificatesTitles.validUntil}
              value={newDate}
              inputFormat='dd/MM/yyyy'
              readOnly
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
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
              onChange={(e) => handleChange(e, formRegExp.email)}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              variant={materialUiConstants.contained}
              color={materialUiConstants.primary}
              onClick={generateCertificates}
              disabled={isInvalid}
            >
              {buttonTitles.GENERATE_CERTIFICATE}
            </Button>
          </Grid>
        </Grid>
      </div>
      {certificates.length ? (
        <div className={styles.section}>
          <CertificatesTable certificates={certificates} />
        </div>
      ) : null}
    </div>
  );
};

export default CreateCertificate;

import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';

import { DatePicker } from 'rsuite';
import {
  Grid,
  Button,
  Typography,
  TextField,
  Tooltip
} from '@material-ui/core';

import {
  showSuccessSnackbar,
  showErrorSnackbar
} from '../../../redux/snackbar/snackbar.actions';

import LoadingBar from '../../../components/loading-bar';

import formRegExp from '../../../configs/form-regexp';
import { loginErrorMessages } from '../../../configs/error-messages';
import buttonTitles from '../../../configs/button-titles';
import titles from '../../../configs/titles';
import routes from '../../../configs/routes';
import materialUiConstants from '../../../configs/material-ui-constants';

import CheckBoxes from '../checkBoxes';
import { BackButton } from '../../../components/buttons';
import { useCommonStyles } from '../../common.styles';

import { useStyles } from './create-certificate.styles';
import CertificatesTable from '../certificatesTable';
import { bulkGenerateCertificates } from '../operations/certificate.mutation';

const { certificatesTitles, certificatesValueTitles } = titles;

const CreateCertificate = () => {
  const dispatch = useDispatch();

  const commonStyles = useCommonStyles();
  const styles = useStyles();

  const initialCheckboxes = certificatesValueTitles.map((item) => ({
    checked: false,
    quantity: 1,
    ...item
  }));

  const [checkBoxes, setCheckBoxes] = useState(initialCheckboxes);
  const [date, setDate] = useState();
  const [email, setEmail] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const [generateCertificates, { loading: certificatesLoading }] = useMutation(
    bulkGenerateCertificates,
    {
      onCompleted(data) {
        dispatch(showSuccessSnackbar('Успішно додано'));

        setCertificates(data.generateCertificate.certificates);
        setCheckBoxes(initialCheckboxes);
        setEmail('');
      },
      onError: (err) => {
        dispatch(showErrorSnackbar(`Помилка: ${err}`));
      }
    }
  );

  useEffect(() => {
    let check = false;
    checkBoxes.forEach((item) => {
      if (item.checked) {
        check = true;
      }
    });

    if (date && check && email) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [date, checkBoxes, email]);

  const disabledDate = (pickedDate) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const oneMonthAfter = new Date();
    oneMonthAfter.setDate(oneMonthAfter.getDate() + 30);

    return pickedDate < yesterday || pickedDate >= oneMonthAfter;
  };

  const emulateCertificates = () => {
    const newArr = [];
    checkBoxes.forEach((certificate) => {
      if (certificate.checked && !isInvalid) {
        for (let i = 0; i < certificate.quantity; i++) {
          newArr.push({
            name: 'HOR###',
            value: certificate.value,
            dateStart: date,
            dateEnd: expireDate
          });
        }
      }
    });
    setCertificates(newArr);
  };

  const emailOnBlur = (e, regExp) => {
    const input = e.target.value;

    if (!input) {
      isInvalid && setIsInvalid(false);
      return;
    }

    input.match(regExp) ? setIsInvalid(false) : setIsInvalid(true);
  };

  const emailHandler = (e) => {
    setIsInvalid && setIsInvalid(false);
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (email.length > 1) {
      email.match(formRegExp.email) ? setIsInvalid(false) : setIsInvalid(true);
    }
  }, [email]);

  const expireDate = date ? new Date(date) : new Date();
  expireDate.setFullYear(expireDate.getFullYear() + 1);

  const newCertificates = checkBoxes.reduce((newArr, item) => {
    if (item.checked) {
      newArr.push({
        value: item.value,
        count: item.quantity
      });
    }

    return newArr;
  }, []);

  const variables = {
    email,
    newCertificates
  };

  if (date) {
    const dateStart = { dateStart: date };
    Object.assign(variables, dateStart);
  }

  const onClickMutation = () =>
    generateCertificates({
      variables
    });

  if (certificatesLoading) {
    return <LoadingBar />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Grid container spacing={2} className={styles.fixedButtons}>
          <Grid item className={styles.button}>
            <BackButton pathBack={routes.pathToAboutCertificate} />
          </Grid>
          <Tooltip title={!disabled ? '' : 'Згенеруйте сертифікат'}>
            <Grid item className={styles.button}>
              <Button
                aria-label='bulkGenerate'
                variant={materialUiConstants.contained}
                color={materialUiConstants.primary}
                disabled={!(certificates.length && !disabled)}
                onClick={() => onClickMutation()}
              >
                {buttonTitles.MODEL_SAVE_TITLE}
              </Button>
            </Grid>
          </Tooltip>
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
              data-testid='datePicker'
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
              value={date && expireDate}
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
              inputProps={{ 'aria-label': 'email' }}
              value={email}
              helperText={isInvalid && loginErrorMessages.INVALID_EMAIL_MESSAGE}
              onChange={(e) => emailHandler(e)}
              onBlur={(e) => emailOnBlur(e, formRegExp.email)}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              data-testid='emulate'
              variant={materialUiConstants.contained}
              color={materialUiConstants.primary}
              onClick={emulateCertificates}
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

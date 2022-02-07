import React, { useState, useEffect, useMemo } from 'react';
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

import { LOCAL_STORAGE } from '../../../consts/local-storage';
import { getFromLocalStorage } from '../../../services/local-storage.service';

import {
  setSnackBarMessage,
  setSnackBarSeverity,
  setSnackBarStatus
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

const { certificatesTitles } = titles;

const CreateCertificate = () => {
  const dispatch = useDispatch();

  const commonStyles = useCommonStyles();
  const styles = useStyles();

  const initialCheckboxes = [
    { checked: false, quantity: 1, name: certificatesTitles[500], value: 500 },
    {
      checked: false,
      quantity: 1,
      name: certificatesTitles[1000],
      value: 1000
    },
    { checked: false, quantity: 1, name: certificatesTitles[1500], value: 1500 }
  ];

  const [checkBoxes, setCheckBoxes] = useState(initialCheckboxes);
  const [date, setDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));

  /* 
  const [date, setDate] = useState(new Date());
  const [date, setDate] = useState('2023-02-04T17:28:59.947Z'); 
  */

  const [email, setEmail] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const token = getFromLocalStorage(LOCAL_STORAGE.AUTH_ACCESS_TOKEN);

  const [generateCertificates, { loading: certificatesLoading }] = useMutation(
    bulkGenerateCertificates,
    {
      context: {
        headers: {
          token
        }
      },
      onCompleted(data) {
        dispatch(setSnackBarSeverity('success'));
        dispatch(setSnackBarMessage('Успішно додано'));
        dispatch(setSnackBarStatus(true));

        setCertificates(data.bulkGenerateCertificates.items);
        setCheckBoxes(initialCheckboxes);
        setEmail('');
      },
      onError: (err) => {
        dispatch(setSnackBarSeverity('error'));
        dispatch(setSnackBarMessage(`Помилка: ${err}`));
        dispatch(setSnackBarStatus(true));
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

    if (!isInvalid && date && check) {
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

    const oneMonthAfter = new Date();
    oneMonthAfter.setDate(oneMonthAfter.getDate() + 30);

    return pickedDate < yesterday || pickedDate >= oneMonthAfter;
  };

  const createData = (name, value, dateStart, dateEnd) => ({
    name,
    value,
    dateStart,
    dateEnd
  });

  const emulateCertificates = () => {
    const newArr = [];
    checkBoxes.forEach((certificate) => {
      if (certificate.checked && !isInvalid) {
        for (let i = 0; i < certificate.quantity; i++) {
          newArr.push(
            createData('HOR###', certificate.value, date, expireDate)
          );
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
    setIsInvalid(true);
    setEmail(e.target.value);
  };
  const onClickMutation = () =>
    generateCertificates({
      variables: {
        generate: {
          email,
          dateStart: date,
          bulk: checkBoxes.reduce((newArr, item) => {
            item.checked &&
              newArr.push({ value: item.value, quantity: item.quantity });
            return newArr;
          }, [])
        }
      }
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

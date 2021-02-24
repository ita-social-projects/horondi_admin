import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  FormControlLabel,
  TextField,
  FormControl,
  Grid,
  Switch,
  Button,
  Dialog,
  DialogTitle,
  DialogContent
} from '@material-ui/core';
import { useFormik } from 'formik';
import _ from 'lodash';
import { SaveButton } from '../../../buttons';
import TableContainerGenerator from '../../../../containers/table-container-generator/table-container-generator';
import TableContainerRow from '../../../../containers/table-container-row/table-container-row';
import { config } from '../../../../configs';
import labels from '../../../../configs/labels';
import { useModalStyles } from './size-modal-form.styles';

const SizesFormModal = ({sizes}) => {


  const sizesTables = {
    sizesPageTitles: ['Обрати', 'Назва', 'Розмір', 'Доступно']
  };
  const { AVAILABLE_TEXT, UNAVAILABLE_TEXT } = config.sizesAvailableVariants;
  const styles = useModalStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { handleSubmit } = useFormik({});

  const sizeItems = _.map(sizes, (sizeItem) => (
    <TableContainerRow
      showAvatar={false}
      showEdit={false}
      showDelete={false}
      showCheckbox
      name={sizeItem.simpleName[0].value}
      size={sizeItem.name}
      available={sizeItem.available ? AVAILABLE_TEXT : UNAVAILABLE_TEXT}
      id={sizeItem._id}
      key={sizeItem._id}
    />
  ));

  return (
    <div>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        Add Size
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <div>Оберіть розміри</div>
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleSubmit}>
            <div className={styles.mainWrapper}>
              <TableContainerGenerator
                pagination
                data-cy='sizes'
                tableTitles={sizesTables.sizesPageTitles}
                tableItems={sizeItems}
              />
              <SaveButton
                className={styles.saveButton}
                data-cy='save'
                type='submit'
                title='Add sizes'
              />
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SizesFormModal;

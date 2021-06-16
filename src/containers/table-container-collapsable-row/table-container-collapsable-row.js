import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  TableRow,
  TableCell,
  Avatar,
  Checkbox,
  Typography,
  TextField,
  IconButton
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import PropTypes from 'prop-types';

import { noop } from 'lodash';
import { SaveButton } from '../../components/buttons';
import {
  CustomizedEditIcon,
  CustomizedDeleteIcon
} from '../../components/icons';

import { handleHelperText } from '../../utils/handle-email-question-detail';
import { useStyles } from './table-container-collapsable-row.styles';
import { config, inputTypes, formConstants } from '../../configs';
import buttonTitles from '../../configs/button-titles';

const { labels } = config;

const TableContainerCollapsableRow = ({
  id,
  image,
  editHandler,
  showAvatar,
  showCollapse,
  showEdit,
  showDelete,
  showCheckbox,
  deleteHandler,
  setAnswerValue,
  answerValue,
  checkboxChangeHandler,
  onAnswer,
  shouldValidate,
  answer,
  question,
  collapsable = false,
  ...rest
}) => {
  const { SMALL_SIZE, DEFAULT_SIZE } = config.iconSizes;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const dense = useSelector(({ Table }) => Table.dense);

  const properties = { ...rest };
  const tableCells = Object.keys(properties).map((property) => (
    <TableCell key={property} data-cy='table-cell'>
      <Typography className={classes.pageTruncateTableControl}>
        {properties[property]}
      </Typography>
    </TableCell>
  ));

  const handleSaveButtonAction = () => {
    onAnswer(id);
  };

  const iconSize = dense ? SMALL_SIZE : DEFAULT_SIZE;
  const avatarSize = dense ? classes.small : classes.medium;
  return (
    <>
      <TableRow className={classes.tableRowCursor} key={id} hover>
        {showCheckbox && (
          <TableCell>
            <Checkbox
              color='default'
              inputProps={{ 'aria-label': 'checkbox with default color' }}
              onClick={(e) => checkboxChangeHandler(e, id)}
            />
          </TableCell>
        )}
        {showAvatar && (
          <TableCell>
            <Avatar className={avatarSize} src={image}>
              <ImageIcon />
            </Avatar>
          </TableCell>
        )}
        {tableCells}
        {(showEdit || showDelete || showCollapse) && (
          <TableCell>
            {showEdit && (
              <CustomizedEditIcon
                size={iconSize}
                onClickHandler={editHandler}
                data-cy='edit-btn'
              />
            )}
            {showDelete && (
              <CustomizedDeleteIcon
                size={iconSize}
                onClickHandler={deleteHandler}
              />
            )}
            {showCollapse && (
              <IconButton onClick={() => setOpen(!open)}>
                {open ? (
                  <KeyboardArrowUpIcon fontSize={iconSize} />
                ) : (
                  <KeyboardArrowDownIcon fontSize={iconSize} />
                )}
              </IconButton>
            )}
          </TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Typography variant='h5' gutterBottom component='div'>
                Q:
              </Typography>
              <Typography gutterBottom component='div'>
                {question}
              </Typography>
              {answer && (
                <>
                  <Typography variant='h5' gutterBottom component='div'>
                    A:
                  </Typography>
                  <Typography gutterBottom component='div'>
                    {answer}
                  </Typography>
                </>
              )}
              {!answer && (
                <TextField
                  id='filled-full-width'
                  fullWidth
                  multiline
                  rows={10}
                  margin='normal'
                  placeholder={labels.emailQuestionsLabels.placeholder}
                  InputLabelProps={{ shrink: true }}
                  label='Enter your answer'
                  value={answerValue}
                  variant={formConstants.textFieldFilled}
                  error={!answerValue && shouldValidate}
                  onChange={(e) => setAnswerValue(e.target.value)}
                  helperText={handleHelperText(answerValue, shouldValidate)}
                />
              )}
            </Box>
            <Box display='flex' justifyContent='flex-end' m={2}>
              {!answer && (
                <SaveButton
                  className={classes.controlButton}
                  id='save'
                  type={inputTypes.submit}
                  title={buttonTitles.ANSWER}
                  onClickHandler={handleSaveButtonAction}
                />
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

TableContainerCollapsableRow.propTypes = {
  answer: PropTypes.string,
  question: PropTypes.string,
  showCollapse: PropTypes.bool,
  image: PropTypes.string,
  editHandler: PropTypes.func,
  answerValue: PropTypes.string,
  shouldValidate: PropTypes.bool,
  setAnswerValue: PropTypes.func,
  collapsable: PropTypes.bool,
  deleteHandler: PropTypes.func,
  onAnswer: PropTypes.func,
  checkboxChangeHandler: PropTypes.func,
  id: PropTypes.string,
  showAvatar: PropTypes.bool,
  showEdit: PropTypes.bool,
  showDelete: PropTypes.bool,
  showCheckbox: PropTypes.bool
};

TableContainerCollapsableRow.defaultProps = {
  id: '',
  image: '',
  answer: '',
  question: '',
  showCollapse: false,
  collapsable: false,
  onAnswer: noop,
  answerValue: '',
  shouldValidate: false,
  setAnswerValue: noop,
  deleteHandler: noop,
  editHandler: noop,
  checkboxChangeHandler: noop,
  showAvatar: true,
  showEdit: true,
  showDelete: true,
  showCheckbox: false
};

export default TableContainerCollapsableRow;

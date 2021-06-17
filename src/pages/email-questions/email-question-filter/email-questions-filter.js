import React from 'react';
import {
  Badge,
  FormControl,
  Input,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText
} from '@material-ui/core';
import PropTypes from 'prop-types';

import { noop } from 'lodash';
import { useStyles, MenuProps } from './email-question-filter.styles';
import { badgePosition, config } from '../../../configs';

const {
  labels: { emailQuestionsLabels }
} = config;

const EmailQuestionsFilter = ({ filterItems, filterChangeHandler }) => {
  const styles = useStyles();

  const handleSelected = (selected) => {
    if (selected.length === 1) {
      return emailQuestionsLabels.ua[selected[0]];
    }
    return selected.map((item) => emailQuestionsLabels.ua[item]).join(', ');
  };

  return (
    <div className={styles.container}>
      <Badge
        badgeContent={filterItems.length - 1}
        color='error'
        anchorOrigin={badgePosition}
      >
        <FormControl className={styles.formControl}>
          <InputLabel id='demo-mutiple-checkbox-label'>
            Фільтрувати за:
          </InputLabel>
          <Select
            labelId='demo-mutiple-checkbox-label'
            id='demo-mutiple-checkbox'
            multiple
            value={filterItems}
            onChange={(_, data) => filterChangeHandler(data.props.value)}
            input={<Input />}
            renderValue={(selected) => handleSelected(selected)}
            MenuProps={MenuProps}
          >
            {Object.entries(emailQuestionsLabels.ua).map((status) => (
              <MenuItem key={status[0]} value={status[0]}>
                <Checkbox checked={filterItems.indexOf(status[0]) > -1} />
                <ListItemText primary={status[0]} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Badge>
    </div>
  );
};

EmailQuestionsFilter.propTypes = {
  filterItems: PropTypes.arrayOf(String),
  filterChangeHandler: PropTypes.func
};

EmailQuestionsFilter.defaultProps = {
  filterItems: [],
  filterChangeHandler: noop
};

export default EmailQuestionsFilter;

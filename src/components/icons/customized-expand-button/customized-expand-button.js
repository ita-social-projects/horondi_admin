import React from 'react';

import { Tooltip, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { config } from '../../../configs';

const { DELETE_TITLE } = config.buttonTitles;

const CustomizedExpandIcon = (props) => {
  const { onClickHandler, size, testId } = props;

  return (
    <Tooltip title='Деталі'>
      <IconButton
        aria-label={DELETE_TITLE}
        onClick={onClickHandler}
        data-testid={testId}
      >
        <ExpandMoreIcon fontSize={size} />
      </IconButton>
    </Tooltip>
  );
};

CustomizedExpandIcon.propTypes = {
  onClickHandler: PropTypes.func,
  size: PropTypes.string.isRequired,
  testId: PropTypes.string
};

CustomizedExpandIcon.defaultProps = {
  onClickHandler: noop,
  testId: 'del_btn'
};

export default CustomizedExpandIcon;

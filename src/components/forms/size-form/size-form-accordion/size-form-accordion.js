import React from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  sizeDefaultProps,
  sizePropTypes
} from '../../../../utils/size-helpers';
import SizeForm from '..';
import { config } from '../../../../configs';

const { sizeAdd, sizeEdit } = config.titles.sizesTitles;

const SizeFormAccordion = ({
  isExpanded,
  onChange,
  sizeUtils,
  isSizeEdit,
  size
}) => (
  <Accordion expanded={isExpanded} onChange={onChange}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls='size-form-content'
      id={`size-form${size._id || ''}`}
    >
      <Typography>
        {isSizeEdit ? `${sizeEdit} | '${size.name}'` : sizeAdd}
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <SizeForm isEdit={isSizeEdit} size={size} sizeUtils={sizeUtils} />
    </AccordionDetails>
  </Accordion>
);

SizeFormAccordion.propTypes = {
  isExpanded: PropTypes.bool,
  onChange: PropTypes.func,
  sizeUtils: PropTypes.shape(sizePropTypes.sizeUtils),
  isSizeEdit: sizePropTypes.isEdit,
  size: PropTypes.shape(sizePropTypes.size)
};

SizeFormAccordion.defaultProps = {
  isExpanded: true,
  onChange: null,
  ...sizeDefaultProps
};

export default SizeFormAccordion;

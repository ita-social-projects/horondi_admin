import React from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { sizeFormAccordionPropTypes } from '../../../../utils/size-helpers';
import SizeForm from '..';
import { config } from '../../../../configs';

const SizeFormAccordion = ({
  isExpanded,
  onChange,
  onSizeSubmit,
  onSizeDelete,
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
        {isSizeEdit
          ? `${config.titles.sizesTitles.sizeEdit} '${size.name}'`
          : config.titles.sizesTitles.sizeAdd}
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <SizeForm
        isEdit={isSizeEdit}
        size={size}
        onSizeDelete={onSizeDelete}
        onSizeSubmit={onSizeSubmit}
      />
    </AccordionDetails>
  </Accordion>
);

SizeFormAccordion.propTypes = {
  isExpanded: PropTypes.bool,
  onChange: PropTypes.func,
  onSizeSubmit: PropTypes.func,
  onSizeDelete: PropTypes.func,
  isSizeEdit: PropTypes.bool,
  size: PropTypes.shape(sizeFormAccordionPropTypes)
};

SizeFormAccordion.defaultProps = {
  isExpanded: true,
  onChange: null,
  onSizeSubmit: null,
  onSizeDelete: null,
  isSizeEdit: false,
  size: {}
};

export default SizeFormAccordion;

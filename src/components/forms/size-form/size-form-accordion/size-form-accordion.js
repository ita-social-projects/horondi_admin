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
        {isSizeEdit
          ? `${config.titles.sizesTitles.sizeEdit} '${size.name}'`
          : config.titles.sizesTitles.sizeAdd}
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
  sizeUtils: PropTypes.shape({
    onSizeSubmit: PropTypes.func,
    onSizeDelete: PropTypes.func,
    sizesAdded: PropTypes.arrayOf(PropTypes.string)
  }),
  isSizeEdit: PropTypes.bool,
  size: PropTypes.shape(sizeFormAccordionPropTypes)
};

SizeFormAccordion.defaultProps = {
  isExpanded: true,
  onChange: null,
  sizeUtils: {
    onSizeSubmit: null,
    onSizeDelete: null,
    sizesAdded: []
  },
  isSizeEdit: false,
  size: {}
};

export default SizeFormAccordion;

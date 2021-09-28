import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TableCell,
  TableRow,
  Typography,
  Avatar
} from '@material-ui/core';
import { map } from 'lodash';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import PropTypes from 'prop-types';
import ImageIcon from '@material-ui/icons/Image';
import { config } from '../../../../configs';
import TableContainerGenerator from '../../../../containers/table-container-generator';
import { useStyles } from './constructor-list-pockets.styles';
import ConstructorListRestrictions from './constructor-list-restrictions/constructor-list-restrictions';
import { CustomizedDeleteIcon } from '../../../icons';

const ConstructorListPockets = ({
  handleChange,
  restrictionsToAdd,
  setRestrictionsToAdd,
  expanded
}) => {
  const classes = useStyles();

  const tableTitles = config.tableHeadRowTitles.constructorPocketList;

  const deleteHandler = (id, positionId) => {
    setRestrictionsToAdd(
      restrictionsToAdd.filter(
        (item) => item.pocket._id !== id || item.position._id !== positionId
      )
    );
  };

  const elementItems = map(restrictionsToAdd, (item, index) => (
    <TableRow key={index}>
      <TableCell>
        <Avatar src={`${config.imagePrefix}${item.pocket.images.thumbnail}`}>
          <ImageIcon />
        </Avatar>
      </TableCell>
      <TableCell>{item.pocket.name[0].value}</TableCell>
      <TableCell>{item.position.name[0].value}</TableCell>
      <TableCell>{item.pocket.additionalPrice[1].value}</TableCell>
      <TableCell>
        <CustomizedDeleteIcon
          onClickHandler={() => {
            deleteHandler(item.pocket._id, item.position._id);
          }}
        />
      </TableCell>
    </TableRow>
  ));
  return (
    <Accordion
      expanded={expanded === 'pocket'}
      onChange={handleChange('pocket')}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='pocketbh-content'
        id='pocketbh-header'
      >
        <Typography className={classes.heading}>Кишені</Typography>
        <Typography className={classes.secondaryHeading} />
      </AccordionSummary>
      <AccordionDetails className={classes.column}>
        {elementItems.length ? (
          <TableContainerGenerator
            pagination
            data-cy='pockettable'
            tableTitles={tableTitles}
            tableItems={elementItems}
          />
        ) : (
          <p>Кишені відсутні</p>
        )}
        <ConstructorListRestrictions
          restrictionsToAdd={restrictionsToAdd}
          setRestrictionsToAdd={setRestrictionsToAdd}
        />
      </AccordionDetails>
    </Accordion>
  );
};

const valueShape = PropTypes.shape({
  value: PropTypes.string
});

ConstructorListPockets.propTypes = {
  expanded: PropTypes.string,
  handleChange: PropTypes.func,
  setRestrictionsToAdd: PropTypes.func,
  restrictionsToAdd: PropTypes.arrayOf(valueShape)
};

ConstructorListPockets.defaultProps = {
  restrictionsToAdd: [],
  setRestrictionsToAdd: '',
  expanded: '',
  handleChange: ''
};

export default ConstructorListPockets;

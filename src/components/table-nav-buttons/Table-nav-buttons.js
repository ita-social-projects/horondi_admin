import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Badge } from '@material-ui/core';

import { StandardButton } from '../buttons';

import { config } from '../../config';

const { filterLabels } = config.productFilters;
const CLEAR_BUTTON_TITLE = 'Clear All';
const SMALL_SIZE = 'small';
const DEFAULT_SIZE = 'medium';

const TableNavButtons = ({
  filterCounters,
  handleMenuOpen,
  handleClearFilter,
  dense
}) => {
  const size = dense ? SMALL_SIZE : DEFAULT_SIZE;

  const filterButtons = filterLabels.map((name) => (
    <Badge key={name} color='error' badgeContent={filterCounters[name]}>
      <StandardButton
        title={name}
        size={size}
        eventHandler={handleMenuOpen(name)}
      />
    </Badge>
  ));

  const clearDisable = filterCounters.total === 0;

  return (
    <Fragment>
      {filterButtons}
      <StandardButton
        disabled={clearDisable}
        key={CLEAR_BUTTON_TITLE}
        eventHandler={handleClearFilter}
        size={size}
        title={CLEAR_BUTTON_TITLE}
      />
    </Fragment>
  );
};

const mapStateToProps = ({
  filtersState: { filterCounters },
  tableState: { dense }
}) => ({
  filterCounters,
  dense
});

export default connect(mapStateToProps)(TableNavButtons);

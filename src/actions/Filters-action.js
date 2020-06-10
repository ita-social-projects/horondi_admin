const setFilterSelected = (newFilterSelected) => ({
  type: 'SET_FILTER_SELECTED',
  payload: newFilterSelected
});

const setFilterCounters = (newFilterCounters) => ({
  type: 'SET_FILTER_COUNTER',
  payload: newFilterCounters
});

const setFilterOptionsList = (newfilterOptionsList) => ({
  type: 'SET_FILTER_OPTIONS_LIST',
  payload: newfilterOptionsList
});

const setFilterOptionsGroups = (newfilterOptionsGroups) => ({
  type: 'SET_FILTER_OPTIONS_GROUPS',
  payload: newfilterOptionsGroups
});

const setCheckBoxStatus = (newCheckboxStatus) => ({
  type: 'SET_CHECKBOX_STATUS',
  payload: newCheckboxStatus
});

export {
  setFilterSelected,
  setCheckBoxStatus,
  setFilterOptionsList,
  setFilterOptionsGroups,
  setFilterCounters
};

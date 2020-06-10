const setCatalog = (newCatalog) => ({
  type: 'SET_CATALOG',
  payload: newCatalog
});

const setCatalogs = (newCatalogs) => ({
  type: 'SET_CATALOGS',
  payload: newCatalogs
});

const catalogLoadingStatus = () => ({
  type: 'LOADING_STATUS'
});

export { setCatalog, setCatalogs, catalogLoadingStatus };

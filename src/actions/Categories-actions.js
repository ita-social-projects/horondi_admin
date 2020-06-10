const setCategory = (newCategory) => ({
  type: 'SET_CATEGORY',
  payload: newCategory
});

const setCategories = (newCategories) => ({
  type: 'SET_CATEGORIES',
  payload: newCategories
});

const categoryLoadingStatus = () => ({
  type: 'LOADING_STATUS'
});

const categoryLoadingStop = () => ({
  type: 'LOADING_STOP'
});

const categoryUpdateCatalogs = (catalogs) => ({
  type: 'UPDATE_CATALOGS',
  payload: catalogs
});

export {
  setCategory,
  setCategories,
  categoryLoadingStatus,
  categoryUpdateCatalogs,
  categoryLoadingStop
};

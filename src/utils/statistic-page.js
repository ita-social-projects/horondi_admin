export const getInitialStatsHandler = (
  categories,
  dispatch,
  getInitialStatsAction
) => {
  if (!categories.counts.length) {
    dispatch(getInitialStatsAction());
  }
};

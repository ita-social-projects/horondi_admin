export const selectSlidesAndTable = ({ Slides, Table }) => ({
  list: Slides.list,
  loading: Slides.slideLoading,
  drugAndDropList: Slides.drugAndDropList,
  editStatus: Slides.editStatus,
  currentPage: Table.pagination.currentPage,
  rowsPerPage: Table.pagination.rowsPerPage,
  itemsCount: Table.itemsCount
});

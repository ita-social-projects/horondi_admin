const statsLoading = false;
const doughnutValue = 'success';
const dateValue = 'success';
const barValue = 'success';
const popularProducts = 'success';
const allOrdersStatsSet = 'success';
const paidOrdersStatsSet = 'success';
const updatingBarData = 'success';
const updatingDoughnutData = 'success';
const usersByDaysSet = 'success';
const popularCategories = 'success';

const initialState = {
  loading: false,
  doughnut: {
    categories: 'success',
    orders: 54,
    selectedValue: 12,
    updatingData: false
  },
  categories: 'success',
  bar: {
    products: 43,
    orders: [],
    users: 23,
    selectedValue: 66,
    updatingData: false
  },
  date: 7
};

export {
  statsLoading,
  doughnutValue,
  dateValue,
  barValue,
  popularProducts,
  allOrdersStatsSet,
  paidOrdersStatsSet,
  updatingDoughnutData,
  updatingBarData,
  usersByDaysSet,
  popularCategories,
  initialState
};

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

const mockDate = initialState.date;

const mockCategories = {
  counts: [38, 18, 50],
  names: ['Аксесуари', 'Сумки', 'Інші'],
  relations: [36, 17, 47]
};

const mockProducts = {
  counts: [49, 47, 45, 41, 40],
  labels: [
    'Сумка синя',
    'Гаманець червоний',
    'Ролтоп червоний 1',
    'Новий жовтий 1',
    'Бананка зелена'
  ],
  total: 100
};

const mockDoughnutOrders = {
  counts: [110, 7],
  names: ['DELIVERED', 'CANCELLED'],
  relations: [94, 6]
};

const mockPaidOrders = {
  counts: [4, 12, 15, 9, 6],
  labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
  total: 100
};

const mockUsers = {
  counts: [3, 9, 2, 1, 3],
  labels: ['Nov 11', 'Nov 12', 'Nov 13', 'Nov 14', 'Nov 15'],
  total: 100
};

const mockError = {
  message: 'error'
};

const mockSnackarState = {
  snackBarStatus: false,
  snackBarSeverity: '',
  snackBarMessage: ''
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
  initialState,
  mockCategories,
  mockProducts,
  mockDate,
  mockDoughnutOrders,
  mockPaidOrders,
  mockUsers,
  mockError,
  mockSnackarState
};

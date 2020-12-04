export const productCount = 120;
export const orderCount = 9;

export const popularProducts = {
  counts: [40, 30, 20, 30],
  labels: [
    'Бананка Червона',
    'Сумка Синя',
    'Гаманець червоний',
    "Сумка 'Три кольори'"
  ],
  total: [productCount]
};

export const paidOrders = {
  counts: [1, 1, 2, 2, 1, 1, 1],
  labels: [
    'Oct 20',
    'Oct 22',
    'Oct 23',
    'Oct 25',
    'Oct 27',
    'Oct 28',
    'Oct 29'
  ],
  total: orderCount
};

export const popularProductsEmpty = {
  labels: [],
  counts: [],
  total: []
};

export const popularCategories = {
  counts: [38, 18, 11, 0],
  names: ['Аксесуари', 'Сумки', 'Рюкзаки', 'Інші'],
  relations: [57, 27, 16, 0]
};

export const popularCategoriesEmpty = {
  counts: [0],
  names: [''],
  relations: [0]
};

export const getPopularCategoriesEmpty = (req) => {
  req.reply({
    body: {
      data: {
        getPopularCategories: popularCategoriesEmpty
      }
    }
  });
};

export const getPopularProductsEmpty = (req) => {
  req.reply({
    body: {
      data: {
        getPopularProducts: popularProductsEmpty
      }
    }
  });
};

export const getPopularCategories = (req) => {
  req.reply({
    body: {
      data: {
        getPopularCategories: popularCategories
      }
    }
  });
};

export const getPopularProducts = (req) => {
  req.reply({
    body: {
      data: {
        getPopularProducts: popularProducts
      }
    }
  });
};

export const getPaidOrdersStatistic = (req) => {
  req.reply({
    body: {
      data: {
        getPaidOrdersStatistic: paidOrders
      }
    }
  });
};

export const getOrdersStatistic = (req) => {
  req.reply({
    body: {
      data: {
        getOrdersStatistic: {
          counts: [5],
          names: ['CREATED'],
          relations: [100]
        }
      }
    }
  });
};

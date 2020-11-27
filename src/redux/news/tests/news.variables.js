const mockId = '5f62f5386d3d7c14710c0133';

const mockNewsState = {
  list: [],
  newsArticle: null,
  newsLoading: false,
  newsError: null,
  pagination: {
    currentPage: 0,
    newsPerPage: 6,
    pagesCount: 1
  }
};

const mockSnackbarState = {
  snackBarStatus: false,
  snackBarSeverity: '',
  snackBarMessage: ''
};

const mockNews = {
  items: [
    {
      _id: mockId,
      title: [
        {
          value: 'Аксесуар на пояс, зручна сумка, стильна штучка!'
        },
        {
          value: 'Belt accessory, comfortable bag, stylish thingy!'
        }
      ],
      author: {
        name: [
          {
            value: 'Денис Когут'
          },
          {
            value: 'Denys Kogut'
          }
        ]
      },
      date: '1582477846000',
      show: true,
      images: {
        primary: {
          medium:
            'https://images.stylight.net/image/upload/t_web_post_500x667/q_auto,f_auto/post-c27c63a5b58deb0d4535ddd5993e68b2e4d0776d756fdc41c0f7c391.jpg'
        }
      }
    },
    {
      _id: '5f62f5386d3d7c14710c0134',
      title: [
        {
          value: 'Даруємо знижку - 10%'
        },
        {
          value: null
        }
      ],
      author: {
        name: [
          {
            value: 'Горонді'
          },
          {
            value: 'Horondi'
          }
        ]
      },
      date: '1596271998000',
      show: true,
      images: {
        primary: {
          medium:
            'https://scontent.fiev1-1.fna.fbcdn.net/v/t1.0-9/116838241_3017994774993868_611054070321174116_n.jpg?_nc_cat=105&_nc_sid=8bfeb9&_nc_ohc=c3GKqEaSnl4AX-JmVIC&_nc_ht=scontent.fiev1-1.fna&oh=bb7d22b5287e3d59d99df7341f29d7f2&oe=5F534DDD'
        }
      }
    }
  ],
  count: 2
};

const mockArticle = mockNews.items[0];

const mockNewsLoadPayload = {
  skip: 0,
  limit: 10,
  newsPerPage: 10
};

const pagesCount = Math.ceil(mockNews.count / mockNewsLoadPayload.newsPerPage);

const statuses = {
  SUCCESS_ADD_STATUS: 'Успішно додано!',
  SUCCESS_DELETE_STATUS: 'Успішно видалено!',
  SUCCESS_UPDATE_STATUS: 'Успішно змінено!'
};

const mockError = {
  message: 'error'
};

export {
  mockNews,
  mockSnackbarState,
  mockNewsState,
  mockId,
  mockNewsLoadPayload,
  mockArticle,
  pagesCount,
  statuses,
  mockError
};

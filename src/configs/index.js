import ImportContactsIcon from '@material-ui/icons/ImportContacts';

const languages = ['uk', 'en'];

const routes = {
  pathToNews: '/',
  pathToNewsDetails: '/news/:id',
  pathToAddNews: '/newsadd'
};

export const config = {
  app: {
    title: 'Horondi Admin Portal',
    menuCategories: [['News', routes.pathToNews, ImportContactsIcon]],
    routes,
    languages,
    serverUrl: 'http://localhost:5000/',
    drawerWidth: 220,
    snackBarDuration: 4000,
    rowsPerPageOptions: [10, 25, 50, 100]
  },
  tableHeadRowTitles: {
    products: [
      'Image',
      'Catalog',
      'Category',
      'Brand',
      'Title',
      'Price',
      'Mrsp',
      'Actions'
    ],
    news: ['Аватар', 'Автор', 'Заголовок', 'Дії']
  }
};

export const IMG_URL =
  'https://www.yourwdwstore.net/assets/images/6/60000/7000/600/67670-s1.jpg';

import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AssessmentIcon from '@material-ui/icons/Assessment';
import CategoryIcon from '@material-ui/icons/Category';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';

const routes = {
  pathToOrders: '/',
  pathToProducts: '/products',
  pathToProductDetails: '/product/:id',
  pathToAddProduct: '/productadd',
  pathToCategories: '/categories',
  pathToCategoryDetails: '/category/:id',
  pathToAddCategory: '/categoryadd',
  pathToBrands: '/brands',
  pathToNews: '/news',
  pathToBrandDetails: '/brand/:id',
  pathToNewsDetails: '/news/:id',
  pathToAddBrand: '/brandadd',
  pathToAddNews: '/newsadd',
  pathToUsers: '/users',
  pathToUserDetails: '/user/:id',
  pathToLogin: '/login',
  pathToOrderDetails: '/order/:id'
};

export const config = {
  app: {
    title: 'NChoice Admin Portal',
    menuCategories: [
      ['Orders', routes.pathToOrders, AssessmentIcon],
      ['Products', routes.pathToProducts, ShoppingBasketIcon],
      ['Categories', routes.pathToCategories, CategoryIcon],
      ['Brands', routes.pathToBrands, CollectionsBookmarkIcon],
      ['News', routes.pathToNews, ImportContactsIcon],
      ['Users', routes.pathToUsers, PeopleAltIcon]
    ],
    routes,
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
    users: ['Avatar', 'Email', 'First Name', 'Last Name', 'Role', 'Actions'],
    brands: ['Avatar', 'Brand', 'Actions'],
    news: ['Avatar', 'Author', 'Title', 'Actions'],
    categories: ['Avatar', 'Category', 'Actions']
  },
  stepper: {
    labels: [
      'Please choose products Catalog, Category, Brand and Color',
      'Please provide product descriptions',
      'Please provide product sizes information',
      'Please verify and confirm product saving'
    ]
  },
  productFilters: {
    filterLabels: ['catalog', 'category', 'brand'],
    initialFilters: {
      catalog: [],
      category: [],
      brand: []
    },
    filterCounters: {
      catalog: 0,
      brand: 0,
      category: 0,
      total: 0
    }
  },
  product: {
    productKeys: [
      'catalog',
      'category',
      'brand',
      'color',
      'title',
      'description',
      'mrsp',
      'price'
    ],
    productLabels: ['catalog', 'category', 'brand', 'color'],
    productInitialModel: {
      catalog: '',
      category: '',
      brand: '',
      color: '',
      title: '',
      description: '',
      mrsp: '',
      price: '',
      images: [],
      propetries: []
    },
    descriptionLabels: ['title', 'mrsp', 'price', 'description'],
    descriptionRules: {
      typeNumber: ['price', 'mrsp'],
      typeMultiline: ['description']
    },
    sizeKeys: ['size', 'available', 'sku'],
    sizeInitialModel: {
      size: '',
      available: '',
      sku: ''
    },
    sizesRules: {
      numberCategories: ['shoes'],
      typeNumber: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
      typeString: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    }
  }
};

export const IMG_URL =
  'https://www.yourwdwstore.net/assets/images/6/60000/7000/600/67670-s1.jpg';

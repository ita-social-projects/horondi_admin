const sizeL = { size: 'L', sku: 'ASDQWD45', available: '45' };
const sizeS = { size: 'S', sku: 'ASDQWD57', available: '57' };

const productId = 'newproduct';

const initialModel = {
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
};

const readyModel = {
  catalog: 'women',
  category: 'jeans',
  brand: 'ruma',
  color: 'black',
  title: 'New test product',
  description: 'This is product description',
  mrsp: '900',
  price: '1000',
  images: [],
  propetries: [sizeL]
};

const {
  catalog,
  category,
  brand,
  color,
  title,
  description,
  mrsp,
  price
} = readyModel;

describe('Testing page for adding new product to db.', () => {
  it('State of productModel should be initial', () => {
    cy.server();
    cy.route('GET', '/catalogs', 'fixture:productAdd/catalogs').as('catalogs');
    cy.route('GET', '/categories', 'fixture:productAdd/categories').as(
      'categories'
    );
    cy.route('GET', '/brands', 'fixture:productAdd/brands').as('brands');
    cy.route('GET', '/colors', 'fixture:productAdd/colors').as('colors');

    cy.visit('/productadd');
    cy.wait('@catalogs');
    cy.wait('@categories');
    cy.wait('@brands');
    cy.wait('@colors');
    cy.checkProductModel(initialModel);
    cy.get('#snack-bar').should('be.not.visible');
  });
  it('Should setState to productModel of catalog, category, brand, color', () => {
    cy.selectAndCheckProductOption('catalog', 'select', catalog);
    cy.selectAndCheckProductOption('category', 'select', category);
    cy.selectAndCheckProductOption('brand', 'select', brand);
    cy.selectAndCheckProductOption('color', 'select', color);
    cy.get('#next').click();
  });
  it('Should setState to productModel of title, mrsp, price and description', () => {
    cy.selectAndCheckProductOption('title', 'type', title);
    cy.selectAndCheckProductOption('mrsp', 'type', mrsp);
    cy.selectAndCheckProductOption('price', 'type', price);
    cy.selectAndCheckProductOption('description', 'type', description);
    cy.get('#next').click();
  });
  it('Should add size options to Product Model state', () => {
    cy.checkProductSizesLength(0);
    cy.addProductSize(sizeS);
    cy.checkProductSizesLength(1);
    cy.addProductSize(sizeL);
    cy.checkProductSizesLength(2);
  });
  it('Should remove size option from new Product Model state', () => {
    cy.get('#S').click();
    cy.checkProductSizesLength(1);
    cy.get('#next').click();
  });
  it('Should save product, and open it in product detail page', () => {
    cy.server();
    cy.route('POST', '/products', { _id: productId, ...readyModel }).as(
      'post-product'
    );
    cy.route('GET', '/products/newproduct', 'fixture:productAdd/newProduct').as(
      'get-product'
    );

    cy.checkProductModel(readyModel);
    cy.get('#savebutton').click();
    cy.wait('@post-product');
    cy.get('@post-product').its('requestBody').should('deep.equal', readyModel);
    cy.get('#snack-bar').should('be.visible');
    cy.wait('@get-product');
    cy.url().should('include', productId);
  });
});

Cypress.Commands.add('checkProductModel', (model) => {
  cy.window()
    .its('store')
    .invoke('getState')
    .its('productModelState')
    .its('productModel')
    .should('deep.equal', model);
});

Cypress.Commands.add('selectAndCheckProductOption', (label, type, option) => {
  cy.get(`#${label}`)[type](option);
  cy.window()
    .its('store')
    .invoke('getState')
    .its('productModelState')
    .its('productModel')
    .its(label)
    .should('eq', option);
});

Cypress.Commands.add('checkProductSizesLength', (length) => {
  cy.window()
    .its('store')
    .invoke('getState')
    .its('productModelState')
    .its('productModel')
    .its('propetries')
    .should('have.length', length);
});

Cypress.Commands.add('addProductSize', (sizeModel) => {
  const { size, available, sku } = sizeModel;
  cy.get('#size').select(size);
  cy.get('#available').clear().type(available);
  cy.get('#sku').clear().type(sku);
  cy.get('#add').click();
});

Cypress.Commands.add('visitProducts', (productsResponse) => {
  cy.server();
  cy.route('GET', '/products**', productsResponse).as('products');
  cy.route('GET', '/catalogs', 'fixture:productAdd/catalogs').as('catalogs');
  cy.route('GET', '/categories', 'fixture:productAdd/categories').as(
    'categories'
  );
  cy.route('GET', '/brands', 'fixture:productAdd/brands').as('brands');
  cy.route('GET', '/colors', 'fixture:productAdd/colors').as('colors');

  cy.visit('/products');
  cy.wait('@products');
  cy.wait('@catalogs');
  cy.wait('@categories');
  cy.wait('@brands');
  cy.wait('@colors');
});

Cypress.Commands.add('visitBrands', (brandsResponse) => {
  cy.server();
  cy.route('GET', '/brands**', brandsResponse).as('brands');
  cy.visit('/brands');
  cy.wait('@brands');
});

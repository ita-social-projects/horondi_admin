describe('routes', () => {
  it('Orders page should contain sales-by, latest-sales, latest-orders', () => {
    cy.visit('/');
    cy.get('#sales-by').should('exist');
    cy.get('#latest-sales').should('exist');
    cy.get('#latest-orders').should('exist');
  });
  it('Products page should contain sales-by, latest-sales, latest-orders', () => {
    cy.get('[href="/products"]').click();
    cy.url().should('include', '/products');
  });
  it('Brands page should contain sales-by, latest-sales, latest-orders', () => {
    cy.get('[href="/brands"]').click();
    cy.url().should('include', '/brands');
  });
  it('Categories page should contain sales-by, latest-sales, latest-orders', () => {
    cy.get('[href="/categories"]').click();
    cy.url().should('include', '/categories');
  });
  it('Users page should contain sales-by, latest-sales, latest-orders', () => {
    cy.get('[href="/users"]').click();
    cy.url().should('include', '/users');
  });
  it('Bad url should redirect to main page.', () => {
    cy.visit('/RANDOMTEXT');
    cy.get('#sales-by').should('exist');
    cy.get('#latest-sales').should('exist');
    cy.get('#latest-orders').should('exist');
  });
});

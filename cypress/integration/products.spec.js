describe('Testing products list page', () => {
  it('Message with no products should exist', () => {
    cy.visitProducts('');
    cy.get('#noProducts').should('exist');
    cy.get('#tableNav').should('exist');
  });
  it('Table with products should exist', () => {
    cy.visitProducts('fixture:productList/products');
    cy.get('#productTable').should('exist');
    cy.get('#tableNav').should('exist');
  });
  it('In table should be ten products loaded.', () => {
    cy.window()
      .its('store')
      .invoke('getState')
      .its('productsState')
      .its('products')
      .should('have.length', 10);
    cy.get('#table-body').children().should('have.length', 10);
  });
});

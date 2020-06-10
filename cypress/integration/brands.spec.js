describe('Testing brand list page', () => {
  it('Table with brands should exist', () => {
    cy.visitBrands('fixture:brandsList/brands');
    cy.get('#brandsTable').should('exist');
  });
  it('Brands page should load 10 brands', () => {
    cy.window()
      .its('store')
      .invoke('getState')
      .its('brandsState')
      .its('brands')
      .should('have.length', 10);
    cy.get('#table-body').children().should('have.length', 10);
  });
});

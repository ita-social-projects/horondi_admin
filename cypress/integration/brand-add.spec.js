const brandToSave = {
  brand: 'New brand'
};

describe('Testing creation of new brand', () => {
  it('Should visit brand add page clicking add button', () => {
    cy.visitBrands('fixture:brandsList/brands');
    cy.get('#add-brand').click();
  });

  it('Should insert brand name', () => {
    cy.get('#brandName').type('New brand');
  });
  it('Brand page should save new brand', () => {
    cy.server();
    cy.route('POST', '/brands', brandToSave).as('post-brand');
    cy.get('#save').click();
    cy.wait('@post-brand');
  });
  it('Brands page should load 11 brands', () => {
    cy.visitBrands('fixture:brandsList/withNewBrand');
    cy.window()
      .its('store')
      .invoke('getState')
      .its('brandsState')
      .its('brands')
      .should('have.length', 11);
    cy.get('#table-body').children().should('have.length', 11);
  });
});

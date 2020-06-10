describe('Testing orders page components, and actions.', () => {
  it('Orders page should contain sales-by, latest-sales, latest-orders', () => {
    cy.server();
    cy.route('GET', '/orders', 'fixture:ordersStats/orders').as('orders');

    cy.visit('/');
    cy.wait('@orders');
    cy.get('#sales-by').should('exist');
    cy.get('#latest-sales').should('exist');
    cy.get('#latest-orders').should('exist');
  });
  it('Orders state should be set to 10 items. ', () => {
    cy.window()
      .its('store')
      .invoke('getState')
      .its('ordersState')
      .its('orders')
      .should('have.length', 10);
  });
  it('Table with orders should have 10 rows. ', () => {
    cy.get('#table-body').children().should('have.length', 10);
  });
  it('If there is not orders to display, inform message should exist.', () => {
    cy.server();
    cy.route('GET', '/orders', []).as('orders');

    cy.visit('/');
    cy.wait('@orders');
    cy.get('#no-orders-msg').should('exist');
  });
});

const email = 'admin@gmail.com';
const password = 'qwertY123';
describe('pattern tests', () => {
  before('should login', () => {
    cy.visit('/');
    cy.viewport(1280, 720);
    cy.get('[data-cy=email]').type(email);
    cy.get('[data-cy=password]').type(password);
    cy.get('[data-cy=login]').click();
    cy.wait(2000);
  });
  it('should be visible and contain values', () => {
    cy.visit('/patterns');
    cy.viewport(1280, 720);
    cy.get('[href="/patterns"]').should('be.visible');
    cy.get('[data-cy=add-pattern]').should('be.visible');
    cy.window()
      .its('store')
      .invoke('getState')
      .its('Pattern')
      .its('list')
      .should('not.to.be', null);
    cy.get('[data-cy=add-pattern] .MuiButton-label').should('be.visible');
    cy.get('[data-cy=Фото]').contains('Фото');
    cy.get('[data-cy=Назва]').contains('Назва');
    cy.get('[data-cy=Матеріал]').contains('Матеріал');
    cy.get('[data-cy=Доступний]').contains('Доступний');
    cy.get('[data-cy=Дії]').contains('Дії');
    cy.get('.MuiPagination-ul > :nth-child(3) > .MuiButtonBase-root').click();
    cy.window()
      .its('store')
      .invoke('getState')
      .its('Pattern')
      .its('pagination')
      .its('currentPage')
      .should('be.equal', 1);
  });
});

import 'cypress-file-upload';

describe('Mainpage tests', () => {
  before(() => {
    cy.login(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASSWORD'));
    cy.visit('/');
  });
  it('should find page title and check it content', () => {
    cy.get('[data-cy=page-title]').should('be.visible');
    cy.get('[data-cy=page-title]').should('contain.text', 'Домашня сторінка');
  });
  it('should find all containers and check their titles', () => {
    cy.get('[data-cy=orders-container]').should('be.visible');
    cy.get('[data-cy=orders-container]').should(
      'contain.text',
      'Останні замовлення'
    );
    cy.get('[data-cy=comments-container]').should('be.visible');
    cy.get('[data-cy=comments-container]').should(
      'contain.text',
      'Останні коментарі'
    );
    cy.get('[data-cy=changes-container]').should('be.visible');
    cy.get('[data-cy=changes-container]').should(
      'contain.text',
      'Останні зміни'
    );
  });
  it('should check orders redirect', () => {
    cy.get('[data-cy=orders-container] [data-cy=order]').first().click();
  });
  it('should check the mainpage button for clickability ', () => {
    cy.get('#menuDrawer').contains('Домашня сторінка').click();
  });
});

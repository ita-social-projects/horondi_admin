/// <reference types="cypress" />

describe('User list and items test', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('input[name="email"]').type(Cypress.env('ADMIN_LOGIN'));
    cy.get('input[name="password"]').type(Cypress.env('ADMIN_PASSWORD'));
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.visit('/users');
    cy.wait(2000);
    cy.get('.MuiTableCell-root.MuiTableCell-body').as('table');
  });

  it('Should find a page title', () => {
    cy.contains('Інформація про користувачів');
  });

  it('User list row should have all types of necessary information about the user', () => {
    cy.get('@table').eq(0).find('svg');
    cy.get('@table')
      .eq(1)
      .invoke('text')
      .should('match', /[а-яА-Я]{2,}/g);
    cy.get('@table')
      .eq(2)
      .invoke('text')
      .should('match', /^\+380\(\d{2}\)-\d{3}-\d{2}-\d{2}$/g);
    cy.get('@table')
      .eq(3)
      .invoke('text')
      .should('match', /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/gi);
    cy.get('@table')
      .eq(4)
      .invoke('text')
      .should('match', /(Активний|Неактивний)/g);
  });

  it('Information about the user in the list and the details page should be equal', () => {
    cy.get('@table')
      .eq(1)
      .then(($elem) => {
        const textList = $elem.text();

        cy.get('@table')
          .get("button[aria-label='Редагувати']:first")
          .click()
          .wait(2000)
          .get('.makeStyles-userName-25')
          .invoke('text')
          .should('equal', textList);
      });
  });
  it('When user changes status, page and user information should be updated', () => {
    cy.visit('/users/a1881c06eec96db9901c7bbf').wait(2000);

    cy.get('button:last')
      .should('have.text', 'Деактивувати')
      .click()
      .wait(600)
      .get('.MuiDialogActions-root > .MuiButton-containedSecondary')
      .click()
      .wait(2000);

    cy.get('button:last').should('have.text', 'Активувати');

    cy.get('.makeStyles-userStatus-16').should('have.text', 'Неактивний');

    cy.get('button:last')
      .should('have.text', 'Активувати')
      .click()
      .wait(600)
      .get('.MuiDialogActions-root > .MuiButton-containedSecondary')
      .click()
      .wait(2000);

    cy.get('.makeStyles-userStatus-16').should('have.text', 'Активний');
  });
  it('Data from the server should be equal with the incoming data', () => {
    cy.visit('users/a1881c06eec96db9901c7bbf');
    cy.get('#firstName').should('have.text', 'Віталій');
    cy.get('#lastName').should('have.text', 'Арбатов');
    cy.get('#country').should('have.text', 'Україна');
    cy.get('#city').should('have.text', 'Південне');
    cy.get('#adress').should(
      'have.text',
      'вул. Вулиця Степана Руданського, 127/122'
    );
    cy.get('#postalCode').should('have.text', '79000');
  });
});

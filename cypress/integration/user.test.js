/// <reference types="cypress" />

describe('User list and items test', () => {
  let firstName;
  let lastName;
  let country;
  let city;
  let adress;
  let postalCode;
  let id;

  before(() => {
    firstName = 'Богдана';
    lastName = 'Гаращенко';
    country = 'Україна';
    city = 'Докучаєвськ';
    adress = 'Вулиця Володимира Шульгина, 53/34';
    postalCode = '61886';
    id = '9c031d62a3c4909b216e1d86';
  });

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
          .get('.makeStyles-userName-26')
          .invoke('text')
          .should('equal', textList);
      });
  });
  it('When user changes status, page and user information should be updated', () => {
    cy.visit(`/users/${id}`).wait(2000);

    cy.get('button:last')
      .should('have.text', 'Деактивувати')
      .click()
      .wait(600)
      .get('.MuiDialogActions-root > .MuiButton-containedSecondary')
      .click()
      .wait(2000);

    cy.get('button:last').should('have.text', 'Активувати');

    cy.get('#status').should('have.text', 'Неактивний');

    cy.get('button:last')
      .should('have.text', 'Активувати')
      .click()
      .wait(600)
      .get('.MuiDialogActions-root > .MuiButton-containedSecondary')
      .click()
      .wait(2000);

    cy.get('#status').should('have.text', 'Активний');
  });
  it('Data from the server should be equal with the incoming data', () => {
    cy.visit(`users/${id}`);
    cy.get('#firstName').should('have.text', firstName);
    cy.get('#lastName').should('have.text', lastName);
    cy.get('#country').should('have.text', country);
    cy.get('#city').should('have.text', city);
    cy.get('#adress').should('have.text', adress);
    cy.get('#postalCode').should('have.text', postalCode);
  });
});

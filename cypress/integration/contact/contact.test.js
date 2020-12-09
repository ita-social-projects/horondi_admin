/// <reference types="cypress" />
import {
  phoneNumber,
  uaSchedule,
  enSchedule,
  uaAddress,
  enAddress,
  uaCartImage,
  enCartImage,
  cartLink,
  email,
  id
} from './contact.variables';

describe('Contacts test', () => {
  beforeEach(() => {
    cy.login(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASSWORD'));
    cy.visit('/contacts');
    cy.wait(3000);
    cy.get('.MuiTableCell-root.MuiTableCell-body').as('table');
  });

  it('Should find a page title', () => {
    cy.contains('Контактна інформація');
  });

  it('User list row should have all types of necessary information about the user', () => {
    cy.get('@table')
      .eq(0)
      .invoke('text')
      .should('match', /^\+380\(\d{2}\)-\d{3}-\d{2}-\d{2}$/g);
    cy.get('@table')
      .eq(1)
      .invoke('text')
      .should('match', /^(?!.* )(?=.*[0-9])(?=.*[A-Z]).{8,30}$/gi);
    cy.get('@table')
      .eq(2)
      .invoke('text')
      .should('match', /^[а-яА-Я0-9_|,| |/]+$/g);
  });

  it('Data from the server should be equal with the incoming data', () => {
    cy.visit(`contacts/${id}`);

    cy.get('[data-cy=phoneNumber]').should('have.text', phoneNumber);
    cy.get('[data-cy=uaSchedule]').should('have.text', uaSchedule);
    cy.get('[data-cy=enSchedule]').should('have.text', enSchedule);
    cy.get('[data-cy=uaAddress]').should('have.text', uaAddress);
    cy.get('[data-cy=enAddress]').should('have.text', enAddress);
    cy.get('[data-cy=uaCartImage]')
      .should('have.attr', 'src')
      .should('include', uaCartImage);
    cy.get('[data-cy=enCartImage]')
      .should('have.attr', 'src')
      .should('include', enCartImage);
    cy.get('[data-cy=mapLink]').should('have.text', cartLink);
    cy.get('[data-cy=email]').should('have.text', email);
    cy.get('[data-cy=goBackButton]')
      .should('be.visible')
      .should('have.text', 'Назад')
      .click()
      .wait(2000);
    cy.location('pathname', { timeout: 1000 }).should('eq', '/contacts');
  });
});

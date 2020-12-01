/// <reference types="cypress" />
import {
  id,
  telephoneNumber,
  email,
  textString,
  phoneNumber,
  uaSchedule,
  enSchedule,
  uaAddress,
  enAddress
} from './contact.variables';

describe('Contacts test', () => {
  beforeEach(() => {
    cy.login(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASSWORD'));
    cy.visit('/contacts');
    cy.wait(3000);
    cy.get('.MuiTableCell-root.MuiTableCell-body').as('table');
  });

  it('Should find a page title', () => {
    cy.contains('Інформація про контакти');
  });

  it('User list row should have all types of necessary information about the user', () => {
    cy.get('@table').eq(0).invoke('text').should('match', telephoneNumber);
    cy.get('@table').eq(1).invoke('text').should('match', email);
    cy.get('@table').eq(2).invoke('text').should('match', textString);
  });

  it('Data from the server should be equal with the incoming data', () => {
    cy.visit(`contacts/${id}`);
    // cy.get('[data-cy=edit-btn]').click()
    // data-cy='edit-btn'
    cy.get('[data-cy=phoneNumber]').contains(phoneNumber);
    cy.get('[data-cy=ukSchedule]').contains(uaSchedule);
    cy.get('[data-cy=enSchedule]').contains(enSchedule);
    cy.get('[data-cy=ukAddress]').contains(uaAddress);
    cy.get('[data-cy=enAddress]').contains(enAddress);
    cy.get('[data-cy=ukCartImage]').children().should('have.attr', 'src');
    cy.get('[data-cy=enCartImage]').children().should('have.attr', 'src');
    cy.get('[data-cy=mapLink]')
      .children()
      .next()
      .children()
      .eq(0)
      .should('have.value', 'https://g.page/horondi?share');
    cy.get('[data-cy=email]')
      .children()
      .next()
      .children()
      .eq(0)
      .should('have.value', 'horondi@gmail.com');
    cy.get('[data-cy=goBackButton]')
      .should('be.visible')
      .should('have.text', 'Назад')
      .click()
      .wait(2000);
    cy.location('pathname', { timeout: 1000 }).should('eq', '/contacts');
  });
});

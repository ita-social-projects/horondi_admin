/// <reference types="cypress" />
import 'cypress-file-upload';
import {
  id,
  telephoneNumber,
  email,
  textString,
  phoneNumber,
  uaSchedule,
  enSchedule,
  uaAddress,
  enAddress,
  contactData
} from './contact.variables';

describe('Contacts test', () => {
  beforeEach(() => {
    cy.login(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASSWORD'));
    cy.visit('/contacts');
    cy.get(`[href="${'/contacts'}"]`).click();
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
  it('The data of new contact should be add', () => {
    cy.get('[data-cy=add-contact]').click();
    cy.get('[data-cy=ukCartImage]').attachFile('images/test1.png');
    cy.get('[data-cy=enCartImage]').attachFile('images/test2.png');
    cy.get('[data-cy=mapLink]').type(contactData[0].mapLink);
    cy.get('[data-cy=phoneNumber]').type(contactData[0].contactNumber);
    cy.get('[data-cy=ukSchedule]').type(contactData[0].scheduleUa);
    cy.get('[data-cy=enSchedule]').type(contactData[0].scheduleEn);
    cy.get('[data-cy=ukAddress]').type(contactData[0].addressUa);
    cy.get('[data-cy=enAddress]').type(contactData[0].addressEn);
    cy.get('[ data-cy=email]').type(contactData[0].email);
    cy.get('[ data-cy = save]').click();
    cy.get('[data-cy=goBackButton]').click();
  });
  it('Tne data should be changed', () => {
    cy.get('@table').eq(7).children().first().click();
    cy.get('[data-cy=mapLink]').children().children().first().clear();
    cy.get('[data-cy=mapLink]').type(contactData[1].mapLink);
    cy.get('[data-cy=phoneNumber]').children().children().first().clear();
    cy.get('[data-cy=phoneNumber]').type(contactData[1].contactNumber);
    cy.get('[data-cy=ukSchedule]').children().children().first().clear();
    cy.get('[data-cy=ukSchedule]').type(contactData[1].scheduleUa);
    cy.get('[data-cy=enSchedule]').children().children().first().clear();
    cy.get('[data-cy=enSchedule]').type(contactData[1].scheduleEn);
    cy.get('[data-cy=ukAddress]').children().children().first().clear();
    cy.get('[data-cy=ukAddress]').type(contactData[1].addressUa);
    cy.get('[data-cy=enAddress]').children().children().first().clear();
    cy.get('[data-cy=enAddress]').type(contactData[1].addressEn);
    cy.get('[ data-cy=email]').children().children().first().clear();
    cy.get('[ data-cy=email]').type(contactData[1].email);
    cy.get('[ data-cy = save]').click();
  });
  it('The user should be deleted', () => {
    cy.get('@table').eq(7).children().next().click();
    cy.get('[data-cy=dialog-confirm]').last().click();
    cy.wait(1000);
    cy.get('.MuiAlert-message').should('be.visible');
    cy.get('.MuiAlert-message').contains('Успішно видалено!');
  });
});

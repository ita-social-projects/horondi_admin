/// <reference types="cypress" />
import 'cypress-file-upload';
import routes from '../../../src/configs/routes';
import {
  telephoneNumber,
  email,
  textString,
  contactToAdd,
  getContacts,
  addContacts,
  updateContact,
  deleteContacts
} from './contact.variables';

describe('Contacts test', () => {
  beforeEach(() => {
    cy.login(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASSWORD'));
    cy.wait(3000);
    cy.stubRequest('getContacts', getContacts).as('getContacts');
    cy.visit('/');
    cy.get(`[href="${routes.pathToContacts}"]`).click();
    cy.wait(3000);
    cy.get('.MuiTableCell-root.MuiTableCell-body').as('table');
  });
  it('Should find a page title', () => {
    cy.contains('Інформація про контакти');
  });

  it('User list row should have all types of necessary information about the user', () => {
    cy.stubRequest('getContacts', getContacts).as('getContacts');
    cy.get('@table').eq(0).invoke('text').should('match', telephoneNumber);
    cy.get('@table').eq(1).invoke('text').should('match', email);
    cy.get('@table').eq(2).invoke('text').should('match', textString);
  });

  it('Data from the server should be equal with the incoming data', () => {
    cy.get('@table').eq(3).children().first().click();
    cy.wait(1000);
    cy.get('[data-cy=phone-number]').should('be.visible');
    cy.get('[data-cy=ua-schedule]').should('be.visible');
    cy.get('[data-cy=en-schedule]').should('be.visible');
    cy.get('[data-cy=ua-address]').should('be.visible');
    cy.get('[data-cy=en-address]').should('be.visible');
    cy.get('[data-cy=map-link]')
      .children()
      .next()
      .children()
      .eq(0)
      .should('be.visible');
    cy.get('[data-cy=email]')
      .children()
      .next()
      .children()
      .eq(0)
      .should('be.visible');
    cy.get('[data-cy=go-back-button]').should('be.visible').click().wait(2000);
    cy.location('pathname', { timeout: 1000 }).should('eq', '/contacts');
  });
  it('The data of new contact should be add', () => {
    cy.stubRequest('addContacts', addContacts).as('addContacts');
    cy.get('[data-cy=add-contact]').click();
    cy.wait(1000);
    cy.fixture('HORONDI.png').then((fileContent) => {
      cy.get('[data-cy=upload-photo]').attachFile({
        fileContent: fileContent.toString(),
        mimeType: 'image/png',
        filePath: '../fixtures/HORONDI.png'
      });
    });
    cy.fixture('HORONDI.png').then((fileContent) => {
      cy.get('[data-cy=upload-photo]').attachFile({
        fileContent: fileContent.toString(),
        mimeType: 'image/png',
        filePath: '../fixtures/HORONDI.png'
      });
    });
    cy.get('[data-cy=map-link]').type(contactToAdd[0].mapLink);
    cy.get('[data-cy=phone-number]').type(contactToAdd[0].contactNumber);
    cy.get('[data-cy=ua-schedule]').type(contactToAdd[0].scheduleUa);
    cy.get('[data-cy=en-schedule]').type(contactToAdd[0].scheduleEn);
    cy.get('[data-cy=ua-address]').type(contactToAdd[0].addressUa);
    cy.get('[data-cy=en-address]').type(contactToAdd[0].addressEn);
    cy.get('[ data-cy=email]').type(contactToAdd[0].email);
    cy.get('[ data-cy=save]').click();
    cy.wait(3000);
    cy.get('.MuiAlert-message').should('be.visible');
  });
  it('Tne data should be changed', () => {
    cy.stubRequest('updateContact', updateContact).as('updateContact');
    cy.get('@table').eq(3).children().first().click();
    cy.wait(1000);
    cy.fixture('HORONDI.png').then((fileContent) => {
      cy.get('[data-cy=upload-photo]').attachFile({
        fileContent: fileContent.toString(),
        mimeType: 'image/png',
        filePath: '../fixtures/HORONDI.png'
      });
    });
    cy.fixture('HORONDI.png').then((fileContent) => {
      cy.get('[data-cy=upload-photo]').attachFile({
        fileContent: fileContent.toString(),
        mimeType: 'image/png',
        filePath: '../fixtures/HORONDI.png'
      });
    });
    cy.get('[data-cy=map-link]').children().children().first().clear();
    cy.get('[data-cy=map-link]').type(contactToAdd[1].mapLink);
    cy.get('[data-cy=phone-number]').children().children().first().clear();
    cy.get('[data-cy=phone-number]').type(contactToAdd[1].contactNumber);
    cy.get('[data-cy=ua-schedule]').children().children().first().clear();
    cy.get('[data-cy=ua-schedule]').type(contactToAdd[1].scheduleUa);
    cy.get('[data-cy=en-schedule]').children().children().first().clear();
    cy.get('[data-cy=en-schedule]').type(contactToAdd[1].scheduleEn);
    cy.get('[data-cy=ua-address]').children().children().first().clear();
    cy.get('[data-cy=ua-address]').type(contactToAdd[1].addressUa);
    cy.get('[data-cy=en-address]').children().children().first().clear();
    cy.get('[data-cy=en-address]').type(contactToAdd[1].addressEn);
    cy.get('[ data-cy=email]').children().children().first().clear();
    cy.get('[ data-cy=email]').type(contactToAdd[1].email);
    cy.get('[ data-cy = save]').click();
    cy.wait(3000);
    cy.get('.MuiAlert-message').should('be.visible');
  });
  it('  back button  check how it works', () => {
    cy.get('@table').eq(3).children().first().click();
    cy.wait(2000);
    cy.fixture('link.png').then((fileContent) => {
      cy.get('[data-cy=upload-photo]').attachFile({
        fileContent: fileContent.toString(),
        mimeType: 'image/png',
        filePath: '../fixtures/link.png'
      });
    });
    cy.get('[data-cy=go-back-button]').click();
    cy.wait(2000);
  });
  it('The user should be deleted', () => {
    cy.stubRequest('deleteContacts', deleteContacts).as('deleteContacts');
    cy.get('@table').eq(3).children().next().click();
    cy.get('[data-cy=dialog-confirm]').last().click();
    cy.wait(1000);
    cy.get('.MuiAlert-message').should('be.visible');
  });
});

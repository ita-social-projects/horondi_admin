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
    cy.get('@table').eq(3).children().first().click();
    cy.get('[data-cy=phone-number]').contains(phoneNumber);
    cy.get('[data-cy=ua-schedule]').contains(uaSchedule);
    cy.get('[data-cy=en-schedule]').contains(enSchedule);
    cy.get('[data-cy=ua-address]').contains(uaAddress);
    cy.get('[data-cy=en-address]').contains(enAddress);
    cy.get('[data-cy=ua-cart-image]').children().should('have.attr', 'src');
    cy.get('[data-cy=en-cart-image]').children().should('have.attr', 'src');
    cy.get('[data-cy=map-link]')
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
    cy.get('[data-cy=go-back-button]')
      .should('be.visible')
      .should('have.text', 'Назад')
      .click()
      .wait(2000);
    cy.location('pathname', { timeout: 1000 }).should('eq', '/contacts');
  });
  it('The data of new contact should be add', () => {
    cy.get('[data-cy=add-contact]').click();
    cy.fixture('HORONDI.png').then((fileContent) => {
      cy.get('[data-cy=upload-uaPhoto]').attachFile({
        fileContent: fileContent.toString(),
        mimeType: 'image/png',
        filePath: '../fixtures/HORONDI.png'
      });
    });
    cy.fixture('HORONDI.png').then((fileContent) => {
      cy.get('[data-cy=upload-enPhoto]').attachFile({
        fileContent: fileContent.toString(),
        mimeType: 'image/png',
        filePath: '../fixtures/HORONDI.png'
      });
    });

    cy.get('[data-cy=map-link]').type(contactData[0].mapLink);
    cy.get('[data-cy=phone-number]').type(contactData[0].contactNumber);
    cy.get('[data-cy=ua-schedule]').type(contactData[0].scheduleUa);
    cy.get('[data-cy=en-schedule]').type(contactData[0].scheduleEn);
    cy.get('[data-cy=ua-address]').type(contactData[0].addressUa);
    cy.get('[data-cy=en-address]').type(contactData[0].addressEn);
    cy.get('[ data-cy=email]').type(contactData[0].email);
    cy.get('[ data-cy = save]').click();
    cy.wait(3000);
    cy.get('.MuiAlert-message').should('be.visible');
    cy.get('.MuiAlert-message').contains('Успішно додано!');
  });
  it('Tne data should be changed', () => {
    cy.get('@table').eq(7).children().first().click();
    cy.get('[data-cy=map-link]').children().children().first().clear();
    cy.get('[data-cy=map-link]').type(contactData[1].mapLink);
    cy.get('[data-cy=phone-number]').children().children().first().clear();
    cy.get('[data-cy=phone-number]').type(contactData[1].contactNumber);
    cy.get('[data-cy=ua-schedule]').children().children().first().clear();
    cy.get('[data-cy=ua-schedule]').type(contactData[1].scheduleUa);
    cy.get('[data-cy=en-schedule]').children().children().first().clear();
    cy.get('[data-cy=en-schedule]').type(contactData[1].scheduleEn);
    cy.get('[data-cy=ua-address]').children().children().first().clear();
    cy.get('[data-cy=ua-address]').type(contactData[1].addressUa);
    cy.get('[data-cy=en-address]').children().children().first().clear();
    cy.get('[data-cy=en-address]').type(contactData[1].addressEn);
    cy.get('[ data-cy=email]').children().children().first().clear();
    cy.get('[ data-cy=email]').type(contactData[1].email);
    cy.get('[ data-cy = save]').click();
    cy.wait(3000);
    cy.get('.MuiAlert-message').should('be.visible');
    cy.get('.MuiAlert-message').contains('Успішно змінено!');
  });
  it('  back button  check how it works', () => {
    cy.get('@table').eq(7).children().first().click();
    cy.fixture('link.png').then((fileContent) => {
      cy.get('[data-cy=upload-enPhoto]').attachFile({
        fileContent: fileContent.toString(),
        mimeType: 'image/png',
        filePath: '../fixtures/link.png'
      });
    });
    cy.get('[data-cy=go-back-button]').click();
    cy.wait(2000);
  });
  it('The user should be deleted', () => {
    cy.get('@table').eq(7).children().next().click();
    cy.get('[data-cy=dialog-confirm]').last().click();
    cy.wait(1000);
    cy.get('.MuiAlert-message').should('be.visible');
    cy.get('.MuiAlert-message').contains('Успішно видалено!');
  });
});

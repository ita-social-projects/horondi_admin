/// <reference types="cypress" />
import {
  headersDataToAdd,
  newUaName,
  getAllHeadersStub,
  getHeaderByIdStub,
  updateHeaderStub,
  deleteHeaderStub,
  addHeaderStub,
  headerAlreadyExistsStub
} from './headers-page.variables';
import { headerTranslations } from '../../../src/configs/error-modal-messages';
import routes from '../../../src/configs/routes';

describe('Header page tests', () => {
  before(() => {
    cy.stubRequest('getAllHeaders', getAllHeadersStub).as('getAllHeaders');

    cy.visit('/')
      .get('input[type="text"]')
      .type(Cypress.env('ADMIN_LOGIN'))
      .get('input[type="password"]')
      .type(Cypress.env('ADMIN_PASSWORD'))
      .get('button[type="submit"]')
      .click();
    cy.wait(2000);
    cy.visit(routes.pathToHeaders);
    cy.wait(2000);
  });
  beforeEach(() => {
    cy.restoreLocalStorageCache();
  });

  afterEach(() => {
    cy.saveLocalStorageCache();
    cy.wait(3000);
  });

  it('should edit header', () => {
    cy.stubRequest('getHeaderById', getHeaderByIdStub).as('getHeadersById');
    cy.stubRequest('updateHeader', updateHeaderStub).as('updateHeader');

    cy.get('[data-cy=edit-btn]').last().click();
    cy.wait(2000);
    cy.get('textarea').eq(0).clear().type(newUaName);
    cy.get('button').contains('Зберегти').click();
    cy.get('button').contains('Так').click();
    cy.wait(2000);
    cy.get('.MuiAlert-message').should('be.visible');
    cy.get('.MuiAlert-message').contains('Успішно змінено!');
  });

  it('should delete header', () => {
    cy.stubRequest('deleteHeader', deleteHeaderStub).as('deleteHeader');

    cy.get('[data-cy=delete-btn]').last().click();
    cy.wait(2000);
    cy.get('button').contains('Так').click();
    cy.get('.MuiAlert-message').should('be.visible');
    cy.get('.MuiAlert-message').contains('Успішно видалено!');
  });

  it('should add header', () => {
    cy.stubRequest('addHeader', addHeaderStub).as('addHeader');
    cy.stubRequest('getAllHeaders', getAllHeadersStub).as('getAllHeaders');

    cy.get('[data-cy="add-header"]').click();
    cy.get('input').eq(0).type(headersDataToAdd.link);
    cy.get('textarea').eq(0).type(headersDataToAdd.uaName);
    cy.get('button').last().click();
    cy.get('textarea').eq(0).type(headersDataToAdd.enName);
    cy.get('button[data-cy="save"]').click();
    cy.wait(2000);
    cy.get('button').contains('Так').click();
    cy.get('.MuiAlert-message').should('be.visible');
    cy.get('.MuiAlert-message').contains('Успішно додано!');
  });

  it('should work correct when click back button', () => {
    cy.stubRequest('getAllHeaders', getAllHeadersStub).as('getAllHeaders');

    cy.get('[data-cy="add-header"]').click();
    cy.get('input').eq(0).type(headersDataToAdd.link);
    cy.get('[data-cy="back-btn"]').click();
    cy.wait(2000);
    cy.get('button').contains('Так').click();
  });

  it('should throw error "Header already exists"', () => {
    cy.stubRequest('addHeader', headerAlreadyExistsStub).as('addHeader');

    cy.get('[data-cy="add-header"]').click();
    cy.get('input').eq(0).type(headersDataToAdd.link);
    cy.get('textarea').eq(0).type(headersDataToAdd.uaName);
    cy.get('button').last().click();
    cy.get('textarea').eq(0).type(headersDataToAdd.enName);
    cy.get('button[data-cy="save"]').click();
    cy.wait(2000);
    cy.get('button').contains('Так').click();
    cy.get('.MuiAlert-message').should('be.visible');
    cy.get('.MuiAlert-message').contains(
      headerTranslations.HEADER_ALREADY_EXIST
    );
  });
});

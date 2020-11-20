/// <reference types="cypress" />
import { config } from '../../src/configs';

describe('Business pages test ', () => {
  let pageCode;
  let ukHeader;
  let enHeader;
  let ukText;
  let enText;

  before(() => {
    pageCode = 'page';
    ukHeader = 'Сторінка';
    enHeader = 'Page';
    ukText = 'деякий текст';
    enText = 'some text';
  });

  beforeEach(() => {
    cy.login(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASSWORD'));
    cy.visit('/business-pages');
    cy.wait(3000);
  });

  it('should be visible and contain values', () => {
    cy.get('[data-cy=add-business-page]').should('be.visible');
    cy.get('[data-cy=№]').contains(config.tableHeadRowTitles.businessPages[0]);
    cy.get('[data-cy=Код]').contains(
      config.tableHeadRowTitles.businessPages[1]
    );
    cy.get('[data-cy=Заголовок]').contains(
      config.tableHeadRowTitles.businessPages[2]
    );
    cy.get('[data-cy=Дії]').contains(
      config.tableHeadRowTitles.businessPages[3]
    );
    cy.window()
      .its('store')
      .invoke('getState')
      .its('BusinessPages')
      .its('list')
      .should('not.to.be', null);
    cy.get('[data-cy=add-business-page]').click();
    cy.get('[data-cy=page-code]').should('be.visible');
    cy.get('[data-cy=page-code]').contains('Код сторінки');
    cy.get('[data-cy=uk]').should('be.visible');
    cy.get('[data-cy=uk]').contains('uk');
    cy.get('[data-cy=en]').should('be.visible');
    cy.get('[data-cy=en]').contains('en');
    cy.get('[data-cy=page-header-ua]').should('be.visible');
    cy.get('[data-cy=page-header-ua]').contains('Заголовок uk');
    cy.get('[data-cy=editor]').should('be.visible');
    cy.get('.ql-editor.ql-blank').should('be.visible');
    cy.get('[data-cy=en]').click();
    cy.get('[data-cy=page-header-en]').should('be.visible');
    cy.get('[data-cy=page-header-en]').contains('Заголовок en');
    cy.get('[data-cy=editor]').should('be.visible');
    cy.get('.ql-editor.ql-blank').should('be.visible');
    cy.get('[data-cy=back-btn]').should('be.visible');
    cy.get('[data-cy=save-btn]').should('be.visible');
  });

  it('should create business page', () => {
    cy.get('[data-cy=add-business-page]').click();
    cy.get('[data-cy=page-code]').type(pageCode);
    cy.get('[data-cy=page-header-ua]').type(ukHeader);
    cy.get('.ql-editor.ql-blank').type(ukText);
    cy.get('[data-cy=en]').click();
    cy.get('[data-cy=page-header-en]').type(enHeader);
    cy.get('.ql-editor.ql-blank').type(enText);
    cy.get('[data-cy=save-btn]').click();
    cy.wait(2000);
    cy.get('.MuiAlert-message').should('be.visible');
    cy.get('.MuiAlert-message').contains('Успішно додано!');
  });

  it('should throw error when page with code already exist', () => {
    cy.get('[data-cy=add-business-page]').click();
    cy.get('[data-cy=page-code]').type(pageCode);
    cy.get('.ql-editor.ql-blank').type(ukText);
    cy.get('[data-cy=page-header-ua]').type(ukHeader);
    cy.get('[data-cy=en]').click();
    cy.get('.ql-editor.ql-blank').type(enText);
    cy.get('[data-cy=page-header-en]').type(enHeader);
    cy.get('[data-cy=save-btn]').click();
    cy.wait(3000);
    cy.get('.MuiAlert-message').should('be.visible');
    cy.get('.MuiAlert-message').contains('400 Така сторінка вже існує!');
  });

  it('should edit page', () => {
    cy.get('[data-cy=edit-btn]').last().click();
    cy.get('[data-cy=page-code]').type('sd');
    cy.get('[data-cy=page-header-ua]').type('ds');
    cy.get('.ql-editor').type('ddsa');
    cy.get('[data-cy=en]').click();
    cy.get('[data-cy=page-header-en]').type('dads');
    cy.get('.ql-editor').type('dsadsa');
    cy.get('[data-cy=save-btn]').click();
    cy.wait(2000);
    cy.get('.MuiAlert-message').should('be.visible');
    cy.get('.MuiAlert-message').contains('Успішно змінено!');
  });

  it('should delete page', () => {
    cy.get('[data-cy=delete-btn]').last().click();
    cy.get('[data-cy=dialog-confirm]').last().click();
    cy.get('.MuiAlert-message').should('be.visible');
    cy.get('.MuiAlert-message').contains('Успішно видалено!');
  });

  it('pass validation', () => {
    cy.get('[data-cy=add-business-page]').click();
    cy.get('[data-cy=save-btn]').click();
    cy.get('[data-cy=editor-error]').should('be.visible');
    cy.get('[data-cy=editor-error]').contains('Введіть текст для сторінки');
    cy.get('.MuiFormHelperText-root.MuiFormHelperText-contained.Mui-error')
      .last()
      .should('be.visible');
    cy.get('.MuiFormHelperText-root.MuiFormHelperText-contained.Mui-error')
      .last()
      .contains('Введіть заголовок');
    cy.get('.MuiFormHelperText-root.MuiFormHelperText-contained.Mui-error')
      .first()
      .should('be.visible');
    cy.get('.MuiFormHelperText-root.MuiFormHelperText-contained.Mui-error')
      .first()
      .contains('Введіть унікальний ідентифікатор для сторінки');
  });
});

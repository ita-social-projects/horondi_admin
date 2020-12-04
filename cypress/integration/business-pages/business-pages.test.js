/// <reference types="cypress" />
import { config } from '../../../src/configs';
import { businessTranslations } from '../../../src/translations/business.translations.js';
import {
  getAllBusinessTexts,
  getBusinessTextById,
  addBusinessText,
  deleteBusinessText,
  updateValues,
  errorBusinessPage,
  updateBusinessText,
  enText,
  uaText,
  enHeader,
  uaHeader,
  pageCode
} from './business-pages.variables';

describe('Business pages test ', () => {
  beforeEach(() => {
    cy.login(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASSWORD'));
    cy.stubRequest('getAllBusinessTexts', getAllBusinessTexts).as(
      'getAllBusinessTexts'
    );
    cy.visit('/business-pages');
    cy.wait(3000);
  });

  it('should be visible and contain values', () => {
    cy.get('[data-cy=main-header]').should('be.visible');
    cy.get('[data-cy=main-header]').contains(
      config.titles.businessPageTitles.mainPageTitle
    );
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
    cy.get('[data-cy=add-header]').should('be.visible');
    cy.get('[data-cy=add-header]').contains(
      config.titles.businessPageTitles.addBusinessPageTitle
    );
    cy.get('[data-cy=page-code]').should('be.visible');
    cy.get('[data-cy=page-code]').contains('Код сторінки');
    cy.get('[data-cy=ua]').should('be.visible');
    cy.get('[data-cy=ua]').contains('ua');
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
    cy.stubRequest('addBusinessText', addBusinessText).as('addBusinessText');
    cy.get('[data-cy=add-business-page]').click();
    cy.get('[data-cy=page-code]').type(pageCode);
    cy.get('[data-cy=page-header-ua]').type(uaHeader);
    cy.get('.ql-editor.ql-blank').type(uaText);
    cy.get('[data-cy=en]').click();
    cy.get('[data-cy=page-header-en]').type(enHeader);
    cy.get('.ql-editor.ql-blank').type(enText);
    cy.get('[data-cy=save-btn]').click();
    cy.wait(2000);
    cy.get('.MuiAlert-message').should('be.visible');
    cy.get('.MuiAlert-message').contains('Успішно додано!');
  });

  it('should throw error when page with code already exist', () => {
    cy.stubRequest('addBusinessText', errorBusinessPage).as('addBusinessText');
    cy.get('[data-cy=add-business-page]').click();
    cy.get('[data-cy=page-code]').type(pageCode);
    cy.get('.ql-editor.ql-blank').type(uaText);
    cy.get('[data-cy=page-header-ua]').type(uaHeader);
    cy.get('[data-cy=en]').click();
    cy.get('.ql-editor.ql-blank').type(enText);
    cy.get('[data-cy=page-header-en]').type(enHeader);
    cy.get('[data-cy=save-btn]').click();
    cy.wait(1000);
    cy.get('.MuiAlert-message').should('be.visible');
    cy.get('.MuiAlert-message').contains(
      businessTranslations.BUSINESS_TEXT_WITH_THIS_CODE_ALREADY_EXIST
    );
  });

  it('should edit page', () => {
    cy.stubRequest('getBusinessTextById', getBusinessTextById).as(
      'getBusinessTextById'
    );
    cy.stubRequest('updateBusinessText', updateBusinessText).as(
      'updateBusinessText'
    );
    cy.get('[data-cy=edit-btn]').last().click();
    cy.get('[data-cy=page-code]').type(updateValues);
    cy.get('[data-cy=page-header-ua]').type(updateValues);
    cy.get('.ql-editor').type(updateValues);
    cy.get('[data-cy=en]').click();
    cy.get('[data-cy=page-header-en]').type(updateValues);
    cy.get('.ql-editor').type(updateValues);
    cy.get('[data-cy=save-btn]').click();
    cy.wait(2000);
    cy.get('.MuiAlert-message').should('be.visible');
    cy.get('.MuiAlert-message').contains('Успішно змінено!');
  });

  it('should delete page', () => {
    cy.stubRequest('deleteBusinessText', deleteBusinessText).as(
      'deleteBusinessText'
    );
    cy.get('[data-cy=delete-btn]').last().click();
    cy.get('[data-cy=dialog-confirm]').last().click();
    cy.wait(1000);
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

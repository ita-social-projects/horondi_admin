import 'cypress-file-upload';
import { config } from '../../../src/configs';
import {
  getAllPatterns,
  typeValue,
  addPattern,
  addPatternError,
  updateValue,
  updatePattern,
  deletePattern
} from './pattern.variables';
import statuses from '../../../src/configs/statuses';
import routes from '../../../src/configs/routes';
import { patternTranslations } from '../../../src/translations/pattern.translations';

describe('pattern tests', () => {
  beforeEach(() => {
    cy.login(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASSWORD'));
    cy.stubRequest('getAllPatterns', getAllPatterns).as('getAllPatterns');
    cy.visit('/');
    cy.get(`[href="${routes.pathToPatterns}"]`).click();
    cy.wait(3000);
  });

  it('should be visible and contains values', () => {
    cy.get('[data-cy=pattern-header]').should('be.visible');
    cy.get('[data-cy=pattern-header]').contains(
      config.titles.patternTitles.mainPageTitle
    );
    cy.get('[data-cy=add-pattern] .MuiButton-label').should('be.visible');
    cy.get('[data-cy=Фото]').should('be.visible');
    cy.get('[data-cy=Фото]').contains(config.tableHeadRowTitles.patterns[0]);
    cy.get('[data-cy=Назва]').should('be.visible');
    cy.get('[data-cy=Назва]').contains(config.tableHeadRowTitles.patterns[1]);
    cy.get('[data-cy="Код матеріалу"]').should('be.visible');
    cy.get('[data-cy="Код матеріалу"]').contains(
      config.tableHeadRowTitles.patterns[2]
    );
    cy.get('[data-cy=Доступний]').should('be.visible');
    cy.get('[data-cy=Доступний]').contains(
      config.tableHeadRowTitles.patterns[3]
    );
    cy.get('[data-cy=Дії]').should('be.visible');
    cy.get('[data-cy=Дії]').contains(config.tableHeadRowTitles.patterns[4]);

    cy.get('[data-cy=add-pattern]').click();
    cy.get('[data-cy=handmade]').should('be.visible');
    cy.get('[data-cy=handmade]').click();
    cy.get('[data-cy=available]').should('be.visible');
    cy.get('[data-cy=available]').click();
    cy.get('[data-cy=go-back-btn]').should('be.visible');
    cy.get('[data-cy=save-btn]').should('be.visible');
    cy.get('[data-cy=save-btn]').contains(config.buttonTitles.SAVE_TITLE);
    cy.get('[data-cy=pattern-image]').should('be.visible');
    cy.get('[data-cy=add-photo]').should('be.visible');
    cy.get('[data-cy=add-photo]').contains('Завантажити');
    cy.get('[data-cy=material').should('be.visible');
    cy.get('[data-cy=material').contains(config.labels.pattern.material);
    cy.get('[data-cy=ua-name]').should('be.visible');
    cy.get('[data-cy=ua-name]').contains('Назва');
    cy.get('[data-cy=ua-description]').should('be.visible');
    cy.get('[data-cy=ua-description]').contains('Опис');
    cy.get('[data-cy=ua-tab]').should('be.visible');
    cy.get('[data-cy=en-tab]').should('be.visible');
    cy.get('[data-cy=en-tab]').click();
    cy.get('[data-cy=en-name]').should('be.visible');
    cy.get('[data-cy=en-name]').contains('Назва');
    cy.get('[data-cy=en-description]').should('be.visible');
    cy.get('[data-cy=en-description]').contains('Опис');
  });

  it('should check validation', () => {
    cy.get('[data-cy=add-pattern]').click();
    cy.get('[data-cy=save-btn]').click();
    cy.get('[data-cy=material-error]').contains(
      config.patternErrorMessages.PATTERN_ERROR_MESSAGE
    );
    cy.get('[data-cy=ua-name-error]').contains(
      config.patternErrorMessages.PATTERN_ERROR_MESSAGE
    );
    cy.get('[data-cy=ua-description-error]').contains(
      config.patternErrorMessages.PATTERN_ERROR_MESSAGE
    );
    cy.get('[data-cy=en-tab]').click();
    cy.get('[data-cy=en-name-error]').contains(
      config.patternErrorMessages.PATTERN_ERROR_MESSAGE
    );
    cy.get('[data-cy=en-description-error]').contains(
      config.patternErrorMessages.PATTERN_ERROR_MESSAGE
    );
    cy.get('[data-cy=material').type('a');
    cy.get('[data-cy=en-name]').type('a');
    cy.get('[data-cy=en-name-error]').contains(
      config.patternErrorMessages.PATTERN_VALIDATION_ERROR
    );
    cy.get('[data-cy=en-description]').type('a');
    cy.get('[data-cy=en-description-error]').contains(
      config.patternErrorMessages.PATTERN_VALIDATION_ERROR
    );
    cy.get('[data-cy=ua-tab]').click();
    cy.get('[data-cy=ua-name]').type('a');
    cy.get('[data-cy=ua-name-error]').contains(
      config.patternErrorMessages.PATTERN_VALIDATION_ERROR
    );
    cy.get('[data-cy=ua-description]').type('a');
    cy.get('[data-cy=ua-description-error]').contains(
      config.patternErrorMessages.PATTERN_VALIDATION_ERROR
    );
    cy.get('[data-cy=material-error]').contains(
      config.patternErrorMessages.PATTERN_VALIDATION_ERROR
    );
  });

  it('should add pattern', () => {
    cy.stubRequest('addPattern', addPattern).as('addPattern');
    cy.get('[data-cy=add-pattern]').click();
    cy.get('[data-cy=handmade]').click();
    cy.get('[data-cy=material').type(typeValue);
    cy.get('[data-cy=ua-name]').type(typeValue);
    cy.get('[data-cy=ua-description]').type(typeValue);
    cy.get('[data-cy=en-tab]').click();
    cy.get('[data-cy=en-name]').type(typeValue);
    cy.get('[data-cy=en-description]').type(typeValue);
    cy.stubRequest('getAllPatterns', getAllPatterns).as('getAllPatterns');
    cy.get('[data-cy=save-btn]').click();
    cy.wait(2000);
    cy.get('.MuiAlert-message').should('be.visible');
    cy.get('.MuiAlert-message').contains(statuses.SUCCESS_ADD_STATUS);
  });

  it('should throw error pattern already exist', () => {
    cy.stubRequest('addPattern', addPatternError).as('addPattern');
    cy.get('[data-cy=add-pattern]').click();
    cy.get('[data-cy=handmade]').click();
    cy.get('[data-cy=material').type(typeValue);
    cy.get('[data-cy=ua-name]').type(typeValue);
    cy.get('[data-cy=ua-description]').type(typeValue);
    cy.get('[data-cy=en-tab]').click();
    cy.get('[data-cy=en-name]').type(typeValue);
    cy.get('[data-cy=en-description]').type(typeValue);
    cy.get('[data-cy=save-btn]').click();
    cy.wait(2000);
    cy.get('.MuiAlert-message').should('be.visible');
    cy.get('.MuiAlert-message').contains(
      patternTranslations.PATTERN_ALREADY_EXIST
    );
  });

  it('should update pattern', () => {
    cy.stubRequest('getPatternById', updatePattern).as('getPatternById');
    cy.stubRequest('addPattern', updatePattern).as('addPattern');
    cy.get('[data-cy=add-pattern]').click();
    cy.get('[data-cy=handmade]').click();
    cy.get('[data-cy=material').type(updateValue);
    cy.get('[data-cy=ua-name]').type(updateValue);
    cy.get('[data-cy=ua-description]').type(updateValue);
    cy.get('[data-cy=en-tab]').click();
    cy.get('[data-cy=en-name]').type(updateValue);
    cy.get('[data-cy=en-description]').type(updateValue);
    cy.get('[data-cy=save-btn]').click();
    cy.wait(2000);
    cy.get('.MuiAlert-message').should('be.visible');
    cy.get('.MuiAlert-message').contains(statuses.SUCCESS_ADD_STATUS);
  });

  it('should delete pattern', () => {
    cy.stubRequest('deletePattern', deletePattern).as('deletePattern');
    cy.get('[data-cy=delete-btn]').last().click();
    cy.get('[data-cy=dialog-confirm]').last().click();
    cy.wait(1000);
    cy.get('.MuiAlert-message').should('be.visible');
    cy.get('.MuiAlert-message').contains(statuses.SUCCESS_DELETE_STATUS);
  });
});

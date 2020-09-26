import 'cypress-file-upload';
import { config } from '../../src/configs';

describe('pattern tests', () => {
  before(() => {
    cy.login(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASSWORD'));
    cy.visit('/patterns');
    cy.wait(3000);
  });

  it('should be visible and contain values', () => {
    cy.visit('/patterns');
    cy.viewport(1280, 720);
    cy.get('[data-cy=add-pattern]').should('be.visible');
    cy.window()
      .its('store')
      .invoke('getState')
      .its('Pattern')
      .its('list')
      .should('not.to.be', null);
  });
  it('should be visible', () => {
    cy.get('[data-cy=add-pattern] .MuiButton-label').should('be.visible');
    cy.get('[data-cy=Фото]').contains(config.tableHeadRowTitles.patterns[0]);
    cy.get('[data-cy=Назва]').contains(config.tableHeadRowTitles.patterns[1]);
    cy.get('[data-cy="Код матеріалу"]').contains(
      config.tableHeadRowTitles.patterns[2]
    );
    cy.get('[data-cy=Доступний]').contains(
      config.tableHeadRowTitles.patterns[3]
    );
    cy.get('[data-cy=Дії]').contains(config.tableHeadRowTitles.patterns[4]);
    cy.get('.MuiPagination-ul > :nth-child(3) > .MuiButtonBase-root').click();
    cy.window()
      .its('store')
      .invoke('getState')
      .its('Pattern')
      .its('pagination')
      .its('currentPage')
      .should('be.equal', 1);

    cy.get('[data-cy=add-pattern]').click();
    cy.get('[data-cy=handmade]').should('be.visible');
    cy.get('[data-cy=available]').should('be.visible');
    cy.get('[data-cy=goBackButton]').should('be.visible');
    cy.get('[data-cy=save]').should('be.visible');
    cy.get('[data-cy=patternImage]').should('be.visible');
    cy.get('[data-cy=add-photo]').should('be.visible');
    cy.get('[data-cy=material').should('be.visible');
    cy.get('[data-cy=ukName]').should('be.visible');
    cy.get('[data-cy=ukDescription]').should('be.visible');
    cy.get('[data-cy=uk]').should('be.visible');
    cy.get('[data-cy=en]').should('be.visible');
  });
  it('should contain', () => {
    cy.get('[data-cy=handmade]').should(
      'contain',
      config.labels.pattern.handmade
    );
    cy.get('[data-cy=available]').should(
      'contain',
      config.labels.pattern.available
    );
    cy.get('[data-cy=goBackButton]').should('contain', 'Назад');
    cy.get('[data-cy=save]').should('contain', 'Зберегти');
    cy.get('[data-cy=material').should(
      'contain',
      config.labels.pattern.material
    );
    cy.get('[data-cy=uk]').should('contain', 'uk');
    cy.get('[data-cy=en]').should('contain', 'en');
    cy.get('[data-cy=ukName]').should(
      'contain',
      config.tableHeadRowTitles.patterns[1]
    );
    cy.get('[data-cy=ukDescription]').should('contain', 'Опис');
  });
  it('check validation', () => {
    cy.get('[data-cy=save]').click();
    cy.get('[data-cy=material-error]').contains(
      config.patternErrorMessages.PATTERN_ERROR_MESSAGE
    );
    cy.get('[data-cy=ukName-error]').contains(
      config.patternErrorMessages.PATTERN_ERROR_MESSAGE
    );
    cy.get('[data-cy=ukDescription-error]').contains(
      config.patternErrorMessages.PATTERN_ERROR_MESSAGE
    );
    cy.get('[data-cy=en]').click();
    cy.get('[data-cy=enName-error]').contains(
      config.patternErrorMessages.PATTERN_ERROR_MESSAGE
    );
    cy.get('[data-cy=enDescription-error]').contains(
      config.patternErrorMessages.PATTERN_ERROR_MESSAGE
    );
    cy.get('[data-cy=material').type('a');
    cy.get('[data-cy=enName]').type('a');
    cy.get('[data-cy=enName-error]').contains(
      config.patternErrorMessages.PATTERN_VALIDATION_ERROR
    );
    cy.get('[data-cy=enDescription]').type('a');
    cy.get('[data-cy=enDescription-error]').contains(
      config.patternErrorMessages.PATTERN_VALIDATION_ERROR
    );
    cy.get('[data-cy=uk]').click();
    cy.get('[data-cy=ukName]').type('a');
    cy.get('[data-cy=ukName-error]').contains(
      config.patternErrorMessages.PATTERN_VALIDATION_ERROR
    );
    cy.get('[data-cy=ukDescription]').type('a');
    cy.get('[data-cy=ukDescription-error]').contains(
      config.patternErrorMessages.PATTERN_VALIDATION_ERROR
    );
    cy.get('[data-cy=material-error]').contains(
      config.patternErrorMessages.PATTERN_VALIDATION_ERROR
    );
  });
  it('should add new pattern', () => {
    cy.get('[data-cy=handmade]').click();
    cy.get('[data-cy=material').type(111);
    cy.get('[data-cy=ukName]').type('cypress test');
    cy.get('[data-cy=ukDescription]').type('cypress test');
    cy.get('[data-cy=en]').click();
    cy.get('[data-cy=enName]').type('cypress test');
    cy.get('[data-cy=enDescription]').type('cypress test');
    cy.fixture('HORONDI.png').then((fileContent) => {
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: 'HORONDI.png',
        mimeType: 'image/png',
        filePath: '../fixtures'
      });
    });
    cy.get('[data-cy=save]').click();
  });
});

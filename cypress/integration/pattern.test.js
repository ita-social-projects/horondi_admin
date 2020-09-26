import 'cypress-file-upload';

describe('pattern tests', () => {
  beforeEach(() => {
    cy.login(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASSWORD'));
    cy.visit('/products');
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
    cy.get('[data-cy=Фото]').contains('Фото');
    cy.get('[data-cy=Назва]').contains('Назва');
    cy.get('[data-cy=Матеріал]').contains('Матеріал');
    cy.get('[data-cy=Доступний]').contains('Доступний');
    cy.get('[data-cy=Дії]').contains('Дії');
    cy.get('.MuiPagination-ul > :nth-child(3) > .MuiButtonBase-root').click();
    cy.window()
      .its('store')
      .invoke('getState')
      .its('Pattern')
      .its('pagination')
      .its('currentPage')
      .should('be.equal', 1);

    cy.get(
      '.MuiGrid-direction-xs-column > :nth-child(1) > .MuiGrid-root > .MuiButtonBase-root'
    ).click();
    cy.get('[data-cy=handmade]').should('be.visible');
    cy.get('[data-cy=available]').should('be.visible');
    cy.get('[data-cy=save]').should('be.visible');
    cy.get('[for="patternImage"]').should('be.visible');
    cy.get('[data-cy=material').should('be.visible');
    cy.get('[data-cy=ukName]').should('be.visible');
    cy.get('[data-cy=ukDescription]').should('be.visible');
    cy.get('[data-cy=uk]').should('be.visible');
    cy.get('[data-cy=en]').should('be.visible');
    cy.get('[data-cy=handmade]').should('contain', 'Зроблений вручну');
    cy.get('[data-cy=available]').should('contain', 'Доступний');
    cy.get('[data-cy=save]').should('contain', 'Зберегти');
    cy.get('[data-cy=material').should('contain', 'Матеріал');
    cy.get('[data-cy=uk]').should('contain', 'uk');
    cy.get('[data-cy=en]').should('contain', 'en');
    cy.get('[data-cy=ukName]').should('contain', 'Назва');
    cy.get('[data-cy=ukDescription]').should('contain', 'Опис');
  });
  it('should create new pattern', () => {
    cy.get('[data-cy=handmade]').click();
    cy.get('[data-cy=material').type('test material');
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
      cy.get('[data-cy=save]').click();
    });
  });
});

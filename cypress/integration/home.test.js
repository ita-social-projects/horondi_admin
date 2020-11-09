import 'cypress-file-upload';
import { config } from '../../src/configs';

describe('Homepage tests', () => {
  before(() => {
    cy.login(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASSWORD'));
  });

  beforeEach(() => {
    cy.visit('/home-page-edit');
    cy.get('[data-cy=homepage-title]').should('be.visible');
  });

  it('Should be able to upload image', () => {
    cy.get('#upload-photo').eq(0).attachFile('HORONDI.png');
    cy.wait(3000);
    cy.get('[data-cy^=photo] img').eq(0).should('be.visible');
  });
});

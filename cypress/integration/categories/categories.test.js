/// <reference types="cypress" />
import { config } from '../../../src/configs';
import { allCategories } from './categories.variables';

const { labels } = config;

describe('Category tests', () => {
  let categories;

  before(() => {
    categories = allCategories;

    cy.stubRequest('getAllCategories', (req) => {
      req.reply({
        body: {
          data: {
            getAllCategories: categories
          }
        }
      });
    }).as('getAllCategories');

    cy.stubRequest('deleteCategory', (req, body) => {
      const { deleteId, switchId } = body.variables;

      expect(deleteId).to.equal(3);
      expect(switchId).to.equal(2);

      categories = categories.filter((item) => item._id !== deleteId);

      console.log(categories);
    }).as('deleteCategory');

    cy.login(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASSWORD'));
    cy.visit('/categories');
  });

  it('Should delete category', () => {
    cy.get('[aria-label=Видалити]:first').click();

    cy.get('[data-cy=category-delete-dialog]').should('be.visible');
    cy.get('[data-cy=category-delete-label]').should(
      'contain',
      labels.categories.switchCategory
    );
    cy.get('[data-cy=category-select]')
      .click()
      .get('[data-cy=category-delete-option-0]')
      .click();

    cy.get('[data-cy=category-delete-submit]').click();
    cy.get('[data-cy=dialog-confirm]').click();

    cy.wait('@deleteCategory').then(() => {
      cy.get('tbody > tr').should('have.length', categories.length);
    });
  });
});

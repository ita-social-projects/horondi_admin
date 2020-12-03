/// <reference types="cypress" />

import { config } from '../../../src/configs';
import { getAllOrders, orders } from './main-page.variables';

const {
  mainTitle,
  ordersTitle,
  commentsTitle,
  changesTitle
} = config.titles.mainPageTitles;
const path = orders.items[0]._id;

describe('Mainpage tests', () => {
  before(() => {
    cy.stubRequest('getAllOrders', getAllOrders).as('getAllOrders');
    cy.login(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASSWORD'));
    cy.visit('/');
  });
  it('should find page title and check it content', () => {
    cy.get('[data-cy=page-title]').should('be.visible');
    cy.get('[data-cy=page-title]').contains(mainTitle);
  });
  it('should find all containers and check their titles', () => {
    cy.get('[data-cy=orders-container]').should('be.visible');
    cy.get('[data-cy=orders-container]').contains(ordersTitle);
    cy.get('[data-cy=comments-container]').should('be.visible');
    cy.get('[data-cy=comments-container]').contains(commentsTitle);
    cy.get('[data-cy=changes-container]').should('be.visible');
    cy.get('[data-cy=changes-container]').contains(changesTitle);
  });
  it('should check orders redirect', () => {
    cy.get('[data-cy=orders-container] [data-cy=order]').first().click();
    cy.url().should('include', `/orders/${path}`);
  });
  it('should check the mainpage button for clickability ', () => {
    cy.get('#menuDrawer').contains(mainTitle).click();
  });
});

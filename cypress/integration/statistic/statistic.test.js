/// <reference types="cypress" />
import { config } from '../../../src/configs';

import {
  getPopularCategories,
  getPopularProducts,
  getPopularCategoriesEmpty,
  getPopularProductsEmpty,
  getPaidOrdersStatistic,
  getOrdersStatistic
} from './statistic.variables';

describe('Statistic page test', () => {
  beforeEach(() => {
    cy.login(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASSWORD'));
    cy.stubRequest('getPopularCategories', getPopularCategories).as(
      'getPopularCategories'
    );
    cy.stubRequest('getPopularProducts', getPopularProducts).as(
      'getPopularProducts'
    );
    cy.visit('/');
    cy.wait(3000);

    cy.get('[href="/stats"]').click();
  });

  it('should be visible and have default settings', () => {
    cy.get('[data-cy=page-title]').should('be.visible');
    cy.get('[data-cy=page-title]').contains(
      config.titles.statisticTitles.mainPageTitle
    );

    cy.get('[data-cy=date-selector]').should('be.visible');
    cy.get('[data-cy=date-selector]').click();
    cy.get('[data-cy="date-select-За 7 Днів"]').should('be.visible');
    cy.get('[data-cy="date-select-За 14 Днів"]').should('be.visible');
    cy.get('[data-cy="date-select-За місяць"]').should('be.visible');
    cy.get('[data-cy="date-select-За 3 місяці"]').should('be.visible');
    cy.get('[data-cy="date-select-За рік"]').should('be.visible');
    cy.get('.MuiMenu-paper').invoke('hide');
    cy.get('[data-cy=date-selector]').contains(
      config.labels.doughnut.dateMenuOptions[0].label
    );

    cy.get('[data-cy=bar-selector]').should('be.visible');
    cy.get('[data-cy=bar-selector]').contains(
      config.labels.bar.select[0].label
    );

    cy.get('[data-cy=doughnut-selector]').should('be.visible');
    cy.get('[data-cy=doughnut-selector]').contains(
      config.labels.doughnut.select[0].label
    );

    cy.get('[data-cy=bar-chart-box]').should('be.visible');
    cy.get('[data-cy=bar-chart-box]').children('canvas').should('be.visible');
    cy.get('[data-cy=total-count]').should('be.visible');
    cy.get('[data-cy=total-count]').contains('120');

    cy.get('[data-cy=doughnut-chart-box]').should('be.visible');
    cy.get('[data-cy=doughnut-chart-box]')
      .children('canvas')
      .should('be.visible');
  });

  it('should switch chart to latest paid orders', () => {
    cy.stubRequest('getPaidOrdersStatistic', getPaidOrdersStatistic).as(
      'getPaidOrdersStatistic'
    );
    cy.get('[data-cy=bar-selector]').click();
    cy.get('[data-cy="bar-select-Популярні продукти за весь час"]').should(
      'be.visible'
    );
    cy.get('[data-cy="bar-select-Виконані замовлення"]').should('be.visible');
    cy.get('[data-cy="bar-select-Останні зареєстровані користувачі"]').should(
      'be.visible'
    );
    cy.get('[data-cy="bar-select-Виконані замовлення"]').click();
    cy.get('.MuiMenu-paper').invoke('hide');

    cy.get('[data-cy=bar-selector]').should('be.visible');
    cy.get('[data-cy=bar-selector]').contains(
      config.labels.bar.select[1].label
    );

    cy.get('[data-cy=bar-chart-box]').should('be.visible');
    cy.get('[data-cy=bar-chart-box]').children('canvas').should('be.visible');
    cy.get('[data-cy=total-count]').should('be.visible');
    cy.get('[data-cy=total-count]').contains('9');
  });

  it('should switch to last orders', () => {
    cy.stubRequest('getOrdersStatistic', getOrdersStatistic).as(
      'getOrdersStatistic'
    );

    cy.get('[data-cy=doughnut-selector]').click();
    cy.get(
      '[data-cy="doughnut-select-Популярні категорії за весь час"]'
    ).should('be.visible');
    cy.get('[data-cy="doughnut-select-Останні замовлення"]')
      .should('be.visible')
      .click();

    cy.get('[data-cy=doughnut-legent-name]').should('be.visible');
    cy.get('[data-cy=doughnut-legent-name]').contains('Створені');

    cy.get('[data-cy=doughnut-legent-relation]').should('be.visible');
    cy.get('[data-cy=doughnut-legent-relation]').contains('100%');
  });
});

describe('Test statistic with empty response', () => {
  beforeEach(() => {
    cy.login(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASSWORD'));
    cy.stubRequest('getPopularCategories', getPopularCategoriesEmpty).as(
      'getPopularCategories'
    );
    cy.stubRequest('getPopularProducts', getPopularProductsEmpty).as(
      'getPopularProducts'
    );
    cy.visit('/');
    cy.wait(3000);

    cy.get('[href="/stats"]').click();
  });
  it('should show error if no data in response', () => {
    cy.get('[data-cy=bar-chart-box]').should('be.visible');
    cy.get('[data-cy=bar-chart-box]').contains(
      config.statsErrorMessages.NO_STATS
    );
  });
});

/// <reference types="cypress" />
import { id, telephoneNumber, email, textString } from './contact.variables';

describe('Contacts test', () => {
  // let phoneNumber;
  // let ukSchedule;
  // let enSchedule;
  // let ukAddress;
  // let enAddress;
  // let ukCartImage;
  // let enCartImage;
  // let cartLink;
  // let email;
  //
  // before(() => {
  //   phoneNumber = '380961737361';
  //   ukSchedule =
  //     'Пн: 09:00 - 17:00|Вт: 09:00 - 18:00|Ср: 09:00 - 18:00|Чт: 09:00 - 18:00|Пт: 09:00 - 18:00|Сб: Вихідний|Нд: Вихідний';
  //   enSchedule =
  //     'Mon: 9 a.m. - 5 p.m.|Tue: 9 a.m. - 6 p.m.|Wed: 9 a.m. - 6 p.m.|Thu: 9 a.m. - 6 p.m.|Fri: 9 a.m. - 6 p.m.|Sat: Closed|Sun: Closed';
  //   ukAddress = 'Львів вул. Угорська, 2';
  //   enAddress = 'Lviv 2 Uhorska Str.';
  //   ukCartImage =
  //     'https://horondi.blob.core.windows.net/horondi/images/thumbnail_26ebx5pkkf8cwuvd_map.png';
  //   enCartImage =
  //     'https://horondi.blob.core.windows.net/horondi/images/thumbnail_26ebx5pkkf8cwuve_map.png';
  //   cartLink = `https://www.google.com.ua/maps/place/Uhorska+St,+2,+L'viv,+L'vivs'ka+oblast,+79000/@49.8130011,24.0348852,17z/data=!3m1!4b1!4m5!3m4!1s0x473ae7fa9be7c3b5:0xb30b2516d705bae6!8m2!3d49.8130011!4d24.0370739`;
  //   email = 'EmailEmail';
  // });

  beforeEach(() => {
    cy.login(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASSWORD'));
    cy.visit('/contacts');
    cy.wait(3000);
    cy.get('.MuiTableCell-root.MuiTableCell-body').as('table');
  });

  it('Should find a page title', () => {
    cy.contains('Інформація про контакти');
  });

  it('User list row should have all types of necessary information about the user', () => {
    cy.get('@table').eq(0).invoke('text').should('match', telephoneNumber);
    cy.get('@table').eq(1).invoke('text').should('match', email);
    cy.get('@table').eq(2).invoke('text').should('match', textString);
  });

  it('Data from the server should be equal with the incoming data', () => {
    cy.visit(`contacts/${id}`);

    cy.get('[data-cy=phoneNumber]').invoke('text').should('match', textString);
    cy.get('[data-cy=ukSchedule]').invoke('text').should('match', textString);
    cy.get('[data-cy=enSchedule]').invoke('text').should('match', textString);
    cy.get('[data-cy=ukAddress]').invoke('text').should('match', textString);
    cy.get('[data-cy=enAddress]').invoke('text').should('match', textString);
    cy.get('[data-cy=ukCartImage]').should('exist');
    cy.get('[data-cy=enCartImage]').should('exist');
    cy.get('[data-cy=mapLink]').should('exist');
    cy.get('[data-cy=email]').should('have.text', 'EmailEmail');
    cy.get('[data-cy=goBackButton]')
      .should('be.visible')
      .should('have.text', 'Назад')
      .click()
      .wait(2000);
    cy.location('pathname', { timeout: 1000 }).should('eq', '/contacts');
  });
});

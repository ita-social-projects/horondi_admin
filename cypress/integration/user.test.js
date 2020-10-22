/// <reference types="cypress" />

import { config } from '../../src/configs';
import formRegExp from '../../src/configs/form-regexp';

const {
  email: emailRegex,
  userName: userNameRegex,
  userRoles: userRolesRegex,
  userStatuses: userStatusesRegex,
  mobileNumber: mobileNumberRegex
} = formRegExp;

describe('User list and items test', () => {
  let firstName;
  let lastName;
  let country;
  let city;
  let adress;
  let postalCode;
  let id;

  before(() => {
    firstName = 'Димитрій';
    lastName = 'Айдзава';
    country = 'Україна';
    city = 'Нова Одеса';
    adress = "Куп'янський провулок, 190/135";
    postalCode = '26725';
    id = '4b2f84529047da089ff00aec';
  });

  beforeEach(() => {
    cy.login(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASSWORD'));
    cy.visit('/users');
    cy.wait(3000);
    cy.get('#table-body').as('table');
  });

  it('Should find a page title', () => {
    cy.get('@table').should('be.visible');
  });

  it('User list row should have all types of necessary information about the user', () => {
    cy.get('@table').children().eq(0).children().as('row');
    cy.get('@row').eq(0).find('svg');
    cy.get('@row').eq(1).invoke('text').should('match', userNameRegex);
    cy.get('@row').eq(2).invoke('text').should('match', mobileNumberRegex);
    cy.get('@row').eq(3).invoke('text').should('match', emailRegex);
    cy.get('@row').eq(4).invoke('text').should('match', userRolesRegex);
    cy.get('@row').eq(5).invoke('text').should('match', userStatusesRegex);
  });

  it('Information about the user in the list and the details page should be equal', () => {
    cy.get('@table').children().eq(0).children().as('row');
    cy.get('@row')
      .eq(1)
      .then(($elem) => {
        const textList = $elem.text();

        cy.get('@row')
          .get("button[aria-label='Редагувати']:first")
          .scrollIntoView()
          .click({ force: true })
          .wait(2000)
          .get('[data-cy=name]')
          .invoke('text')
          .should('equal', textList);
      });
  });
  it('When user changes status, page and user information should be updated', () => {
    cy.visit(`/users/${id}`).wait(2000);

    cy.get('[data-cy=change-user-status-button]')
      .should('have.text', 'Деактивувати')
      .click()
      .wait(600)
      .get('.MuiDialogActions-root > .MuiButton-containedSecondary')
      .click()
      .wait(2000);

    cy.get('[data-cy=change-user-status-button]').should(
      'have.text',
      'Активувати'
    );

    cy.get('[data-cy=status]').should('have.text', 'Неактивний(-a)');

    cy.get('[data-cy=change-user-status-button]')
      .should('have.text', 'Активувати')
      .click()
      .wait(600)
      .get('.MuiDialogActions-root > .MuiButton-containedSecondary')
      .click()
      .wait(2000);

    cy.get('[data-cy=status]').should('have.text', 'Активний(-a)');
  });
  it('Data from the server should be equal with the incoming data', () => {
    cy.visit(`users/${id}`);
    cy.get('[data-cy=name]').should('have.text', `${firstName} ${lastName}`);
    cy.get('[data-cy=country]').should('have.text', country);
    cy.get('[data-cy=city]').should('have.text', city);
    cy.get('[data-cy=adress]').should('have.text', adress);
    cy.get('[data-cy=postCode]').should('have.text', postalCode);
  });

  it('Users tab must have only users', () => {
    cy.visit(`/users`);
    cy.wait(3000);
    cy.get('@table').should('not.have.text', 'Адмін');
    cy.get('@table').should('not.have.text', 'Супердмін');
  });

  it('Admins tab must have only admins and superadmins', () => {
    cy.visit(`/users`);
    cy.wait(3000);
    cy.contains('Адміністратори').click();
    cy.wait(3000);
    cy.get('@table').should('not.have.text', 'Користувач');
  });
});

describe('Register and confirm admin', () => {
  let firstName;
  let lastName;
  let password;
  let email;
  let token;
  let role;

  before(() => {
    firstName = 'Bob';
    lastName = 'Marley';
    password = 'qwertY123';
    role = 'admin';
    email = 'admin3@gmail.com';
  });

  it('Should show an dialog window with admin registration', () => {
    cy.login(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASSWORD'));
    cy.visit(`/users`);
    cy.wait(3000);
    cy.contains('Адміністратори').click();
    cy.wait(3000);
    cy.get('[data-cy=add-user-admin-button]').click();
    cy.wait(3000);
    cy.get('[data-cy=register-dialog]').should('be.visible');
    cy.get('[data-cy=form-dialog-title]').should('be.visible');
    cy.get('[data-cy=form-dialog-content]').should('be.visible');
  });

  it('Should show an error label when email or role are incorrect', () => {
    cy.login(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASSWORD'));
    cy.visit(`/users`);
    cy.wait(4000);
    cy.contains('Адміністратори').click();
    cy.wait(4000);
    cy.get('[data-cy=add-user-admin-button]').click();
    cy.wait(4000);
    cy.get('[data-cy=email]').type('Bob');
    cy.get('[data-cy=submit-admin-register]').click();
    cy.get('[data-cy=email-error-label]').should(
      'have.text',
      config.loginErrorMessages.INVALID_EMAIL_MESSAGE
    );
    cy.get('[data-cy=role-error-label]').should(
      'have.text',
      config.loginErrorMessages.SELECT_ROLE_MESSAGE
    );
  });

  it('Should show an error caused by the lack of previlegies', () => {
    cy.login(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASSWORD'));
    cy.visit(`/users`);
    cy.wait(3000);
    cy.contains('Адміністратори').click();
    cy.wait(3000);
    cy.get('[data-cy=add-user-admin-button]').click();
    cy.wait(3000);
    cy.get('[data-cy=email]').type('admin3@gmail.com');
    cy.get('[data-cy=role]').click();
    cy.get('[data-cy=admin]').click();
    cy.get('[data-cy=submit-admin-register]').click();
    cy.wait(3000);
    cy.get('[data-cy=snack-bar-message]').should(
      'have.text',
      'Помилка: Недостатньо прав користувача'
    );
  });

  it('Register new admin', () => {
    const query = `
      mutation{
        registerAdmin(user: {
          email: "${email}",
          role: "${role}"
        }){
          ... on User {
            invitationalToken
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `;
    cy.login(
      Cypress.env('SUPERADMIN_LOGIN'),
      Cypress.env('SUPERADMIN_PASSWORD')
    ).then((adminToken) => {
      cy.request({
        url: Cypress.env('SERVER_URL'),
        method: 'POST',
        headers: {
          token: adminToken
        },
        body: {
          query
        }
      })
        .then((res) => res.body.data.registerAdmin.invitationalToken)
        .then((newToken) => {
          token = newToken;
        });
    });
  });

  it('Should open confirmation page', () => {
    cy.visit(`/confirmation/${token}`);
    cy.wait(3000);
    cy.get('[data-cy=title]').should(
      'have.text',
      'Продовжити реєстрацію адміністратора'
    );
  });

  it('Should confirm admin registration', () => {
    cy.visit(`/confirmation/${token}`);
    cy.wait(3000);
    cy.get('[data-cy=firstName]').type(firstName);
    cy.get('[data-cy=lastName]').type(lastName);
    cy.get('[data-cy=password]').type(password);
    cy.get('[data-cy=submit-admin-confirmation]').click();
    cy.wait(3000);
    cy.get('[data-cy=snack-bar-message]').should(
      'have.text',
      config.statuses.SUCCESS_CONFIRMATION_STATUS
    );
  });

  it('Should login as an admin', () => {
    cy.login(email, password);
    cy.wait(3000);
    cy.visit('/users');
    cy.wait(3000);
    cy.get('#table-body').should('be.visible');
  });
});

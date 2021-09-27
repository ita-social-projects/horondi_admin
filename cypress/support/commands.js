const LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add('login', (email, password) => {
  const query = `
        mutation{
            loginAdmin(loginInput: {
                email: "${email}",
                password: "${password}"
            }){
                token
            }
        }
    `;

  cy.request({
    method: 'POST',
    url: Cypress.env('SERVER_URL'),
    body: {
      query
    }
  })
    .then((res) => res.body.data.loginAdmin.token)
    .then((token) => {
      const data = { HORONDI_AUTH_TOKEN: token };
      window.localStorage.setItem('horondiAdmin', JSON.stringify(data));
      return token;
    });
});

Cypress.Commands.add('stubRequest', (route, callback) => {
  cy.route2(
    {
      method: 'POST',
      url: Cypress.env('SERVER_URL')
    },
    (req) => {
      const body = JSON.parse(req.body);
      if (
        (body.query && body.query.includes(route)) ||
        (body.mutation && body.mutation.includes(route))
      ) {
        callback(req, body);
      }
    }
  );
});

Cypress.Commands.add('saveLocalStorageCache', () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add('restoreLocalStorageCache', () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});

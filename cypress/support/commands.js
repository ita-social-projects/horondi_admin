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
    url: Cypress.env('SERVER_URL'),
    method: 'POST',
    body: {
      query
    }
  })
    .then((res) => res.body.data.loginAdmin.token)
    .then((token) => {
      const data = { HORONDI_AUTH_TOKEN: token };
      window.localStorage.setItem('horondi', JSON.stringify(data));
    });
});

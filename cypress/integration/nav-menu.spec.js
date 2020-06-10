describe('routes', () => {
  it('Nav drawer, logo and profile icon should be visible, menu toggler should not be visible on 1280, 720 screen.', () => {
    cy.visit('/');
    cy.viewport(1280, 720);
    cy.get('#menuToggle').should('not.be.visible');
    cy.get('#menuDrawer').should('be.visible');
    cy.get('#logo').should('be.visible');
    cy.get('#profileButton').should('be.visible');
  });
  it('Menu toggler, logo and profile icon should be visible, nav drawer should be visible on IPad screen.', () => {
    cy.viewport('ipad-2');
    cy.get('#menuToggle').should('be.visible');
    cy.get('#menuDrawer').should('not.be.visible');
    cy.get('#logo').should('be.visible');
    cy.get('#profileButton').should('be.visible');
  });
  it('Theme toggler should change styles from dark to light and from light to dark.', () => {
    cy.get('body').should('have.css', 'background-color', 'rgb(48, 48, 48)');
    cy.get('#themeToggler').click();
    cy.get('body').should('have.css', 'background-color', 'rgb(250, 250, 250)');
    cy.get('#themeToggler').click();
    cy.get('body').should('have.css', 'background-color', 'rgb(48, 48, 48)');
  });
});

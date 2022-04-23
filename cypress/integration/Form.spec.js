describe('React-Toastify test', () => {
  it('visit the dev-server', () => {
    cy.visit('/');
  });

  it('fills the form and fails an agreement rule', () => {
    cy.get('input[name="fullName"]').type('Illia');

    cy.contains('Male').wait(1000).click();

    cy.contains('HTML').wait(500).click();

    cy.contains('JS').wait(500).click();

    cy.get('input[name="birthday"]').wait(500).type('1996-04-01');

    cy.get('input[name="email"]').wait(500).type('test.acc@gmail.com');

    cy.contains('Submit the form!').wait(500).click();

    cy.get('p.error');
  });

  it('correct an agreement rule', () => {
    cy.get('span.slider').wait(1000).click();

    cy.contains('Submit the form!').wait(500).click();

    cy.get('p.error').should('not.exist');
  });

  it('shows the successful toast and removes in 3 seconds by clicking on it', () => {
    cy.contains(/submitted/)
      .wait(3000)
      .click()
      .should('not.exist');
  });
});

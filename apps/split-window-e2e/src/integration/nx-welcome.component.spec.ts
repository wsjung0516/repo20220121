describe('split-window', () => {
  beforeEach(() => cy.visit('/iframe.html?id=nxwelcomecomponent--primary'));
  it('should render the component', () => {
    cy.get('repo20220121-nx-welcome').should('exist');
  });
});
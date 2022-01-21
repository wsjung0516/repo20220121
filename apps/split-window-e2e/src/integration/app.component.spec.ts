describe('split-window', () => {
  beforeEach(() => cy.visit('/iframe.html?id=appcomponent--primary'));
  it('should render the component', () => {
    cy.get('repo20220121-root').should('exist');
  });
});
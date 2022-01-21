describe('split-window', () => {
  beforeEach(() => cy.visit('/iframe.html?id=carouselmaincomponent--primary&args=progress:0;'));
  it('should render the component', () => {
    cy.get('carousel-main').should('exist');
  });
});
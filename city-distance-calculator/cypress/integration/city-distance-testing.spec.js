
describe('Homepage Test', () => {
    it('should navigate to the homepage and perform actions', () => {
      cy.visit('/');
      
      cy.get('.search-box input').type('Paris');
      cy.get('.search-suggestion').first().click();
      
  
      cy.get('.result-text span').should('contain', 'passenger');
    });
  });
  
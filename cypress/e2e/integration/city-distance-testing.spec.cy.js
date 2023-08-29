describe('Homepage Test', () => {
  beforeEach(() => {
    cy.visit('http://192.168.100.193:3000'); 
  });

  it('should be able to select cities and submit the form', () => {
    cy.get('.search-box input').eq(0).type('Paris');
    cy.get('.search-box input').eq(1).type('Montpellier');
    cy.get('.add-btn').click();
    cy.get('.search-box input').eq(2).type('Lyon');
    cy.get('.numeric-input input').clear({ force: true }).type('3');
    cy.get('.datepicker input[type="text"]').invoke('val', '8/29/2023');

    cy.get('form').submit();
  });
  

  it('should be able to select cities and submit the form using Dijon city', () => {
    cy.get('.search-box input').eq(0).type('Paris');
    cy.get('.search-box input').eq(1).type('Dijon');
    cy.get('.add-btn').click();
    cy.get('.numeric-input input').clear(({ force: true })).type('3');
    cy.get('.datepicker input[type="text"]').invoke('val', '8/29/2023');

    cy.get('form').submit();

  });

  it('should display error messages for missing input', () => {
    cy.get('.add-btn').click();
    cy.get('.add-btn').click();
    

    cy.get('.numeric-input input').clear({ force: true }).type('0');
    cy.get('.datepicker input[type="text"]').invoke('val', '8/29/2023');
    
    cy.get('form').submit();

  });

  it("should display date error message for selecting a date before today's date", () => {
    it("should display date error message for selecting a date before today's date", () => {
      cy.clock(); 
  
      cy.get('.datepicker input[type="text"]').invoke('val', '8/29/2023');
  
      cy.tick(1000); 
  
      cy.get('.date-error').should('be.visible', { timeout: 10000 });
  
      cy.clock().invoke('restore'); 
    });
  });
});


describe('Result Page Test', () => {
  
  beforeEach(() => {
    cy.intercept('POST', 'http://192.168.100.193/searchCities', {
      statusCode: 200,
      body: [
        { value: 'Paris', label: 'Paris', latitude: 48.8566, longitude: 2.3522 },
        { value: 'Montpellier', label: 'Montpellier', latitude: 43.611, longitude: 3.877 },
        { value: 'Lyon', label: 'Lyon', latitude: 45.75, longitude: 4.85 }
      ]  
    });
    cy.visit('http://localhost:3000/result/846.0876732668767/2/Aug%2029,%202023/Paris%3AMontpellier%3A594.9453468393059%7CMontpellier%3ALyon%3A251.14232642757074');
  });

  it('should display the result page after form submission', () => {
    cy.get('.results-container').should('exist');
    cy.get('.city-results').should('have.length', 3);
  });

  it('should display an error message when Dijon is involved', () => {
    cy.intercept('POST', 'http://192.168.100.193/searchCities', {
      statusCode: 200,
      body: [
        { value: 'Paris', label: 'Paris', latitude: 48.8566, longitude: 2.3522 },
        {
          value: 'Dijon',
          label: 'Dijon',
          latitude: 47.322047,
          longitude: 5.041480
        },
      ]  
    });
    cy.visit('http://localhost:3000/result/262.67711555282904/3/Aug%2029,%202023/Paris%3ADijon%3A262.67711555282904');
    cy.get('.error-page').should('exist');
  });

  it('should navigate back to the homepage', () => {
    cy.get('.results-container').should('exist');
    cy.wait(2000);
    cy.get('.results-container a').should('be.visible').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });
  
  
});

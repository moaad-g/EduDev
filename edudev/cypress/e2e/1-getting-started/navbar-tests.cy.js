describe('Navbar component', () => {
   
    it('clicks every button and asserts new URL', () => {
        cy.visit('http://localhost:3000/')

        cy.get('img[alt="edudev logo"]').click()
        cy.url().should('eq', 'http://localhost:3000/')
    
        cy.contains('SANDBOX').click()
        cy.url().should('eq', 'http://localhost:3000/sandbox')
    
        cy.contains('LEARN').click()
        cy.url().should('eq',  'http://localhost:3000/topics')
        
        cy.contains('Login').click()
        cy.url().should('eq', 'http://localhost:3000/login')
  
    })
  })
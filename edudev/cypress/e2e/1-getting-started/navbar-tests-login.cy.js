describe('Navbar component (logged in)', () => {
   
    it('clicks every button and asserts new URL', () => {
        cy.visit('http://localhost:3000/login')

        const email = 'test@account.com';
        const password = 'testpass';
        cy.get('input[type="email"]').type(email);
        cy.get('input[type="password"]').type(password);
        cy.get('button[type="submit"]').click();

        cy.get('img[alt="edudev logo"]').click()
        cy.url().should('eq', 'http://localhost:3000/')
    
        cy.contains('SANDBOX').click()
        cy.url().should('eq', 'http://localhost:3000/sandbox')
    
        cy.contains('LEARN').click()
        cy.url().should('eq',  'http://localhost:3000/topics')

        cy.get('button[aria-label="profile"]').click()
        cy.url().should('eq','http://localhost:3000/profile')

        cy.get('button[aria-label="logout"]').click()
        cy.url().should('eq','http://localhost:3000/')
    })
  })
describe('Navbar component (logged in)', () => {
   
    it('clicks every button and asserts new URL', () => {
        cy.visit('http://localhost:3000/login')

        const email = 'test@account.com';
        const password = 'testpass';
        cy.get('input[type="email"]').type(email);
        cy.get('input[type="password"]').type(password);
        cy.get('button[type="submit"]').click();
    
        cy.contains('SANDBOX').click()
        cy.url().should('eq', 'http://localhost:3000/sandbox')

        cy.get('button[aria-label="Load sandbox button"]').should('exist');
        cy.get('button[aria-label="Save Sandbox"]').should('exist');
        cy.get('div[aria-label="load sandbox"]').should('not.exist');
        cy.get('div[aria-label="save sandbox"]').should('not.exist');

        cy.get('button[aria-label="Load sandbox button"]').click()
        cy.get('div[aria-label="load sandbox"]').should('exist');
        cy.contains('Cancel').click()

        cy.get('button[aria-label="Save Sandbox"]').click();
        cy.get('div[aria-label="save sandbox"]').should('exist');
        cy.contains('Cancel').click()

        cy.get('button[aria-label="logout"]').click()
        cy.url().should('eq','http://localhost:3000/')
    })
  })
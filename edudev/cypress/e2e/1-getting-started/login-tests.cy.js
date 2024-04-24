describe('Enter email into box', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/login'); // Assuming '/signup' is the route for the SignUpComp component
    });

    it('should fail login if user doesnt exist', () => {
      const email = 'test100@company.com';
      const password = 'password123';
      cy.get('input[type="email"]').type(email);
      cy.get('input[type="password"]').type(password);
      cy.get('button[type="submit"]').click();
      cy.contains('Email/Password Invalid!').should('exist');
    });

    it('should fail login if information is wrong', () => {
        const email = 'test@account.com';
        const password = 'password333';
        cy.get('input[type="email"]').type(email);
        cy.get('input[type="password"]').type(password);
        cy.get('button[type="submit"]').click();
        cy.contains('Email/Password Invalid!').should('exist');
      });
  
    it('should successfully login if user exists', () => {
      const email = 'test@account.com';
      const password = 'testpass';
      cy.get('input[type="email"]').type(email);
      cy.get('input[type="password"]').type(password);
      cy.get('button[type="submit"]').click();
      cy.contains('Logout').click()
    });
});
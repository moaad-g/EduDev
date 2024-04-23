describe('Enter email into box', () => {
      beforeEach(() => {
        cy.visit('http://localhost:3000/'); // Assuming '/signup' is the route for the SignUpComp component
      });
      it('should show error message if passwords do not match', () => {
        cy.get('input[type="password"]').eq(0).type('password');
        cy.get('input[type="password"]').eq(1).type('differentpassword');
        cy.get('button[type="submit"]').should('be.disabled');
        cy.contains('passwords must match').should('exist');
      });
    
      it('should show error message if password is less than 8 characters', () => {
        cy.get('input[type="password"]').eq(0).type('pass');
        cy.get('input[type="password"]').eq(1).type('pass');
        cy.get('button[type="submit"]').should('be.disabled')
        cy.contains('passwords must be 8 characters minimum').should('exist');
      });

      it('should fail sign up if user exists', () => {
        const email = 'test@company.com';
        const password = 'password123';
        cy.get('input[type="email"]').type(email);
        cy.get('input[type="password"]').eq(0).type(password);
        cy.get('input[type="password"]').eq(1).type(password);
        cy.get('button[type="submit"]').click();
        cy.contains('User already exists').should('exist');
      });
    
      it('should successfully sign up if all fields are valid', () => {
        const email = 'test2@company.com';
        const password = 'password123';
        cy.get('input[type="email"]').type(email);
        cy.get('input[type="password"]').eq(0).type(password);
        cy.get('input[type="password"]').eq(1).type(password);
        cy.get('button[type="submit"]').click();
        cy.contains('Registration Successful!').should('exist');
      });
  });
describe('navigates to quizzes and completes', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');

        cy.contains('LEARN').click()
        cy.url().should('eq',  'http://localhost:3000/topics')
        
        cy.contains('Introduction').click()
        cy.url().should('eq', 'http://localhost:3000/topics/Introduction')

        cy.contains('Quizzes').click()
    });
    it('navigates to quiz with q_type 0 and completes it', () => {
        cy.get('a[href="Introduction/quiz/DevOps"]').click();

        cy.contains('START').click()
        cy.contains('Next').should('be.disabled')

        cy.contains('HTTPS').click()
        cy.contains('IaC').click()
        cy.contains('CI/CD').click()
        cy.contains('Collaboration').click()
        cy.contains('Next').click()
        
        cy.contains('Next').should('be.disabled')
        cy.get('button').click({ multiple: true });


        cy.contains('Submit').should('be.disabled')
        cy.get('button').click({ multiple: true });
    })
    it('navigates to quiz with q_type 0 and completes it', () => {
        const exampleans = 'incorrect';
        
        cy.get('a[href="Introduction/quiz/DevOps2"]').click();

        cy.contains('START').click()
        cy.contains('Next').should('be.disabled')

        cy.get('input[type="text"]').type(exampleans);
        cy.contains('Next').click()
        
        cy.contains('Next').should('be.disabled')
        cy.get('input[type="text"]').type(exampleans);
        cy.contains('Next').click()
        
        cy.contains('Submit').should('be.disabled')
        cy.get('input[type="text"]').type(exampleans);
        cy.contains('Submit').click()

    })
  })
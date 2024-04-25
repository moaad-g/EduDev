describe('sandbox', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');

        cy.contains('SANDBOX').click()
        cy.url().should('eq',  'http://localhost:3000/sandbox')
        cy.get('div[aria-label="Add device popup"').should('not.exist')
        cy.get('button[aria-label="Add Device button"]').click()
        cy.get('div[aria-label="Add device popup"').should('exist')

        cy.get('select[aria-label="select type"]').should('exist')
        cy.get('input[aria-label="device name input"').should('not.exist')
    });
    it('checks pc settings', () => {
        const name = "examplename";

        cy.get('select[aria-label="select type"]').select('PC')

        cy.get('input[aria-label="device name input"').should('exist')
        cy.get('select[aria-label="select settings"]').should('exist')
        cy.get('div[aria-label="select specs"').should('exist')

        cy.get('div[aria-label="cloud setting"').should('not.exist')
        cy.get('div[aria-label="virtualisation tab"').should('not.exist')
        
        cy.get('button[aria-label="Submit device button"]').should('be.disabled')
        cy.get('input[aria-label="device name input"').type('name')

        cy.get('button[aria-label="Submit device button"]').should('be.disabled')

    })
    it('checks server settings', () => {
        const name = "examplename";
    
        cy.get('select[aria-label="select type"]').select('Server')

        cy.get('input[aria-label="device name input"').should('exist')
        cy.get('select[aria-label="select settings"]').should('not.exist')
        cy.get('div[aria-label="virtualisation tab"').should('not.exist')


        cy.get('div[aria-label="select specs"').should('exist')
        cy.get('div[aria-label="cloud setting"').should('exist')
        cy.get('div[aria-label="virtual setting"').should('exist')
        
        cy.get('button[aria-label="Submit device button"]').should('be.disabled')
        cy.get('input[aria-label="device name input"').type('name')


    })
    it('checks cluster settings', () => {
        const name = "examplename";
    
        cy.get('select[aria-label="select type"]').select('Cluster')

        cy.get('input[aria-label="device name input"').should('exist')
        cy.get('select[aria-label="select settings"]').should('exist')
        cy.get('div[aria-label="virtualisation tab"').should('not.exist')


        cy.get('div[aria-label="select specs"').should('not.exist')
        cy.get('div[aria-label="cloud setting"').should('exist')
        cy.get('div[aria-label="virtual setting"').should('not.exist')
        
        cy.get('button[aria-label="Submit device button"]').should('be.disabled')
        cy.get('input[aria-label="device name input"').type('name')


    })

  })
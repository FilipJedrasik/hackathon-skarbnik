describe('Login Test', function() {
    it('signs in admin', function() {
        cy.fixture('accounts/admin').then(user => {
            cy.visit('/')

            cy.get('input[aria-label="Login"]')
                .type(user.login)
                .should('have.value', user.login)
    
            cy.get('input[aria-label="Hasło"]')
                .type('zaq1@WSX')
                .should('have.value', user.password)
    
            cy.contains('Zaloguj').click()
    
            cy.url().should('include', '/admin/')
        })
    })

    it('signs in teacher', function() {
        cy.fixture('accounts/teacher').then(user => {
            cy.visit('/')

            cy.get('input[aria-label="Login"]')
                .type(user.login)
                .should('have.value', user.login)
    
            cy.get('input[aria-label="Hasło"]')
                .type(user.password)
                .should('have.value', user.password)
    
            cy.contains('Zaloguj').click()
    
            cy.url().should('include', '/supervisor/')
        })
    })
    
    it('signs in parent', function() {
        cy.fixture('accounts/parent').then(user => {
            cy.visit('/')

            cy.get('input[aria-label="Login"]')
                .type(user.login)
                .should('have.value', user.login)
    
            cy.get('input[aria-label="Hasło"]')
                .type(user.password)
                .should('have.value', user.password)
    
            cy.contains('Zaloguj').click()
    
            cy.url().should('include', '/parent/payments')
        })
    })
})
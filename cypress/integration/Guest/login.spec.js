describe('Login Test', function() {
    it('signs in admin', function() {
        const user = {
            login: 'admin',
            password: 'zaq1@WSX'
        };

        cy.visit('/')

        cy.get('input[aria-label="Login"]')
            .type(user.login)
            .should('have.value', user.login)

        cy.get('input[aria-label="Hasło"]')
            .type('zaq1@WSX')
            .should('have.value', user.password)

        cy.contains('Zaloguj').click()

        cy.url().should('eq', '/admin/')
    })

    it('signs in teacher', function() {
        const user = {
            login: 'marta9348',
            password: 'zaq1@WSX'
        };

        cy.visit('/')

        cy.get('input[aria-label="Login"]')
            .type(user.login)
            .should('have.value', user.login)

        cy.get('input[aria-label="Hasło"]')
            .type(user.password)
            .should('have.value', user.password)

        cy.contains('Zaloguj').click()

        cy.url().should('eq', '/supervisor/')
    })
    
    it('signs in parent', function() {
        const user = {
            login: 'zdrignacy',
            password: 'zaq1@WSX'
        };

        cy.visit('/')

        cy.get('input[aria-label="Login"]')
            .type(user.login)
            .should('have.value', user.login)

        cy.get('input[aria-label="Hasło"]')
            .type(user.password)
            .should('have.value', user.password)

        cy.contains('Zaloguj').click()

        cy.url().should('eq', '/parent/payments')
    })
})
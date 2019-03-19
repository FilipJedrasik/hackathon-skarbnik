describe('Admin / Welcome Test', function() {
    it('opens proper Tab from proper cafle', function() {
        cy.login('admin').then(() => {
            cy.visit('/admin')

            cy.get('button[data-cy="teachers"]').click()
            cy.url().should('include', '/admin/teachers')

            cy.visit('/admin')

            cy.get('button[data-cy="parents"]').click()
            cy.url().should('include', '/admin/parents')

            cy.visit('/admin')

            cy.get('button[data-cy="students"]').click()
            cy.url().should('include', '/admin/students')

            cy.visit('/admin')

            cy.get('button[data-cy="classes"]').click()
            cy.url().should('include', '/admin/classes')
        })
    })
})
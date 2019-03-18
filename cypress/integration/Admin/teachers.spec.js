describe('Admin / Teachers Test', function() {
    it('Adds new teacher', function() {
        cy.request('POST', 'http://localhost:8000/api/users/login', {
            username: 'admin',
            password: 'zaq1@WSX'
        }).then(response => {
            cy.setCookie('skarbnik_jwt', response.body.token)
            cy.setCookie('skarbnik_expires', 'Tue%20Mar%2029%202019%2023:47:54%20GMT+0100%20(Central%20European%20Standard%20Time)')
            window.localStorage.setItem('skarbnik_jwt', response.body.token)
            window.localStorage.setItem('skarbnik_jwt', 'Tue%20Mar%2029%202019%2023:47:54%20GMT+0100%20(Central%20European%20Standard%20Time)')
        })

        cy.visit('/')
        cy.visit('/admin/teachers')

        cy.contains('Dodaj nauczyciela').click()

        cy.get('input[aria-label="Imię i nazwisko"]')
            .type('fake@email.com')
            .should('have.value', 'fake@email.com')
    })
})
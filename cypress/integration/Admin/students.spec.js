describe('Admin / Student Test', function() {
    it('adds/edits/deletes new student', function() {
        cy.login('admin').then(() => { 
            cy.visit('/admin/students')

            cy.get('button[data-cy="add-student"]').click()

            cy.fixture('newStudent').then(student => {

                // add
                cy.get('input[data-cy="name"]')
                .type(teacher.name)
                .should('have.value', teacher.name)

                cy.get('input[data-cy="mail"]')
                .type(teacher.mail)
                .should('have.value', teacher.mail)

                cy.get('input[data-cy="login"]')
                .type(teacher.login)
                .should('have.value', teacher.login)

                cy.get('input[data-cy="password"]')
                .type(teacher.password)
                .should('have.value', teacher.password)

                cy.get('button[data-cy="submit"]').click()

                cy.get('button[data-cy="ok"]').click()
                // edit
                cy.contains('arrow_drop_down').click()
                cy.get('div.v-menu__content.theme--light.v-menu__content--auto.menuable__content__active > div > div > div:nth-child(4) > a > div > div')
                    .click();
                
                cy.contains(teacher.name).siblings('td[data-cy="crud"]')
                .children().contains('edit').click()

                cy.get('input[data-cy="name"]')
                .clear()
                .type(teacher.name + 'abcdefghi')
                .should('have.value', teacher.name + 'abcdefghi')

                cy.get('input[data-cy="mail"]')
                .clear()
                .type(teacher.mail.substr(3))
                .should('have.value', teacher.mail.substr(3))

                cy.get('input[data-cy="login"]')
                .clear()
                .type(teacher.login + '123')
                .should('have.value', teacher.login + '123')

                cy.get('button[data-cy="submit"]').click()
                cy.get('button[data-cy="ok"]').click()

                cy.contains(teacher.name + 'abcdefghi')
                cy.contains(teacher.mail.substr(3))
                cy.contains(teacher.login + '123')
                
                // delete
                cy.contains(teacher.name + 'abcdefghi').siblings('td[data-cy="crud"]')
                .children().contains('delete').click()

                cy.get('button[data-cy="ok"]').click()
            })
        })
    })
})
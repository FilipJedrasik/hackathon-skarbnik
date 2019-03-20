describe('Admin / Parents Test', function() {
    it('adds/edits/deletes new teacher', function() {
        cy.login('admin').then(() => { 
            cy.visit('/admin/parents')

            cy.get('button[data-cy="add-parent"]').click()

            cy.fixture('newParent').then(parent => {

                // add
                cy.get('input[data-cy="name"]')
                .type(parent.name)
                .should('have.value', parent.name)

                cy.get('input[data-cy="mail"]')
                .type(parent.mail)
                .should('have.value', parent.mail)

                cy.get('input[data-cy="login"]')
                .type(parent.login)
                .should('have.value', parent.login)

                cy.get('input[data-cy="password"]')
                .type(parent.password)
                .should('have.value', parent.password)

                cy.get('button[data-cy="submit"]').click()

                cy.get('button[data-cy="ok"]').click()
                // edit
                cy.contains('arrow_drop_down').click()
                cy.get('div.v-menu__content.theme--light.v-menu__content--auto.menuable__content__active > div > div > div:nth-child(4) > a > div > div')
                    .click();
                
                cy.contains(parent.name).siblings('td[data-cy="crud"]')
                .children().contains('edit').click()

                cy.get('input[data-cy="name"]')
                .clear()
                .type(parent.name + 'abcdefghi')
                .should('have.value', parent.name + 'abcdefghi')

                cy.get('input[data-cy="mail"]')
                .clear()
                .type(parent.mail.substr(3))
                .should('have.value', parent.mail.substr(3))

                cy.get('input[data-cy="login"]')
                .clear()
                .type(parent.login + '123')
                .should('have.value', parent.login + '123')

                cy.get('button[data-cy="submit"]').click()
                cy.get('button[data-cy="ok"]').click()

                cy.contains(parent.name + 'abcdefghi')
                cy.contains(parent.mail.substr(3))
                cy.contains(parent.login + '123')
                
                // delete
                cy.contains(parent.name + 'abcdefghi').siblings('td[data-cy="crud"]')
                .children().contains('delete').click()

                cy.get('button[data-cy="ok"]').click()
            })
        })
    })
})
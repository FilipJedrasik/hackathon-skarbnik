describe('Admin / Classes Test', function() {
    it('adds/edits/deletes new class', function() {
        cy.login('admin').then(() => { 
            cy.visit('/admin/classes')

            cy.get('button[data-cy="add-class"]').click()

            cy.fixture('newClass').then(cl => {

                // add
                cy.get('input[data-cy="name"]')
                .type(cl.name)
                .should('have.value', cl.name)

                cy.get('div[data-cy="supervisor"]')
                .find('div.v-input__append-inner')
                .contains('arrow_drop_down')
                .click()

                cy.contains(cl.supervisor).click()
                
                cy.get('button[data-cy="submit"]').click()
                cy.get('button[data-cy="ok"]').click()


                // edit
                cy.get('.v-datatable__actions')
                .contains('arrow_drop_down').click()
                cy.get('div.v-menu__content.theme--light.v-menu__content--auto.menuable__content__active > div > div > div:nth-child(4) > a > div > div')
                    .click();
                
                cy.contains(cl.name).siblings('td[data-cy="crud"]')
                .children().contains('edit').click()
               
                cy.get('input[data-cy="name"]')
                .clear()
                .type(cl.edit.name)
                .should('have.value', cl.edit.name)

                cy.get('div[data-cy="supervisor"]')
                .find('div.v-input__append-inner')
                .contains('arrow_drop_down')
                .click()

                cy.contains(cl.edit.supervisor).click()

                cy.get('button[data-cy="submit"]').click()
                cy.get('button[data-cy="ok"]').click()

                cy.contains(cl.edit.name)
                cy.contains(cl.edit.supervisor)
                
                // // delete
                cy.contains(cl.edit.name).siblings('td[data-cy="crud"]')
                .children().contains('delete').click()

                cy.get('button[data-cy="ok"]').click()
            })
        })
    })
})
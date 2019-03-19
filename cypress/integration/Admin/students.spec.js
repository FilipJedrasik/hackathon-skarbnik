describe('Admin / Student Test', function() {
    it('adds/edits/deletes new student', function() {
        cy.login('admin').then(() => { 
            cy.visit('/admin/students')

            cy.get('button[data-cy="add-student"]').click()

            cy.fixture('newStudent').then(student => {

                // add
                cy.get('input[data-cy="name"]')
                .type(student.name)
                .should('have.value', student.name)

                cy.get('div[data-cy="parents"]')
                .find('div.v-input__append-inner')
                .contains('arrow_drop_down')
                .click()

                cy.contains(student.parent).click()

                cy.get('div[data-cy="class"]')
                .find('div.v-input__append-inner')
                .contains('arrow_drop_down')
                .click()

                cy.contains(student.class).click()
                cy.get('button[data-cy="submit"]').click()
                cy.get('button[data-cy="ok"]').click()


                // edit
                cy.get('.v-datatable__actions')
                .contains('arrow_drop_down').click()
                cy.get('div.v-menu__content.theme--light.v-menu__content--auto.menuable__content__active > div > div > div:nth-child(4) > a > div > div')
                    .click();
                
                cy.contains(student.name).siblings('td[data-cy="crud"]')
                .children().contains('edit').click()
               
                cy.get('input[data-cy="name"]')
                .clear()
                .type(student.edit.name)
                .should('have.value', student.edit.name)

                cy.get('div[data-cy="parents"]')
                .find('div.v-input__append-inner')
                .contains('arrow_drop_down')
                .click()

                cy.contains(student.edit.parent).click()

                cy.get('div[data-cy="class"]')
                .find('div.v-input__append-inner')
                .contains('arrow_drop_down')
                .click()

                cy.contains(student.edit.class).click()
                cy.get('button[data-cy="submit"]').click()
                cy.get('button[data-cy="ok"]').click()

                cy.contains(student.edit.name)
                cy.contains(student.edit.class)
                cy.contains(student.edit.parent)
                
                // // delete
                cy.contains(student.edit.name).siblings('td[data-cy="crud"]')
                .children().contains('delete').click()

                cy.get('button[data-cy="ok"]').click()
            })
        })
    })
})
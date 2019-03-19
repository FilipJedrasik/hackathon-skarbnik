// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('login', role => {
    Cypress.log({
        name: `'Logging as ${role}'`
    })

    cy.fixture(`accounts/${role}`).then(user => {
        cy.request('POST', 'http://localhost:8000/api/users/login', {
            username: user.login,
            password: user.password
        }).then(response => {
            cy.setCookie('skarbnik_jwt', response.body.token)
            cy.setCookie('skarbnik_expires', 'Tue%20Mar%2029%202019%2023:47:54%20GMT+0100%20(Central%20European%20Standard%20Time)')
            window.localStorage.setItem('skarbnik_jwt', response.body.token)
            window.localStorage.setItem('skarbnik_expires', 'Tue%20Mar%2029%202019%2023:47:54%20GMT+0100%20(Central%20European%20Standard%20Time)')
        
            cy.visit('/')
        })
    })
})
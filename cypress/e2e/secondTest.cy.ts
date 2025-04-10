import {navigateTo} from "../support/page_objects/navigationPage";
import {onFormLayoutsPage} from "../support/page_objects/formLayoutsPage";

describe('Tapos: test', () => {

    //1
    beforeEach('Open tapost Angular app home page', () => {
        cy.visit('https://tapost.fly.dev/')
    })

    it('Submit online form with name and email ', () => {

        //2
        //3
        navigateTo.fromLayoutsPage()
        cy.fixture('userData.json').as('userData')
        // cy.get('@userData').then(data => {
        //     onFormLayoutsPage.submitInlineFormWithNameAndEmail(data.fullName, data.email)
        // })

        //onFormLayoutsPage.submitInlineFormWithNameAndEmail(userData.name, "testMail2@.lv")

        //config in cypress config file
         onFormLayoutsPage.submitInlineFormWithNameAndEmail(Cypress.env('fullName'), Cypress.env('email'))

    });

})
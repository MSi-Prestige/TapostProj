import * as string_decoder from "node:string_decoder";
import {navigateTo} from "../support/page_objects/navigationPage";

describe('template spec', () => {

    //steps before
    beforeEach('Open Url:', () => {
        cy.visit('https://tapost.fly.dev/')
    })

    it.only('passes', () => {

        //using this method from another class
        navigateTo.fromLayoutsPage()
        cy.contains('Sign in').click()

        cy.get('#inputEmail3').parents('form').find('button')
            .should('contain', 'Sign in')
            .click()
            .parents('form')
            .find('[status="warning"]')
            .click()

    });


    //===============================================================================

    it('Clean code with Aliases and Callback function', () => {

        //using this method from another class
        navigateTo.fromLayoutsPage()

        cy.contains('nb-card', 'Using the Grid')
            .find('[for="inputPassword2"]')
            .should('contain', 'Password')

        cy.contains('nb-card', 'Using the Grid')
            .find('[for="inputEmail1"]')
            .should('contain', 'Email')

        //const gridContainer = cy.contains('nb-card','Using the Grid')
        // gridContainer.find('[for="inputPassword2"]').should('contain', 'Password')
        // gridContainer.find('[for="inputEmail1"]').should('contain', 'Email')

        cy.contains('nb-card', 'Using the Grid').as('gridContainer')

        cy.get('@gridContainer').find('[for="inputPassword2"]').should('contain', 'Password')
        cy.get('@gridContainer').find('[for="inputEmail1"]').should('contain', 'Email')

        cy.contains('nb-card', 'Using the Grid').then(usingGrid => {
            cy.wrap(usingGrid).find('[for="inputPassword2"]').should('contain', 'Password')
        })
    });


//=====================================================================================


    it('Extracting text and attribute values', () => {
        cy.visit('https://tapost.fly.dev/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[for="exampleInputEmail1"]')
            .should('contain', 'Email address')

        cy.get('[for="exampleInputEmail1"]').then(value => {
            let extractedValue = value.text();
            expect(extractedValue).to.be.eq('Email address')

            cy.wrap(value).should("contain", "Email address")
        })

        cy.get('[for="exampleInputEmail1"]')
            .invoke('text')
            .should('contain', 'Email address')

        cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then(attribute => {
            expect(attribute).to.be.eq('label')
            cy.wrap(attribute).should('contain', 'label')
        })

        cy.get('#exampleInputEmail1')
            .type('hello@world.lv')
        cy.get('#exampleInputEmail1')
            .invoke('prop', 'value')
            .should('contain', 'hello@world.lv')
    });

//==================================================================================


    it('CheckBow and Radio buttons', () => {
        cy.visit('https://tapost.fly.dev/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').within(() => {
            cy.get('[type="radio"]').then(radioButtons => {
                cy.wrap(radioButtons).eq(0).check({force: true}).should('be.checked')
                cy.wrap(radioButtons).eq(1).check({force: true}).should('be.checked')
                cy.wrap(radioButtons).eq(0).should('not.be.checked')
            })
        })
    });

//==================================================================================

    it('Checkboxes ', () => {
        cy.visit('https://tapost.fly.dev/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        //type="checkbox
        cy.get('[type="checkbox"]').check({force: true})
        cy.get('[type="checkbox"]').uncheck({force: true})

        cy.get('[type="checkbox"]').eq(0).check({force: true}).should('be.checked')
    });

//==================================================================================

    it('List of dropdowns ', () => {
        cy.visit('https://tapost.fly.dev/')

        cy.get('nav nb-select').click()
        cy.get('.option-list').contains('Dark').click()
        cy.get('nav nb-select').should('contain', 'Dark')

        //How to iterate through all colour scheme
        cy.get('nav nb-select').then(dropDown => {
            cy.wrap(dropDown).click()
            cy.get('.option-list nb-option').each(element => {
                const itemText = element.text().trim()
                cy.wrap(element).click()
                cy.wrap(dropDown).should('contain', itemText)
                console.log('My debug console')
                cy.log("my debug")
                cy.get('nav nb-select').click()
            })
        })
    });

//==================================================================================

    it('Theme work', () => {
        cy.visit('https://tapost.fly.dev/')

        cy.get('nav nb-select').click()
        cy.get('.option-list').contains('Dark').click()
        cy.get('nav nb-select').should('contain', 'Dark')

        //How to iterate through all colour scheme
        cy.get('nav nb-select').then(dropDown => {
            cy.wrap(dropDown).click()
            cy.get('.option-list nb-option').each(element => {
                const itemText = element.text().trim()
                cy.wrap(element).click()
                cy.wrap(dropDown).should('contain', itemText)
                console.log('My debug console')
                cy.log("my debug")
                cy.get('nav nb-select').click()
            })
        })
    });


//==================================================================================

    it('Tables work', () => {
        cy.visit('https://tapost.fly.dev/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        const age = [20, 30, 40, 200]

        cy.wrap(age).each(age => {
            // @ts-ignore
            cy.get('input[placeholder="Age"]').clear().type(age)
            cy.wait(1000)
            cy.get('tbody tr').each(row => {
                // @ts-ignore
                if (age == 200) {
                    cy.wrap(row).should("contain", 'No data found')
                } else {
                    cy.wrap(row).find('td').eq(6).should("contain", age)
                }
            })
        })
    })




})
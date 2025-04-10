export class NavigationPage {
    fromLayoutsPage(){
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
    }
}
export const navigateTo = new NavigationPage()
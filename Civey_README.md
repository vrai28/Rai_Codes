describe('Register', () => {
  it('test1-verify title-Positive test', () => {
    
    cy.visit("https://qa-interview.app.omni.one/login/pro")

    cy.get('.button-module__button__Z8rEw.button-navbar-module__navbar__a9QhH').click();

    cy.wait(2000)

    cy.get("input[placeholder='Max Mustermann']").type("Vibha Rai");

    cy.get("input[placeholder='pro@civey.com']").type("vibhalakshmi.rai@gmail.com");

    cy.get(".textarea-module__textarea__2Ylyu").type("testing");

    cy.wait(2000)

    cy.get("button[type='submit']").click();




  })

  it('test1-verify title-Negative test', () => {
    
    cy.visit("https://qa-interview.app.omni.one/login/pro")

    cy.title().should('eq','Willkommen bei Civey12')
  })

}) 

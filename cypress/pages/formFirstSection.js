class lsgForm {
    // Define selectors for elements
    mutationCheckboxOne = 'div>label[for="mutationRecodType1"]';
    mutationCheckboxTwo = 'div>label[for="mutationFormulaType-1"]';
    mutationThirdSection = 'div>input[id="applicant_insert_type_single"]';
    // addInfoButton = 'button[id="single_grohita_modal_open0"]'; // Button inside the div
    // adultSelection = 'input[name="applicantType_0_1"]';  // Fixed the selector for adult selection
  
    // Form submission function
    formFirstSection() {
      // Wait for the element to be visible and then click
      cy.get(this.mutationCheckboxOne, { timeout: 10000 }).should('be.visible').click(); // Click first checkbox
      cy.get(this.mutationCheckboxTwo, { timeout: 10000 }).should('be.visible').click(); // Click second checkbox
      cy.wait(5000)
      
      // Reload the page before interacting with mutationThirdSection
      // cy.reload();
      // cy.wait(5000); // Wait briefly for the page to reload
      
      // Ensure the third section is clickable and visible, then click
      cy.get(this.mutationThirdSection, { timeout: 10000 }).should('be.visible').click({ force: true });
      cy.wait(1000); // Adjust the wait as needed for the next actions
      cy.get(this.addInfoButton).should('be.visible').click();
    
      
    //   // Make sure adult selection is interactable
    //   cy.get(this.adultSelection).should('be.visible').click();  // Clicking the adult selection element
    }
}

module.exports = new lsgForm();

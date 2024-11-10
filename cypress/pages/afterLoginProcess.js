class afterLoginProcess {
    applicationList = 'div[class="d-flex"] > a[href="/citizen-application-list"]';
    viewButton = 'button[id="manage_application_btn"]';
  
    afterloginProcess() {
      // Increase timeout and use force if necessary
      cy.get(this.applicationList, { timeout: 10000 }).should('be.visible').click();
      
      // Use a wait before clicking the view button to ensure the page is fully loaded
      cy.wait(1000); // Adjust the time as needed
  
      // Click the view button
      cy.get(this.viewButton).contains('পদক্ষেপ নিন').click();
    }
  }
  
  module.exports = new afterLoginProcess();
  
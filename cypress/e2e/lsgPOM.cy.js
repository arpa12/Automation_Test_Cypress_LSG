import login from "../pages/login"; // Import the login page object
import afterLoginProcess from "../pages/afterLoginProcess"; // Import the after-login process
import formFirstSection from "../pages/formFirstSection"; // Import the form first section process

describe('Land User Login and Navigation', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      // Ignore specific known exceptions
      if (err.message.includes("Identifier 'widget' has already been declared") ||
          err.message.includes("Identifier 'openNidModal' has already been declared") ||
          err.message.includes("Cannot read properties of null (reading 'addEventListener')")) {
        return false; // Ignore these exceptions to prevent test failure
      }
      return true; // Handle other exceptions normally
    });
  });

  // Test case 1: Log in and navigate to New Application
  it('log in to the system ', () => {
    cy.visit('https://lsg-land-owner-stage.land.gov.bd/login'); // Visit the login page
    login.login(); // Perform login
  });

  // Test case 2: Log in and navigate to Application History
  it('navigates to application history', () => {
    cy.visit('https://lsg-land-owner-stage.land.gov.bd/login'); // Visit the login page
    login.login(); // Perform login
    afterLoginProcess.afterloginProcess(); // Perform post-login actions
  });

  // Test case 3: Log in and navigate to Profile Settings
  it('navigates to Profile Settings', () => {
    cy.visit('https://lsg-land-owner-stage.land.gov.bd/login'); // Visit the login page
    login.login(); // Perform login
    afterLoginProcess.afterloginProcess(); // Perform post-login actions
    formFirstSection.formFirstSection(); // Navigate to New Application section
  });
});


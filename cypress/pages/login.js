class Login {
  // Define selectors for elements
  loginMobileNumber = 'div > .col-9.relative input';
  loginPassword = 'div > input[id="see-password"]';
  captchaTextField = 'div > [id="txtInput"]';
  loginButton = 'button.btn.btn-secondary.w-100.reg_btn.mb-3';
  captchaText = 'div > [id="mainCaptcha"]';
  mutationLink = 'div > a[href="https://stage-mutation.land.gov.bd/sso/login"]'

  // Login function
  login() {
    // Wait for the page to load and enter the user ID
    cy.get(this.loginMobileNumber)
      .should('be.visible')
      .type('1563000030');

    // Enter the password
    cy.get(this.loginPassword)
      .should('be.visible')
      .type('121212qaA@');

    // Capture the CAPTCHA code dynamically and enter it
    cy.get(this.captchaText)
      .invoke('text')
      .then((captchaText) => {
        const cleanedCaptcha = captchaText.trim(); // Remove any extra spaces if present
        cy.get(this.captchaTextField)
          .should('be.visible')
          .type(cleanedCaptcha);
      });

    // Click the login button
    cy.get(this.loginButton)
      .contains('লগইন করুন')
      .should('be.visible')
      .click({ force: true });

    // Wait for the potential redirection to complete
    cy.wait(3000);

    // Check for CAPTCHA failure and retry if necessary
    cy.get('body').then(($body) => {
      if ($body.text().includes('CAPTCHA failed')) {
        // Reload and reattempt login on CAPTCHA failure
        cy.reload();
        cy.wait(5000);

        // Re-enter user ID and password
        cy.get(this.loginMobileNumber)
          .should('be.visible')
          .clear()
          .type('1924489215');
        cy.get(this.loginPassword)
          .should('be.visible')
          .clear()
          .type('Arpa@123');

        // Re-capture and enter CAPTCHA
        cy.get(this.captchaText)
          .invoke('text')
          .then((retryCaptchaText) => {
            const retryCaptcha = retryCaptchaText.trim();
            cy.get(this.captchaTextField)
              .should('be.visible')
              .clear()
              .type(retryCaptcha);
          });

        // Click the login button again
        cy.get(this.loginButton)
          .contains('লগইন করুন')
          .should('be.visible')
          .click({ force: true });
      }
    });

    // Wait after login attempt to ensure page navigation completes
    cy.wait(3000);

    // Click the "মিউটেশন" link to proceed
    cy.get(this.mutationLink)
      .contains('মিউটেশন')
      .should('be.visible')
      .click();
  }
}

module.exports = new Login();

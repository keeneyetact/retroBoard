describe('Home Page', () => {
  it('Should load correctly', () => {
    cy.visit('/');

    cy.wait(+Cypress.env('backend_delay'));
  
    cy.get('#content').get('h1').should('contain', 'Welcome!');
  });
});


function get(name, rest) {
  return cy.get(`[data-cy=${name}]${rest ?? ''}`);
}



describe('Post workflow', () => {
  it('Should login and write a post', () => {
    cy.visit('/');

    // We need to wait until the backend is ready
    cy.wait(+Cypress.env('backend_delay'));

    // Close cookie banner
    cy.get('.wpcc-btn').click();
    
    get('anon-tab').click();
    get('anon-input').focus().type('Zelensky');
    get('anon-login-button').click();

    // Home page should display the user name
    cy.get('#content').should('contain', 'Welcome, Zelensky');

    // And then allow creating a new session
    get('new-session-button').click();

    // And write a post
    get('column-input').first().focus().type('Slava Ukraini!{enter}');

    // Reload the page
    cy.reload();

    cy.wait(+Cypress.env('backend_delay'));

    // The post should still be there
    cy.get('#content').should('contain', 'Slava Ukraini!');
  });

  it('Should change language and translate the app', () => {
    cy.visit('/');

    cy.wait(+Cypress.env('backend_delay'));

    // Close cookie banner
    cy.get('.wpcc-btn').click();

    get('anon-tab').click();
    get('anon-input').focus().type('Zelensky');
    get('anon-login-button').click();

    // Home page should display the user name
    cy.get('#content').should('contain', 'Welcome, Zelensky');

    // Change language
    get('side-panel-toggle').click();
    get('language-picker').click();
    get('language-picker-item-fr-FR').click();

    // Exit panel
    cy.get('body').type('{esc}');

    // Home page should now be in French
    cy.get('#content').should('contain', 'Bienvenue, Zelensky');

    // Logout
    get('account-menu').click();
    get('account-menu-logout').click();

  });

  it('Should be able to create a new account', () => {
    cy.session('create-account', () => {
      const id = Date.now();

      cy.visit('/');

      cy.wait(+Cypress.env('backend_delay'));

      // Close cookie banner
      cy.get('.wpcc-btn').click();

      // Select the account tab
      get('account-tab').click();

      // Select register
      get('register').click();

      // Add some data
      get('register-name').type('V Zelensky');
      get('register-email').type(`vlad.zelensky.${id}@ukraine.ua`);
      get('register-password').type('A-str0ng-Pa33!çà');

      // Register
      get('register-button').click();

      // Create a new session, and add some messages
      get('new-session-button').click();

      // And write a post
      get('column-input').first().focus().type('Slava Ukraini!{enter}');
      cy.get('#content').should('contain', 'Slava Ukraini!');

      // And some chat
      get('open-chat-button').click({force: true});
      get('chat-input').focus().type('This is a message{enter}');
      cy.get('#content').should('contain', 'This is a message');
    
      // Close
      get('open-chat-button').click({force: true});
    });
  });

  it('Should be able to delete an account', () => {
    cy.session('delete-account', () => {
      const id = Date.now();

      cy.visit('/');

      cy.wait(+Cypress.env('backend_delay'));

      // Close cookie banner
      cy.get('.wpcc-btn').click();

      // Select the account tab
      get('account-tab').click();

      // Select register
      get('register').click();

      // Add some data
      get('register-name').type('V Zelensky');
      get('register-email').type(`vlad.zelensky.${id}@ukraine.ua`);
      get('register-password').type('A-str0ng-Pa33!çà');

      // Register
      get('register-button').click();

      cy.wait(+Cypress.env('backend_delay'));

      // Go to the user admin and delete the account
      get('account-menu').click();
      get('account-menu-account').click();
      get('delete-account-button').click();
      get('delete-modal-sessions').click();
      get('delete-modal-posts').click();
      get('delete-modal-votes').click();
      get('delete-modal-delete-button').click();
      get('delete-modal-confirm').click();

      // We should be back to the home page
      cy.get('body').get('h1').should('contain', 'Welcome!');
    });
  });
});

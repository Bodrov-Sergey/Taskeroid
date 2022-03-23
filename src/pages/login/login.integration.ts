// describe('Login', () => {
//   it('should render error', () => {
//     cy.intercept('POST', '/login', { status: 'Error' });

//     cy.visit('/login');
//     cy.dataCy('loginEmail').type('test@test.com');
//     cy.dataCy('loginPassword').type('test');
//     cy.dataCy('loginSubmit').click();
//     cy.dataCy('loginError')
//       .should('exist')
//       .should('contain.text', 'Incorrect email or password');
//   });
// });

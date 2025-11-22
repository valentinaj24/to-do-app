// cypress/e2e/auth.cy.js

describe('Login / Registration', () => {
    const baseUrl = 'http://localhost:3000';

    it('AUTH-001: uspešna registracija novega uporabnika', () => {
        const timestamp = Date.now();
        const email = `test${timestamp}@example.com`;

        // 1. Open /register
        cy.visit(`${baseUrl}/register`);

        // 2. Enter valid details
        cy.get('input[placeholder="Name"]').clear().type('Test');
        cy.get('input[placeholder="Email"]').clear().type(email);
        cy.get('input[placeholder="Password"]').clear().type('Passw0rd!');

        // 3. Click 'Register'
        cy.contains('button', 'Register').click();

        //  Expected: User is registered and redirected to Login/Dashboard.

        cy.url().should('include', '/login');

        // dodatna potvrda da smo na login strani
        cy.contains('h2', 'Login').should('be.visible');
    });

    it('AUTH-002: registracija s že obstoječim emailom', () => {
        const existingEmail = 'test1763812538062@example.com';

        cy.visit(`${baseUrl}/register`);

        // Unesi podatke
        cy.get('input[placeholder="Name"]').clear().type('Existing');
        cy.get('input[placeholder="Email"]').clear().type(existingEmail);
        cy.get('input[placeholder="Password"]').clear().type('Passw0rd!');

        // Klik Register
        cy.contains('button', 'Register').click();

        // EXPECTED RESULT:
        // Sistem treba prikazati error i NE preusmeriti na /login

        // 1. korisnik ostaje na istoj strani (nije redirect)
        cy.url().should('include', '/register');

        // 2. prikazuje se error poruka iz frontend-a
        cy.contains('Error registering user').should('be.visible');
    });

    it('AUTH-003: uspešen login z veljavnimi poverilnicami', () => {
        const baseApi = 'http://localhost:8080';
        const email = `login${Date.now()}@example.com`;
        const password = 'Passw0rd!';

        cy.request('POST', `${baseApi}/api/users/save`, {
            name: 'Login User',
            email,
            password
        });

        // 1. Open /login
        cy.visit(`${baseUrl}/login`);

        // 2. Enter valid email & password
        cy.get('input[placeholder="Email"]').clear().type(email);
        cy.get('input[placeholder="Password"]').clear().type(password);

        // 3. Click 'Login'
        cy.contains('button', 'Login').click();

        // Expected: Redirect to dashboard; session stored.
        cy.url().should('include', '/dashboard');
    });

    it('AUTH-004: login z napačnim geslom', () => {
        const baseApi = 'http://localhost:8080';
        const email = `wrongpass${Date.now()}@example.com`;
        const correctPassword = 'Passw0rd!';
        const wrongPassword = 'wrongpass';

        cy.request('POST', `${baseApi}/api/users/save`, {
            name: 'Wrong Pass User',
            email,
            password: correctPassword
        });

        // 1. Open /login
        cy.visit(`${baseUrl}/login`);

        // 2. Vnesemo pravi email, ampak napačno geslo
        cy.get('input[placeholder="Email"]').clear().type(email);
        cy.get('input[placeholder="Password"]').clear().type(wrongPassword);

        // 3. Click 'Login'
        cy.contains('button', 'Login').click();

        //  Expected:
        // - prikazana je napaka

        cy.url().should('include', '/login');

        cy.get('.message')
            .should('be.visible')
            .and('contain', 'Error logging in. Please try again.');
    });

});

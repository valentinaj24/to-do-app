// cypress/e2e/tasks.cy.js

describe('Tasks (CRUD + Complete)', () => {
    const baseUrl = 'http://localhost:3000';
    const baseApi = 'http://localhost:8080';

    let testUser;
    let categoryId;
    let testEmail;
    let testPassword;

    before(() => {
        testEmail = `taskuser${Date.now()}@example.com`;
        testPassword = 'Passw0rd!';

        // 1) kreiramo user-a
        cy.request('POST', `${baseApi}/api/users/save`, {
            name: 'Task User',
            email: testEmail,
            password: testPassword,
        }).then((res) => {
            testUser = res.body; // { id, ... }
        });

        // 2) povučemo jednu kategoriju (za sve testove)
        cy.request('GET', `${baseApi}/api/categories`).then((res) => {
            expect(res.body.length).to.be.greaterThan(0);
            categoryId = res.body[0].id;
        });
    });

    beforeEach(() => {
        // 1) odemo na login
        cy.visit(`${baseUrl}/login`);

        // 2) ulogujemo se kao naš test user
        cy.get('input[placeholder="Email"]').clear().type(testEmail);
        cy.get('input[placeholder="Password"]').clear().type(testPassword);
        cy.contains('button', 'Login').click();

        // 3) potvrdimo da smo na dashboard-u
        cy.url().should('include', '/dashboard');

        // 4) u sidebaru kliknemo na "Tasks"
        // (ako je to <Link> sa tekstom Tasks – što se po slici vidi)
        cy.contains('a', 'Tasks').click();

        // 5) sada očekujemo da vidimo naslov na Tasks strani
        cy.contains('h2', 'Manage Your Tasks').should('be.visible');
    });

    // ---------------- TASK-001 ----------------
    it('TASK-001: dodajanje veljavne naloge', () => {
        const today = new Date().toISOString().split('T')[0];
        const title = `Task 1 - ${Date.now()}`;

        // Polje za naslov naloge
        cy.get('input[placeholder="Enter a new task"]')
            .clear()
            .type(title);

        // Datum
        cy.get('input[type="date"]').type(today);

        // Kategorija (value je ID kategorije)
        cy.get('select.task-category-input').select(categoryId.toString());

        // Gumb "Add Task"
        cy.contains('button', 'Add Task').click();

        // Expected: Task se pojavi v listi
        cy.contains('li', title).should('be.visible');
    });

    // ---------------- TASK-002 ----------------
    it('TASK-002: prazen naslov naloge - pokaže se validacija, naloga se ne doda', () => {
        const today = new Date().toISOString().split('T')[0];

        // Stub za window.alert (ker tvoj kôd kliče alert("Please fill all fields!"))
        cy.window().then((win) => {
            cy.stub(win, 'alert').as('alert');
        });

        // Pustimo naslov prazen
        cy.get('input[placeholder="Enter a new task"]').clear();

        // Izpolnimo ostala polja, da bo res manjkalo samo "title"
        cy.get('input[type="date"]').type(today);
        cy.get('select.task-category-input').select(categoryId.toString());

        // Klik "Add Task"
        cy.contains('button', 'Add Task').click();

        //  Expected: pokliče se alert z ustreznim sporočilom
        cy.get('@alert').should('have.been.called');
        cy.get('@alert')
            .its('firstCall.args.0')
            .should('contain', 'Please fill all fields');
    });

    // ---------------- TASK-003 ----------------
    it("TASK-003: naloga postane 'Completed' in taka ostane po reloadu (API nivo)", () => {
        const today = new Date().toISOString().split('T')[0];
        const title = `Complete me - ${Date.now()}`;

        // 1) Ustvarimo nalogo z completed=false
        cy.request(
            'POST',
            `${baseApi}/api/tasks/save?userId=${testUser.id}`,
            {
                text: title,
                due: today,
                category: { id: categoryId },
                completed: false,
            }
        ).then((res) => {
            const taskId = res.body.id;

            // 2) Označimo kot completed = true
            cy.request('PUT', `${baseApi}/api/tasks/update/${taskId}`, {
                text: title,
                due: today,
                category: { id: categoryId },
                completed: true,
            });

            // 3) Ponovno preberemo nalogo in preverimo, da je completed ostal true
            cy.request('GET', `${baseApi}/api/tasks/${taskId}`).then((res2) => {
                expect(res2.body.completed).to.be.true;
            });
        });
    });

    // ---------------- TASK-004 ----------------
    it('TASK-004: brisanje naloge - naloga izgine iz seznama', () => {
        const today = new Date().toISOString().split('T')[0];
        const title = `Task to delete - ${Date.now()}`;

        // 1) Ustvarimo nalogo prek API-ja za našega user-ja
        cy.request(
            'POST',
            `${baseApi}/api/tasks/save?userId=${testUser.id}`,
            {
                text: title,
                due: today,
                category: { id: categoryId },
                completed: false,
            }
        ).then(() => {
            // 2) Ponovno odpremo /tasks z nastavljenim localStorage user-jem
            cy.visit(`${baseUrl}/tasks`, {
                onBeforeLoad(win) {
                    win.localStorage.setItem('user', JSON.stringify(testUser));
                },
            });

            // Za lažje iskanje lahko uporabimo search bar
            cy.get('input[placeholder="Search tasks..."]')
                .clear()
                .type(title);

            // 3) Poiščemo <li> z našim naslovom in kliknemo "Delete"
            cy.contains('li', title)
                .should('be.visible')
                .within(() => {
                    cy.contains('button', 'Delete').click();
                });

            // 4) Expected: naloga ni več prisotna v seznamu
            cy.contains('li', title).should('not.exist');
        });
    });
});

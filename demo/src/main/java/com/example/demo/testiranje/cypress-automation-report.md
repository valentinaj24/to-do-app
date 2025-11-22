# Naloga – Avtomatizacija testiranja s Cypress

**Avtor:** Valentina Jovanović  
**Projekt:** To-Do App  
**Orodje:** Cypress 15.7  
**Okolje:** Windows 11, Chrome, Backend (Spring Boot, JDK 21, MySQL), Frontend (React)

---

## Opis naloge

Cilj naloge je bil, da obstoječe ročne testne primere (test case-i v datoteki **Test_Cases.xlsx**) za aplikacijo To-Do App avtomatiziram z uporabo orodja **Cypress**.

Avtomatizacija zajema naslednje funkcionalnosti:

- **modul AUTH:** registracija in prijava uporabnika
- **modul TASKS:** dodajanje, validacija, brisanje in sprememba stanja nalog

Za modul **REMINDER** so bili testni primeri izvedeni ročno, saj UI ne prikazuje opomnikov in zato ni primeren za E2E avtomatizacijo.

---

## Tehnološki sklad

- **Backend:** Spring Boot (JDK 21), REST API, povezava na MySQL
- **Frontend:** React (Create React App), React Router
- **Testno orodje:** Cypress 15.7
- **Brskalnik:** Chrome

---

# Namestitev in zagon Cypress-a

## Namestitev

V mapi `frontend` sem Cypress namestila kot razvojno odvisnost:

```bash
    cd frontend
    npm install --save-dev cypress
```

V `package.json` sem dodala npm skripte:

```md
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject",
  "cypress:open": "cypress open",
  "cypress:run": "cypress run"
}
```

---

## Zagon Cypress 

```bash
    cd frontend
    npm run cypress:open
```

**Postopek:**

1. Izberem **E2E Testing**
2. Izberem brskalnik (Chrome)
3. Cypress pripravi strukturo `cypress/e2e`
4. Izberem testne fajle:
    - `auth.cy.js`
    - `tasks.cy.js`

---


## Predpogoji za uspešen zagon testov

### Backend (Spring Boot)
http://localhost:8080  
Zagon:
```bash
    mvn spring-boot:run
```

### Frontend (React)
http://localhost:3000  
Zagon:
```bash
    npm start
```

Če backend ali frontend ne delujeta → Cypress testov ni mogoče uspešno izvesti.

---

# Avtomatizirani testni sklopi

Avtomatizacijo sem izvedla na podlagi obstoječih ročnih testnih primerov v Test_Cases.xlsx.

- **Test Steps** → Cypress ukazi (`cy.visit`, `cy.get`, `cy.type`, `cy.click`, `cy.request`, …)
- **Expected Result** → `should`, `expect`, preverjanje URL-jev in elementov

---

# AUTH-SET – registracija in prijava

**Datoteka:** `frontend/cypress/e2e/auth.cy.js`

Avtomatizirani testni primeri:

1. AUTH-001 – uspešna registracija
2. AUTH-002 – registracija z obstoječim e-mailom
3. AUTH-003 – uspešen login
4. AUTH-004 – neuspešen login

---

## AUTH-001 – Uspešna registracija

### Cilj
Preveriti, da se uporabnik uspešno registrira in preusmeri na `/login`.

### Povzetek Cypress testa
- `cy.visit('/register')`
- Izpolni Name, Email, Password
- Klikne **Register**
- Preveri URL `/login` in naslov *Login*

---

## AUTH-002 – Registracija z obstoječim e-mailom

### Cilj
Preveriti pravilno validacijo pri že obstoječem e-mailu.

### Povzetek
- `cy.visit('/register')`
- Izpolni formo z obstoječim e-mailom
- Preveri:
    - da ostane `/register`
    - prikaže se *"Error registering user. Please try again."*

---

## AUTH-003 – Uspešen login

### Povzetek
- `cy.visit('/login')`
- Izpolni email + password
- Preveri `/dashboard`

---

## AUTH-004 – Neuspešen login

### Povzetek
- Napačno geslo
- Ostane na `/login`
- Prikaže se napaka: *"Error logging in. Please try again."*

---

# TASK-SET – upravljanje nalog

**Datoteka:** `frontend/cypress/e2e/tasks.cy.js`

Avtomatizirani scenariji:

1. TASK-001 – dodajanje veljavne naloge
2. TASK-002 – dodajanje brez naslova
3. TASK-003 – sprememba stanja v Completed
4. TASK-004 – brisanje naloge

---

## TASK-001 – Dodajanje veljavne naloge

### Povzetek
- Izpolni:
    - Enter a new task
    - Datum
    - Kategorijo
- Klikne Add Task
- Preveri, da je naloga v seznamu

---

## TASK-002 – Dodajanje naloge brez naslova

### Povzetek
- Pusti prazen naslov
- Izpolni ostalo
- Klikne Add Task
- Preveri alert: **"Please fill all fields!"**

---

## TASK-003 – Označevanje naloge kot Completed

### Povzetek
UI nima vizualne oznake → test preko API:

- `cy.request` ustvari nalogo (completed: false)
- `PUT /api/tasks/update/{id}` → completed = true
- `GET /api/tasks/{id}` preveri completed == true

---

## TASK-004 – Brisanje naloge

### Povzetek
- Ustvari nalogo prek API
- Najde nalogo
- Klikne Delete
- Preveri, da ne obstaja več

---

# REMINDER-SET – ročni testni primeri

UI NE prikazuje opomnikov → **ni avtomatizacije**.

Rezultati:

| Test | Rezultat |
|------|----------|
| REMINDER-001 | FAIL |
| REMINDER-002 | FAIL |

Razlog:  
Frontend **ne preverja časa opomnikov** in **ne prikazuje obvestil**, čeprav backend pravilno shrani podatke.

Napaka opisana v BUG reportu.

---

# Povzetek rezultatov

| Testni sklop | Št. testov | Avtomatizirani | PASS | FAIL |
|--------------|------------|----------------|------|------|
| AUTH | 4 | Da | 4 | 0 |
| TASKS | 4 | Da | 4 | 0 |
| REMINDER | 2 (ročni) | Ne | 0 | 2 |

---

# Zaključek

Avtomatizacija testiranja s Cypress-om je uspešno potrdila:

- pravilno delovanje AUTH modulov,
- vso funkcionalnost upravljanja nalog (CRUD),
- pravilno komunikacijo frontend ↔ backend.

Modul Reminder **ni primeren za avtomatizacijo**, ker UI ne prikazuje opomnikov.


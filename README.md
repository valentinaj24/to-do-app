# To-Do App (Valentina Jovanovic, Andjelina Jelenic, Lazar Cvorovic)
To-Do Aplikacija je spletna aplikacija za upravljanje nalog, ki omogoča uporabnikom organizacijo in sledenje njihovih dnevnih opravil. Aplikacija uporabniku omogoča ustvarjanje nalog, urejanje, brisanje in označevanje nalog kot dokončanih. Poleg tega aplikacija vključuje funkcionalnosti, kot so kategorije za boljšo organizacijo nalog, možnost pisanja zapiskov in statistiko dokončanih nalog. Vključuje tudi koledar, kjer lahko uporabniki vidijo svoje naloge po datumih.

### Ključne funkcionalnosti:
- Ustvarjanje, urejanje, brisanje in iskanje nalog.
- Razvrščanje nalog po kategorijah.
- Dodajanje zapiskov.
- Pregled statistike dokončanih in nedokončanih nalog.
- Koledar za vizualni pregled nalog po datumih.
- Prijava in registracija uporabnikov.

### Struktura projekta
Projekt je razdeljen na dva glavna dela:
1. **Backend** - Uporablja **Spring Boot** za obdelavo podatkov, kjer imamo naslednje komponente:
   - **Controllers**: Zajemajo `CategoryController`, `NoteController`, `TaskController`, `UserController` za upravljanje kategorij, zapiskov, nalog in uporabnikov.
   - **Models**: Vključujejo entitete `Category`, `Note`, `Task`, `User`.
   - **Repositories**: `CategoryRepository`, `NoteRepository`, `TaskRepository`, `UserRepository` za komunikacijo z bazo podatkov.
   - **Services**: Logika aplikacije, razdeljena po kategorijah, zapiskih, nalogah in uporabnikih.

2. **Frontend** - Razvito v **Reactu** s sledečo strukturo:
   - **Components**: Vsebuje različne komponente za uporabniški vmesnik, kot so `Dashboard`, `Home`, `Login`, `Profile`, `Register`, `Sidebar`, `Tasks`.
   - Za vsako komponento obstaja CSS datoteka, ki skrbi za stilizacijo.

### Standardi kodiranja

#### Backend

Koda je napisana v jeziku Java z uporabo ogrodja Spring Boot. Vsi API-ji sledijo REST načelom, kar omogoča enostavno povezovanje in razširljivost aplikacije. Vsaka endpoint metoda sledi konvencijam HTTP metod:
- `GET` za pridobivanje podatkov
- `POST` za ustvarjanje
- `PUT` ali `PATCH` za posodobitev
- `DELETE` za brisanje

Vsi odzivi so strukturirani v JSON formatu, kar zagotavlja enotno komunikacijo med strežnikom in odjemalcem. Razredi in metode so poimenovani v skladu s konvencijami in opremljeni s komentarji za boljše razumevanje funkcionalnosti. Implementirana je tudi obdelava napak, kar omogoča natančne povratne informacije v primeru neuspeha operacij.

#### Frontend

Koda je pisana v JavaScriptu z uporabo knjižnice ReactJS za gradnjo uporabniškega vmesnika. Struktura komponent je modularna, vsaka komponenta pa je ločena v lastni datoteki znotraj mape `components`, kar omogoča ponovno uporabo in večjo berljivost kode. 

Komponente sledijo vzorcu funkcijskega programiranja in uporabljajo hooks, kot sta `useState` in `useEffect`, za obdelavo stanja in življenjskega cikla. Standardi za poimenovanje komponent in spremenljivk sledijo konvenciji camelCase, kar omogoča doslednost in enostavno vzdrževanje kode.

### Orodja in verzije
- **Backend**: 
  - Spring Boot 2.5+
  - Maven za upravljanje odvisnosti
  - MySQL za bazo podatkov
- **Frontend**:
  - ReactJS 18+
  - NodeJS 16+
  - CSS za stilizacijo

## Navodila za nameščanje

### Backend
1. Klonirajte repozitorij: 
   ```bash
   git clone https://github.com/valentinaj24/to-do-app
2. Prepričajte se, da imate nameščen Java 11+ in MySQL.
3. Ustvarite MySQL bazo podatkov z imenom todo
4. V datoteki application.properties prilagodite nastavitve baze:
   ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/todo
    spring.datasource.username=your_username
    spring.datasource.password=your_password
5. Zaženite aplikacijo z Maven:
   ```bash
   mvn spring-boot:run
### Frontend

1. Pojdite v direktorij frontend:
   ```bash
   cd frontend
2. Namestite odvisnosti:
    ```bash
   npm install
3. Zaženite React aplikacijo:
   ```bash
   npm start

## Navodila za razvijalce

### Prispevanje

1. Ustvarite kopijo repozitorija.
2. Ustvarite novo vejo za vašo funkcionalnost:
   ```bash
   git checkout -b ime-funkcionalnosti
3. Opravite spremembe in naredite commit:
   ```bash
   git commit -m "Dodana nova funkcionalnost"
4. Pošljite pull request za pregled.
    ```bash
   git pull

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

## Vizija projekta

To-Do Aplikacija je namenjena izboljšanju organizacije in produktivnosti uporabnikov pri vsakodnevnem upravljanju nalog. S to aplikacijo želimo uporabnikom omogočiti enostaven in intuitiven način sledenja in organizacije njihovih opravil, ki zajemajo vse od enostavnih vsakodnevnih opravil do kompleksnejših projektov. Cilj aplikacije je postati nepogrešljivo orodje za vsakogar, ki želi učinkovito načrtovati svoje obveznosti in slediti svojemu napredku.

Naša vizija je, da aplikacija uporabnikom omogoča več kot zgolj seznam nalog. Z dodatnimi funkcionalnostmi, kot so kategorizacija nalog, pisanje osebnih zapiskov in vizualni prikaz statistike dokončanih nalog, uporabniki pridobijo globlji vpogled v svoj način dela in napredek. Aplikacija vključuje tudi koledar, ki omogoča pregled nalog po datumih, kar uporabnikom pomaga pri dolgoročnem načrtovanju in postavljanju prioritet.

S tem projektom želimo:

- Omogočiti organizacijo nalog na preprost in pregleden način.
- Spodbuditi uporabnike k učinkovitemu načrtovanju časa in virov.
- Pomagati uporabnikom zmanjšati stres, povezan z upravljanjem obveznosti.
- Podpreti osebni in profesionalni napredek s funkcionalnostmi, ki omogočajo sledenje dosežkom in optimizacijo procesa.

Aplikacija je namenjena vsem, ki se želijo organizirati, pa tudi podjetjem ali ekipam, ki bi lahko želele centralizirano orodje za spremljanje nalog in projektov. Naš dolgoročni cilj je aplikacijo razvijati v smeri prilagodljivega orodja, ki bo ponujalo rešitve za različne tipe uporabnikov in omogočalo prilagoditev delovnih tokov njihovim specifičnim potrebam.

## Besednjak

| Pojem                    | Opis                                                                                                    |
|--------------------------|---------------------------------------------------------------------------------------------------------|
| **Nalog**                | Posamezno opravilo, ki ga uporabnik vnese v aplikacijo. Vsak nalog lahko vsebuje naslov, opis, rok za dokončanje in status.  |
| **Kategorija**           | Skupina nalog, ki omogoča uporabniku, da organizira naloge glede na tip (npr. "Delo", "Osebno", "Šola"). Kategorije izboljšujejo preglednost in omogočajo hitrejše iskanje nalog. |
| **Označi kot dokončano** | Funkcija, ki uporabniku omogoča, da nalogo označi kot zaključeno, kar jo premakne med dokončane naloge. To prispeva k motivaciji in sledenju napredku.  |
| **Koledar**              | Prikaz nalog po datumih, ki uporabnikom omogoča pregledovanje in načrtovanje nalog na časovnici. Koledar olajša dolgoročno načrtovanje in usklajevanje nalog z drugimi obveznostmi.  |
| **Statistika**           | Pogled, ki prikazuje podatke o številu dokončanih nalog v določenem časovnem obdobju, kar uporabnikom omogoča analizo njihove produktivnosti in napredka. Uporabniki lahko vidijo, kako se njihova uspešnost spreminja skozi čas. |
| **Zapiski**              | Dodatne informacije ali opombe, ki jih uporabnik lahko doda k posameznemu nalogu. Zapiski omogočajo uporabnikom, da vključijo kontekst ali posebne podrobnosti, ki so pomembne za opravljeno nalogo.  |
| **Prioriteta**           | Označevanje nalog glede na nujnost, kar omogoča uporabnikom, da se osredotočijo na najpomembnejše naloge. Naloge lahko označijo kot visoko, srednjo ali nizko prioriteto. |
| **Seznam nalog**         | Glavni prikaz vseh nalog, ki jih je uporabnik ustvaril. Uporabnik lahko hitro pregleda vse naloge, jih ureja, briše ali označuje kot dokončane. |
| **Filtriranje**          | Funkcija, ki omogoča uporabnikom, da prikažejo le tiste naloge, ki ustrezajo določenim kriterijem (npr. naloge z določeno kategorijo ali prioriteto). Filtriranje olajša iskanje in upravljanje nalog. |
| **Obvestila in opomniki** | Funkcionalnost, ki omogoča uporabniku, da nastavi opomnike za določene naloge in prejme obvestila pred rokom naloge. To uporabnika opozori na pomembne naloge in prispeva k učinkovitemu načrtovanju.|


## Funkcionalnosti aplikacije

- Ustvarjanje, urejanje in brisanje nalog
- Označevanje nalog kot dokončanih
- Kategorizacija nalog za boljšo organizacijo
- Pisanje zapiskov k posameznim nalogam
- Prikaz statistike dokončanih nalog
- Koledarski prikaz nalog po datumih
- Nastavitev obvestil in opomnikov za naloge

Ta aplikacija pomaga uporabnikom organizirati in optimizirati čas ter spremljati svoj napredek pri opravljanju nalog.

## Diagram primerov uporabe
![DPU](https://github.com/user-attachments/assets/e5852b17-eeb1-4f47-85b8-28310a0ac9f8)




### Opis primerov uporabe
1. Ustvarjanje naloga
- Opis: Uporabnik lahko vnese nov nalog v sistem, pri čemer lahko določi naslov, opis, rok in prioriteto naloga.
- Aktivnosti: Uporabnik izpolni obrazec in shrani nalog.

2. Urejanje naloga
- Opis: Uporabnik lahko spremeni obstoječi nalog, kar vključuje posodabljanje naslova, opisa, roka in prioritete.
- Aktivnosti: Uporabnik izbere nalog in izbere možnost za urejanje, nato shrani spremembe.

3. Brisanje naloga
- Opis: Uporabnik lahko odstrani nalog iz sistema, kar pomeni, da se nalog trajno izbriše.
- Aktivnosti: Uporabnik izbere nalog in potrdi, da želi nalog izbrisati.

4. Označevanje naloga kot dokončan
- Opis: Uporabnik lahko označi nalog kot dokončan, kar ga premakne med dokončane naloge.
- Aktivnosti: Uporabnik izbere nalog in klikne na gumb za označevanje kot dokončan.

5. Kategorizacija nalog
- Opis: Uporabnik lahko dodeli nalogam kategorije, da jih lažje organizira in filtrira.
- Aktivnosti: Uporabnik izbere kategorijo iz padajočega seznama med ustvarjanjem ali urejanjem naloga.

6. Pregled statistike
- Opis: Uporabnik lahko pregleda statistiko o svoji produktivnosti, ki prikazuje število dokončanih nalog v določenem obdobju.
- Aktivnosti: Uporabnik izbere časovno obdobje in si ogleda grafični prikaz napredka.

7. Uporaba koledarja
- Opis: Uporabnik lahko pregleda naloge po datumih, kar mu omogoča boljše načrtovanje.
- Aktivnosti: Uporabnik izbere datum na koledarju in si ogleda naloge, ki so dodeljene temu datumu.

8. Obvestila in opomniki
- Opis: Uporabnik lahko nastavi opomnike za določene naloge, da prejme obvestila pred rokom naloge. Obvestila pomagajo uporabniku ostati na tekočem z nalogami, ki jih mora dokončati.
- Aktivnosti: Uporabnik izbere možnost nastavitve opomnika pri ustvarjanju ali urejanju naloge ter določi čas opomnika. Ko se čas opomnika približa, uporabnik prejme obvestilo.

## Razredni diagram
![class_diagram](https://github.com/user-attachments/assets/4ac5f5b2-fa6a-434d-904c-321e3104c3d3)



## Opis razrednega diagrama
### 1. *Uporabnik*
- *Vloga:* Predstavlja entiteto uporabnika aplikacije, ki lahko ustvarja, ureja in briše naloge ter nastavlja opomnike in pregleduje obvestila.
- *Ključni atributi:*
  - id: Edinstven identifikator uporabnika.
  - ime, email, geslo: Podatki za identifikacijo in prijavo uporabnika.
- *Ključne metode:*
  - registriraj(uporabnik: Uporabnik): Registrira novega uporabnika v sistem in shrani njegove podatke.
  - prijavi(uporabnik: Uporabnik): Prijavi uporabnika v aplikacijo, če so prijavni podatki pravilni.
  - odjavi(uporabnik: Uporabnik): Izvede odjavo uporabnika in zaključi trenutno sejo.

---

### 2. *Nalog*
- *Vloga:* Predstavlja posamezne naloge, ki jih ustvarijo uporabniki. Vključuje podrobnosti o nalogi, kot so naslov, opis, rok, status in kategorija.
- *Ključni atributi:*
  - id: Edinstven identifikator naloga.
  - naslov, opis, rok: Podrobnosti naloga.
  - status: Status naloga, definiran preko enumeracije (*Status*: "Aktivno", "Dokončano").
  - kategorija: Kategorija naloga (npr. "Personal", "Work").
- *Ključne metode:*
  - ustvariNalog(uporabnik: Uporabnik): Nalog: Ustvari nov nalog za določenega uporabnika z vsemi potrebnimi podrobnostmi.
  - urediNalog(nalog: Nalog): void: Posodobi obstoječi nalog z novimi informacijami.
  - izbrisiNalog(nalog: Nalog): void: Izbriše nalog iz sistema.
  - oznaciKotDokoncan(nalog: Nalog): void: Spremeni status naloga na "Dokončano".

---

### 3. *Opomnik*
- *Vloga:* Predstavlja opomnike, ki so povezani z nalogami. Uporabniki jih nastavijo za opozarjanje na določen čas ali datum.
- *Ključni atributi:*
  - id: Edinstven identifikator opomnika.
  - datumInCas: Datum in čas, kdaj naj se prikaže opomnik.
  - sporocilo: Vsebina opomnika.
- *Ključne metode:*
  - nastaviOpomnik(nalog: Nalog, datumInCas: LocalDateTime): Opomnik: Nastavi nov opomnik za določen nalog.
  - odstraniOpomnik(opomnik: Opomnik): void: Odstrani obstoječi opomnik iz sistema.

---

### 4. *Obvestilo*
- *Vloga:* Predstavlja obvestila, ki jih sistem pošlje uporabnikom na podlagi njihovih opomnikov.
- *Ključni atributi:*
  - id: Edinstven identifikator obvestila.
  - vsebina: Vsebina obvestila.
  - datumInCas: Datum in čas, kdaj je bilo obvestilo poslano.
- *Ključne metode:*
  - posljiObvestilo(uporabnik: Uporabnik, kanal: KanalObveščanja): void: Pošlje obvestilo uporabniku preko izbranega kanala (Profile message, e-pošta).
  - preloziObvestilo(opomnik: Opomnik, novCas: LocalDateTime): void: Preloži čas pošiljanja obvestila.

---

### 5. *KanalObveščanja*
- *Vloga:* Predstavlja različne kanale obveščanja (SMS, e-pošta), preko katerih se obvestila pošiljajo uporabnikom.
- *Ključni atributi:*
  - id: Edinstven identifikator kanala.
  - tip: Enumeracija (*Tip*: "Profile message", "Email").
- *Ključne metode:*
  - izberiKanal(tip: String): KanalObveščanja: Izbere kanal, preko katerega bo obvestilo poslano.
  - posljiObvestilo(uporabnik: Uporabnik, obvestilo: Obvestilo): void: Izvede pošiljanje obvestila preko določenega kanala.

---

### 6. *Enumeracije*
- *Status:* Definira status naloga ("Aktivno", "Dokončano").
- *Kategorija:* Določa kategorijo naloga (npr. "Personal", "Work").
- *Tip:* Določa tip kanala obveščanja ("Profile message", "Email").

---

## Ključne metode in njihove naloge

### Upravljanje uporabnikov
Metode za registracijo, prijavo in odjavo zagotavljajo osnovno upravljanje uporabnikov in njihovo interakcijo s sistemom. Te funkcionalnosti vključujejo:
- *Registracija*: Uporabnikom omogoča ustvarjanje novih računov.
- *Prijava*: Preverjanje uporabniških podatkov za dostop do sistema.
- *Odjava*: Varno zaprtje uporabniške seje.

### Upravljanje nalog
Metode za ustvarjanje, urejanje, brisanje in označevanje nalog so ključne za izvajanje osnovne funkcionalnosti aplikacije. Te vključujejo:
- *Ustvarjanje nalog*: Dodajanje novih nalog v uporabniški seznam.
- *Urejanje nalog*: Spreminjanje podrobnosti obstoječih nalog.
- *Brisanje nalog*: Odstranjevanje nalog iz sistema.
- *Označevanje nalog*: Sledenje statusu nalog, na primer kot dokončane.

### Upravljanje opomnikov
Metode za nastavitev in odstranitev opomnikov uporabnikom pomagajo slediti rokom. Funkcionalnosti vključujejo:
- *Nastavitev opomnikov*: Uporabnikom omogoča prejemanje opomnikov za določene naloge.
- *Odstranitev opomnikov*: Preklic opomnikov, ki niso več potrebni.

### Pošiljanje obvestil
Metode za pošiljanje in prilagoditev obvestil omogočajo pravočasno obveščanje uporabnikov. Funkcionalnosti vključujejo:
- *Pošiljanje obvestil*: Uporabnikom posreduje informacije o nalogah, opomnikih ali spremembah.
- *Prilagoditev obvestil*: Omogoča prilagajanje vsebine in pogostosti obvestil.

### Izbira kanalov
Metode za izbiro kanala obveščanja zagotavljajo fleksibilnost v načinu komunikacije. Uporabniki lahko izbirajo med različnimi kanali, kot so:
- *E-pošta*
- *Profile message*




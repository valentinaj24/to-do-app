# Začetek z Java in Spring Boot aplikacijo

Ta projekt uporablja Java in Spring Boot za backend aplikacijo.

## Zahteve

Pred začetkom namestitve aplikacije preverite, da imate na svojem sistemu nameščeno naslednje:

- Java Development Kit (JDK) – različica 11 ali novejša
- Maven – za upravljanje odvisnosti in gradnjo aplikacije
- MySQL – kot baza podatkov za aplikacijo

## Namestitev
1. Kloniranje repozitorija:
   
    ```bash
    git clone https://github.com/vaš-repozitorij/naziv-projekta.git
    cd naziv-projekta 

3. Konfiguracija podatkovne baze:

- V vašem MySQL odjemalcu ustvarite novo bazo podatkov z imenom ime-baze:

  ```sql
  CREATE DATABASE ime-baze;

- Odprite datoteko application.properties ali application.yml v mapi src/main/resources in posodobite nastavitve podatkovne baze:

  ```properties
  spring.datasource.url=jdbc:mysql://localhost:3306/ime-baze
  spring.datasource.username=vaše-uporabniško-ime
  spring.datasource.password=vaše-geslo
  spring.jpa.hibernate.ddl-auto=update

3. Zagon aplikacije:

Zaženite aplikacijo z Mavenom ali neposredno iz IDE:

- Z Mavenom:
  ```bash 
  mvn spring-boot:run

- Z IDE (Eclipse, IntelliJ IDEA):

  - Uvozite projekt kot Maven projekt.
  - Poiščite main metodo v glavni aplikacijski datoteki (npr. ImeProjektaApplication.java) in jo zaženite kot Java aplikacijo.

4. Dostop do aplikacije:

Po uspešnem zagonu bo aplikacija dostopna na http://localhost:8080.

## Razpoložljivi Endpoints
Aplikacija vsebuje različne API-je za CRUD operacije. Tukaj so nekateri pogosti endpoints (predpostavljamo, da je osnovni endpoint /api):

- GET /api/todo - Pridobi seznam vseh opravil
- POST /api/todo - Ustvari novo opravilo
- PUT /api/todo/{id} - Posodobi obstoječe opravilo
- DELETE /api/todo/{id} - Izbriši opravilo

## Gradnja za produkcijo
Za gradnjo aplikacije v produkcijskem načinu zaženite:

    mvn clean install
To bo ustvarilo datoteko .jar v mapi target, ki jo lahko zaženete z naslednjim ukazom:

    java -jar target/ime-aplikacije.jar

Aplikacija bo nato delovala kot produkcijski strežnik.

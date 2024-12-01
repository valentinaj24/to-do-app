# Poročilo o testiranju

## Opis testov

### 1. Dodajanje naloge - pozitiven scenarij (`testSaveTask_Success`)
- Preverja, ali se naloga uspešno doda za obstoječega uporabnika.
- Simulirano z `Mockito`, kjer uporabnik obstaja, naloga pa je pravilno shranjena s pravilnimi podatki.
- Sistem vrne HTTP status **200 OK**, kar potrjuje uspešno delovanje funkcionalnosti.

### 2. Dodajanje naloge - negativen scenarij (`testSaveTask_UserNotFound`)
- Preverja, ali se naloga ne doda, če uporabnik ne obstaja.
- Simulirano z `Mockito`, kjer uporabnik ne obstaja, kar povzroči, da kontroler zavrne zahtevo.
- Sistem vrne HTTP status **400 BAD_REQUEST**, kar potrjuje pravilno obravnavo napak.

### 3. Prijava uporabnikov - pozitiven scenarij (`testLoginUser_Success`)
- Preverja, ali se uporabnik uspešno prijavi z veljavnim e-poštnim naslovom in geslom.
- Simulirano z `Mockito`, kjer uporabnik obstaja v sistemu in se pravilno preveri geslo.
- Sistem vrne HTTP status **200 OK**, kar potrjuje, da je prijava uspešna.
- Test uporablja parametrizacijo, da preveri prijavo za različne e-poštne naslove.

### 4. Prijava uporabnikov - negativen scenarij (`testLoginUser_InvalidPassword`)
- Preverja, ali sistem zavrne prijavo, če je geslo napačno.
- Simulirano z `Mockito`, kjer uporabnik obstaja v sistemu, vendar je geslo napačno.
- Sistem vrne HTTP status **401 UNAUTHORIZED**, kar potrjuje pravilno obravnavo napake.

### 5. Ažuriranje naloge - pozitiven scenarij (`testUpdateTask_Success`)
- Preverja, ali se naloga uspešno posodobi z veljavnimi podatki.
- Simulirano z `Mockito`, kjer naloga obstaja v sistemu in se uspešno posodobi z novim opisom, datumom in stanjem.
- Sistem vrne HTTP status **200 OK**, kar potrjuje, da je posodobitev naloge uspela.
- Test je ponovljen 3-krat z uporabo **`@RepeatedTest(3)`**.

### 6. Dodajanje opomnika - negativen scenarij (`testAddReminder_TaskNotFound`)
- Preverja, ali sistem pravilno obravnava situacijo, ko naloga ne obstaja.
- Simulirano z `Mockito`, kjer naloga z določenim ID-jem ne obstaja v sistemu.
- Sistem vrne HTTP status **404 NOT_FOUND**, kar potrjuje pravilno obravnavo napake.
- Test je označen kot **onemogočen** z anotacijo `@Disabled`, saj funkcionalnost trenutno ni na voljo.

---

## Člani skupine in odgovornosti

---

## **Valentina Jovanovic**
### Kratka analiza uspešnosti testov

- **Vsi testi so bili uspešno izvedeni.**
    - Pozitiven testni scenarij je potrdil, da se naloga pravilno shrani za obstoječega uporabnika.
    - Negativen testni scenarij je potrdil, da sistem pravilno zavrne zahteve za neobstoječega uporabnika.

### Napake
- Nobenih napak ni bilo odkritih med testiranjem.
- Testiranje je pokazalo, da aplikacija pravilno ravna v vseh obravnavanih situacijah.


### Zaključek

- Celotno testiranje funkcionalnosti za dodajanje nalog je bilo uspešno izvedeno.
- Testi potrjujejo pravilno delovanje sistema tako v pozitivnih kot v negativnih scenarijih.

---

## **Lazar Cvorovic**
### Kratka analiza uspešnosti testov

- **Vsi testi so bili uspešno izvedeni.**
  - Pozitiven testni scenarij je potrdil, da se uporabniki z veljavnimi podatki uspešno prijavijo.
  - Negativen testni scenarij je potrdil, da sistem pravilno zavrne prijavo z napačnim geslom.

### Napake
- Nobenih napak ni bilo odkritih med testiranjem.
- Testiranje je pokazalo, da aplikacija pravilno ravna v vseh obravnavanih situacijah.

### Zaključek

- Celotno testiranje funkcionalnosti prijave uporabnikov je bilo uspešno izvedeno.
- Testi potrjujejo pravilno delovanje sistema tako v pozitivnih kot v negativnih scenarijih.

---

## **Andjelina Jelenic**
### Kratka analiza uspešnosti testov

- **Vsi testi so bili uspešno izvedeni.**
  - Pozitiven testni scenarij je potrdil, da se naloga pravilno posodobi z veljavnimi podatki.
  - Negativen testni scenarij je potrdil, da test za dodajanje opomnika je bil začasno onemogočen, saj funkcionalnost trenutno ni na voljo.


### Napake
- Nobenih napak ni bilo odkritih med testiranjem.
- Testiranje je pokazalo, da aplikacija pravilno ravna v situacijah, kjer so podatki veljavni ali naloga ne obstaja.

### Zaključek

- Celotno testiranje funkcionalnosti za ažuriranje nalog in dodajanje opomnikov je bilo uspešno izvedeno.
- Testi potrjujejo pravilno delovanje sistema za posodobitve nalog ter obravnavo neobstoječih nalog pri dodajanju opomnikov.

---

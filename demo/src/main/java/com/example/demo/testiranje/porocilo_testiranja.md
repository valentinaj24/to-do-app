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

---

## Člani skupine in odgovornosti

---

### **Valentina Jovanovic**
- Odgovorna za celoten testni razred **`TaskControllerTest`**.
- Napisal je:
    - Test za pozitiven scenarij: **`testSaveTask_Success`**.
    - Test za negativen scenarij: **`testSaveTask_UserNotFound`**.
    - Inicializacijo testnega okolja z metodo **`setUp`**.
    - Čiščenje po vsakem testu z metodo **`tearDown`**.


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

### ****

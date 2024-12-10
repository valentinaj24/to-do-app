# Poročilo o napredku - To-Do Aplikacija

## Sprint: Dodajanje prilog

### Uporabniška zgodba
**Kot uporabnik želim možnost dodajanja prilog (npr. slike ali dokumente) k nalogam, da imam vse pomembne informacije na enem mestu.**

---

## Sprint cilji
Cilj tega sprinta je bil omogočiti naslednje funkcionalnosti:
1. **Frontend:** Vmesnik za nalaganje in ogled prilog.
2. **Backend:** Implementacija API za nalaganje in shranjevanje prilog.
3. **Baza podatkov:** Shranjevanje informacij o prilogah.
4. **Testiranje:** Preverjanje funkcionalnosti nalaganja prilog.
5. **Dokumentacija:** Posodobitev tehnične dokumentacije projekta.

---

## Sprint tabla (Scrum Board)

## Proces dela
### Planiranje
- Sprint tabla je bila razdeljena na **To-Do**, **Doing** in **Done**.
- Razčlenitev uporabniške zgodbe na posamezne naloge.
- Dodelitev nalog članom ekipe:
    - **Andjelina Jelenic:** Frontend naloge in dokumentacija.
    - **Lazar Cvorovic:** Backend naloge in podatkovna baza
    - **Valentina Jovanovic:** Testiranje in Backend naloge

### Izvedba
1. **Priprava baze podatkov:**
    - Ustvarjena tabela `attachments` z referenčnim ključem na `tasks`.
2. **Backend:**
    - Implementacija API za nalaganje datotek (`POST /attachments`).
    - Shranjevanje metapodatkov o datotekah (ime, tip, velikost).
3. **Frontend:**
    - Dodan gumb za nalaganje datotek.
    - Omogočen prikaz naloženih datotek v modalnem oknu.
4. **Testiranje:**
    - Preverjanje podprtih formatov datotek (PDF, DOCX, RTF, JPEG, PNG).
    - Odpravljanje napak, kot je problem z brisanjem nalog zaradi odvisnosti od prilog.



## Rezultati
- Uporabnik zdaj lahko nalaga priloge k nalogam.
- Podprti formati: slike (JPEG, PNG), dokumenti (PDF, DOCX, RTF).
- Prikaz naloženih datotek v modalnem oknu.

---



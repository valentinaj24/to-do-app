## Sistemski test – Performance test

**Naloga:** 5 – Sistemski testi (nefunkcionalni zahtevi)  
**Datum izvedbe:** 7. november 2025  
**Uporabljeno orodje:** Apache JMeter

---

### 1. Namen testa

Cilj sistemskega testa je preveriti nefunkcionalne zahteve aplikacije *To-Do App*, natančneje zmogljivost (performance) in odzivnost sistema pri večjem številu hkratnih uporabnikov.  
Test je bil osredotočen na API zahtevek **GET /api/tasks/all**, ki vrača seznam vseh opravil iz baze.

---

### 2. Postopek izvedbe testa

Test je bil izveden z orodjem **Apache JMeter** na lokalnem strežniku.  
V testnem načrtu (Test Plan) so bile vključene naslednje komponente:

### 🔹 Thread Group
- Število uporabnikov (threads): **10**
- Ramp-up čas: **10 s**
- Število ponovitev (loop count): **5**

### 🔹 HTTP Request
- Metoda: **GET**
- URL: `http://localhost:8080/api/tasks/all`
- Namen: pridobivanje vseh nalog (tasks) iz aplikacije

### 🔹 Listenerji
- **Summary Report** (za povzetek rezultatov)
- **Graph Results** (za grafični prikaz odzivnih časov)

---

## 3. Rezultati testa

| Metrika | Vrednost |
|----------|-----------|
| Skupno število zahtevkov | 250 |
| Povprečni odzivni čas | 11 ms |
| Najmanjši / Največji odzivni čas | 6 ms / 295 ms |
| Standardni odklon | 18.68 |
| Delež napak | 40 % |
| Prepustnost (Throughput) | 29 zahtevkov/minuto |
| Povprečna velikost odziva | 745.4 bajtov |

---

## 4. Grafični prikaz rezultatov testa

Na spodnjem grafu so prikazani rezultati **performance testa** za API zahtevek `/api/tasks` v aplikaciji *To-Do App*.  
Test je bil izveden s pomočjo **Apache JMeter**, z nastavitvami:
- 10 uporabnikov (threads)
- Ramp-up čas: 10 sekund
- Število ponovitev: 5 (skupaj 50 zahtevkov)

Na grafu so prikazane naslednje metrike:
-  **Average (povprečje):** povprečni odzivni čas strežnika znaša *11 ms*
- **Median:** srednja vrednost odzivov je *10 ms*
-  **Deviation:** standardni odklon je *18 ms*, kar pomeni majhna odstopanja v odzivnih časih
-  **Throughput:** zmogljivost strežnika je približno *29 zahtevkov na minuto*

### Slike rezultatov

![Summary Report](screenshots/Summary%20Report.png)
![Graph Results](screenshots/Graph%20Results.png)

---

### 5. Zaključek

Rezultati testa kažejo, da je aplikacija odzivna in stabilna pri zmerni obremenitvi.  
Pri večji obremenitvi se pojavijo delne napake (**40 %**), kar bi lahko izboljšali z optimizacijo strežnika, npr.:
- povečanje *connection pool-a*,
- izboljšanje *thread managementa*,
- asinhrona obdelava zahtevkov.


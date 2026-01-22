# Poročilo o tehničnem dolgu – projekt To-Do App

---

## 1. Uvod

V okviru naloge sam analizirala projekt **To-Do App** z namenom prepoznati tehnični dolg, ki je nastal med razvojem aplikacije.

Analiza je bila izvedena ročno, brez uporabe avtomatskih orodij

Tehnični dolg razumemo kot posledico kompromisov, kjer smo zaradi hitre implementacije ali omejenega časa izbrali enostavnejše rešitve, ki pa dolgoročno otežujejo vzdrževanje, razširjanje in testiranje aplikacije.

---

## 2. Identificirani tipi tehničnega dolga

---

### 2.1 Test Coverage Debt (dolg testiranja)

**Opis:**  
Projekt že vsebuje osnovno testno infrastrukturo v backend delu aplikacije.  
V mapi `src/test/java/com/example/demo/` obstajata razreda `DemoApplicationTests` in `UserServiceTest`.

Razred `UserServiceTest` vsebuje en enotski test metode `saveUser()`, ki preverja pravilno kodiranje gesla in shranjevanje uporabnika v repozitorij.

Kljub temu je testna pokritost zelo omejena:

- obstaja le en test za en servis,
- ni testov za ostale servise (Task, Note, Category itd.),
- ni testov za kontrolerje in REST API-je,
- ni testov za robne primere in napake,
- ni integracijskih testov,
- frontend del projekta nima nobenih testov.

**Zakaj gre za tehnični dolg:**  
Obstoječi test pokriva le zelo majhen del funkcionalnosti aplikacije, zato večina kode ni avtomatsko preverjena.

**Vpliv:**

- večje tveganje za regresijske napake
- težje refaktoriranje
- več ročnega testiranja
- manj zaupanja v stabilnost aplikacije

**Ocena časa za odpravo:**  
**6–10 ur**

---

### 2.2 Process Debt (delni procesni dolg)

**Opis:**  
Projekt že vsebuje osnovni CI proces:

- mapa `.github/workflows`,
- integracija s SonarCloud.

To pomeni, da CI v projektu že obstaja.

Kljub temu CI proces trenutno:

- ne zaganja testov (ker testna pokritost ni vzpostavljena),
- nima definiranih quality gate pravil,
- nima preverjanja stila kode (linting).

**Zakaj gre za tehnični dolg:**  
Obstoječi CI proces ne pokriva vseh ključnih vidikov kakovosti kode.

**Vpliv:**

- napake se lahko neopaženo prenesejo v glavno vejo
- slabša kontrola kakovosti
- več ročnega preverjanja po spremembah

**Ocena časa za odpravo:**  
**1–2 uri**

---

## 3. Povzetek tehničnega dolga (tabela)

| Tip tehničnega dolga | Ocena časa | Prioriteta |
|---------------------|------------|------------|
| Test Coverage Debt  | 6–10 h     | Visoka     |
| Process Debt       | 1–2 h      | Srednja    |
| **Skupaj**         | **7–12 h** |            |

---

## 4. Zaključek

Na podlagi ročne analize kode projekta **To-Do App**, edini izrazitejši tehnični dolg v projektu predstavlja zelo omejena testna pokritost ter delno nepopolni razvojni procesi (CI brez testov in quality gate pravil).

Odprava tehničnega dolga bi:

- izboljšala stabilnost aplikacije,
- zmanjšala tveganje za regresijske napake,
- omogočila lažje nadaljnje nadgradnje projekta.

Tehnični dolg v projektu ni kritičen, vendar bi ga bilo smiselno postopno odpravljati, predvsem na področju testiranja in kakovosti razvojnih procesov.

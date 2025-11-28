# Analiza metrik aplikacije – To-Do App

## 1. Uvod
V okviru naloge je bila izvedena analiza metrik aplikacije *To-Do App*, implementirane v Spring Boot okolju. Analiza vključuje:
- osnovna preštevanja kode,
- pregled rezultatov statične analize s SonarQube,
- oceno strukture aplikacije in OOP metrik (sklopljenost, kohezija, kompleksnost),
- identifikacijo prednosti in slabosti kode.

Analiza je bila izvedena z orodjem **SonarQube Community Edition**.

---

## 2. Povzetek metrik

### 2.1 Tabela osnovnih rezultatov

| Kategorija | Metrika | Vrednost |
|-----------|---------|----------|
| **Velikost kode** | Lines of Code | **1,137** |
| | Skupno vrstic | **1,518** |
| | Število datotek | **32** |
| | Število razredov | **31** |
| | Število funkcij/metod | **130** |
| | Vrstice komentarjev | **67** (5.6%) |
| **Kakovost kode (SonarQube)** | Security Rating | **A** |
| | Reliability Rating | **C** |
| | Maintainability Rating | **A** |
| | Security Hotspots | **2** |
| | Code Smells | **47** |
| **Testi** | Unit Tests | **12** |
| | Pokritost kode | **0%** |
| **Podvajanje kode** | Duplications | **0%** |
| **Kompleksnost** | Cyclomatic Complexity | **164** |
| | Cognitive Complexity | **39** |

---

## 3. Preštevanja kode

### 3.1 Velikost kode
- **1,518** skupnih vrstic (komentarji + prazne + logika)
- **1,137 Lines of Code (LOC)** – dejanska programska logika
- **67** vrstic komentarjev (5.6%)

### 3.2 Paketna struktura
Aplikacija vsebuje tipično Spring Boot arhitekturo:
- `controllers`
- `services`
- `components`
- `models`
- `repositories`

Skupaj: **5 paketov**

### 3.3 Razredi in metode
- **31 razredov**
- **130 funkcij/metod**
- Povprečno: **4.19 metode na razred**

---

## 4. Rezultati SonarQube analize

### 4.1 Varnost (Security)
- Ocena: **A**
- Težave: **0**
- Security Hotspots: **2**
- Security Hotspots Reviewed: 0%

Aplikacija nima kritičnih varnostnih ranljivosti.

---

### 4.2 Zanesljivost (Reliability)
- Ocena: **C**
- Odprte zanesljivostne težave: **19**
- Glavni vzroki:
    - uporaba *field injection*,
    - manjše nekonsistentnosti v strukturi metod.

---

### 4.3 Vzdrževanost (Maintainability)
- Ocena: **A**
- Code Smells: **47**
- Tehnični dolg: **4h 3min**
- Debt Ratio: **0.7%**

Najpogostejše težave:
- uporaba *field injection* namesto *constructor injection*,
- podvajanje logike v manjših segmentih,
- izboljšave imenskih konvencij.

---

### 4.4 Pokritost kode (Coverage)
- Line coverage: **0%**
- Lines to cover: **336**
- Uncovered lines: **336**

Testi obstajajo, vendar ne pokrivajo logike aplikacije.

---

### 4.5 Podvajanje kode (Duplications)
- Duplication density: **0%**
- Duplicated lines: **0**

Aplikacija nima podvajanja kode, kar je zelo dobro.

---

### 4.6 Kompleksnost
- Cyclomatic Complexity: **164**
- Cognitive Complexity: **39**

Kompleksnost je zmerna, večinoma zaradi servisnih metod z več pogoji in daljšimi metodami.

---

## 5. OOP metrike

### 5.1 Sklopljenost (Coupling)
- Arhitektura je tipična: Controller → Service → Repository
- Sklopljenost med razredi je zmerna in ustrezna za Spring Boot.
- SonarQube izpostavlja težavo *field injection*, ki rahlo povečuje sklopljenost.

**Ocena sklopljenosti: zmerna**

---

### 5.2 Kohezija (Cohesion)
- Razredi so dobro razdeljeni po odgovornostih.
- Controllerji obravnavajo HTTP zahteve.
- Servisi vsebujejo poslovno logiko.
- Modeli so čisti podatkovni razredi.

**Ocena kohezije: visoka**

---

### 5.3 Kompleksnost (Cyclomatic + Cognitive)
- Cyclomatic Complexity: **164**
- Cognitive Complexity: **39**
- Večina razredov ima nizko do zmerno kompleksnost.
- Nekaj metod bi bilo smiselno razdeliti na manjše enote.

**Ocena kompleksnosti: nizka–zmerna**

---

## 6. Prednosti in slabosti aplikacije

### Prednosti
- Jasna arhitektura (controller–service–repository)
- 0% podvajanja kode
- Visoka kohezija in dobra berljivost
- Minimalne varnostne težave
- Tehnični dolg zelo nizek (0.7%)

### Slabosti
- Reliability ocena **C** (19 težav)
- Uporaba *field injection* namesto *constructor injection*
- 0% pokritosti kode s testi
- Nekatere metode so predolge ali manj pregledne

---

## 7. Zaključek
Analiza metrik aplikacije *To-Do App* kaže na dobro strukturo kode, visoko kohezijo ter odsotnost podvajanj. Kakovost kode je na splošno visoka, predvsem na področju varnosti in vzdrževanosti. Kljub temu so bile identificirane priložnosti za izboljšave zlasti na področju zanesljivosti in testne pokritosti.  
Priporočljivo je:
- prehod na *constructor injection*,
- razbitje daljših metod,
- uvedba enotnih testov za dvig pokritosti kode.

Aplikacija je stabilna, dobro strukturirana in pripravljena za nadaljnji razvoj.

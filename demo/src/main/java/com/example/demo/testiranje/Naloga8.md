# Naloga 8

---

## 1. Uvod

V okviru naloge smo izvedli pregled in analizo obstoječe kode aplikacije *To-Do App*. Cilj analize je bil določiti tri ključne cilje —  ter za vsak cilj oblikovati vprašanje in metrike, ki omogočajo oceno trenutnega stanja in načrtovanje izboljšav.

Analiza temelji predvsem na podatkih iz SonarQube ter splošnem pregledu projekta. Na tej osnovi smo oblikovali tri cilje, ki pokrivajo področja tehnične kompleksnosti, testiranja in varnosti.

---

## 2. Cilji, vprašanja, metrike in ugotovitve

---

## CILJ 1 (TEHNIČNI): Zmanjšati kompleksnost in tehnični dolg kode

### **VPRAŠANJE:**
Kako lahko z izboljšavami arhitekture in refaktoringom zmanjšamo kompleksnost kode ter tehnični dolg, pri tem pa ohranimo funkcionalnost aplikacije?

### **METRIKE :**
- **Cyclomatic Complexity:** 164  
  Kompleksnost logike je srednje visoka in nakazuje na možnosti za optimizacijo.
- **Cognitive Complexity:** 39  
  Nekateri deli kode zahtevajo več miselnega napora za razumevanje.
- **Code Smells:** 47  
  Označujejo manjše težave, ki vplivajo na berljivost in vzdrževanost.
- **Tehnični dolg:** 4 h 3 min  
  Čas, potreben za odpravo vseh odkritih težav.

### **UGOTOVITEV:**
Aplikacija vsebuje strukturo, ki je večinoma smiselno organizirana, vendar analiza kaže na mesta, kjer bi refaktoring zmanjšal kompleksnost in izboljšal preglednost. Največje priložnosti za izboljšave so v servisni logiki, kjer se pojavlja več pogojnih stavkov in daljše metode. Z manjšimi posegi bi lahko zmanjšali tehnični dolg ter izboljšali dolgoročno vzdrževanje.

---

##  CILJ 2 (OPERATIVNI): Izboljšati kakovost testiranja in povečati pokritost kode

### **VPRAŠANJE:**
Kako lahko izboljšamo učinkovitost testiranja in povečamo pokritost kode, da zmanjšamo tveganje za napake ob nadgradnjah ali spremembah?

### **METRIKE :**
- **Test Coverage:** 0%  
  Trenutno logika aplikacije ni zajeta v testih.
- **Število testov:** 12  
  Testi obstajajo, vendar ne pokrivajo ključnih funkcionalnosti.
- **Lines to Cover:** 336
- **Uncovered Lines:** 336  
  Celotna poslovna logika ostaja nepreverjena.

### **UGOTOVITEV:**
Pomanjkanje testne pokritosti predstavlja pomembno tveganje pri nadaljnjem razvoju. Aplikacija potrebuje sistematično uvedbo enotskih testov, zlasti za kritične funkcionalnosti (dodajanje nalog, spreminjanje stanja, validacije). S povečanjem pokritosti bi se izboljšala stabilnost sistema ter zmanjšalo število napak, ki se pojavijo v kasnejših fazah razvoja.

---

##  CILJ 3 (TEHNIČNI): Izboljšati varnost aplikacije

### **VPRAŠANJE:**
Kako lahko izboljšamo varnostno stanje aplikacije in zmanjšamo število varnostnih tveganj, pri tem pa zagotovimo dolgoročno stabilnost sistema?

### **METRIKE:**
- **Security Rating:** A  
  Trenutno dobro varnostno stanje kode.
- **Security Hotspots:** 2  
  Dva potencialno občutljiva dela kode, ki zahtevata pozornost.
- **Reviewed Hotspots:** 0%  
  Noben identificirani hotspot še ni bil formalno pregledan.

### **UGOTOVITEV:**
Čeprav je splošna varnostna ocena dobra, obstajajo deli kode, ki bi jih morali pregledati, da zmanjšamo tveganje pred morebitnimi napadi. Pregled varnostnih hotspotov je priporočljiv korak za zagotovitev, da aplikacija tudi v prihodnje ostane varna. Proaktiven pristop k varnosti izboljša zanesljivost, odpornost sistema in zaupanje uporabnikov.

---

## 3. Zaključek

Analiza kode To-Do aplikacije je pokazala tri ključna področja, kjer je mogoče doseči pomembne izboljšave: tehnično kompleksnost, testno pokritost ter varnost.

Zmanjšanje kompleksnosti bi izboljšalo berljivost in vzdrževanost, povečanje testne pokritosti pa bi prineslo večjo stabilnost in zgodnejše odkrivanje napak. Dodatni varnostni pregledi pa bi okrepili odpornost aplikacije na morebitne ranljivosti.

Skupaj ti cilji predstavljajo realne, merljive in pomembne korake k izboljšanju kakovosti celotnega projekta.

---


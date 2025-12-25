## Naloga 10 – Integracija SonarCloud v CI pipeline

Cilj naloge 10 je bil vzpostaviti samodejno izvajanje statične analize kode ob vsaki spremembi v repozitoriju. V ta namen je bil v projekt integriran sistem **SonarCloud**, ki je povezan z obstoječim CI pipeline-om, implementiranim z uporabo **GitHub Actions**.

CI pipeline se samodejno zažene ob vsakem commitu ali pull requestu. V okviru izvajanja pipeline-a se najprej izvede gradnja projekta z uporabo Maven orodja, nato pa sledi statična analiza izvorne kode. Analiza se izvede v oblaku (SonarCloud), rezultati pa se samodejno pošljejo in prikažejo v ustreznem SonarCloud projektu.

S takšno integracijo je zagotovljeno, da se kakovost kode preverja kontinuirano in brez ročnega posega razvijalca. Vsaka sprememba kode je takoj analizirana, kar omogoča zgodnje zaznavanje morebitnih napak, in drugih težav v kodi.

## Naloga 11 – Quality Gate in analiza kakovosti kode (SonarQube)

V okviru naloge je bila uporabljena analiza projekta *to-do-app* z orodjem **SonarQube Cloud**, s poudarkom na preverjanju **Quality Gate** pogojev in oceni kakovosti kode na glavni veji (*main branch*).

### Quality Gate
Analiza je pokazala, da projekt **uspešno prestane Quality Gate (PASSED)**.  
To pomeni, da nova koda ne vsebuje kritičnih napak ali varnostnih ranljivosti, ki bi preprečile nadaljnji razvoj ali dostavo aplikacije.

---

### Povzetek ocen (ratings)

- **Reliability:** A  
  Ni zaznanih napak, ki bi vplivale na stabilnost delovanja aplikacije.

- **Maintainability:** A  
  Zaznani so posamezni code smelli (npr. uporaba `System.out.println`, višja kognitivna kompleksnost), vendar ti ne vplivajo na uspešnost Quality Gate in so tehnične narave.

- **Security:** E  
  Zaznan je en varnostni problem, povezan s konfiguracijo podatkovne baze.

---

### Security analiza

SonarQube je zaznal **Blocker security issue**, ker je v datoteki `application.properties` uporabljeno trdo kodirano geslo za podatkovno bazo (`root`).  
Gre za **lokalno razvojno okolje**, kjer se uporablja testna baza brez produkcijskega dostopa.

Issue je bil ustrezno obravnavan in označen kot **Won’t Fix / False Positive**, saj v kontekstu projekta:
- ne gre za produkcijsko okolje,
- ne obstaja dejansko varnostno tveganje,
- konfiguracija služi izključno razvojnim in testnim namenom.

Kljub temu **Quality Gate ostane uspešno prestan**.

---

### Security Hotspots

Zaznan je bil **1 Security Hotspot**, povezan z uporabo debug funkcionalnosti v kodi.  
Hotspot je bil pregledan in ocenjen kot **nizko tveganje (Low priority)**, saj ne vpliva na produkcijsko varnost aplikacije.

---

### Ostale metrike

- **Coverage:** 0 %  
  Testi niso vključeni v to fazo projekta, zato pokritost kode ni del Quality Gate pogojev.

- **Duplications:** 0 %  
  V kodi ni zaznanih podvojenih delov.

- **New Issues:** 0  
  Nova koda ne uvaja dodatnih težav.

---

### Zaključek

Na podlagi izvedene analize lahko zaključimo, da je projekt:
- skladen s pogoji Quality Gate,
- brez kritičnih napak in realnih varnostnih ranljivosti,
- primeren za nadaljnji razvoj.


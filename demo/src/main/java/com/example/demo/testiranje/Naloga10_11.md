## Naloga 10 – Integracija SonarCloud v CI pipeline

Cilj naloge 10 je bil vzpostaviti samodejno izvajanje statične analize kode ob vsaki spremembi v repozitoriju. V ta namen je bil v projekt integriran sistem **SonarCloud**, ki je povezan z obstoječim CI pipeline-om, implementiranim z uporabo **GitHub Actions**.

CI pipeline se samodejno zažene ob vsakem commitu ali pull requestu. V okviru izvajanja pipeline-a se najprej izvede gradnja projekta z uporabo Maven orodja, nato pa sledi statična analiza izvorne kode. Analiza se izvede v oblaku (SonarCloud), rezultati pa se samodejno pošljejo in prikažejo v ustreznem SonarCloud projektu.

S takšno integracijo je zagotovljeno, da se kakovost kode preverja kontinuirano in brez ročnega posega razvijalca. Vsaka sprememba kode je takoj analizirana, kar omogoča zgodnje zaznavanje morebitnih napak, in drugih težav v kodi.

## Naloga 11

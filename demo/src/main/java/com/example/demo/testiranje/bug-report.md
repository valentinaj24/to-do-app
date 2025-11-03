# Naloga 4 – Bug Report

**Avtor:** Valentina Jovanović  
**Projekt:** To-Do App  
**Vloga:** Prijavljeni uporabnik  
**Okolje:** Windows 11, Chrome 128, Backend (Spring Boot, JDK 21), Frontend (React)

---

## Opis naloge
Za izbrano vlogo *prijavljenega uporabnika* sem izvedla testiranje funkcionalnosti opomnikov (Reminders).  
Pri testiranju sem zaznala napako, povezano z delovanjem obvestil ob določenem času.  
Spodaj je zapisano poročilo o napaki.

---

## BUG-001 – Reminder obvestilo se ne prikaže ob določenem času

**Komponenta:** Profil → Messages (Reminders)  
**Resnost (Severity):** Major  
**Prioriteta:** High  
**Status:** New  
**Reproducibility:** Always

---

### Opis napake
Ko uporabnik doda opomnik z določenim časom (npr. »opomni me ob 18:00«), se opomnik pravilno shrani v bazo in je viden v seznamu *Reminders*.  
Vendar ob določenem času, ko bi se moralo prikazati obvestilo na profilu, se **nič ne prikaže**.  
Uporabnik tako ne prejme vizualnega obvestila, da je čas opomnika dosežen.

---

### Koraki za reproduciranje
1. Prijavi se v aplikacijo.
2. Na nadzorni plošči klikni *Add Reminder*.
3. Vnesi besedilo (npr. »Reminder 1«) in nastavi čas (npr. 18:00).
4. Počakaj do nastavljenega časa.
5. Odpri stran *Profil → Messages*.

---

### Pričakovani rezultat
Ob določeni uri (npr. 18:00) se v razdelku *Messages* na profilu prikaže sporočilo z vsebino opomnika.

---

###  Dejanski rezultat
Obvestilo se **ne prikaže**, čeprav je opomnik pravilno shranjen v bazi.  
Podatki so vidni v SQL tabeli `reminders`, vendar jih frontend ne prikaže.

---

###  Možen vzrok
Frontend trenutno ne preverja, ali je čas opomnika že dosežen (manjka avtomatsko osveževanje ali backend scheduler).  
Obvestila se ne sprožijo, ker ni mehanizma, ki bi preverjal čas opomnikov.

---

### Predlog rešitve
- Dodati periodično preverjanje časa opomnikov na backendu (npr. `@Scheduled` v Spring Boot).
- Frontend naj izvaja `GET /notifications` vsakih nekaj minut ali ob vsaki spremembi.
- Dodati vizualno sporočilo v sekcijo *Notifications* ob sprožitvi opomnika.
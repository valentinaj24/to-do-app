# Poročilo o testiranju

### Opseg in cilji

Pokritih je 5 različnih metod:

- UserController.loginUser
- TaskController.saveTask
- TaskController.updateTask
- TaskController.addReminder
- UserService.saveUser

Za vsako metodo so pripravljeni pozitivni in negativni/robni scenariji

### Okolje in orodja
- JDK: 17
- Build: Maven (mvnw)
- Testni okvir: JUnit 5
- Mocking: Mockito
- Zagon testov:
- - Windows: mvnw.cmd test
- - macOS/Linux: ./mvnw test

### Povzetek testov

| # | Razred / metoda              | Scenarij            | Pričakovano                                           |
|---|------------------------------|---------------------|--------------------------------------------------------|
| 1 | `UserController.loginUser`   | pravilno geslo      | 200 OK + vrnjen User (brez gesla)                     |
| 2 | `UserController.loginUser`   | napačno geslo       | 401 UNAUTHORIZED, brez telesa                          |
| 3 | `TaskController.saveTask`    | uporabnik obstaja   | 200 OK + vrnjen Task                                   |
| 4 | `TaskController.saveTask`    | uporabnik ne obstaja| 400 BAD_REQUEST, brez klica `saveTask`                 | 
| 5 | `TaskController.updateTask`  | naloga obstaja      | 200 OK + posodobljen Task                              | 
| 6 | `TaskController.updateTask`  | naloga ne obstaja   | 404 NOT_FOUND, brez `saveTask`                         | 
| 7 | `TaskController.addReminder` | naloga obstaja      | 200 OK (ali 204), nastavljen reminder                  | 
| 8 | `TaskController.addReminder` | naloga ne obstaja   | 404 NOT_FOUND                                          | 
| 9 | `UserService.saveUser`       | veljavno geslo      | geslo zamenjano z hashom + `repo.save()` poklican      |
|10 | `UserService.saveUser`       | robni: `password=null` | (trenutno) brez `encode`, user shranjen, `password=null` |


### Podrobnosti po metodi

### `UserController.loginUser`

**Opis:** Preveri prijavo uporabnika (BCrypt `matches`).  
**Verifikacije:** `verify(userService).getUserByEmail(email)`, `verify(passwordEncoder).matches(raw, hash)` (pri negativnem scenariju).

| Test              | Vhod                                        | Pričakovano                                   | 
|-------------------|---------------------------------------------|-----------------------------------------------|
| Success           | email=`test@example.com`, pass=`password`   | 200, telo vsebuje uporabnika (brez gesla)     | 
| Invalid password  | email=`test@example.com`, pass=`wrong`      | 401, brez telesa                              |


### `TaskController.saveTask`

**Opis:** Ustvarjanje naloge za obstoječega uporabnika.

| Test           | Vhod                               | Pričakovano                                          | 
|----------------|------------------------------------|------------------------------------------------------|
| Success        | userId=`7`, text=`"Test Task"`     | 200, telo vsebuje Task (`text="Test Task"`)          | 
| User not found | userId ne obstaja                  | 400, brez telesa; `taskService.saveTask` ni poklican |


### `TaskController.updateTask`

**Opis:** Posodobitev obstoječe naloge.

| Test      | Vhod                                      | Pričakovano                        |
|-----------|-------------------------------------------|------------------------------------|
| Success   | taskId=`1`, nov text=`"Updated Task"`     | 200, telo vsebuje posodobljen Task | 
| Not found | taskId=`999`                              | 404, brez telesa                   | 


### `TaskController.addReminder`

**Opis:** Nastavitev opomnika (reminder) na nalogo.

| Test      | Vhod                                        | Pričakovano                                                                 |
|-----------|---------------------------------------------|-----------------------------------------------------------------------------|
| Success   | naloga obstaja, type=`email`, time=`T+1d`   | 200 OK **ali** 204; `notificationType="email"`, nastavljen `reminderTime`  | 
| Not found | naloga ne obstaja                           | 404, brez telesa                                                            | 



### `UserService.saveUser`

**Opis:** Heširanje gesla in shranjevanje uporabnika.

| Test                      | Vhod                                           | Pričakovano                                                           | 
|---------------------------|------------------------------------------------|-----------------------------------------------------------------------|
| hashesPassword_andPersists| email=`ana@example.com`, pass=`"lozinka123"`   | geslo zamenjano z hashom (npr. `"$2b$hash"`); poklican `repo.save()`  |
| edge: null password       | email=`ana@example.com`, pass=`null`           | (trenutno) brez `encode`; poklican `repo.save()`; `password=null`     | 


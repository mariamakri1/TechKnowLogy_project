Client – Frontend εφαρμογή (Vite + TypeScript)
Το frontend είναι Single Page Application (SPA) και επικοινωνεί με το backend μέσω REST API.

## Τεχνολογίες
Vite
TypeScript
HTML / CSS
Fetch API

## Δομή φακέλων (ενδεικτικά)
client/
├── index.html
├── src/
│   ├── main.ts
│   ├── pages/
│   └── styles/
├── assets/
│   ├── images/
│   └── css/

## Εγκατάσταση
1. Μετακίνηση στον φάκελο client:
cd client
2. Εγκατάσταση dependencies:
npm install

## Εκκίνηση Client
npm run dev
Ο client τρέχει στο:
http://localhost:5173

## Σύνδεση με Backend
Ο client επικοινωνεί με το backend μέσω:

http://localhost:3000/api/...
Παράδειγμα:
fetch('http://localhost:3000/api/courses')
!!Σημαντικό
Ο backend server πρέπει να τρέχει πρώτα, αλλιώς ο client δεν θα εμφανίζει δεδομένα.
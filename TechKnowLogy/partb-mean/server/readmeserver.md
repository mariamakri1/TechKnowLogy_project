Backend – Part B (Node.js / Express / MongoDB)
Το backend της εφαρμογής υλοποιεί REST API για τη διαχείριση χρηστών, μαθημάτων, βιβλίων, video και enrollments.
Χρησιμοποιεί Node.js, Express και MongoDB (Mongoose).


## Τεχνολογίες
Node.js
Express.js
MongoDB
Mongoose
dotenv
CORS

##  Δομή φακέλων
server/
├── src/
│   ├── app.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Book.js
│   │   ├── Video.js
│   │   └── Enrollment.js
│   ├── controllers/
│   ├── routes/
│   └── config/
│       └── db.js
├── .env
├── package.json
 

## Εγκατάσταση
1. Μετακίνηση στον φάκελο του server:
cd server
2. Εγκατάσταση dependencies:
        npm install

## Ρύθμιση αρχείου .env
Δημιούργησε αρχείο .env στον φάκελο server/:
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/elearning


## Εκκίνηση Server
       npm start
Ο server τρέχει στο:
http://localhost:3000


## Βασικά API Endpoints
1. Auth
POST /api/auth/register
POST /api/auth/login

2. Courses
GET /api/courses
POST /api/courses

3. Books
GET /api/books
POST /api/books

4. Videos
GET /api/videos
POST /api/videos



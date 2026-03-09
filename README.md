/// Projektin tekemisessä on käytetty Ai:ta. ///

# Health Diary Backend

This is the backend API for the Health Diary application.

The backend is built with **Node.js, Express and MySQL** and provides REST API endpoints for authentication, diary entries and training sessions.

---

## Technologies

- Node.js
- Express
- MySQL / MariaDB
- JWT authentication
- bcrypt

---

## API Endpoints

### Authentication

POST /api/auth/login
GET /api/auth/me

### Users

GET /api/users
POST /api/users

### Diary Entries

GET /api/entries
POST /api/entries
PUT /api/entries/:id
DELETE /api/entries/:id

### Training

GET /api/training
POST /api/training
PUT /api/training/:id
DELETE /api/training/:id

---

## Database

The application uses a **MySQL database** called:

HealthDiary

### Tables

Users
DiaryEntries
Training

### ER Diagram

```mermaid
erDiagram

Users ||--o{ DiaryEntries : creates
Users ||--o{ Training : logs

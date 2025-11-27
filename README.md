# Zidio Task Manager

A full-stack MERN (MongoDB, Express, React, Node) Task Management application.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Folder Structure](#folder-structure)
- [Database Schema](#database-schema)
- [Request Flows](#request-flows)
- [Environment Variables](#environment-variables)
- [Installation & Run (Windows PowerShell)](#installation--run-windows-powershell)
- [API Reference (summary)](#api-reference-summary)
- [Frontend Notes (favicon & Font Awesome)](#frontend-notes-favicon--font-awesome)
- [Troubleshooting](#troubleshooting)
- [Contact](#contact)

---

## Overview

This project demonstrates a standard MERN stack app with JWT authentication, CRUD operations for tasks, and a React/Redux frontend. It is suitable as a learning project or a starter for a more advanced task management app.

## Architecture

High-level architecture (text diagram):

```
   [Browser / React SPA]
                  |
                  |  (1) HTTP (XHR / fetch / axios)
                  v
   [Frontend (React, Redux)]
                  |
                  |  (2) HTTP API requests to /api/*
                  v
   [Backend (Express.js + Node.js)]
       - Auth controllers (signup/login)
       - Task controllers (CRUD)
       - Middleware (auth, validation)
                  |
                  |  (3) MongoDB Driver (mongoose)
                  v
   [MongoDB Database]
```

Notes:
- The React app runs on `http://localhost:3000` during development and proxies API calls to the backend at `http://127.0.0.1:5000` (see `frontend/package.json` proxy).
- The backend listens on `PORT` from `backend/.env` (defaults to `5000`).

## Folder Structure

Root snapshot:

```
package.json
backend/
   ├─ app.js
   ├─ controllers/
   ├─ models/
   ├─ routes/
   ├─ utils/
   └─ .env
frontend/
   ├─ public/
   ├─ src/
   └─ package.json
```

Key files:
- `backend/app.js` - Express entry, registers routes and connects mongoose
- `backend/models/User.js` - User schema
- `backend/models/Task.js` - Task schema
- `frontend/src` - React components and pages

## Database Schema

Two main collections: `users` and `tasks` (example fields)

- users

```
User {
   _id: ObjectId,
   name: String,
   email: String,   // unique
   password: String // hashed
   createdAt: Date
}
```

- tasks

```
Task {
   _id: ObjectId,
   user: ObjectId (ref users),
   title: String,
   description: String,
   completed: Boolean,
   createdAt: Date,
   updatedAt: Date
}
```

DB Relationship:
```
User (1) <---- (N) Task
```

## Request Flows

1) Signup / Login

- Client: POST `/api/auth/signup` with `{ name, email, password }` → Backend validates and creates user
- Client: POST `/api/auth/login` with `{ email, password }` → Backend returns `{ token, user }` on success

2) Authenticated Task CRUD

- Add task: POST `/api/tasks` (Auth header `Authorization: Bearer <token>`) → Backend creates task linked to user
- Get tasks: GET `/api/tasks` (Auth header) → Backend returns tasks for the authenticated user
- Update task: PUT `/api/tasks/:id` (Auth header) → Backend updates task if owned by user
- Delete task: DELETE `/api/tasks/:id` (Auth header) → Backend removes task if owned by user

Sequence example (login -> get tasks):

```
Browser -> POST /api/auth/login -> receives token
Browser -> set token in Redux/localStorage
Browser -> GET /api/tasks with Authorization header
```

## Environment Variables

Create `backend/.env` with at least:

```
MONGODB_URL=mongodb://127.0.0.1:27017/taskmanager
PORT=5000
ACCESS_TOKEN_SECRET=your_strong_random_secret_here
```

Replace `ACCESS_TOKEN_SECRET` with a secure random value (used by `jsonwebtoken`).

## Installation & Run (Windows PowerShell)

1. Install all dependencies (root script installs frontend + backend deps):

```powershell
cd C:\Users\admin\OneDrive\Desktop\ZidioTaskManger-main
npm run install-all
```

2. Start both frontend and backend concurrently (recommended during development):

```powershell
cd C:\Users\admin\OneDrive\Desktop\ZidioTaskManger-main
npm run dev
```

3. Or start separately (useful for debugging):

Backend (with watcher):
```powershell
cd backend
npm run dev
```
Or without watcher:
```powershell
npm start
```

Frontend:
```powershell
cd frontend
npm start
```

Open `http://localhost:3000` in your browser.

## API Reference (summary)

- `POST /api/auth/signup` — body: `{ name, email, password }`
- `POST /api/auth/login` — body: `{ email, password }` → returns `token` and `user`
- `GET /api/tasks` — headers: `Authorization: Bearer <token>` → list tasks for user
- `POST /api/tasks` — create task (auth required)
- `PUT /api/tasks/:id` — update task (auth & ownership)
- `DELETE /api/tasks/:id` — delete task (auth & ownership)

Check `backend/controllers` and `backend/routes` for full implementation details and validation logic.

## Frontend Notes (favicon & Font Awesome)

- `favicon.ico` 404: Add a `favicon.ico` to `frontend/public/` so the browser loads it and removes the 404.
- Font Awesome Tracking Prevention: use a local install if the browser blocks the CDN:

```powershell
cd frontend
npm install @fortawesome/fontawesome-free
```

Then import in `src/index.js` or `src/index.css`:

```js
import '@fortawesome/fontawesome-free/css/all.min.css';
```

Or place the CSS file in `public/` and reference it from `public/index.html`.

## Troubleshooting

- Error: `MongooseError: The 'uri' parameter to 'openUri()' must be a string, got "undefined".`
   - Cause: `MONGODB_URL` missing in `backend/.env` or not loaded. Ensure `.env` exists and `require('dotenv').config()` runs before `mongoose.connect()`.

- Error: JWT or `jwt.sign` fails because secret is undefined
   - Cause: `ACCESS_TOKEN_SECRET` missing from `backend/.env`. Add it and restart the backend.

- Port conflict on `3000` or `5000`
   - Kill the process using the port or set a different port (`PORT` in `.env` or change frontend dev port).

## Contact

If you need help customizing the app or deploying it (Heroku / Vercel / Docker), open an issue or contact the maintainer.

---

Happy hacking — enjoy building on top of this MERN starter! 🚀


## 🧰 Tech Stack

- MongoDB
- Express.js
- React
- Node.js
- Redux Toolkit
- Tailwind CSS

---

## 📦 Dependencies

- axios
- react, react-dom
- react-router-dom
- react-toastify
- redux, redux-thunk
- express
- mongoose
- jsonwebtoken
- bcrypt
- dotenv
- cors

---

## 🧪 Dev-dependencies

- nodemon
- concurrently

---

## ⚙️ Prerequisites

- Node.js and npm installed
- MongoDB Atlas or local MongoDB setup
- Code editor (e.g., VS Code)

---

## 🚀 Installation and Setup

1. Clone the repo and install all dependencies:

   ```bash
   npm run install-all

## .env
MONGO_URI=your-mongo-db-url
JWT_SECRET=your-secret-key


## Run the app in development mode:
npm run dev


## Open browser at http://localhost:3000


## 🛠️ Backend API Endpoints
POST     /api/auth/signup
POST     /api/auth/login
GET      /api/tasks
GET      /api/tasks/:taskId
POST     /api/tasks
PUT      /api/tasks/:taskId
DELETE   /api/tasks/:taskId
GET      /api/profile


🌐 Frontend Pages
/                 Home / Dashboard (based on login)
/signup           Signup
/login            Login
/tasks/add        Add Task
/tasks/:taskId    Edit Task


📜 Scripts
At project root:

npm run dev: Run backend + frontend in dev mode

npm run dev-server: Only backend

npm run dev-client: Only frontend

npm run install-all: Install frontend/backend dependencies

In /frontend:

npm start: Start frontend (React)

npm run build: Create production build

In /backend:

npm run dev: Start backend with nodemon

npm start: Start backend normally

📚 Resources
React Docs

MongoDB Docs

Node.js Docs

Redux Docs

Tailwind Docs

📞 Contact
Name: Vishal Vishwakarma

# Email: vishalvsharma03@gmail.com

# LinkedIn:https://www.linkedin.com/in/vishal-vishwakarma-210b2a263/

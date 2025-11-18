# Zidio Task Manager

A full-stack MERN (MongoDB, Express.js, React, Node.js) application developed for managing tasks effectively as part of my internship at **Zidio**.


---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Dependencies](#dependencies)
- [Dev-dependencies](#dev-dependencies)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [Backend API](#backend-api)
- [Frontend Pages](#frontend-pages)
- [Scripts](#scripts)
- [Resources](#resources)
- [Contact](#contact)

---

## ✅ Features

### 🔒 User Features

- Signup/Login with JWT auth
- Add new tasks
- View all tasks
- Edit/update tasks
- Delete tasks
- Logout

### 🛠️ Developer Features

- Form validation (frontend + backend)
- Tailwind CSS styling (no external CSS)
- Responsive UI + Navbar
- Redux for global state management
- Route protection using middleware
- Toast alerts for feedback
- Dynamic document titles
- Custom hooks (like `useFetch`)
- Middleware authentication
- Proper HTTP response codes
- Clean and modular codebase

---

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
